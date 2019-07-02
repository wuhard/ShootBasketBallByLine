(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/LevelDataManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3baed6soEBGk7u0nhhHjtIS', 'LevelDataManager', __filename);
// Script/LevelDataManager.ts

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
var LevelDataManager = /** @class */ (function (_super) {
    __extends(LevelDataManager, _super);
    function LevelDataManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelData = [];
        return _this;
    }
    LevelDataManager.prototype.start = function () {
        this.LoadJson("LevelData");
    };
    LevelDataManager.prototype.LoadJson = function (json_name) {
        var _this = this;
        var json_url = 'json/' + json_name;
        return new Promise(function (resolve, reject) {
            cc.loader.loadRes(json_url, function (err, object) {
                if (err) {
                    reject(err);
                }
                else {
                    _this.levelData = object;
                    _this.StringToNumberArray(_this.levelData[0].basketPos);
                }
            });
        });
    };
    LevelDataManager.prototype.StringToNumberArray = function (str) {
        var num = [];
        for (var i = 0; i < str.length; i++) {
            num.push(Number(str.substr(i, 1)));
            cc.log(Number(str.substr(i, 1)));
        }
        return num;
    };
    LevelDataManager = __decorate([
        ccclass
    ], LevelDataManager);
    return LevelDataManager;
}(Singleton_1.default));
exports.default = LevelDataManager;

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
        //# sourceMappingURL=LevelDataManager.js.map
        