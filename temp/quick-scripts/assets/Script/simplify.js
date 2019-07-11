(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/simplify.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bbd5cVg2xVIjap2dGxHFW+a', 'simplify', __filename);
// Script/simplify.js

'use strict';

cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function onLoad() {
        this.path = this.addComponent('R.path');
        this.path.fillColor = 'none';
        this.path.lineWidth = 7;
        this.path.showHandles = false;
        this.path.StrokeColor = cc.Color.WHITE;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this)
        }, this.node);
    },

    onTouchBegan: function onTouchBegan(touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        this.points = [touchLoc];

        return true;
    },

    onTouchMoved: function onTouchMoved(touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        this.points.push(touchLoc);
        this.path.points(this.points);
        //this.path.simplify();
        // this.path.smooth();
    },

    onTouchEnded: function onTouchEnded(touch, event) {
        this.path.points(this.points);
        this.path.smooth();
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {}
});

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
        //# sourceMappingURL=simplify.js.map
        