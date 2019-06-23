"use strict";
cc._RF.push(module, '4fd83X8JDZF/aybYElsDs2S', 'ScoreEffect');
// Script/ScoreEffect.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ScoreEffect = /** @class */ (function (_super) {
    __extends(ScoreEffect, _super);
    function ScoreEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScoreEffect.prototype.start = function () {
        this.scheduleOnce(function () {
            // 这里的 this 指向 component
            this.DestroySelf();
        }, 2); //2s后执行一次
    };
    ScoreEffect.prototype.DestroySelf = function () {
        this.node.destroy();
    };
    ScoreEffect = __decorate([
        ccclass
    ], ScoreEffect);
    return ScoreEffect;
}(cc.Component));
exports.default = ScoreEffect;

cc._RF.pop();