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
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.colliders = [];
        _this.offsets = [];
        return _this;
    }
    Basket.prototype.onLoad = function () {
        for (var i = 0; i < this.colliders.length; i++) {
            this.offsets.push(this.colliders[i].position);
        }
    };
    Basket.prototype.start = function () {
    };
    Basket.prototype.MoveToPos = function (colliderNode, pos) {
        this.scheduleOnce(function () {
            colliderNode.position = pos;
        }, 0.01);
    };
    Basket.prototype.onEnter = function () {
    };
    Basket.prototype.AdjustColliders = function () {
        for (var i = 0; i < this.colliders.length; i++) {
            this.MoveToPos(this.colliders[i], this.offsets[i]);
        }
    };
    Basket.prototype.RemoveBasket = function () {
        this.backSprit.destroy();
        this.frontSprit.destroy();
        for (var i = 0; i < this.colliders.length; i++) {
            this.colliders[i].destroy();
        }
        this.node.destroy();
    };
    Basket.prototype.AdJustSprites = function () {
    };
    __decorate([
        property(cc.Node)
    ], Basket.prototype, "backSprit", void 0);
    __decorate([
        property(cc.Node)
    ], Basket.prototype, "frontSprit", void 0);
    __decorate([
        property(cc.Node)
    ], Basket.prototype, "colliders", void 0);
    Basket = __decorate([
        ccclass
    ], Basket);
    return Basket;
}(cc.Component));
exports.default = Basket;

cc._RF.pop();