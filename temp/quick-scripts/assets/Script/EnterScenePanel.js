(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/EnterScenePanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b7a164JxBpHxKlif7DZgC5D', 'EnterScenePanel', __filename);
// Script/EnterScenePanel.ts

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
var EnterScenePanel = /** @class */ (function (_super) {
    __extends(EnterScenePanel, _super);
    function EnterScenePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scoreLabel = null;
        _this.lineLabel = null;
        _this.text = 'hello';
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    EnterScenePanel.prototype.start = function () {
    };
    EnterScenePanel.prototype.ShowScore = function (scoreNum) {
        this.scoreLabel.string = scoreNum.toString();
    };
    EnterScenePanel.prototype.ShowLineCount = function (lineCount) {
        this.lineLabel.string = lineCount;
    };
    __decorate([
        property(cc.Label)
    ], EnterScenePanel.prototype, "scoreLabel", void 0);
    __decorate([
        property(cc.Label)
    ], EnterScenePanel.prototype, "lineLabel", void 0);
    __decorate([
        property
    ], EnterScenePanel.prototype, "text", void 0);
    EnterScenePanel = __decorate([
        ccclass
    ], EnterScenePanel);
    return EnterScenePanel;
}(cc.Component));
exports.default = EnterScenePanel;

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
        //# sourceMappingURL=EnterScenePanel.js.map
        