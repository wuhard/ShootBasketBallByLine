(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameViewLogic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0d903qyIspNXLG1hd+Dlfn0', 'GameViewLogic', __filename);
// Script/GameViewLogic.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ProduceBasketManager_1 = require("./ProduceBasketManager");
var NoticeAndProduceManager_1 = require("./NoticeAndProduceManager");
var EffectPlayManager_1 = require("./EffectPlayManager");
var LevelDataManager_1 = require("./LevelDataManager");
var ShowOrHideObj_1 = require("./ShowOrHideObj");
var EnterScenePanel_1 = require("./EnterScenePanel");
var physicsNodeLogic_1 = require("./physicsNodeLogic");
var MenuPanel_1 = require("./MenuPanel");
var AudioPlayManager_1 = require("./AudioPlayManager");
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
        //当前关卡
        _this.currentLevelIndex = 0;
        //最大关卡
        _this.maxLevelCount = 0;
        ///线的数量
        _this.drawLineCount = 3;
        _this.ballCount = 0;
        _this.drawEnable = false;
        _this.isFinishCurrentLevel = false;
        _this.canDrawPraticle = false;
        _this.score = 0;
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
        // this.schedule(function() {
        //     // 这里的 this 指向 component
        //     this.ProduceOneBasket(cc.v2(600,500));
        // }, 5); //5s执行一次
    };
    GameViewLogic.prototype.start = function () {
        this.ShowMenuPanel();
    };
    GameViewLogic.prototype.BackToMainPage = function () {
    };
    GameViewLogic.prototype.StartGame = function () {
        this.uiPanel.ShowOnlyObjByIndex(1);
        this.StartDrawLine();
        this.drawEnable = true;
        this.ProduceOneBasketCase(0, 1);
    };
    GameViewLogic.prototype.StartDrawLine = function () {
        this.physicsNodeArr.splice(0, this.physicsNodeArr.length);
        var physicsNode = cc.instantiate(this.physicsNode);
        this.node.addChild(physicsNode);
        physicsNode.name = "first";
        this.physicsNodeArr.push(physicsNode);
    };
    GameViewLogic.prototype.ShowMenuPanel = function () {
        this.uiPanel.ShowOnlyObjByIndex(0);
        this.menuPanel.ShowLevelInfor(this.currentLevelIndex, this.score, this.maxLevelCount);
    };
    GameViewLogic.prototype.onEnter = function () {
    };
    GameViewLogic.prototype.touchStart = function (event) {
        if (this.drawEnable == false) {
            return;
        }
        cc.log(this.drawLineCount);
        if (this.drawLineCount - 1 >= 0) {
            if (this.drawLineCount - 1 > 0) {
                var physicsNode = cc.instantiate(this.physicsNode);
                this.node.addChild(physicsNode);
                physicsNode.name = this.physicsNodeArr.length.toString();
                this.physicsNodeArr.push(physicsNode);
                this.drawLineParticle = cc.instantiate(this.drawLineParticlePrefab);
                this.node.addChild(this.drawLineParticle);
                var touchLoc = event.getLocation();
                touchLoc = this.node.convertToNodeSpaceAR(touchLoc);
                this.drawLineParticle.setPosition(touchLoc);
                this.canDrawPraticle = true;
            }
            this.drawLineCount--;
            this.enterScenePanel.ShowLineCount("x " + this.drawLineCount.toString());
            if (this.drawLineCount == 0) {
                cc.log("CheckBallCanEnterBasket");
                this.drawEnable = false;
                this.schedule(this.CheckEnterBasket, 0.2, 100, 2); //2s后执行一次
            }
        }
    };
    GameViewLogic.prototype.CheckEnterBasket = function () {
        if (!this.CheckBallCanEnterBasket()) {
            this.unschedule(this.CheckEnterBasket);
            this.ShowFaithAction();
        }
    };
    //显示失败的动作
    GameViewLogic.prototype.ShowFaithAction = function () {
        var _this = this;
        this.audioPlayManager.PlayEffect("球落空");
        this.RemaveAllLine();
        this.produceBasketManager.RemoveAllBaskets();
        this.noticeAndProduceManager.DestroyAllBall();
        this.scheduleOnce(function () {
            _this.ShowLosePanel(true);
        }, 2); //2s后执行一次
    };
    //检测球是否能进篮筐
    GameViewLogic.prototype.CheckBallCanEnterBasket = function () {
        if (this.noticeAndProduceManager.CheckAllBallCanEnter()) {
            return true;
        }
        return false;
    };
    GameViewLogic.prototype.touchMove = function (event) {
        if (this.canDrawPraticle == false) {
            return;
        }
        var touchLoc = event.getLocation();
        touchLoc = this.node.convertToNodeSpaceAR(touchLoc);
        this.drawLineParticle.setPosition(touchLoc);
    };
    GameViewLogic.prototype.touchEnd = function (event) {
        if (this.drawEnable == false) {
            return;
        }
        this.canDrawPraticle = false;
        this.drawLineParticle.destroy();
    };
    GameViewLogic.prototype.touchCancel = function (event) {
        if (this.drawEnable == false) {
            return;
        }
        this.drawLineParticle.destroy();
        this.canDrawPraticle = false;
    };
    //创建下一关的数据
    GameViewLogic.prototype.ProduceNextLevelBasketCase = function (delayTime) {
        if (delayTime === void 0) { delayTime = 0; }
        if (this.currentLevelIndex + 1 < this.maxLevelCount) {
            this.currentLevelIndex++;
        }
        this.ProduceOneBasketCase(this.currentLevelIndex, delayTime);
    };
    ///进了一个球
    GameViewLogic.prototype.EnterOneBall = function (ball, basketBottom) {
        var _this = this;
        this.PlayEnterBallEffect(basketBottom.convertToWorldSpaceAR(cc.v2(0, 0)));
        this.audioPlayManager.PlayEffect("得分.mp3", false);
        this.ballCount--;
        if (this.ballCount == 0) {
            this.RemoveBasketNode(basketBottom.parent);
            this.RemaveAllLine();
            this.scheduleOnce(function () {
                _this.ShowWinPanel();
            }, 2); //2s后执行一次
            // this.ProduceNextLevelBasketCase(2);
        }
    };
    GameViewLogic.prototype.ProduceNextBaksetCase = function () {
        this.StartDrawLine();
        this.drawLineCount = 3;
        this.drawEnable = true;
        this.uiPanel.ShowOnlyObjByIndex(1);
        this.ProduceNextLevelBasketCase(2);
    };
    ///创建一个篮球用例
    GameViewLogic.prototype.ProduceOneBasketCase = function (levelIndex, delayTime) {
        var _this = this;
        if (delayTime === void 0) { delayTime = 0; }
        this.audioPlayManager.PlayEffect("开场准备");
        this.drawLineCount = 3;
        this.enterScenePanel.ShowLineCount("x " + this.drawLineCount.toString());
        //  cc.log("one basket");
        this.currentLevelIndex = levelIndex;
        this.scheduleOnce(function () {
            var basketInfor = _this.levelDataManager.GetBasketInforsByLevel(levelIndex);
            _this.produceBasketManager.ProduceOneBasketCase(basketInfor);
            _this.maxLevelCount = _this.levelDataManager.GetLevelLength();
        }, delayTime); //2s后执行一次
        this.scheduleOnce(function () {
            _this.ProduceOneShootCase(levelIndex);
            _this.ballCount = _this.noticeAndProduceManager.basketBallNum;
        }, delayTime + 1); //2s后执行一次
    };
    ///创建一个球和炸弹的射击案例
    GameViewLogic.prototype.ProduceOneShootCase = function (levelIndex) {
        var shootInfors = this.levelDataManager.GetShootInforByLevel(levelIndex);
        this.noticeAndProduceManager.ProduceOneShootCase(shootInfors);
    };
    ///播放进球特效
    GameViewLogic.prototype.PlayEnterBallEffect = function (pos) {
        this.effectPlayManager.PlayEnterBallAni(pos);
        this.effectPlayManager.PlayScoreAni(pos, this.drawLineCount);
        this.score += this.drawLineCount + 1;
        this.enterScenePanel.ShowScore(this.score);
    };
    //创建一个篮筐
    GameViewLogic.prototype.ProduceBoomBasket = function (pos) {
        this.audioPlayManager.PlayEffect("bomb");
        this.effectPlayManager.PlayBombBasketAni(pos);
    };
    GameViewLogic.prototype.MoveToPos = function (colliderNode, pos) {
        this.scheduleOnce(function () {
            colliderNode.position = pos;
        }, 0);
    };
    GameViewLogic.prototype.RemaveAllLine = function () {
        var children = this.node.children;
        var lineLenght = this.physicsNodeArr.length;
        for (var j = 0; j < lineLenght; j++) {
            if (this.physicsNodeArr[j] != null) {
                var lineDiePoints = this.physicsNodeArr[j].getComponent(physicsNodeLogic_1.default).points;
                this.effectPlayManager.PlayLineDieEffection(lineDiePoints);
            }
        }
        for (var i = 0; i < children.length; i++) {
            children[i].destroy();
        }
        var arrLenght = this.physicsNodeArr.length;
        cc.log(arrLenght);
        this.physicsNodeArr.splice(0, arrLenght);
    };
    //删除节点
    GameViewLogic.prototype.RemoveBasketNode = function (nodeObj) {
        this.produceBasketManager.RemoveOneBasket(nodeObj);
    };
    ///失败
    GameViewLogic.prototype.ShowLosePanel = function (flag) {
        this.unscheduleAllCallbacks();
        this.uiPanel.ShowOnlyObjByIndex(3);
        this.produceBasketManager.RemoveAllBaskets();
        this.noticeAndProduceManager.StopProduceAction();
        this.audioPlayManager.PlayEffect("失败界面");
    };
    GameViewLogic.prototype.ShowWinPanel = function () {
        this.unscheduleAllCallbacks();
        this.uiPanel.ShowOnlyObjByIndex(2);
        this.produceBasketManager.RemoveAllBaskets();
        this.noticeAndProduceManager.DestroyAllBall();
        this.audioPlayManager.PlayEffect("胜利界面");
    };
    GameViewLogic.prototype.GotoMainPageFromWinPanel = function () {
        if (this.currentLevelIndex + 1 < this.maxLevelCount) {
            this.currentLevelIndex++;
        }
        this.ShowMenuPanel();
    };
    GameViewLogic.prototype.GotoMainPageFromLosePanel = function () {
        this.ShowMenuPanel();
    };
    GameViewLogic.prototype.ReplayGame = function () {
        this.score = 0;
        this.StartDrawLine();
        this.drawLineCount = 3;
        this.drawEnable = true;
        this.uiPanel.ShowOnlyObjByIndex(1);
        this.enterScenePanel.ShowScore(this.score);
        this.ProduceOneBasketCase(this.currentLevelIndex);
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
    ], GameViewLogic.prototype, "drawLineParticlePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameViewLogic.prototype, "boomBasket", void 0);
    __decorate([
        property(EnterScenePanel_1.default)
    ], GameViewLogic.prototype, "enterScenePanel", void 0);
    __decorate([
        property(MenuPanel_1.default)
    ], GameViewLogic.prototype, "menuPanel", void 0);
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
        property(AudioPlayManager_1.default)
    ], GameViewLogic.prototype, "audioPlayManager", void 0);
    __decorate([
        property(ShowOrHideObj_1.default)
    ], GameViewLogic.prototype, "uiPanel", void 0);
    __decorate([
        property(cc.Label)
    ], GameViewLogic.prototype, "lineCount", void 0);
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
        