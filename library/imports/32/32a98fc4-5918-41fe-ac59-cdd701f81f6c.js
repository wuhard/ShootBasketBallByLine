"use strict";
cc._RF.push(module, '32a98/EWRhB/qxZzdcB+B9s', 'SceneLevelData');
// Script/SceneLevelData.ts

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
var SceneLevelData = /** @class */ (function () {
    function SceneLevelData() {
        this.basketPos = "001000"; //0代码没有篮筐，1代表有，一共有6个篮筐产生位置。
        this.basketType = "012344";
        this.shootPos = "0120"; //0代表没有，1代表篮球，2此位置是炸弹。表示第二个发射点是篮球，第三个是炸弹
        this.shootAngle = "0_45_90_0"; //射击角度;
        this.shootSeq = "0_300_300_0"; //每个位置的射击延迟时间毫秒。   
        this.basketInfors = [];
        this.shootInfors = [];
    }
    SceneLevelData = __decorate([
        ccclass
    ], SceneLevelData);
    return SceneLevelData;
}());
exports.default = SceneLevelData;
var BasketInfor = /** @class */ (function () {
    function BasketInfor() {
        this.baksetPos = "1000_200"; //篮球位置
        this.moveEndPos = "100_100"; //移动终点坐标
        this.basketType = 0; //篮筐类型
        this.moveDuringTime = 0; //移动时间
    }
    return BasketInfor;
}());
var ShootInfor = /** @class */ (function () {
    function ShootInfor() {
        this.shootType = 0; //0代表篮球 1代表炸弹
        this.shootPos = 0; //射击点的横坐标0-720
        this.velocity = "1000_2000"; //初始速度x_y
        this.shootDelayTime = 1000; //射击延迟时间
    }
    return ShootInfor;
}());

cc._RF.pop();