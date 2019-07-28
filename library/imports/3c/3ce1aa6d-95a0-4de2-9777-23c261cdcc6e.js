"use strict";
cc._RF.push(module, '3ce1aptlaBN4pd3I8Jhzcxu', 'ShowOrHideObj');
// Script/ShowOrHideObj.ts

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
var ShowHOrHideObj = /** @class */ (function (_super) {
    __extends(ShowHOrHideObj, _super);
    function ShowHOrHideObj() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.objs = [];
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    ShowHOrHideObj.prototype.start = function () {
    };
    ShowHOrHideObj.prototype.ShowObjByIndex = function (index) {
        this.objs[index].active = true;
    };
    ShowHOrHideObj.prototype.HideObjByIndex = function (index) {
        this.objs[index].active = false;
    };
    ShowHOrHideObj.prototype.HideAllObjs = function () {
        for (var i = 0; i < this.objs.length; i++) {
            this.objs[i].active = false;
        }
    };
    ShowHOrHideObj.prototype.ShowAllObjs = function () {
        for (var i = 0; i < this.objs.length; i++) {
            this.objs[i].active = true;
        }
    };
    ShowHOrHideObj.prototype.ShowOnlyObjByIndex = function (index) {
        this.HideAllObjs();
        this.ShowObjByIndex(index);
    };
    __decorate([
        property(cc.Node)
    ], ShowHOrHideObj.prototype, "objs", void 0);
    ShowHOrHideObj = __decorate([
        ccclass
    ], ShowHOrHideObj);
    return ShowHOrHideObj;
}(cc.Component));
exports.default = ShowHOrHideObj;

cc._RF.pop();