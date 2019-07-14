(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Bomb.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8ff74LIlHpL0YBNSlrG0zP5', 'Bomb', __filename);
// Script/Bomb.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GameViewLogic_1 = require("./GameViewLogic");
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
var Bomb = /** @class */ (function (_super) {
    __extends(Bomb, _super);
    function Bomb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Bomb.prototype.start = function () {
        this.body = this.getComponent(cc.RigidBody);
    };
    Bomb.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        if (otherCollider.body.node.name == 'ground') {
            this.gameViewLogic = cc.find("Canvas/Logic").getComponent(GameViewLogic_1.default);
            this.node.destroy();
        }
        else if (otherCollider.body.node.name == 'BasketBottom') {
            // cc.log("get one score");
            this.gameViewLogic = cc.find("Canvas/Logic").getComponent(GameViewLogic_1.default);
            this.gameViewLogic.RemoveBasketNode(otherCollider.body.node.parent);
            this.gameViewLogic.RemaveAllLine();
            // this.gameViewLogic.ShowLosePanel(true);
            var basketWorld = otherCollider.body.node.parent.convertToWorldSpaceAR(cc.v2(0, 0));
            var basketLocalPos = otherCollider.body.node.parent.parent.convertToNodeSpaceAR(basketWorld);
            this.gameViewLogic.ProduceBoomBasket(basketLocalPos);
            this.node.destroy();
        }
    };
    Bomb.prototype.ProduceNextBasket = function () {
        // cc.log("ProduceNextBasket");
        this.gameViewLogic.ProduceNextLevelBasketCase(2);
        //
    };
    Bomb = __decorate([
        ccclass
    ], Bomb);
    return Bomb;
}(cc.Component));
exports.default = Bomb;

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
        //# sourceMappingURL=Bomb.js.map
        