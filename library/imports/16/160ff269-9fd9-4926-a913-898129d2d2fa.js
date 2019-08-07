"use strict";
cc._RF.push(module, '160ffJpn9lJJqkTiYEp0tL6', 'EffectPlayManager');
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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // LIFE-CYCLE CALLBACKS:
        //线的间隔
        _this.linePointDieDis = 25;
        _this.linePartices = [];
        return _this;
    }
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
    ///获取线的长度
    EffectPlayManager.prototype.GetLineDis = function (points) {
        this.lineDis = 0;
        for (var i = 0; i < points.length - 1; i++) {
            this.lineDis += cc.pDistance(points[i], points[i + 1]);
        }
        return this.lineDis;
    };
    EffectPlayManager.prototype.PlayLineDieEffection = function (points) {
        this.linePartices.splice(0, this.linePartices.length);
        if (points.length <= 0) {
            return;
        }
        var diePointNum = this.GetLineDis(points) / this.linePointDieDis + 1;
        //  cc.log(points.length + "  " + diePointNum);
        if (points.length > diePointNum) {
            for (var i = 0; i < diePointNum; i++) {
                var lineDie = cc.instantiate(this.lineDieParticlePrefab);
                lineDie.parent = this.node;
                this.linePartices.push(lineDie);
                if (points.length / diePointNum * i < points.length) {
                    lineDie.setPosition(points[Math.floor(points.length / diePointNum * i)]);
                }
            }
        }
        else {
            for (var i = 0; i < points.length - 1; i++) {
                var pointNum = cc.pDistance(points[i], points[i + 1]) / this.linePointDieDis;
                // cc.log(cc.pDistance(points[i],points[i+1])+ "  " + pointNum);
                var lineDie_1 = cc.instantiate(this.lineDieParticlePrefab);
                lineDie_1.parent = this.node;
                this.linePartices.push(lineDie_1);
                lineDie_1.setPosition(points[i]);
                for (var j = 1; j < pointNum; j++) {
                    cc.log("add");
                    var lineDie_2 = cc.instantiate(this.lineDieParticlePrefab);
                    lineDie_2.parent = this.node;
                    this.linePartices.push(lineDie_2);
                    var x = (j + 1) / pointNum * points[i + 1].x + (pointNum - j - 1) / pointNum * points[i].x;
                    var y = (j + 1) / pointNum * points[i + 1].y + (pointNum - j - 1) / pointNum * points[i].y;
                    var pos = cc.v2(x, y);
                    lineDie_2.setPosition(pos);
                }
            }
            var lineDie = cc.instantiate(this.lineDieParticlePrefab);
            lineDie.parent = this.node;
            this.linePartices.push(lineDie);
            lineDie.setPosition(points[points.length - 1]);
        }
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
    __decorate([
        property(cc.Prefab)
    ], EffectPlayManager.prototype, "lineDieParticlePrefab", void 0);
    EffectPlayManager = __decorate([
        ccclass
    ], EffectPlayManager);
    return EffectPlayManager;
}(Singleton_1.default));
exports.default = EffectPlayManager;

cc._RF.pop();