"use strict";
cc._RF.push(module, 'd106cft03VDUZHeymdNro4g', 'NoticeAndProduceManager');
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
    //创建一次球和炸弹的用例
    NoticeAndProduceManager.prototype.ProduceOneBallAndBombCase = function (shootPos, shootSeq, shootAngel) {
        var _this = this;
        this.bornPos.splice(0, this.bornPos.length);
        this.ballGuideArray.splice(0, this.ballGuideArray.length);
        this.bombGuideArray.splice(0, this.bombGuideArray.length);
        var _loop_1 = function () {
            if (shootPos[i] == 1) {
                var oneBallGuide_1 = this_1.ProduceOneBallGuide(this_1.guidePos[i]);
                var vel_1 = this_1.GetShootVelority(shootAngel[i]); //获取射击速度
                this_1.ballGuideArray.push(oneBallGuide_1);
                this_1.scheduleOnce(function () {
                    // 这里的 this 指向 component
                    _this.ProduceOneShootBallAction(oneBallGuide_1, vel_1);
                }, shootSeq[i] / 1000.0 + 0.5); //2s后执行一次
            }
            else if (shootPos[i] == 2) {
                var oneBombGuide_1 = this_1.ProduceOneBoomGuide(this_1.guidePos[i]);
                var vel_2 = this_1.GetShootVelority(shootAngel[i]); //获取射击速度
                this_1.bombGuideArray.push(oneBombGuide_1);
                this_1.scheduleOnce(function () {
                    // 这里的 this 指向 component
                    _this.ProduceOneShootBombAction(oneBombGuide_1, vel_2);
                }, shootSeq[i] / 1000.0 + 0.5); //2s后执行一次
            }
        };
        var this_1 = this;
        for (var i = 0; i < shootPos.length; i++) {
            _loop_1();
        }
        // this.shootPos = 
        // // this.CreatBornPos(num);
        // // this.CreatBornTypeOrde();
        // var posType = this.produceBasketManager.GetPosType();
        // this.CreatBornPosByType(posType);
        // for(var i = 0; i < this.bornPos.length; i++)
        // {
        //     var tempball = this.ProduceOneBallGuide(this.bornPos[i]);
        //     this.scheduleOnce(() => {
        //         // 这里的 this 指向 component
        //         this.ProduceBallAction(tempball);
        //     }, 0.5);//2s后执行一次
        // } 
        //  this.ProduceOneBall(this.bornPos[0],cc.v2(0,2000));
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
    };
    NoticeAndProduceManager.prototype.ProduceOneBomb = function (posNode, velocity) {
        var startPos = posNode.convertToWorldSpaceAR(cc.v2(0, 0));
        var tempball = cc.instantiate(this.bomb);
        tempball.parent = this.ballParent;
        tempball.position = this.ballParent.convertToNodeSpaceAR(startPos);
        tempball.getComponent(cc.RigidBody).linearVelocity = velocity;
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