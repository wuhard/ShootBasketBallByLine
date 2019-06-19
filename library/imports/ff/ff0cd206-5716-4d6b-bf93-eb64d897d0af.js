"use strict";
cc._RF.push(module, 'ff0cdIGVxZNa7+T62TYl9Cv', 'Basket');
// Script/Basket.ts

Object.defineProperty(exports, "__esModule", { value: true });
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
var Basket = /** @class */ (function (_super) {
    __extends(Basket, _super);
    function Basket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Basket.prototype.onLoad = function () {
    };
    Basket.prototype.start = function () {
        var offsetR = this.colliderR.position;
        var offsetL = this.colliderL.position;
        var offsetB = this.colliderB.position;
        this.MoveToPos(this.colliderR, offsetR);
        this.MoveToPos(this.colliderL, offsetL);
        this.MoveToPos(this.colliderB, offsetB);
    };
    Basket.prototype.MoveToPos = function (colliderNode, pos) {
        this.scheduleOnce(function () {
            colliderNode.position = pos;
        }, 0);
    };
    Basket.prototype.onEnter = function () {
    };
    Basket.prototype.RemoveBasket = function () {
        this.backSprit.destroy();
        this.frontSprit.destroy();
        this.colliderB.destroy();
        this.colliderL.destroy();
        this.colliderR.destroy();
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], Basket.prototype, "backSprit", void 0);
    __decorate([
        property(cc.Node)
    ], Basket.prototype, "frontSprit", void 0);
    __decorate([
        property(cc.Node)
    ], Basket.prototype, "colliderR", void 0);
    __decorate([
        property(cc.Node)
    ], Basket.prototype, "colliderL", void 0);
    __decorate([
        property(cc.Node)
    ], Basket.prototype, "colliderB", void 0);
    Basket = __decorate([
        ccclass
    ], Basket);
    return Basket;
}(cc.Component));
exports.default = Basket;

cc._RF.pop();