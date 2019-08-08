(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/LevelDataManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3baed6soEBGk7u0nhhHjtIS', 'LevelDataManager', __filename);
// Script/LevelDataManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Singleton_1 = require("./Singleton");
var SceneLevelData_1 = require("./SceneLevelData");
var SceneLevelData_2 = require("./SceneLevelData");
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
        var b = cc.director.getWinSizeInPixels();
        var bx = b.width;
        var by = b.height;
        this.screenWidth = bx;
        cc.log(bx);
        this.relateDis = (720 - bx) * 0.5;
    };
    //读取关卡数据
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
                    cc.log(_this.levelData[0].basketInfors[0].basketPos);
                    cc.log(_this.levelData.length);
                    // this.StringToNumberArray(this.levelData[0].basketPos);
                }
            });
        });
    };
    ///获取某一个关卡的篮筐信息
    LevelDataManager.prototype.GetBasketInforsByLevel = function (levelIndex) {
        var infors = [];
        for (var i = 0; i < this.levelData[levelIndex].basketInfors.length; i++) {
            var oneInfor = new SceneLevelData_1.BasketInfor();
            cc.log(this.StringToVec2(this.levelData[levelIndex].basketInfors[i].basketPos));
            oneInfor.basketPos = this.StringToVec2(this.levelData[levelIndex].basketInfors[i].basketPos);
            oneInfor.basketType = this.levelData[levelIndex].basketInfors[i].basketType;
            if (oneInfor.basketType == 0 || oneInfor.basketType == 1) {
                oneInfor.basketPos = new cc.Vec2(oneInfor.basketPos.x + this.relateDis, oneInfor.basketPos.y);
            }
            else if (oneInfor.basketType == 3 || oneInfor.basketType == 4) {
                oneInfor.basketPos = new cc.Vec2(oneInfor.basketPos.x - this.relateDis, oneInfor.basketPos.y);
            }
            oneInfor.moveEndPos = this.StringToVec2(this.levelData[levelIndex].basketInfors[i].moveEndPos);
            oneInfor.moveDuringTime = this.levelData[levelIndex].basketInfors[i].moveDuringTime;
            infors.push(oneInfor);
        }
        return infors;
    };
    ///获取某一关卡的射击信息
    LevelDataManager.prototype.GetShootInforByLevel = function (levelIndex) {
        var basketInfor = this.GetBasketInforsByLevel(levelIndex)[0];
        var infors = [];
        for (var i = 0; i < this.levelData[levelIndex].shootInfors.length; i++) {
            var oneInfor = new SceneLevelData_2.ShootInfor();
            oneInfor.shootType = this.levelData[levelIndex].shootInfors[i].shootType;
            oneInfor.shootPos = this.StringToVec2(this.levelData[levelIndex].shootInfors[i].shootPos);
            if (oneInfor.shootPos.x - basketInfor.basketPos.x < 0) {
                oneInfor.shootPos = new cc.Vec2(oneInfor.shootPos.x - this.relateDis < 23 ? 23 : oneInfor.shootPos.x - this.relateDis, oneInfor.shootPos.y);
            }
            else {
                oneInfor.shootPos = new cc.Vec2(oneInfor.shootPos.x + this.relateDis > this.screenWidth - this.relateDis ? this.screenWidth - this.relateDis : oneInfor.shootPos.x + this.relateDis, oneInfor.shootPos.y);
            }
            oneInfor.velocity = this.StringToVec2(this.levelData[levelIndex].shootInfors[i].velocity);
            oneInfor.shootDelayTime = this.levelData[levelIndex].shootInfors[i].shootDelayTime;
            infors.push(oneInfor);
        }
        return infors;
    };
    ///分辨率不同手机对球的位置处理 -1代表球在篮筐左边，0代表在中间， 1代表在右边
    LevelDataManager.prototype.GetBallPosType = function (levelIndex) {
    };
    LevelDataManager.prototype.GetLevelLength = function () {
        return this.levelData.length;
    };
    ///字符串转vec2
    LevelDataManager.prototype.StringToVec2 = function (str) {
        var vecNum = this.StringToNumberArray(str);
        return cc.v2(vecNum[0], vecNum[1]);
    };
    //字符串转换成数组
    LevelDataManager.prototype.StringToNumberArray = function (str) {
        var num = [];
        var numStr = str.split('_');
        for (var i = 0; i < numStr.length; i++) {
            num.push(Number(numStr[i]));
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
        