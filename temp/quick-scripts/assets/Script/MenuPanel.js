(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/MenuPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd67dauPYIdOd4vwoK1s/4+A', 'MenuPanel', __filename);
// Script/MenuPanel.ts

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
var MenuPanel = /** @class */ (function (_super) {
    __extends(MenuPanel, _super);
    function MenuPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scoreLabel = null;
        _this.levelLabel = null;
        _this.levelShowNode = null;
        _this.text = 'hello';
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    MenuPanel.prototype.start = function () {
    };
    MenuPanel.prototype.ShowLevelInfor = function (levelIndex, socreNum, maxLevel) {
        this.levelLabel.string = "第 " + (levelIndex + 1).toString() + " 关";
        this.scoreLabel.string = socreNum.toString();
        if (levelIndex == 0) {
            this.levelShowNode.getChildByName("LastLevelBtn").active = false;
        }
        else {
            this.levelShowNode.getChildByName("LastLevelBtn").active = true;
        }
        if (levelIndex == maxLevel - 1) {
            this.levelShowNode.getChildByName("NextLevelBtn").active = false;
        }
        else {
            this.levelShowNode.getChildByName("NextLevelBtn").active = true;
        }
        this.levelShowNode.getChildByName("LastLevelBtn").getComponentInChildren(cc.Label).string = levelIndex.toString();
        this.levelShowNode.getChildByName("LevelBtn").getComponentInChildren(cc.Label).string = (levelIndex + 1).toString();
        this.levelShowNode.getChildByName("NextLevelBtn").getComponentInChildren(cc.Label).string = (levelIndex + 2).toString();
    };
    __decorate([
        property(cc.Label)
    ], MenuPanel.prototype, "scoreLabel", void 0);
    __decorate([
        property(cc.Label)
    ], MenuPanel.prototype, "levelLabel", void 0);
    __decorate([
        property(cc.Node)
    ], MenuPanel.prototype, "levelShowNode", void 0);
    __decorate([
        property
    ], MenuPanel.prototype, "text", void 0);
    MenuPanel = __decorate([
        ccclass
    ], MenuPanel);
    return MenuPanel;
}(cc.Component));
exports.default = MenuPanel;

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
        //# sourceMappingURL=MenuPanel.js.map
        