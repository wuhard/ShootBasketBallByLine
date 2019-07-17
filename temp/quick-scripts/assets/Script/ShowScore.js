(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ShowScore.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7fe547Y+9RP9ruEgvNXD8GW', 'ShowScore', __filename);
// Script/ShowScore.ts

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
var ShowScore = /** @class */ (function (_super) {
    __extends(ShowScore, _super);
    function ShowScore() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.score = [];
        return _this;
    }
    ShowScore.prototype.start = function () {
    };
    ShowScore.prototype.ShowScorePoint = function (scoreNum) {
        for (var i = 0; i < this.score.length; i++) {
            this.score[i].active = false;
        }
        this.score[scoreNum].active = true;
    };
    __decorate([
        property(cc.Node)
    ], ShowScore.prototype, "score", void 0);
    ShowScore = __decorate([
        ccclass
    ], ShowScore);
    return ShowScore;
}(cc.Component));
exports.default = ShowScore;

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
        //# sourceMappingURL=ShowScore.js.map
        