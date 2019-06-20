(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/BoomBasket.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8906daf1UtCLaimxfA/5VNT', 'BoomBasket', __filename);
// Script/BoomBasket.ts

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
var BoomBasket = /** @class */ (function (_super) {
    __extends(BoomBasket, _super);
    function BoomBasket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoomBasket.prototype.onLoad = function () {
    };
    BoomBasket.prototype.start = function () {
        this.boom();
        this.scheduleOnce(function () {
            // 这里的 this 指向 component
            this.destroyBoom();
        }, 1); //2s后执行一次
    };
    BoomBasket.prototype.MoveToPos = function (colliderNode, pos) {
        this.scheduleOnce(function () {
            colliderNode.position = pos;
        }, 0);
    };
    BoomBasket.prototype.onEnter = function () {
    };
    BoomBasket.prototype.touchStart = function (event) {
        this.boom();
    };
    BoomBasket.prototype.random = function (lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    };
    BoomBasket.prototype.boom = function () {
        var force0 = new cc.Vec2(this.random(-1100, -500), this.random(-100, 0));
        var force1 = new cc.Vec2(this.random(20, 100), this.random(0, 500));
        var force2 = new cc.Vec2(this.random(300, 800), this.random(0, 500));
        var force3 = new cc.Vec2(this.random(0, 100), this.random(200, 800));
        this.boom0.getComponent(cc.RigidBody).applyLinearImpulse(force0, this.boom0.getComponent(cc.RigidBody).getWorldCenter(), true);
        this.boom1.getComponent(cc.RigidBody).applyLinearImpulse(force1, this.boom1.getComponent(cc.RigidBody).getWorldCenter(), true);
        this.boom2.getComponent(cc.RigidBody).applyLinearImpulse(force2, this.boom2.getComponent(cc.RigidBody).getWorldCenter(), true);
        this.boom3.getComponent(cc.RigidBody).applyLinearImpulse(force3, this.boom3.getComponent(cc.RigidBody).getWorldCenter(), true);
    };
    BoomBasket.prototype.destroyBoom = function () {
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], BoomBasket.prototype, "boom0", void 0);
    __decorate([
        property(cc.Node)
    ], BoomBasket.prototype, "boom1", void 0);
    __decorate([
        property(cc.Node)
    ], BoomBasket.prototype, "boom2", void 0);
    __decorate([
        property(cc.Node)
    ], BoomBasket.prototype, "boom3", void 0);
    BoomBasket = __decorate([
        ccclass
    ], BoomBasket);
    return BoomBasket;
}(cc.Component));
exports.default = BoomBasket;

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
        //# sourceMappingURL=BoomBasket.js.map
        