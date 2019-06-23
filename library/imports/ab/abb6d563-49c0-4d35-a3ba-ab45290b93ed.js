"use strict";
cc._RF.push(module, 'abb6dVjScBNNaO6q0UpC5Pt', 'ProduceBasketManager');
// Script/ProduceBasketManager.ts

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
var ProduceBasketManager = /** @class */ (function (_super) {
    __extends(ProduceBasketManager, _super);
    function ProduceBasketManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sizeType = 0; // 代表不带板，1代表有板子
        _this.posType = -1; // -1代表左边，0代表中间，1代表右边
        _this.leftPos = [];
        _this.midPos = [];
        _this.rightPos = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    ProduceBasketManager.prototype.onLoad = function () {
        //    var tempChildPos0 =this.pos0.children; 
        //     for (var i = 0; i < tempChildPos0.length; i++) 
        //     { 
        //         this.leftPos.push(tempChildPos0[i]);
        //     }
        //     var tempChildPos1 =this.pos1.children; 
        //     for (var i = 0; i < tempChildPos1.length; i++) 
        //     { 
        //         this.midPos.push(tempChildPos1[i]);
        //     }
        //     var tempChildPos2 =this.pos2.children; 
        //     for (var i = 0; i < tempChildPos2.length; i++) 
        //     { 
        //         this.rightPos.push(tempChildPos2[i]);
        //     }
    };
    ProduceBasketManager.prototype.start = function () {
    };
    ///获取位置信息
    ProduceBasketManager.prototype.GetPos = function () {
        var posIndex = 0;
        switch (this.posType) {
            case -1:
                posIndex = this.random(0, this.leftPos.length);
                cc.log(this.leftPos[posIndex].name);
                return this.leftPos[posIndex].convertToWorldSpaceAR(cc.v2(0, 0));
                break;
            case 0:
                posIndex = this.random(0, this.midPos.length);
                cc.log(this.midPos[posIndex].name);
                return this.midPos[posIndex].convertToWorldSpaceAR(cc.v2(0, 0));
                break;
            case 1:
                posIndex = this.random(0, this.rightPos.length);
                cc.log(this.rightPos[posIndex].name);
                return this.rightPos[posIndex].convertToWorldSpaceAR(cc.v2(0, 0));
                break;
        }
    };
    ProduceBasketManager.prototype.ProduceOneBasket = function () {
        this.posType = this.random(-1, 2);
        this.sizeType = this.random(0, 2);
        var pos = this.GetPos();
        var startPos = this.node.convertToNodeSpaceAR(pos);
        var tempbasket;
        switch (this.sizeType) {
            case 0:
                tempbasket = cc.instantiate(this.smallBasket);
                switch (this.posType) {
                    case -1:
                        tempbasket.rotation = 30;
                        break;
                    case 0:
                        tempbasket.rotation = 0;
                        break;
                    case 1:
                        tempbasket.rotation = -30;
                        break;
                }
                break;
            case 1:
                if (this.posType != 0) {
                    switch (this.posType) {
                        case -1:
                            tempbasket = cc.instantiate(this.bigBasketL);
                            break;
                        case 1:
                            tempbasket = cc.instantiate(this.bigBasketR);
                            cc.log(tempbasket.scaleX);
                            break;
                    }
                }
                else {
                    tempbasket = cc.instantiate(this.smallBasket);
                }
                break;
        }
        this.basketParent.addChild(tempbasket);
        this.basketParent.convertToNodeSpaceAR(startPos);
        tempbasket.position = startPos;
        tempbasket.getComponent("Basket").AdjustColliders();
        var backSp = tempbasket.getChildByName("BackSprite");
        var frontSp = tempbasket.getChildByName("FrontSprite");
        var bottom = tempbasket.getChildByName("BasketBottom");
        var frontSpWorldPos = tempbasket.convertToWorldSpaceAR(frontSp.getPosition());
        var frontTargetPos = this.basketFrontParent.convertToNodeSpaceAR(frontSpWorldPos);
        frontSp.parent = this.basketFrontParent;
        frontSp.position = frontTargetPos;
        var backSpWorldPos = tempbasket.convertToWorldSpaceAR(backSp.getPosition());
        var backTargetPos = this.basketBackParent.convertToNodeSpaceAR(backSpWorldPos);
        backSp.parent = this.basketBackParent;
        backSp.position = backTargetPos;
        switch (this.sizeType) {
            case 0:
                switch (this.posType) {
                    case -1:
                        backSp.rotation = 30;
                        frontSp.rotation = 30;
                        break;
                    case 0:
                        backSp.rotation = 0;
                        frontSp.rotation = 0;
                        break;
                    case 1:
                        backSp.rotation = -30;
                        frontSp.rotation = -30;
                        break;
                }
                break;
            //  case 1:
            //         switch(this.posType)
            //              {
            //                  case -1:
            //                         backSp.scaleX = -1
            //                         frontSp.rotation = 30;
            //                      break;
            //                  case 1:
            //                          tempbasket.scaleX =  -1;
            //                      break;    
            //              }
            //      break;
        }
    };
    ProduceBasketManager.prototype.random = function (lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    };
    __decorate([
        property(cc.Prefab)
    ], ProduceBasketManager.prototype, "smallBasket", void 0);
    __decorate([
        property(cc.Prefab)
    ], ProduceBasketManager.prototype, "bigBasketL", void 0);
    __decorate([
        property(cc.Prefab)
    ], ProduceBasketManager.prototype, "bigBasketR", void 0);
    __decorate([
        property(cc.Node)
    ], ProduceBasketManager.prototype, "pos0", void 0);
    __decorate([
        property(cc.Node)
    ], ProduceBasketManager.prototype, "pos1", void 0);
    __decorate([
        property(cc.Node)
    ], ProduceBasketManager.prototype, "pos2", void 0);
    __decorate([
        property(cc.Node)
    ], ProduceBasketManager.prototype, "basketBackParent", void 0);
    __decorate([
        property(cc.Node)
    ], ProduceBasketManager.prototype, "basketFrontParent", void 0);
    __decorate([
        property(cc.Node)
    ], ProduceBasketManager.prototype, "basketParent", void 0);
    __decorate([
        property(cc.Node)
    ], ProduceBasketManager.prototype, "leftPos", void 0);
    __decorate([
        property(cc.Node)
    ], ProduceBasketManager.prototype, "midPos", void 0);
    __decorate([
        property(cc.Node)
    ], ProduceBasketManager.prototype, "rightPos", void 0);
    ProduceBasketManager = __decorate([
        ccclass
    ], ProduceBasketManager);
    return ProduceBasketManager;
}(Singleton_1.default));
exports.default = ProduceBasketManager;

cc._RF.pop();