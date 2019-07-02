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
        this.shootPos = "0120"; //0代表没有，1代表篮球，2此位置是炸弹。表示第二个发射点是篮球，第三个是炸弹
        this.shootAngle = "0_45_90_0"; //射击角度;
        this.shootSeq = "0_300_300_0"; //每个位置的射击延迟时间毫秒。   
    }
    SceneLevelData = __decorate([
        ccclass
    ], SceneLevelData);
    return SceneLevelData;
}());
exports.default = SceneLevelData;

cc._RF.pop();