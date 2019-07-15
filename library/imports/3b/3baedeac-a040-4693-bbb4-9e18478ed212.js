"use strict";
cc._RF.push(module, '3baed6soEBGk7u0nhhHjtIS', 'LevelDataManager');
// Script/LevelDataManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Singleton_1 = require("./Singleton");
var SceneLevelData_1 = require("./SceneLevelData");
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
            oneInfor.moveEndPos = this.StringToVec2(this.levelData[levelIndex].basketInfors[i].moveEndPos);
            oneInfor.moveDuringTime = this.levelData[levelIndex].basketInfors[i].moveDuringTime;
            infors.push(oneInfor);
        }
        return infors;
    };
    LevelDataManager.prototype.GetBasketPos = function (levelIndex) {
        return this.StringToNumberArray(this.levelData[levelIndex].basketPos);
    };
    LevelDataManager.prototype.GetLevelLength = function () {
        return this.levelData.length;
    };
    ///获取球射击的位置
    LevelDataManager.prototype.GetBallAndBombPos = function (levelIndex) {
        return this.StringToNumberArray(this.levelData[levelIndex].shootPos);
    };
    LevelDataManager.prototype.GetBallAndBombShootSeq = function (levelIndex) {
        return this.StringToNumberArray(this.levelData[levelIndex].shootSeq);
    };
    LevelDataManager.prototype.GetBallAndBombShootAngle = function (levelIndex) {
        return this.StringToNumberArray(this.levelData[levelIndex].shootAngle);
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