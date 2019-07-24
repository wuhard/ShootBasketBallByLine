(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ProduceBasketManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'abb6dVjScBNNaO6q0UpC5Pt', 'ProduceBasketManager', __filename);
// Script/ProduceBasketManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Singleton_1 = require("./Singleton");
var Basket_1 = require("./Basket");
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
        _this.basketBornPos = [];
        _this.basketList = [];
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
    ProduceBasketManager.prototype.GetPos = function (index) {
        return this.basketBornPos[index].convertToWorldSpaceAR(cc.v2(0, 0));
    };
    //创建篮筐案例
    ProduceBasketManager.prototype.ProduceOneBasketCase = function (basketInfors) {
        var tempbasket;
        var basketCount = basketInfors.length;
        var startPos;
        for (var i = 0; i < basketCount; i++) {
            startPos = basketInfors[i].basketPos;
            switch (basketInfors[i].basketType) {
                case 0:
                    tempbasket = cc.instantiate(this.bigBasketL);
                    break;
                case 1:
                    tempbasket = cc.instantiate(this.smallBasket);
                    tempbasket.rotation = 30;
                    break;
                case 2:
                    tempbasket = cc.instantiate(this.smallBasket);
                    break;
                case 3:
                    tempbasket = cc.instantiate(this.bigBasketR);
                    break;
                case 4:
                    tempbasket = cc.instantiate(this.smallBasket);
                    tempbasket.rotation = -30;
                    break;
            }
            this.basketParent.addChild(tempbasket);
            this.basketParent.convertToNodeSpaceAR(startPos);
            tempbasket.position = startPos;
            var basketS = tempbasket.getComponent(Basket_1.default);
            basketS.AdjustColliders();
            this.basketList.push(tempbasket);
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
            switch (basketInfors[i].basketType) {
                case 1:
                    backSp.rotation = 30;
                    frontSp.rotation = 30;
                    break;
                case 4:
                    backSp.rotation = -30;
                    frontSp.rotation = -30;
                    break;
            }
        }
    };
    //根据
    ProduceBasketManager.prototype.ProduceOneBasketByPos = function (basketPos) {
        this.sizeType = this.random(0, 2);
        var pos;
        var startPos;
        for (var i = 0; i < basketPos.length; i++) {
            if (basketPos[i] != 0) {
                pos = this.GetPos(i);
                startPos = this.node.convertToNodeSpaceAR(pos);
                var tempbasket = void 0;
                if (i < 2) {
                    this.posType = -1;
                }
                else if (i < 4) {
                    this.posType = 0;
                }
                else {
                    this.posType = 1;
                }
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
                var basketS = tempbasket.getComponent(Basket_1.default);
                basketS.AdjustColliders();
                this.basketList.push(tempbasket);
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
                }
            }
        }
    };
    //获取篮筐的位置类型（左 中 右）
    ProduceBasketManager.prototype.GetPosType = function () {
        return this.posType;
    };
    ProduceBasketManager.prototype.RemoveOneBasket = function (basketNode) {
        var nodeIndex = this.basketList.indexOf(basketNode);
        var targetBasket = this.basketList[nodeIndex];
        var script = targetBasket.getComponent(Basket_1.default);
        script.RemoveBasket();
        this.basketList.splice(nodeIndex, 1);
    };
    ProduceBasketManager.prototype.RemoveAllBaskets = function () {
        var lenght = this.basketList.length;
        for (var i = 0; i < lenght; i++) {
            this.RemoveOneBasket(this.basketList[0]);
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
    ], ProduceBasketManager.prototype, "basketBackParent", void 0);
    __decorate([
        property(cc.Node)
    ], ProduceBasketManager.prototype, "basketFrontParent", void 0);
    __decorate([
        property(cc.Node)
    ], ProduceBasketManager.prototype, "basketParent", void 0);
    __decorate([
        property(cc.Node)
    ], ProduceBasketManager.prototype, "basketBornPos", void 0);
    ProduceBasketManager = __decorate([
        ccclass
    ], ProduceBasketManager);
    return ProduceBasketManager;
}(Singleton_1.default));
exports.default = ProduceBasketManager;

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
        //# sourceMappingURL=ProduceBasketManager.js.map
        