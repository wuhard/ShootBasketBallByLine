(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/EffectPlayManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '160ffJpn9lJJqkTiYEp0tL6', 'EffectPlayManager', __filename);
// Script/EffectPlayManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Singleton_1 = require("./Singleton");
var ShowScore_1 = require("./ShowScore");
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
var EffectPlayManager = /** @class */ (function (_super) {
    __extends(EffectPlayManager, _super);
    function EffectPlayManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    EffectPlayManager.prototype.start = function () {
    };
    EffectPlayManager.prototype.PlayEnterBallAni = function (pos) {
        var ani = cc.instantiate(this.enterBallAni);
        // cc.log("PlayAni");
        ani.parent = this.node;
        ani.setPosition(pos);
    };
    ///得分动画
    EffectPlayManager.prototype.PlayScoreAni = function (pos, lineCount) {
        var score = cc.instantiate(this.score);
        var script = score.getComponent(ShowScore_1.default);
        script.ShowScorePoint(lineCount);
        // cc.log("PlayAni");
        score.parent = this.node;
        score.setPosition(pos);
    };
    EffectPlayManager.prototype.PlayBombBasketAni = function (pos) {
        var bombBasket = cc.instantiate(this.bombBasket);
        // cc.log("PlayAni");
        bombBasket.parent = this.node;
        bombBasket.setPosition(pos);
    };
    __decorate([
        property(cc.Prefab)
    ], EffectPlayManager.prototype, "enterBallAni", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffectPlayManager.prototype, "score", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffectPlayManager.prototype, "bombBasket", void 0);
    EffectPlayManager = __decorate([
        ccclass
    ], EffectPlayManager);
    return EffectPlayManager;
}(Singleton_1.default));
exports.default = EffectPlayManager;

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
        //# sourceMappingURL=EffectPlayManager.js.map
        