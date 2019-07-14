(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameViewLogic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0d903qyIspNXLG1hd+Dlfn0', 'GameViewLogic', __filename);
// Script/GameViewLogic.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ProduceBasketManager_1 = require("./ProduceBasketManager");
var NoticeAndProduceManager_1 = require("./NoticeAndProduceManager");
var EffectPlayManager_1 = require("./EffectPlayManager");
var LevelDataManager_1 = require("./LevelDataManager");
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
        _this.currentLevelIndex = 0;
        _this.maxLevelCount = 0;
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
        this.ProduceOneBasketCase(4, 1);
    };
    GameViewLogic.prototype.onEnter = function () {
    };
    GameViewLogic.prototype.touchStart = function (event) {
        // cc.log("drawLine");
        var physicsNode = cc.instantiate(this.physicsNode);
        this.node.addChild(physicsNode);
        this.physicsNodeArr.push(physicsNode);
    };
    GameViewLogic.prototype.touchMove = function (event) {
    };
    GameViewLogic.prototype.touchEnd = function (event) {
    };
    GameViewLogic.prototype.touchCancel = function (event) {
    };
    GameViewLogic.prototype.ProduceNextLevelBasketCase = function (delayTime) {
        if (delayTime === void 0) { delayTime = 0; }
        if (this.currentLevelIndex + 1 < this.maxLevelCount) {
            this.currentLevelIndex++;
        }
        this.ProduceOneBasketCase(this.currentLevelIndex, delayTime);
    };
    ///创建一个篮球用例
    GameViewLogic.prototype.ProduceOneBasketCase = function (levelIndex, delayTime) {
        var _this = this;
        if (delayTime === void 0) { delayTime = 0; }
        //  cc.log("one basket");
        this.currentLevelIndex = levelIndex;
        this.scheduleOnce(function () {
            var basketBornPos = _this.levelDataManager.GetBasketPos(levelIndex);
            _this.produceBasketManager.ProduceOneBasketByPos(basketBornPos);
            _this.maxLevelCount = _this.levelDataManager.GetLevelLength();
        }, delayTime); //2s后执行一次
        this.scheduleOnce(function () {
            _this.ProduceOneShootCase(levelIndex);
        }, delayTime + 1); //2s后执行一次
    };
    ///创建一个球和炸弹的射击案例
    GameViewLogic.prototype.ProduceOneShootCase = function (levelIndex) {
        var guidePos = this.levelDataManager.GetBallAndBombPos(levelIndex);
        var shootSeq = this.levelDataManager.GetBallAndBombShootSeq(levelIndex);
        var shootAngel = this.levelDataManager.GetBallAndBombShootAngle(levelIndex);
        this.noticeAndProduceManager.ProduceOneBallAndBombCase(guidePos, shootSeq, shootAngel);
    };
    GameViewLogic.prototype.PlayEnterBallEffect = function (pos) {
        this.effectPlayManager.PlayEnterBallAni(pos);
        this.effectPlayManager.PlayScoreAni(pos);
    };
    //创建一个篮筐
    GameViewLogic.prototype.ProduceBoomBasket = function (pos) {
        this.effectPlayManager.PlayBombBasketAni(pos);
        //   //  var startPos =  this.node.convertToNodeSpaceAR(pos);
        //     let tempbasket= cc.instantiate(this.boomBasket);
        //     tempbasket.setPosition(pos);
        //   //  this.basketParent.addChild(tempbasket);
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
        this.produceBasketManager.RemoveOneBasket(nodeObj);
    };
    GameViewLogic.prototype.ShowLosePanel = function (flag) {
        this.losePanel.active = flag;
        this.produceBasketManager.RemoveAllBaskets();
        this.RemaveAllLine();
    };
    GameViewLogic.prototype.ReplayGame = function () {
        this.ShowLosePanel(false);
        this.ProduceOneBasketCase(0);
        this.RemaveAllLine();
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
    ], GameViewLogic.prototype, "boomBasket", void 0);
    __decorate([
        property(ProduceBasketManager_1.default)
    ], GameViewLogic.prototype, "produceBasketManager", void 0);
    __decorate([
        property(NoticeAndProduceManager_1.default)
    ], GameViewLogic.prototype, "noticeAndProduceManager", void 0);
    __decorate([
        property(EffectPlayManager_1.default)
    ], GameViewLogic.prototype, "effectPlayManager", void 0);
    __decorate([
        property(LevelDataManager_1.default)
    ], GameViewLogic.prototype, "levelDataManager", void 0);
    __decorate([
        property(cc.Node)
    ], GameViewLogic.prototype, "losePanel", void 0);
    GameViewLogic = __decorate([
        ccclass
    ], GameViewLogic);
    return GameViewLogic;
}(cc.Component));
exports.default = GameViewLogic;

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
        //# sourceMappingURL=GameViewLogic.js.map
        