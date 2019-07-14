(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/physicsNodeLogic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8facdN70n9OirBLfSObhMNW', 'physicsNodeLogic', __filename);
// Script/physicsNodeLogic.ts

// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var talefun = cc.talefun;
var MyPhysicsCollider = require("./MyPhysicsCollider");
var PhysicsNodeLogic = /** @class */ (function (_super) {
    __extends(PhysicsNodeLogic, _super);
    function PhysicsNodeLogic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = null;
        _this.points = [];
        _this.physicsLine = null;
        _this.rigibodyLogic = null;
        _this.pathWidth = 10;
        _this.pathColor = cc.color(0, 0, 0);
        _this.lineCount = 25;
        _this.limitLineLength = 125;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:    
    PhysicsNodeLogic.prototype.onLoad = function () {
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
    };
    PhysicsNodeLogic.prototype.onDestroy = function () {
        this.removeTouch();
    };
    PhysicsNodeLogic.prototype.addTouch = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartHandler);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndHandler);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelHandler);
    };
    PhysicsNodeLogic.prototype.removeTouch = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStartHandler);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEndHandler);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancelHandler);
    };
    PhysicsNodeLogic.prototype.touchStart = function (event) {
        var touchLoc = event.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);
        this.points.push(cc.p(touchLoc.x, touchLoc.y));
        this.path.moveTo(touchLoc.x, touchLoc.y);
        // cc.log("start");
        return true;
    };
    PhysicsNodeLogic.prototype.touchMove = function (event) {
        var touchLoc = event.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);
        if (!this.checkIsCanDraw(this.points)) {
            return;
        }
        this.points.push(cc.p(touchLoc.x, touchLoc.y));
        this.path.lineTo(touchLoc.x, touchLoc.y);
        var lastTouchLoc = this.points[this.points.length - 1];
        this.path.stroke();
        this.path.moveTo(lastTouchLoc.x, lastTouchLoc.y);
        this.createRigibody();
    };
    PhysicsNodeLogic.prototype.touchEnd = function (event) {
        this.createRigibody();
    };
    PhysicsNodeLogic.prototype.touchCancel = function (event) {
        this.createRigibody();
    };
    PhysicsNodeLogic.prototype.createRigibody = function () {
        this.physicsLine.lineWidth = this.path.lineWidth;
        this.physicsLine.points = this.points;
        this.physicsLine.apply();
    };
    PhysicsNodeLogic.prototype.checkIsCanDraw = function (points) {
        var lineLenght = 0;
        for (var i = 0; i < points.length - 1; i++) {
            lineLenght += cc.pDistance(points[i], points[i + 1]);
        }
        return lineLenght < this.limitLineLength;
    };
    PhysicsNodeLogic.prototype.getSegmenPos = function (beginPos, endPos) {
        var k = (endPos.y - beginPos.y) / (endPos.x - beginPos.x);
        var offX = 0;
        var offY = 0;
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
        }
        else {
            var k1 = -1 / k;
            var angle = Math.atan(k1);
            var sin = Math.sin(angle);
            var cos = Math.cos(angle);
            // cc.log("angle" + angle);
            offX = this.path.lineWidth / 2 * cos;
            offY = this.path.lineWidth / 2 * sin;
        }
        if (endPos.y > beginPos.y) {
            offX = -offX;
            offY = -offY;
        }
        var beingPosArr = [cc.p(beginPos.x - offX, beginPos.y - offY), cc.p(endPos.x - offX, endPos.y - offY)];
        var endPosArr = [cc.p(beginPos.x + offX, beginPos.y + offY), cc.p(endPos.x + offX, endPos.y + offY)];
        return {
            beginPosArr: beingPosArr,
            endPosArr: endPosArr
        };
    };
    __decorate([
        property(MyPhysicsCollider)
    ], PhysicsNodeLogic.prototype, "physicsLine", void 0);
    __decorate([
        property(cc.RigidBody)
    ], PhysicsNodeLogic.prototype, "rigibodyLogic", void 0);
    __decorate([
        property(Number)
    ], PhysicsNodeLogic.prototype, "pathWidth", void 0);
    __decorate([
        property(cc.color)
    ], PhysicsNodeLogic.prototype, "pathColor", void 0);
    __decorate([
        property(Number)
    ], PhysicsNodeLogic.prototype, "lineCount", void 0);
    __decorate([
        property(Number)
    ], PhysicsNodeLogic.prototype, "limitLineLength", void 0);
    PhysicsNodeLogic = __decorate([
        ccclass
    ], PhysicsNodeLogic);
    return PhysicsNodeLogic;
}(cc.Component));
exports.default = PhysicsNodeLogic;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=physicsNodeLogic.js.map
        