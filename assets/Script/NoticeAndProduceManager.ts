import Singleton from "./Singleton";

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

    @property(cc.Prefab)
    ballGuide:cc.Prefab;

    @property(cc.Prefab)
    boomGuide:cc.Prefab;

    @property(cc.Prefab)
    ball:cc.Prefab;

    @property(cc.Prefab)
    boom:cc.Prefab;

    @property(cc.Node)
    guidePos:cc.Node[] = [];

   
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
       
    }

    public ProduceOneBallGuide():cc.Node
    {
        // var bornPosX = this.random(this.minPosX,this.maxPosX);
        // var bornPos = new cc.Vec2(bornPosX,this.posY);
        // let tempball = cc.instantiate(this.ballGuide);
        // this.node.addChild(tempball);
        // tempball.setPosition(this.node.convertToNodeSpaceAR(bornPos));
        // return tempball;

    }

    
    public ProduceOneBoomGuide():cc.Node
    {
        // var bornPosX = this.random(this.minPosX,this.maxPosX);
        // var bornPos = new cc.Vec2(bornPosX,this.posY);
        // let tempboomGuide = cc.instantiate(this.boomGuide);
        // this.node.addChild(tempboomGuide);
        // tempboomGuide.setPosition(this.node.convertToNodeSpaceAR(bornPos));
        // return tempboomGuide;
    }


    random(lower, upper) {

        return Math.floor(Math.random() * (upper - lower)) + lower;
        
    }

}
