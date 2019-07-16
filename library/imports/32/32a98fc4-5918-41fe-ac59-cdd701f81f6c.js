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
        this.basketInfors = [];
        this.shootInfors = [];
    }
    SceneLevelData = __decorate([
        ccclass
    ], SceneLevelData);
    return SceneLevelData;
}());
exports.default = SceneLevelData;
var BasketInforJson = /** @class */ (function () {
    function BasketInforJson() {
        this.basketPos = "78_200"; //篮球位置 78（左边x坐标） 350中间坐标  630右边坐标
        this.moveEndPos = "100_100"; //移动终点坐标
        this.basketType = 0; //篮筐类型 0是左边带板，1 左边不呆板， 2中间， 3右边带板， 4 右边不带板
        this.moveDuringTime = 0; //移动时间
    }
    return BasketInforJson;
}());
exports.BasketInforJson = BasketInforJson;
var BasketInfor = /** @class */ (function () {
    function BasketInfor() {
        this.basketPos = cc.v2(0, 0);
        this.basketType = 0; //篮筐类型 0是左边带板，1 左边不呆板， 2中间， 3右边带板， 4 右边不带板
        this.moveDuringTime = 0; //移动时间
    }
    return BasketInfor;
}());
exports.BasketInfor = BasketInfor;
var ShootInforJson = /** @class */ (function () {
    function ShootInforJson() {
        this.shootType = 0; //0代表篮球 1代表炸弹
        this.shootPos = "1000_2000"; //射击点的横坐标0-720
        this.velocity = "1000_2000"; //初始速度x_y
        this.shootDelayTime = 1000; //射击延迟时间
    }
    return ShootInforJson;
}());
exports.ShootInforJson = ShootInforJson;
var ShootInfor = /** @class */ (function () {
    function ShootInfor() {
        this.shootType = 0; //0代表篮球 1代表炸弹
        this.shootDelayTime = 1000; //射击延迟时间
    }
    return ShootInfor;
}());
exports.ShootInfor = ShootInfor;

cc._RF.pop();