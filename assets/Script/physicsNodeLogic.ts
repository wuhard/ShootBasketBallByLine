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

import MyPhysicsCollider = require("./MyPhysicsCollider")

@ccclass
export default class PhysicsNodeLogic extends cc.Component {

    touchStartHandler: () => void;
    touchMoveHandler: () => void;
    touchEndHandler: () => void;
    touchCancelHandler: () => void;

    path: cc.Graphics = null;

    points: cc.Vec2[] = [];
    @property(MyPhysicsCollider)
    physicsLine = null;
    @property(cc.RigidBody)
    rigibodyLogic: cc.RigidBody = null;
    @property(Number)
    pathWidth : number = 10;
    @property(cc.color)
    pathColor: cc.Color = cc.color(0,0,0);
    @property(Number)
    lineCount:number = 25;
    @property(Number)
    limitLineLength:number = 125;
    
    darwFlag : boolean = true;

    // LIFE-CYCLE CALLBACKS:    
    onLoad () {
        this.path = this.addComponent(cc.Graphics);
        this.path.strokeColor = this.pathColor;
        this.path.lineWidth = this.pathWidth;
        this.path.lineCap = cc.Graphics.LineCap.ROUND;
        this.path.lineJoin = cc.Graphics.LineJoin.ROUND;


        this.touchStartHandler = this.touchStart.bind(this);
        this.touchMoveHandler = this.touchMove.bind(this);
        this.touchEndHandler = this.touchEnd.bind(this);
        this.touchCancelHandler = this.touchCancel.bind(this);

        this.addTouch();
    }

    onDestroy() {
        this.removeTouch();
    }

    addTouch() {
    
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartHandler);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndHandler);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelHandler);
    }

    removeTouch() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStartHandler);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEndHandler);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelHandler);
    }

    touchStart(event : cc.Event.EventTouch) {

        if(!this.darwFlag)
        {
            return;
        }

        let touchLoc = event.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

       this.points.push(cc.p(touchLoc.x, touchLoc.y));
       this.path.moveTo(touchLoc.x, touchLoc.y);

      // cc.log("start");
       
        return true;
    }

    touchMove(event : cc.Event.EventTouch) {
        if(!this.darwFlag)
        {
            return;
        }
        let touchLoc = event.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);


        if(!this.checkIsCanDraw(this.points))
        {
            return;
        }


        this.points.push(cc.p(touchLoc.x, touchLoc.y));
       
       
        this.path.lineTo(touchLoc.x, touchLoc.y);
        let lastTouchLoc = this.points[this.points.length - 1];
        this.path.stroke();
        this.path.moveTo(lastTouchLoc.x,lastTouchLoc.y);
        this.createRigibody();
    }

   

    touchEnd(event : cc.Event.EventTouch) {

         this.createRigibody();
         this.darwFlag = false;
    }

    touchCancel(event : cc.Event.EventTouch) {
        this.createRigibody();
    }

  

    
    createRigibody()
     {
        this.physicsLine.lineWidth = this.path.lineWidth;
        this.physicsLine.points = this.points;
        this.physicsLine.apply();
        
    }

    checkIsCanDraw(points:cc.Vec2[]) : boolean
    {
        var lineLenght = 0;
        for(var i = 0; i < points.length-1; i++)
        {
            lineLenght += cc.pDistance(points[i], points[i+1]) 
        }

        return lineLenght < this.limitLineLength;
    }

    getSegmenPos(beginPos: cc.Vec2, endPos: cc.Vec2) {
        let k = (endPos.y - beginPos.y) / (endPos.x - beginPos.x);
        let offX = 0;
        let offY = 0;
        if (k === 0) {
            offY = this.path.lineWidth / 2;
            offX = 0;

            if (endPos.x < beginPos.x) {
                offX = -offX;
                offY = -offY;
            }
        }
        else if (!isFinite(k)) {
            offX = this.path.lineWidth / 2;
            offY = 0;
        } else {
            let k1 = -1 / k;

            let angle = Math.atan(k1);
            let sin = Math.sin(angle);
            let cos = Math.cos(angle);
           // cc.log("angle" + angle);

            offX = this.path.lineWidth / 2 * cos;
            offY = this.path.lineWidth / 2 * sin;
        }

        if (endPos.y > beginPos.y) {
            offX = -offX;
            offY = -offY;
        }

        let beingPosArr = [cc.p(beginPos.x - offX, beginPos.y - offY), cc.p(endPos.x - offX, endPos.y - offY)];
        let endPosArr = [cc.p(beginPos.x + offX, beginPos.y + offY), cc.p(endPos.x + offX, endPos.y + offY)];

        return {
            beginPosArr : beingPosArr,
            endPosArr : endPosArr
        }
    }
}
