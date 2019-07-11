import Singleton from "./Singleton";
import ProduceBasketManager from "./ProduceBasketManager";
import LevelDataManager from "./LevelDataManager";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
let talefun = (<any>cc).talefun;

@ccclass
export default class NoticeAndProduceManager extends Singleton<NoticeAndProduceManager> {

    @property(cc.Node)
    ballParent:cc.Node;

    @property(cc.Prefab)
    ballGuide:cc.Prefab;

    @property(cc.Prefab)
    bombGuide:cc.Prefab;

    @property(cc.Prefab)
    ball:cc.Prefab;

    @property(cc.Prefab)
    bomb:cc.Prefab;

    @property(cc.Node)
    guidePos:cc.Node[] = [];

    bornPos : cc.Node[] = [];

    shootPos: number[] = []; // 1代表篮球 2代表炸弹 0代表没有

    bornSeq: number[] = []; //实例化延迟时间

    velocity: cc.Vec2[] = [cc.v2(0,2000),cc.v2(0,2500)];

    ballGuideArray: cc.Node[] = [];
    bombGuideArray: cc.Node[] = [];
    
    @property(ProduceBasketManager)
    produceBasketManager:ProduceBasketManager;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
      
    }

    //创建球和炸弹的提示
    CreatBallAndBombNotice(shootPos:number[],shootSeq:number[])
    {
        this.bornPos.splice(0,this.bornPos.length);
        this.ballGuideArray.splice(0,this.ballGuideArray.length);
        this.bombGuideArray.splice(0,this.bombGuideArray.length);

        for(var i = 0; i < shootPos.length; i++)
        {
            if(shootPos[i] == 1)
            {
                var oneBallGuide = this.ProduceOneBallGuide(this.bornPos[i]);  
                this.ballGuideArray.push(oneBallGuide);
                this.scheduleOnce(() => {
                    // 这里的 this 指向 component
                    this.ProduceBallAction(oneBallGuide);
                }, shootSeq[i]/1000);//2s后执行一次

            }
            else if(shootPos[i] == 2)
            {
                var oneBombGuide = this.ProduceOneBoomGuide(this.bornPos[i]);
                this.bombGuideArray.push(oneBombGuide);
            }
        }
    }

    CreatBornPosByType(posType:number)
    {
        this.bornPos.splice(0,this.bornPos.length);
        switch(posType)
        {
            case -1:
                    this.bornPos.push(this.guidePos[this.random(2,this.guidePos.length)]);
                break;
            case 0:
                 this.bornPos.push(this.random(0,2) == 0 ? this.guidePos[0]:this.guidePos[3]);
                break;
            case 1:
                 this.bornPos.push(this.guidePos[this.random(0,2)]);
                break;
        }
      //  cc.log("BornPosLength" + this.bornPos.length);
    }

    ///设置生成位置数据
    public SetBornType(pos:number[])
    {
        //清空
        this.bornPos.splice(0,this.bornPos.length);
        for(var i = 0; i < pos.length; i++)
        {
            this.bornType.push(pos[i]);
        }
    }

    ///获取创建的位置信息
    CreatBornPos(num:number)
    {
        this.bornPos.splice(0,this.bornPos.length);

        var randomPos:number[] = [];
        for(var i = 0; i < this.guidePos.length; i++)
        {
            randomPos.push(i);
           
        }
        for(var j = 0; j < num; j++)
        {
            var randomValue =  this.random(0,randomPos.length);
            var posIndex:number = randomPos[randomValue];
           
           
            this.bornPos.push(this.guidePos[posIndex]);
            randomPos.slice(randomValue,1);
        }
     
    }

    ///获取出场顺序
    CreatBornTypeOrde()
    {
        this.bornType.slice(0,this.bornType.length);

        for(var i = 0; i < this.bornPos.length; i++)
        {
            this.bornType.push(this.random(-1,1));
        }

        var ballOrder = this.random(0,this.bornType.length);
        this.bornType[ballOrder] = 0;
    }
    

    ProduceOneBallGuide(posNode:cc.Node):cc.Node
    {
        let bornNode = posNode;

        let tempball = cc.instantiate(this.ballGuide);
        this.node.addChild(tempball);
        tempball.setPosition(bornNode.position);
        return tempball;

    }

    
    ProduceOneBoomGuide(posNode:cc.Node):cc.Node
    {
        let bornNode = posNode;

        let tempbomb = cc.instantiate(this.bombGuide);
        this.node.addChild(tempbomb);
        tempbomb.setPosition(bornNode.position);
        return tempbomb;
    }

    //创建一次球和炸弹的用例
    public ProduceOneBallAndBombCase(shootPos:number[],shootSeq:number[])
    {
        this.shootPos = 
        // this.CreatBornPos(num);
        // this.CreatBornTypeOrde();
        var posType = this.produceBasketManager.GetPosType();
        this.CreatBornPosByType(posType);
        for(var i = 0; i < this.bornPos.length; i++)
        {
            var tempball = this.ProduceOneBallGuide(this.bornPos[i]);
            this.scheduleOnce(() => {
                // 这里的 this 指向 component
                this.ProduceBallAction(tempball);
            }, 0.5);//2s后执行一次
        } 

        


      //  this.ProduceOneBall(this.bornPos[0],cc.v2(0,2000));
    }

    ProduceBallAction(guidBall:cc.Node)
    {
       // cc.log("Destory");
        this.ProduceOneBall(guidBall,cc.v2(0,2000));
        guidBall.destroy();
      
    }


    ProduceBombAction(guidBall:cc.Node)
    {
       // cc.log("Destory");
        this.ProduceOneBall(guidBall,cc.v2(0,2000));
        guidBall.destroy();
      
    }

    //创建一个球的
    ProduceOneBall(posNode:cc.Node,velocity:cc.Vec2)
    {
      
        var startPos =  posNode.convertToWorldSpaceAR(cc.v2(0,0));
      
        let tempball = cc.instantiate(this.ball);
        tempball.parent = this.ballParent;
        tempball.position = this.ballParent.convertToNodeSpaceAR(startPos);
        tempball.getComponent<cc.RigidBody>(cc.RigidBody).linearVelocity = velocity;
    }


    ProduceOneBomb(posNode:cc.Node,velocity:cc.Vec2)
    {
      
        var startPos =  posNode.convertToWorldSpaceAR(cc.v2(0,0));
      
        let tempball = cc.instantiate(this.boom);
        tempball.parent = this.ballParent;
        tempball.position = this.ballParent.convertToNodeSpaceAR(startPos);
        tempball.getComponent<cc.RigidBody>(cc.RigidBody).linearVelocity = velocity;
    }


    random(lower, upper) {

        return Math.floor(Math.random() * (upper - lower)) + lower;
        
    }
    
    

}
