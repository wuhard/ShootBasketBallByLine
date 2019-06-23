import EnterBallAni from "./EnterBallAni";
import ProduceBasketManager from "./ProduceBasketManager";
import Singleton from "./Singleton";

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
    enterBallAni:cc.Prefab;

    @property(cc.Prefab)
    boomBasket:cc.Prefab;
    @property(ProduceBasketManager)
    produceBasketManager:ProduceBasketManager;

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
        let physicsNode = cc.instantiate(this.physicsNode);
        this.node.addChild(physicsNode);
        physicsNode.name = "first";
        this.physicsNodeArr.push(physicsNode);

       
        // this.schedule(function() {
        //     // 这里的 this 指向 component
        //     this.ProduceOneBasket(cc.v2(600,500));
        // }, 5); //5s执行一次
    }

    start()
    {
        this.ProduceOneBasket();
    }



    onEnter() {
        
    }

    touchStart(event : cc.Event.EventTouch) 
    {
        let physicsNode = cc.instantiate(this.physicsNode);
        this.node.addChild(physicsNode); 
        this.physicsNodeArr.push(physicsNode);
        cc.log("logicStart");
    }

    touchMove(event : cc.Event.EventTouch) {
        
    }

    touchEnd(event : cc.Event.EventTouch) {
        
    }

    touchCancel(event : cc.Event.EventTouch) {
        
    }

    public ProduceOneBasket(delayTime:number = 0)
    {
        cc.log("one basket");

        this.scheduleOnce(() => {
            this.produceBasketManager.ProduceOneBasket();
         }, delayTime);//2s后执行一次

         this.scheduleOnce(() => {
            this.instantiateOneBall();
         }, delayTime+1);//2s后执行一次

    }

    public instantiateOneBall()
    {
        var startPos =  this.node.convertToNodeSpaceAR(cc.v2(600,1155));
        let tempball = cc.instantiate(this.ball);
        this.ballParent.addChild(tempball);
        tempball.setPosition(startPos);
      
    }

    public PlayEnterBallAni(pos:cc.Vec2)
    {
        let ani = cc.instantiate(this.enterBallAni);
       // cc.log("PlayAni");
        this.node.addChild(ani);
        ani.setPosition(pos);
    }

    //创建一个篮筐
   
    public ProduceBoomBasket(pos:cc.Vec2)
    {
     
      //  var startPos =  this.node.convertToNodeSpaceAR(pos);
        let tempbasket= cc.instantiate(this.boomBasket);
        tempbasket.setPosition(pos);
      //  this.basketParent.addChild(tempbasket);
    
    }

    MoveToPos(colliderNode:cc.Node,pos : cc.Vec2){
        
        this.scheduleOnce(function(){
                colliderNode.position = pos;
            },0);
    }
    

    public RemaveAllLine()
    {
      
        var children = this.node.children;
       
        for(var i = 0; i < children.length - 1; i++)
        {
            children[i].destroy();
        }

        var arrLenght = this.physicsNodeArr.length;
        this.physicsNodeArr.slice(0,arrLenght-1);
    }

    //删除节点
    public RemoveBasketNode(nodeObj:cc.Node)
    {

        var script = nodeObj.getComponent("Basket");
        script.RemoveBasket();
    }
}
