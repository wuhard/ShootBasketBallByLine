"use strict";
cc._RF.push(module, '56f27P2gSdGzL/aC8VXKYgs', 'GameViewLogic');
// Script/GameViewLogic.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ProduceBasketManager_1 = require("./ProduceBasketManager");
// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var talefun = cc.talefun;
var GameViewLogic = /** @class */ (function (_super) {
    __extends(GameViewLogic, _super);
    function GameViewLogic() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ball = null;
        _this.physicsNodeArr = [];
        return _this;
    }
    GameViewLogic.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        // ;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -960);
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, self.touchStart.bind(self));
        self.node.on(cc.Node.EventType.TOUCH_MOVE, self.touchMove.bind(self));
        self.node.on(cc.Node.EventType.TOUCH_END, self.touchEnd.bind(self));
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, self.touchCancel.bind(self));
        //先创建一个物体等待绘画，如果在touchstart里面创建第一条线就不能监听到划线的start函数了。
        var physicsNode = cc.instantiate(this.physicsNode);
        this.node.addChild(physicsNode);
        physicsNode.name = "first";
        this.physicsNodeArr.push(physicsNode);
        // this.schedule(function() {
        //     // 这里的 this 指向 component
        //     this.ProduceOneBasket(cc.v2(600,500));
        // }, 5); //5s执行一次
    };
    GameViewLogic.prototype.start = function () {
        this.ProduceOneBasket();
    };
    GameViewLogic.prototype.onEnter = function () {
    };
    GameViewLogic.prototype.touchStart = function (event) {
        var physicsNode = cc.instantiate(this.physicsNode);
        this.node.addChild(physicsNode);
        this.physicsNodeArr.push(physicsNode);
        cc.log("logicStart");
    };
    GameViewLogic.prototype.touchMove = function (event) {
    };
    GameViewLogic.prototype.touchEnd = function (event) {
    };
    GameViewLogic.prototype.touchCancel = function (event) {
    };
    GameViewLogic.prototype.ProduceOneBasket = function (delayTime) {
        var _this = this;
        if (delayTime === void 0) { delayTime = 0; }
        cc.log("one basket");
        this.scheduleOnce(function () {
            _this.produceBasketManager.ProduceOneBasket();
        }, delayTime); //2s后执行一次
        this.scheduleOnce(function () {
            _this.instantiateOneBall();
        }, delayTime + 1); //2s后执行一次
    };
    GameViewLogic.prototype.instantiateOneBall = function () {
        var startPos = this.node.convertToNodeSpaceAR(cc.v2(600, 1155));
        var tempball = cc.instantiate(this.ball);
        this.ballParent.addChild(tempball);
        tempball.setPosition(startPos);
    };
    GameViewLogic.prototype.PlayEnterBallAni = function (pos) {
        var ani = cc.instantiate(this.enterBallAni);
        // cc.log("PlayAni");
        this.node.addChild(ani);
        ani.setPosition(pos);
    };
    //创建一个篮筐
    GameViewLogic.prototype.ProduceBoomBasket = function (pos) {
        //  var startPos =  this.node.convertToNodeSpaceAR(pos);
        var tempbasket = cc.instantiate(this.boomBasket);
        tempbasket.setPosition(pos);
        //  this.basketParent.addChild(tempbasket);
    };
    GameViewLogic.prototype.MoveToPos = function (colliderNode, pos) {
        this.scheduleOnce(function () {
            colliderNode.position = pos;
        }, 0);
    };
    GameViewLogic.prototype.RemaveAllLine = function () {
        var children = this.node.children;
        for (var i = 0; i < children.length - 1; i++) {
            children[i].destroy();
        }
        var arrLenght = this.physicsNodeArr.length;
        this.physicsNodeArr.slice(0, arrLenght - 1);
    };
    //删除节点
    GameViewLogic.prototype.RemoveBasketNode = function (nodeObj) {
        var script = nodeObj.getComponent("Basket");
        script.RemoveBasket();
    };
    __decorate([
        property(cc.Prefab)
    ], GameViewLogic.prototype, "physicsNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameViewLogic.prototype, "ball", void 0);
    __decorate([
        property(cc.Node)
    ], GameViewLogic.prototype, "ballParent", void 0);
    __decorate([
        property(cc.Node)
    ], GameViewLogic.prototype, "linesParent", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameViewLogic.prototype, "enterBallAni", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameViewLogic.prototype, "boomBasket", void 0);
    __decorate([
        property(ProduceBasketManager_1.default)
    ], GameViewLogic.prototype, "produceBasketManager", void 0);
    GameViewLogic = __decorate([
        ccclass
    ], GameViewLogic);
    return GameViewLogic;
}(cc.Component));
exports.default = GameViewLogic;

cc._RF.pop();