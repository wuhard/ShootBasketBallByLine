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
export default class EnterBallAni extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    @property(cc.Node)
    yellowPoint: cc.Node[] = [];
    @property(cc.Node)
    endPoint: cc.Node[] = [];


    onLoad () {
        for(var i = 0; i < this.yellowPoint.length; i++)
        {
            var moveAction = cc.moveTo(0.5,this.endPoint[i].position);
            var scaleAction = cc.scaleTo(0.5,1.5,1.5);
            var spawn = cc.spawn(moveAction,scaleAction);
            var scaleDown = cc.scaleTo(0.5,1,1);
            var finished = cc.callFunc(this.finishedAction, this);
            var seq = cc.sequence(spawn,scaleDown,finished);
            this.yellowPoint[i].runAction(seq);
            // this.yellowPoint[i].runAction(moveAction);
            // this.yellowPoint[i].runAction(scaleAction);

        }
    }

    finishedAction()
    {
        this.node.destroy();
    }

    onEnter() {
        
    }

    touchStart(event : cc.Event.EventTouch) 
    {
      
    }

   
}
