(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/EnterBallAni.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f76beDaCkZC0Y2mX2sqtKVb', 'EnterBallAni', __filename);
// Script/EnterBallAni.ts

// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var talefun = cc.talefun;
var EnterBallAni = /** @class */ (function (_super) {
    __extends(EnterBallAni, _super);
    function EnterBallAni() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.yellowPoint = [];
        _this.endPoint = [];
        return _this;
    }
    EnterBallAni.prototype.onLoad = function () {
        for (var i = 0; i < this.yellowPoint.length; i++) {
            var moveAction = cc.moveTo(0.5, this.endPoint[i].position);
            var scaleAction = cc.scaleTo(0.5, 1, 1);
            this.yellowPoint[i].runAction(moveAction);
            this.yellowPoint[i].runAction(scaleAction);
        }
    };
    EnterBallAni.prototype.onEnter = function () {
    };
    EnterBallAni.prototype.touchStart = function (event) {
    };
    __decorate([
        property(cc.Node)
    ], EnterBallAni.prototype, "yellowPoint", void 0);
    __decorate([
        property(cc.Node)
    ], EnterBallAni.prototype, "endPoint", void 0);
    EnterBallAni = __decorate([
        ccclass
    ], EnterBallAni);
    return EnterBallAni;
}(cc.Component));
exports.default = EnterBallAni;

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
        //# sourceMappingURL=EnterBallAni.js.map
        