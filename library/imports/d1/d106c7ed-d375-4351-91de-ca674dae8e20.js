"use strict";
cc._RF.push(module, 'd106cft03VDUZHeymdNro4g', 'NoticeAndProduceManager');
// Script/NoticeAndProduceManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Singleton_1 = require("./Singleton");
var ProduceBasketManager_1 = require("./ProduceBasketManager");
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var talefun = cc.talefun;
var NoticeAndProduceManager = /** @class */ (function (_super) {
    __extends(NoticeAndProduceManager, _super);
    function NoticeAndProduceManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guidePos = [];
        _this.bornPos = [];
        _this.bornType = []; // 0代表篮球 -1代表炸弹
        _this.velocity = [cc.v2(0, 2000), cc.v2(0, 2500)];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NoticeAndProduceManager.prototype.start = function () {
    };
    NoticeAndProduceManager.prototype.CreatBornPosByType = function (posType) {
        this.bornPos.splice(0, this.bornPos.length);
        switch (posType) {
            case -1:
                this.bornPos.push(this.guidePos[this.random(2, this.guidePos.length)]);
                break;
            case 0:
                this.bornPos.push(this.random(0, 2) == 0 ? this.guidePos[0] : this.guidePos[3]);
                break;
            case 1:
                this.bornPos.push(this.guidePos[this.random(0, 2)]);
                break;
        }
        //  cc.log("BornPosLength" + this.bornPos.length);
    };
    ///获取创建的位置信息
    NoticeAndProduceManager.prototype.CreatBornPos = function (num) {
        this.bornPos.splice(0, this.bornPos.length);
        var randomPos = [];
        for (var i = 0; i < this.guidePos.length; i++) {
            randomPos.push(i);
        }
        for (var j = 0; j < num; j++) {
            var randomValue = this.random(0, randomPos.length);
            var posIndex = randomPos[randomValue];
            this.bornPos.push(this.guidePos[posIndex]);
            randomPos.slice(randomValue, 1);
        }
    };
    ///获取出场顺序
    NoticeAndProduceManager.prototype.CreatBornTypeOrde = function () {
        this.bornType.slice(0, this.bornType.length);
        for (var i = 0; i < this.bornPos.length; i++) {
            this.bornType.push(this.random(-1, 1));
        }
        var ballOrder = this.random(0, this.bornType.length);
        this.bornType[ballOrder] = 0;
    };
    NoticeAndProduceManager.prototype.ProduceOneBallGuide = function (posNode) {
        var bornNode = posNode;
        var tempball = cc.instantiate(this.ballGuide);
        this.node.addChild(tempball);
        tempball.setPosition(bornNode.position);
        return tempball;
    };
    NoticeAndProduceManager.prototype.ProduceOneBoomGuide = function () {
        var bornNode = this.guidePos[this.random(0, this.guidePos.length)];
        var tempball = cc.instantiate(this.ballGuide);
        this.node.addChild(tempball);
        tempball.setPosition(bornNode.position);
        return tempball;
    };
    //创建一次用例
    NoticeAndProduceManager.prototype.ProduceOneCase = function (num) {
        var _this = this;
        // this.CreatBornPos(num);
        // this.CreatBornTypeOrde();
        var posType = this.produceBasketManager.GetPosType();
        this.CreatBornPosByType(posType);
        for (var i = 0; i < this.bornPos.length; i++) {
            var tempball = this.ProduceOneBallGuide(this.bornPos[i]);
            this.scheduleOnce(function () {
                // 这里的 this 指向 component
                _this.ProduceBallAction(tempball);
            }, 0.5); //2s后执行一次
        }
        //  this.ProduceOneBall(this.bornPos[0],cc.v2(0,2000));
    };
    NoticeAndProduceManager.prototype.ProduceBallAction = function (guidBall) {
        // cc.log("Destory");
        this.ProduceOneBall(guidBall, cc.v2(0, 2000));
        guidBall.destroy();
    };
    //创建一个球的
    NoticeAndProduceManager.prototype.ProduceOneBall = function (posNode, velocity) {
        var startPos = posNode.convertToWorldSpaceAR(cc.v2(0, 0));
        var tempball = cc.instantiate(this.ball);
        tempball.parent = this.ballParent;
        tempball.position = this.ballParent.convertToNodeSpaceAR(startPos);
        tempball.getComponent(cc.RigidBody).linearVelocity = velocity;
    };
    NoticeAndProduceManager.prototype.random = function (lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    };
    __decorate([
        property(cc.Node)
    ], NoticeAndProduceManager.prototype, "ballParent", void 0);
    __decorate([
        property(cc.Prefab)
    ], NoticeAndProduceManager.prototype, "ballGuide", void 0);
    __decorate([
        property(cc.Prefab)
    ], NoticeAndProduceManager.prototype, "boomGuide", void 0);
    __decorate([
        property(cc.Prefab)
    ], NoticeAndProduceManager.prototype, "ball", void 0);
    __decorate([
        property(cc.Prefab)
    ], NoticeAndProduceManager.prototype, "boom", void 0);
    __decorate([
        property(cc.Node)
    ], NoticeAndProduceManager.prototype, "guidePos", void 0);
    __decorate([
        property(ProduceBasketManager_1.default)
    ], NoticeAndProduceManager.prototype, "produceBasketManager", void 0);
    NoticeAndProduceManager = __decorate([
        ccclass
    ], NoticeAndProduceManager);
    return NoticeAndProduceManager;
}(Singleton_1.default));
exports.default = NoticeAndProduceManager;

cc._RF.pop();