(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/NoticeAndProduceManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd106cft03VDUZHeymdNro4g', 'NoticeAndProduceManager', __filename);
// Script/NoticeAndProduceManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Singleton_1 = require("./Singleton");
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
var NoticeAndProduceManager = /** @class */ (function (_super) {
    __extends(NoticeAndProduceManager, _super);
    function NoticeAndProduceManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guidePos = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NoticeAndProduceManager.prototype.start = function () {
    };
    NoticeAndProduceManager.prototype.ProduceOneBallGuide = function () {
        // var bornPosX = this.random(this.minPosX,this.maxPosX);
        // var bornPos = new cc.Vec2(bornPosX,this.posY);
        // let tempball = cc.instantiate(this.ballGuide);
        // this.node.addChild(tempball);
        // tempball.setPosition(this.node.convertToNodeSpaceAR(bornPos));
        // return tempball;
    };
    NoticeAndProduceManager.prototype.ProduceOneBoomGuide = function () {
        // var bornPosX = this.random(this.minPosX,this.maxPosX);
        // var bornPos = new cc.Vec2(bornPosX,this.posY);
        // let tempboomGuide = cc.instantiate(this.boomGuide);
        // this.node.addChild(tempboomGuide);
        // tempboomGuide.setPosition(this.node.convertToNodeSpaceAR(bornPos));
        // return tempboomGuide;
    };
    NoticeAndProduceManager.prototype.random = function (lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    };
    __decorate([
        property(cc.Prefab)
    ], NoticeAndProduceManager.prototype, "ballGuide", void 0);
    __decorate([
        property(cc.Prefab)
    ], NoticeAndProduceManager.prototype, "boomGuide", void 0);
    __decorate([
        property(cc.Prefab)
    ], NoticeAndProduceManager.prototype, "ball", void 0);
    __decorate([
        property(cc.Prefab)
    ], NoticeAndProduceManager.prototype, "boom", void 0);
    __decorate([
        property(cc.Node)
    ], NoticeAndProduceManager.prototype, "guidePos", void 0);
    NoticeAndProduceManager = __decorate([
        ccclass
    ], NoticeAndProduceManager);
    return NoticeAndProduceManager;
}(Singleton_1.default));
exports.default = NoticeAndProduceManager;

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
        //# sourceMappingURL=NoticeAndProduceManager.js.map
        