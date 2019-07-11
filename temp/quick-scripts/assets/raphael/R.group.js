(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/raphael/R.group.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e75c2SchnFFxaBCrVazFOQf', 'R.group', __filename);
// raphael/R.group.js

'use strict';

var Path = require('./R.path');

var trasform = require('./component/R.transform');
var style = require('./component/R.style');
var utils = require('./utils/R.utils');

// optional
var svg = require('./component/optional/R.svg');

var GroupDefine = {
    extends: cc.Component,

    properties: {
        selected: {
            default: false,
            notify: function notify() {
                var children = this.children;
                var selected = this.selected;

                for (var i = 0, ii = children.length; i < ii; i++) {
                    children[i].selected = selected;
                }
            }
        },

        _dirty: {
            default: true,
            serializable: false
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.init();

        if (!this.ctx) {
            this.ctx = new _ccsg.GraphicsNode();
            this.node._sgNode.addChild(this.ctx);
        }
    },

    init: function init(parent) {
        this.children = [];

        if (parent) {
            this.parent = parent;
            this.ctx = parent.ctx;
        }

        this.showBoundingBox = false;
    },

    addPath: function addPath() {
        var path = new Path();
        path.init(this);

        this.children.push(path);
        this._dirty = true;

        return path;
    },

    addGroup: function addGroup() {
        var group = new Group();
        group.init(this);

        this.children.push(group);
        this._dirty = true;

        return group;
    },

    getWorldBbox: function getWorldBbox() {
        var rect;
        var children = this.children;
        for (var i = 0, ii = children.length; i < ii; i++) {
            var bbox = children[i].getWorldBbox();

            if (bbox.width !== 0 && bbox.height !== 0) {
                if (!rect) {
                    rect = children[i].getWorldBbox();
                } else {
                    rect = cc.rectUnion(rect, children[i].getWorldBbox());
                }
            }
        }

        return rect || cc.rect();
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {

        if (!this._dirty) return;

        if (!this.parent) {
            this.ctx.clear();
        }

        var children = this.children;
        for (var i = 0, ii = children.length; i < ii; i++) {
            var child = children[i];
            child._dirty = true;
            child.update(dt);
        }

        if (this.showBoundingBox) {
            var bbox = this.getWorldBbox();
            this.ctx.rect(bbox.x, bbox.y, bbox.width, bbox.height);
            this.ctx.stroke();
        }

        this._dirty = false;
    }
};

var Group = cc.Class(utils.defineClass(GroupDefine, trasform, style, svg));

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
        //# sourceMappingURL=R.group.js.map
        