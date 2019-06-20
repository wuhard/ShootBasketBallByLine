"use strict";
cc._RF.push(module, 'ada22zgTNZM5by9paPc+6Ao', 'Ball');
// Script/Ball.js

"use strict";

var _GameViewLogic = require("./GameViewLogic");

var _GameViewLogic2 = _interopRequireDefault(_GameViewLogic);

var _EnterBallAni = require("./EnterBallAni");

var _EnterBallAni2 = _interopRequireDefault(_EnterBallAni);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        body: cc.RigidBody
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.body = this.getComponent(cc.RigidBody);
        //  this.body.linearVelocity = cc.v2(1000,2000);
    },
    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {

        if (otherCollider.node.name == 'ground') {
            var script = cc.find("Canvas/Logic").getComponent("GameViewLogic");

            script.instantiateOneBall();
            script.RemaveAllLine();
            this.node.destroy();
        } else if (otherCollider.node.name == 'BasketBottom') {
            cc.log("get one score");
            var script = cc.find("Canvas/Logic").getComponent("GameViewLogic");

            script.instantiateOneBall();
            script.RemoveBasketNode(otherCollider.node.parent);
            script.RemaveAllLine(otherCollider.node.parent);
            script.PlayEnterBallAni(otherCollider.node.convertToWorldSpaceAR(cc.v2(0, 0)));
            this.node.destroy();

            var basketWorld = otherCollider.node.parent.convertToWorldSpaceAR(cc.v2(0, 0));

            var basketLocalPos = otherCollider.node.parent.parent.convertToNodeSpaceAR(basketWorld);

            script.ProduceBoomBasket(basketLocalPos);
        }
    }
});

cc._RF.pop();