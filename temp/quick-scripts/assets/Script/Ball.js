(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ball.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '38ce1r8aQNPMa1OpEexraNR', 'Ball', __filename);
// Script/Ball.ts

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
var Ball = /** @class */ (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Ball.prototype.start = function () {
        this.body = this.getComponent(cc.RigidBody);
    };
    Ball.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        if (otherCollider.body.node.name == 'ground') {
            this.gameViewLogic = cc.find("Canvas/Logic").getComponent(GameViewLogic_1.default);
            this.gameViewLogic.RemaveAllLine();
            this.node.destroy();
            this.gameViewLogic.ShowLosePanel(true);
        }
        else if (otherCollider.body.node.name == 'BasketBottom') {
            // cc.log("get one score");
            this.gameViewLogic = cc.find("Canvas/Logic").getComponent(GameViewLogic_1.default);
            this.gameViewLogic.EnterOneBall(this.node, otherCollider.body.node);
            //  this.gameViewLogic.RemoveBasketNode(otherCollider.body.node.parent);
            //  this.gameViewLogic.RemaveAllLine();
            //  this.gameViewLogic.PlayEnterBallEffect(otherCollider.body.node.convertToWorldSpaceAR(cc.v2(0, 0)));
            //  let basketWorld = otherCollider.body.node.parent.convertToWorldSpaceAR(cc.v2(0, 0));
            //  let basketLocalPos =  otherCollider.body.node.parent.parent.convertToNodeSpaceAR(basketWorld);
            //this.gameViewLogic.ProduceBoomBasket(basketLocalPos);
            //  this.ProduceNextBasket();
            this.node.destroy();
        }
    };
    Ball.prototype.ProduceNextBasket = function () {
        // cc.log("ProduceNextBasket");
        this.gameViewLogic.ProduceNextLevelBasketCase(2);
        //
    };
    Ball = __decorate([
        ccclass
    ], Ball);
    return Ball;
}(cc.Component));
exports.default = Ball;

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
        //# sourceMappingURL=Ball.js.map
        