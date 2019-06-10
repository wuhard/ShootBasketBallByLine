"use strict";
cc._RF.push(module, 'ada22zgTNZM5by9paPc+6Ao', 'Ball');
// Script/Ball.js

"use strict";

var _GameViewLogic = require("./GameViewLogic");

var _GameViewLogic2 = _interopRequireDefault(_GameViewLogic);

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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {

        if (otherCollider.node.name == 'ground') {
            var script = cc.find("Canvas/Logic").getComponent("GameViewLogic");

            script.instantiateOneBall();
            script.RemaveAllLine();
            this.node.destroy();
        }
    }
});

cc._RF.pop();