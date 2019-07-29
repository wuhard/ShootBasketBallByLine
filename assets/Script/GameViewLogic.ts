import EnterBallAni from "./EnterBallAni";
import ProduceBasketManager from "./ProduceBasketManager";
import Singleton from "./Singleton";
import NoticeAndProduceManager from "./NoticeAndProduceManager";
import EffectPlayManager from "./EffectPlayManager";
import LevelDataManager from "./LevelDataManager";
import { BasketInfor, ShootInfor } from "./SceneLevelData";
import Ball from "./Ball";
import ShowHOrHideObj from "./ShowOrHideObj";

// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;
let talefun = (<any>cc).talefun;

@ccclass
export default class GameViewLogic extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    @property(cc.Prefab)
    physicsNode: cc.Prefab;
    @property(cc.Prefab)
    ball:cc.Prefab = null;
    @property(cc.Node)
    ballParent:cc.Node;

    @property(cc.Node)
    linesParent:cc.Node;
    physicsNodeArr: cc.Node[] = [];
 

    @property(cc.Prefab)
    boomBasket:cc.Prefab;


    @property(ProduceBasketManager)
    produceBasketManager:ProduceBasketManager;
    @property(NoticeAndProduceManager)
    noticeAndProduceManager:NoticeAndProduceManager;

    @property(EffectPlayManager)
    effectPlayManager:EffectPlayManager;

    @property(LevelDataManager)
    levelDataManager:LevelDataManager;

    @property(ShowHOrHideObj)
    uiPanel:ShowHOrHideObj;

    @property(cc.Label)
    lineCount:cc.Label;

    //当前关卡
    currentLevelIndex:number = 0;

    //最大关卡
    maxLevelCount:number = 0;
  
    ///线的数量
    drawLineCount:number = 3;

    ballCount: number = 0;

    drawEnable:boolean = false;

    isFinishCurrentLevel:boolean = false;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        // ;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -960);

        let self = this;
        
       
        self.node.on(cc.Node.EventType.TOUCH_START, self.touchStart.bind(self));
        self.node.on(cc.Node.EventType.TOUCH_MOVE, self.touchMove.bind(self));
        self.node.on(cc.Node.EventType.TOUCH_END, self.touchEnd.bind(self));
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, self.touchCancel.bind(self));

        //先创建一个物体等待绘画，如果在touchstart里面创建第一条线就不能监听到划线的start函数了。


       
        // this.schedule(function() {
        //     // 这里的 this 指向 component
        //     this.ProduceOneBasket(cc.v2(600,500));
        // }, 5); //5s执行一次
    }

    start()
    {    
        this.uiPanel.ShowOnlyObjByIndex(0);
    }
    public BackToMainPage()
    {
        this.uiPanel.ShowOnlyObjByIndex(0);
    }

    public StartGame()
    {
        this.uiPanel.ShowOnlyObjByIndex(1);
        this.StartDrawLine();
        this.drawEnable = true;
        this.ProduceOneBasketCase(0,1);
    }

  

    StartDrawLine()
    {
        let physicsNode = cc.instantiate(this.physicsNode);
        this.node.addChild(physicsNode);
        physicsNode.name = "first";
        this.physicsNodeArr.push(physicsNode);
    }



    onEnter() {
        
    }

    touchStart(event : cc.Event.EventTouch) 
    {
        if(this.drawEnable == false)
        {
            return;
        }

        cc.log(this.drawLineCount);
        if(this.drawLineCount - 1 >= 0)
        {
            if(this.drawLineCount - 1 > 0)
            {
                let physicsNode = cc.instantiate(this.physicsNode);
                this.node.addChild(physicsNode); 
                this.physicsNodeArr.push(physicsNode);
            }
           
            this.drawLineCount--; 
            this.lineCount.string = "x "+ this.drawLineCount.toString();
        
            if(this.drawLineCount == 0)
            {
                cc.log("CheckBallCanEnterBasket");
                this.drawEnable = false;
                this.schedule(this.CheckEnterBasket,1, 10,3);//2s后执行一次
            }
        } 
       
             
    }

    CheckEnterBasket()
    {
        if (!this.CheckBallCanEnterBasket())
        {
             this.unschedule(this.CheckEnterBasket);
             this.ShowLosePanel(true);
        }
       
    }


    //检测球是否能进篮筐
    CheckBallCanEnterBasket():boolean
    {
        if(this.noticeAndProduceManager.CheckAllBallCanEnter())
        {
           
            return true;
        }

        return false;
       
    }

    check

    touchMove(event : cc.Event.EventTouch) {
        
    }

    touchEnd(event : cc.Event.EventTouch) {
        
    }

    touchCancel(event : cc.Event.EventTouch) {
        
    }

    //创建下一关的数据
    public ProduceNextLevelBasketCase(delayTime:number = 0)
    {
        if(this.currentLevelIndex + 1 < this.maxLevelCount)
        {
            this.currentLevelIndex++;
        }  
        this.ProduceOneBasketCase(this.currentLevelIndex,delayTime);
    }

    ///进了一个球
    public EnterOneBall(ball:cc.Node,basketBottom:cc.Node)
    {
        this.PlayEnterBallEffect(basketBottom.convertToWorldSpaceAR(cc.v2(0, 0)))
        this.ballCount--;
        if(this.ballCount == 0)
        {
            this.RemoveBasketNode(basketBottom.parent);
            this.RemaveAllLine();
            this.scheduleOnce(() => {
           
                this.ShowWinPanel();
    
             }, 2);//2s后执行一次
           
           // this.ProduceNextLevelBasketCase(2);
        }
    }


    public ProduceNextBaksetCase()
    {
        this.StartDrawLine();
        this.drawLineCount = 3;
        this.drawEnable = true;
        this.uiPanel.ShowOnlyObjByIndex(1);
        this.ProduceNextLevelBasketCase(2);
    }

    ///创建一个篮球用例
    public ProduceOneBasketCase(levelIndex:number,delayTime:number = 0)
    {
        this.drawLineCount = 3;
        this.lineCount.string = "x "+this.drawLineCount.toString();
      //  cc.log("one basket");
        this.currentLevelIndex = levelIndex;
        this.scheduleOnce(() => {
           
            var basketInfor : BasketInfor[] = this.levelDataManager.GetBasketInforsByLevel(levelIndex);
            this.produceBasketManager.ProduceOneBasketCase(basketInfor);
            this.maxLevelCount = this.levelDataManager.GetLevelLength();

         }, delayTime);//2s后执行一次

         this.scheduleOnce(() => {
            this.ProduceOneShootCase(levelIndex);
            this.ballCount =  this.noticeAndProduceManager.basketBallNum;
         }, delayTime+1);//2s后执行一次

    }

    ///创建一个球和炸弹的射击案例
    public ProduceOneShootCase(levelIndex:number)
    {
        var shootInfors: ShootInfor[] = this.levelDataManager.GetShootInforByLevel(levelIndex);
        this.noticeAndProduceManager.ProduceOneShootCase(shootInfors);
       
    }

    

    public PlayEnterBallEffect(pos:cc.Vec2)
    {
        this.effectPlayManager.PlayEnterBallAni(pos);
        this.effectPlayManager.PlayScoreAni(pos,this.drawLineCount);
    }
    

    //创建一个篮筐
   
    public ProduceBoomBasket(pos:cc.Vec2)
    {
        this.effectPlayManager.PlayBombBasketAni(pos);
     
    //   //  var startPos =  this.node.convertToNodeSpaceAR(pos);
    //     let tempbasket= cc.instantiate(this.boomBasket);
    //     tempbasket.setPosition(pos);
    //   //  this.basketParent.addChild(tempbasket);
    
    }

    MoveToPos(colliderNode:cc.Node,pos : cc.Vec2){
        
        this.scheduleOnce(function(){
                colliderNode.position = pos;
            },0);
    }
    

    public RemaveAllLine()
    {
      
        var children = this.node.children;
       
        for(var i = 0; i < children.length ; i++)
        {
            children[i].destroy();
        }

        var arrLenght = this.physicsNodeArr.length;
        this.physicsNodeArr.slice(0,arrLenght);
    }

    //删除节点
    public RemoveBasketNode(nodeObj:cc.Node)
    {

        this.produceBasketManager.RemoveOneBasket(nodeObj);
    }

    ///失败
    public ShowLosePanel(flag:boolean)
    {
        this.unscheduleAllCallbacks();
        this.uiPanel.ShowOnlyObjByIndex(3);
        this.produceBasketManager.RemoveAllBaskets();
        this.noticeAndProduceManager.DestroyAllBall();
        this.RemaveAllLine();
    }

    public ShowWinPanel()
    {
        this.unscheduleAllCallbacks();
        this.uiPanel.ShowOnlyObjByIndex(2);
        this.produceBasketManager.RemoveAllBaskets();
        this.noticeAndProduceManager.DestroyAllBall();
     
    }

    public ReplayGame()
    {
        this.StartDrawLine();
        this.drawLineCount = 3;
        this.drawEnable = true;
        this.uiPanel.ShowOnlyObjByIndex(1);
        this.ProduceOneBasketCase(this.currentLevelIndex);
   
    }
}
