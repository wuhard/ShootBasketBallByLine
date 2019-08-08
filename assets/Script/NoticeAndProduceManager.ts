import Singleton from "./Singleton";
import ProduceBasketManager from "./ProduceBasketManager";
import LevelDataManager from "./LevelDataManager";
import { ShootInfor } from "./SceneLevelData";

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
    veloctiyY:number = 2000;

    basketBallNum:number = 0;

    bombArray:cc.Node[] = [];
    basketBallArray:cc.Node[] = [];
    basektBallPosArray:cc.Vec2[] = [];

    @property(ProduceBasketManager)
    produceBasketManager:ProduceBasketManager;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
       
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
            this.shootPos.push(pos[i]);
        }
    }

    ///获取创建的位置信息
    CreatBornPos(num:number)
    {
        // this.bornPos.splice(0,this.bornPos.length);

        // var randomPos:number[] = [];
        // for(var i = 0; i < this.guidePos.length; i++)
        // {
        //     randomPos.push(i);
           
        // }
        // for(var j = 0; j < num; j++)
        // {
        //     var randomValue =  this.random(0,randomPos.length);
        //     var posIndex:number = randomPos[randomValue];
           
           
        //     this.bornPos.push(this.guidePos[posIndex]);
        //     randomPos.slice(randomValue,1);
        // }
     
    }

    ///获取出场顺序
    CreatBornTypeOrde()
    {
        // this.bornType.slice(0,this.bornType.length);

        // for(var i = 0; i < this.bornPos.length; i++)
        // {
        //     this.bornType.push(this.random(-1,1));
        // }

        // var ballOrder = this.random(0,this.bornType.length);
        // this.bornType[ballOrder] = 0;
    }
    
    //创建一个球的发射提示
    ProduceOneBallGuide(posNode:cc.Node):cc.Node
    {
        let bornNode = posNode;
        let tempball = cc.instantiate(this.ballGuide);
        var fadeAction = cc.fadeTo(0.3,1);
        tempball.runAction(fadeAction);
        this.node.addChild(tempball);
        tempball.setPosition(bornNode.position);
        return tempball;

    }

    ///根据位置创建一个提示
    ProduceOneBallGuideByPos(guidePos:cc.Vec2):cc.Node
    {
      
        let tempball = cc.instantiate(this.ballGuide);
        var fadeAction = cc.fadeTo(0.3,255);
        tempball.runAction(fadeAction);
        this.node.addChild(tempball);
        tempball.setPosition(guidePos);
        return tempball;

    }


    GetShootVelority(angle:number):cc.Vec2
    {
        var anglePI = Math.PI/180 * angle
       
        return cc.v2(this.veloctiyY/Math.tan(anglePI),this.veloctiyY);
    }


    //创建一个炸弹的发射提示
    ProduceOneBoomGuide(posNode:cc.Node):cc.Node
    {
        let bornNode = posNode;

        let tempbomb = cc.instantiate(this.bombGuide);
        var fadeAction = cc.fadeTo(0.3,255);
        tempbomb.runAction(fadeAction);
        this.node.addChild(tempbomb);
        tempbomb.setPosition(bornNode.position);
        return tempbomb;
    }

    ProduceOneBoomGuideByPos(guidePos:cc.Vec2):cc.Node
    {
      
        let tempball = cc.instantiate(this.bombGuide);
        this.node.addChild(tempball);
        var fadeAction = cc.fadeTo(0.3,255);
        tempball.runAction(fadeAction);
        tempball.setPosition(guidePos);
        return tempball;

    }



    ///创建一次射击用例
    public ProduceOneShootCase(shootInfors:ShootInfor[])
    {
        this.basketBallNum = 0;
        this.bornPos.splice(0,this.bornPos.length);
        this.ballGuideArray.splice(0,this.ballGuideArray.length);
        this.bombGuideArray.splice(0,this.bombGuideArray.length);
        this.bombArray.splice(0,this.bombArray.length);
        cc.log(shootInfors.length);
        for(var i = 0; i < shootInfors.length; i++)
        {
            switch(shootInfors[i].shootType)
            {
                case 0:
                    this.basketBallNum++;
                    let oneBallGuide = this.ProduceOneBallGuideByPos(shootInfors[i].shootPos);  
                    let vel = shootInfors[i].velocity;//获取射击速度
                    let delayTime = shootInfors[i].shootDelayTime;
                    this.ballGuideArray.push(oneBallGuide);
                    
                    this.scheduleOnce(() => {
                        // 这里的 this 指向 component
                        this.ProduceOneShootBallAction(oneBallGuide,vel);
                        
                    }, delayTime/1000.0 + 0.5);//2s后执行一次
                    break;
                case 1:
                        let oneBombGuide = this.ProduceOneBoomGuideByPos(shootInfors[i].shootPos);
                        let bombVel = shootInfors[i].velocity;//获取射击速度
                        let bombDelayTime = shootInfors[i].shootDelayTime;
                        this.bombGuideArray.push(oneBombGuide);
                        this.scheduleOnce(() => {
                            // 这里的 this 指向 component
                            this.ProduceOneShootBombAction(oneBombGuide,bombVel);
                           
                        }, bombDelayTime/1000.0 + 0.5);//2s后执行一次
                    break;
            }
        }
    }


    // //创建一次球和炸弹的用例
    // public ProduceOneBallAndBombCase(shootPos:number[],shootSeq:number[],shootAngel:number [])
    // {

    //     this.bornPos.splice(0,this.bornPos.length);
    //     this.ballGuideArray.splice(0,this.ballGuideArray.length);
    //     this.bombGuideArray.splice(0,this.bombGuideArray.length);
    //     this.basketBallArray.splice(0,this.basketBallArray.length);
    //     this.basektBallPosArray.splice(0,this.basektBallPosArray.length);

    //     for(var i = 0; i < shootPos.length; i++)
    //     {
    //         if(shootPos[i] == 1)
    //         {
    //             let oneBallGuide = this.ProduceOneBallGuide(this.guidePos[i]);  
    //             let vel = this.GetShootVelority(shootAngel[i]);//获取射击速度
    //             this.ballGuideArray.push(oneBallGuide);
               
    //             this.scheduleOnce(() => {
    //                 // 这里的 this 指向 component
    //                 this.ProduceOneShootBallAction(oneBallGuide,vel);
                   
    //             }, shootSeq[i]/1000.0 + 0.5);//2s后执行一次

    //         }
    //         else if(shootPos[i] == 2)
    //         {
    //             let oneBombGuide = this.ProduceOneBoomGuide(this.guidePos[i]);
    //             let vel = this.GetShootVelority(shootAngel[i]);//获取射击速度
    //             this.bombGuideArray.push(oneBombGuide);
    //             this.scheduleOnce(() => {
    //                 // 这里的 this 指向 component
    //                 this.ProduceOneShootBombAction(oneBombGuide,vel);
                   
    //             }, shootSeq[i]/1000.0 + 0.5);//2s后执行一次
    //         }
    //     }
    // }

    //创建一次射球动作
    //velocity表示射球角度
    ProduceOneShootBallAction(guidBall:cc.Node,velocity:cc.Vec2)
    {
        
      
        var fadeAction = cc.fadeTo(0.3,0);
        var finished = cc.callFunc(this.GuidBallDestroy, guidBall,velocity);
     
        var seq = cc.sequence(fadeAction,finished);
        guidBall.runAction(seq);
        this.scheduleOnce(() => {
            this.ProduceOneBall(guidBall,velocity);
         }, 0.3);//2s后执行一次
      
    }

    GuidBallDestroy(guidBall:cc.Node,velocity:cc.Vec2)
    {
        cc.log("Destory");
      //  this.ProduceOneBall(guidBall,velocity);
        guidBall.destroy();  
    }


    ProduceOneShootBombAction(guidBall:cc.Node,velocity:cc.Vec2)
    {
     
        var fadeAction = cc.fadeTo(0.3,0);
        var finished = cc.callFunc(this.GuidBallDestroy, guidBall,velocity);
     
        var seq = cc.sequence(fadeAction,finished);
        guidBall.runAction(seq);
        this.scheduleOnce(() => {
            this.ProduceOneBomb(guidBall,velocity);
         }, 0.3);//2s后执行一次
      
    }

    GuideBombDestroy(guidBomb:cc.Node,velocity:cc.Vec2)
    {
        guidBomb.destroy();
    }

    //创建一个球的
    ProduceOneBall(posNode:cc.Node,velocity:cc.Vec2)
    {
      
        var startPos =  posNode.convertToWorldSpaceAR(cc.v2(0,0));
      
        let tempball = cc.instantiate(this.ball);
        tempball.parent = this.ballParent;
        tempball.position = this.ballParent.convertToNodeSpaceAR(startPos);
        tempball.getComponent<cc.RigidBody>(cc.RigidBody).linearVelocity = velocity;
        this.basketBallArray.push(tempball);
        this.basektBallPosArray.push(cc.v2(0,0));
    }

      
    ProduceOneBomb(posNode:cc.Node,velocity:cc.Vec2)
    {
      
        var startPos =  posNode.convertToWorldSpaceAR(cc.v2(0,0));
      
        let tempball = cc.instantiate(this.bomb);
        tempball.parent = this.ballParent;
        tempball.position = this.ballParent.convertToNodeSpaceAR(startPos);
        tempball.getComponent<cc.RigidBody>(cc.RigidBody).linearVelocity = velocity;
        this.bombArray.push(tempball);
    }

    CheckAllBallCanEnter():boolean
    {
        
        for(var i = 0; i < this.basketBallArray.length; i++)
        {
            if(this.basketBallArray[i] != null)
            {
                var movePos = cc.v2(this.basektBallPosArray[i].x - this.basketBallArray[i].position.x,
                    this.basektBallPosArray[i].y - this.basketBallArray[i].position.y);
                
                if(movePos.mag() <0.3)
                {
                    return false;
                }
           
                this.basektBallPosArray[i] = this.basketBallArray[i].position;
            }
        }

        return true;
    }

    DestroyAllGuide()
    {
        for(var i = 0; i < this.bombGuideArray.length; i++)
        {
            if(this.bombGuideArray[i] != null)
            {
                this.bombGuideArray[i].destroy();
            }
        }
        this.bombGuideArray.splice(0,this.bombGuideArray.length);

        for(var i = 0; i < this.ballGuideArray.length; i++)
        {
            if(this.ballGuideArray[i] != null)
            {
                this.ballGuideArray[i].destroy();
            }
        }
        this.ballGuideArray.splice(0,this.ballGuideArray.length);
    }

    DestroyAllBomb()
    {
        for(var i = 0; i < this.bombArray.length; i++)
        {
            if(this.bombArray[i] != null)
            {
                this.bombArray[i].destroy();
            }
        }
        this.bombArray.splice(0,this.bombArray.length);
    }
    //删除所有球
    DestroyAllBall()
    {
        for(var i = 0; i < this.basketBallArray.length; i++)
        {
            if(this.basketBallArray[i] != null)
            {
                this.basketBallArray[i].destroy();
            }
        }
        this.basketBallArray.splice(0,this.basketBallArray.length);
    }


    StopProduceAction()
    {
        this.DestroyAllBall();
        this.DestroyAllBomb();
        this.DestroyAllGuide();
        this.unscheduleAllCallbacks();
    }

    random(lower, upper) {

        return Math.floor(Math.random() * (upper - lower)) + lower;
        
    }
 

}
