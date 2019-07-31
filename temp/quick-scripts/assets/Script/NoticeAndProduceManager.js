(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/NoticeAndProduceManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd106cft03VDUZHeymdNro4g', 'NoticeAndProduceManager', __filename);
// Script/NoticeAndProduceManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Singleton_1 = require("./Singleton");
var ProduceBasketManager_1 = require("./ProduceBasketManager");
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
var NoticeAndProduceManager = /** @class */ (function (_super) {
    __extends(NoticeAndProduceManager, _super);
    function NoticeAndProduceManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guidePos = [];
        _this.bornPos = [];
        _this.shootPos = []; // 1代表篮球 2代表炸弹 0代表没有
        _this.bornSeq = []; //实例化延迟时间
        _this.velocity = [cc.v2(0, 2000), cc.v2(0, 2500)];
        _this.ballGuideArray = [];
        _this.bombGuideArray = [];
        _this.veloctiyY = 2000;
        _this.basketBallNum = 0;
        _this.bombArray = [];
        _this.basketBallArray = [];
        _this.basektBallPosArray = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NoticeAndProduceManager.prototype.start = function () {
    };
    NoticeAndProduceManager.prototype.CreatBornPosByType = function (posType) {
        this.bornPos.splice(0, this.bornPos.length);
        switch (posType) {
            case -1:
                this.bornPos.push(this.guidePos[this.random(2, this.guidePos.length)]);
                break;
            case 0:
                this.bornPos.push(this.random(0, 2) == 0 ? this.guidePos[0] : this.guidePos[3]);
                break;
            case 1:
                this.bornPos.push(this.guidePos[this.random(0, 2)]);
                break;
        }
        //  cc.log("BornPosLength" + this.bornPos.length);
    };
    ///设置生成位置数据
    NoticeAndProduceManager.prototype.SetBornType = function (pos) {
        //清空
        this.bornPos.splice(0, this.bornPos.length);
        for (var i = 0; i < pos.length; i++) {
            this.shootPos.push(pos[i]);
        }
    };
    ///获取创建的位置信息
    NoticeAndProduceManager.prototype.CreatBornPos = function (num) {
        // this.bornPos.splice(0,this.bornPos.length);
        // var randomPos:number[] = [];
        // for(var i = 0; i < this.guidePos.length; i++)
        // {
        //     randomPos.push(i);
        // }
        // for(var j = 0; j < num; j++)
        // {
        //     var randomValue =  this.random(0,randomPos.length);
        //     var posIndex:number = randomPos[randomValue];
        //     this.bornPos.push(this.guidePos[posIndex]);
        //     randomPos.slice(randomValue,1);
        // }
    };
    ///获取出场顺序
    NoticeAndProduceManager.prototype.CreatBornTypeOrde = function () {
        // this.bornType.slice(0,this.bornType.length);
        // for(var i = 0; i < this.bornPos.length; i++)
        // {
        //     this.bornType.push(this.random(-1,1));
        // }
        // var ballOrder = this.random(0,this.bornType.length);
        // this.bornType[ballOrder] = 0;
    };
    //创建一个球的发射提示
    NoticeAndProduceManager.prototype.ProduceOneBallGuide = function (posNode) {
        var bornNode = posNode;
        var tempball = cc.instantiate(this.ballGuide);
        this.node.addChild(tempball);
        tempball.setPosition(bornNode.position);
        return tempball;
    };
    ///根据位置创建一个提示
    NoticeAndProduceManager.prototype.ProduceOneBallGuideByPos = function (guidePos) {
        var tempball = cc.instantiate(this.ballGuide);
        this.node.addChild(tempball);
        tempball.setPosition(guidePos);
        return tempball;
    };
    NoticeAndProduceManager.prototype.GetShootVelority = function (angle) {
        var anglePI = Math.PI / 180 * angle;
        return cc.v2(this.veloctiyY / Math.tan(anglePI), this.veloctiyY);
    };
    //创建一个炸弹的发射提示
    NoticeAndProduceManager.prototype.ProduceOneBoomGuide = function (posNode) {
        var bornNode = posNode;
        var tempbomb = cc.instantiate(this.bombGuide);
        this.node.addChild(tempbomb);
        tempbomb.setPosition(bornNode.position);
        return tempbomb;
    };
    NoticeAndProduceManager.prototype.ProduceOneBoomGuideByPos = function (guidePos) {
        var tempball = cc.instantiate(this.bombGuide);
        this.node.addChild(tempball);
        tempball.setPosition(guidePos);
        return tempball;
    };
    ///创建一次射击用例
    NoticeAndProduceManager.prototype.ProduceOneShootCase = function (shootInfors) {
        var _this = this;
        this.basketBallNum = 0;
        this.bornPos.splice(0, this.bornPos.length);
        this.ballGuideArray.splice(0, this.ballGuideArray.length);
        this.bombGuideArray.splice(0, this.bombGuideArray.length);
        this.bombArray.splice(0, this.bombArray.length);
        cc.log(shootInfors.length);
        var _loop_1 = function () {
            switch (shootInfors[i].shootType) {
                case 0:
                    this_1.basketBallNum++;
                    var oneBallGuide_1 = this_1.ProduceOneBallGuideByPos(shootInfors[i].shootPos);
                    var vel_1 = shootInfors[i].velocity; //获取射击速度
                    var delayTime = shootInfors[i].shootDelayTime;
                    this_1.ballGuideArray.push(oneBallGuide_1);
                    this_1.scheduleOnce(function () {
                        // 这里的 this 指向 component
                        _this.ProduceOneShootBallAction(oneBallGuide_1, vel_1);
                    }, delayTime / 1000.0 + 0.5); //2s后执行一次
                    break;
                case 1:
                    var oneBombGuide_1 = this_1.ProduceOneBoomGuideByPos(shootInfors[i].shootPos);
                    var bombVel_1 = shootInfors[i].velocity; //获取射击速度
                    var bombDelayTime = shootInfors[i].shootDelayTime;
                    this_1.bombGuideArray.push(oneBombGuide_1);
                    this_1.scheduleOnce(function () {
                        // 这里的 this 指向 component
                        _this.ProduceOneShootBombAction(oneBombGuide_1, bombVel_1);
                    }, bombDelayTime / 1000.0 + 0.5); //2s后执行一次
                    break;
            }
        };
        var this_1 = this;
        for (var i = 0; i < shootInfors.length; i++) {
            _loop_1();
        }
    };
    //创建一次球和炸弹的用例
    NoticeAndProduceManager.prototype.ProduceOneBallAndBombCase = function (shootPos, shootSeq, shootAngel) {
        var _this = this;
        this.bornPos.splice(0, this.bornPos.length);
        this.ballGuideArray.splice(0, this.ballGuideArray.length);
        this.bombGuideArray.splice(0, this.bombGuideArray.length);
        this.basketBallArray.splice(0, this.basketBallArray.length);
        this.basektBallPosArray.splice(0, this.basektBallPosArray.length);
        var _loop_2 = function () {
            if (shootPos[i] == 1) {
                var oneBallGuide_2 = this_2.ProduceOneBallGuide(this_2.guidePos[i]);
                var vel_2 = this_2.GetShootVelority(shootAngel[i]); //获取射击速度
                this_2.ballGuideArray.push(oneBallGuide_2);
                this_2.scheduleOnce(function () {
                    // 这里的 this 指向 component
                    _this.ProduceOneShootBallAction(oneBallGuide_2, vel_2);
                }, shootSeq[i] / 1000.0 + 0.5); //2s后执行一次
            }
            else if (shootPos[i] == 2) {
                var oneBombGuide_2 = this_2.ProduceOneBoomGuide(this_2.guidePos[i]);
                var vel_3 = this_2.GetShootVelority(shootAngel[i]); //获取射击速度
                this_2.bombGuideArray.push(oneBombGuide_2);
                this_2.scheduleOnce(function () {
                    // 这里的 this 指向 component
                    _this.ProduceOneShootBombAction(oneBombGuide_2, vel_3);
                }, shootSeq[i] / 1000.0 + 0.5); //2s后执行一次
            }
        };
        var this_2 = this;
        for (var i = 0; i < shootPos.length; i++) {
            _loop_2();
        }
    };
    //创建一次射球动作
    //velocity表示射球角度
    NoticeAndProduceManager.prototype.ProduceOneShootBallAction = function (guidBall, velocity) {
        // cc.log("Destory");
        this.ProduceOneBall(guidBall, velocity);
        guidBall.destroy();
    };
    NoticeAndProduceManager.prototype.ProduceOneShootBombAction = function (guidBall, velocity) {
        // cc.log("Destory");
        this.ProduceOneBomb(guidBall, velocity);
        guidBall.destroy();
    };
    //创建一个球的
    NoticeAndProduceManager.prototype.ProduceOneBall = function (posNode, velocity) {
        var startPos = posNode.convertToWorldSpaceAR(cc.v2(0, 0));
        var tempball = cc.instantiate(this.ball);
        tempball.parent = this.ballParent;
        tempball.position = this.ballParent.convertToNodeSpaceAR(startPos);
        tempball.getComponent(cc.RigidBody).linearVelocity = velocity;
        this.basketBallArray.push(tempball);
        this.basektBallPosArray.push(cc.v2(0, 0));
    };
    NoticeAndProduceManager.prototype.ProduceOneBomb = function (posNode, velocity) {
        var startPos = posNode.convertToWorldSpaceAR(cc.v2(0, 0));
        var tempball = cc.instantiate(this.bomb);
        tempball.parent = this.ballParent;
        tempball.position = this.ballParent.convertToNodeSpaceAR(startPos);
        tempball.getComponent(cc.RigidBody).linearVelocity = velocity;
        this.bombArray.push(tempball);
    };
    NoticeAndProduceManager.prototype.CheckAllBallCanEnter = function () {
        for (var i = 0; i < this.basketBallArray.length; i++) {
            if (this.basketBallArray[i] != null) {
                var movePos = cc.v2(this.basektBallPosArray[i].x - this.basketBallArray[i].position.x, this.basektBallPosArray[i].y - this.basketBallArray[i].position.y);
                if (movePos.mag() < 0.3) {
                    return false;
                }
                this.basektBallPosArray[i] = this.basketBallArray[i].position;
            }
        }
        return true;
    };
    NoticeAndProduceManager.prototype.DestroyAllGuide = function () {
        for (var i = 0; i < this.bombGuideArray.length; i++) {
            if (this.bombGuideArray[i] != null) {
                this.bombGuideArray[i].destroy();
            }
        }
        this.bombGuideArray.splice(0, this.bombGuideArray.length);
        for (var i = 0; i < this.ballGuideArray.length; i++) {
            if (this.ballGuideArray[i] != null) {
                this.ballGuideArray[i].destroy();
            }
        }
        this.ballGuideArray.splice(0, this.ballGuideArray.length);
    };
    NoticeAndProduceManager.prototype.DestroyAllBomb = function () {
        for (var i = 0; i < this.bombArray.length; i++) {
            if (this.bombArray[i] != null) {
                this.bombArray[i].destroy();
            }
        }
        this.bombArray.splice(0, this.bombArray.length);
    };
    //删除所有球
    NoticeAndProduceManager.prototype.DestroyAllBall = function () {
        for (var i = 0; i < this.basketBallArray.length; i++) {
            if (this.basketBallArray[i] != null) {
                this.basketBallArray[i].destroy();
            }
        }
        this.basketBallArray.splice(0, this.basketBallArray.length);
    };
    NoticeAndProduceManager.prototype.StopProduceAction = function () {
        this.DestroyAllBall();
        this.DestroyAllBomb();
        this.DestroyAllGuide();
        this.unscheduleAllCallbacks();
    };
    NoticeAndProduceManager.prototype.random = function (lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    };
    __decorate([
        property(cc.Node)
    ], NoticeAndProduceManager.prototype, "ballParent", void 0);
    __decorate([
        property(cc.Prefab)
    ], NoticeAndProduceManager.prototype, "ballGuide", void 0);
    __decorate([
        property(cc.Prefab)
    ], NoticeAndProduceManager.prototype, "bombGuide", void 0);
    __decorate([
        property(cc.Prefab)
    ], NoticeAndProduceManager.prototype, "ball", void 0);
    __decorate([
        property(cc.Prefab)
    ], NoticeAndProduceManager.prototype, "bomb", void 0);
    __decorate([
        property(cc.Node)
    ], NoticeAndProduceManager.prototype, "guidePos", void 0);
    __decorate([
        property(ProduceBasketManager_1.default)
    ], NoticeAndProduceManager.prototype, "produceBasketManager", void 0);
    NoticeAndProduceManager = __decorate([
        ccclass
    ], NoticeAndProduceManager);
    return NoticeAndProduceManager;
}(Singleton_1.default));
exports.default = NoticeAndProduceManager;

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
        //# sourceMappingURL=NoticeAndProduceManager.js.map
        