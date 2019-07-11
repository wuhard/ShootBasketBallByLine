(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/raphael/component/R.style.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '82a22w03zRH9KMyM6p0S4ni', 'R.style', __filename);
// raphael/component/R.style.js

'use strict';

var LineJoin = cc.Graphics.LineJoin;
var LineCap = cc.Graphics.LineCap;

var Style = {
    properties: {
        _lineWidth: undefined,
        _strokeColor: undefined,
        _fillColor: undefined,
        _lineJoin: undefined,
        _lineCap: undefined,
        _miterLimit: undefined,

        _dashOffset: undefined,
        _dashArray: undefined,

        lineWidth: {
            get: function get() {
                return this._lineWidth || 1;
            },
            set: function set(value) {
                this._lineWidth = value;
                this._dirty = true;
            }
        },

        lineJoin: {
            get: function get() {
                return this._lineJoin || LineJoin.MITER;
            },
            set: function set(value) {
                this._lineJoin = value;
                this._dirty = true;
            },
            type: LineJoin
        },

        lineCap: {
            get: function get() {
                return this._lineCap || LineCap.BUTT;
            },
            set: function set(value) {
                this._lineCap = value;
                this._dirty = true;
            },
            type: LineCap
        },

        strokeColor: {
            get: function get() {
                return this._strokeColor || cc.Color.BLACK;
            },
            set: function set(value) {
                this._strokeColor = value;
                this._dirty = true;
            }
        },

        fillColor: {
            get: function get() {
                return this._fillColor || cc.Color.WHITE;
            },
            set: function set(value) {
                this._fillColor = value;
                this._dirty = true;
            }
        },

        miterLimit: {
            get: function get() {
                return this._miterLimit || 10;
            },
            set: function set(value) {
                this._miterLimit = value;
                this._dirty = true;
            }
        },

        dashOffset: {
            get: function get() {
                return this._dashOffset || 0;
            },
            set: function set(value) {
                if (this._dashOffset === value) {
                    return;
                }
                this._dashOffset = value;
                this._dirty = true;
            }
        },
        dashArray: {
            get: function get() {
                return this._dashArray || [];
            },
            set: function set(value) {
                if (!Array.isArray(value)) {
                    return;
                }
                this._dashArray = value;
                this._dirty = true;
            }
        }
    },

    getStyled: function getStyled(type) {
        var value = this['_' + type];

        if (value === 'inherit' || value === undefined) {
            if (this.parent) value = this.parent.getStyled(type);else value = this[type];
        }

        return value;
    },

    getStyledColor: function getStyledColor(type) {
        var value = this.getStyled(type);

        if (value === 'none' || !value) {
            value = null;
        } else if (typeof value === 'string') {
            value = cc.hexToColor(value);
        }

        return value;
    },

    _applyStyle: function _applyStyle() {
        var ctx = this.ctx;
        ctx.lineWidth = this.getStyled('lineWidth');
        ctx.lineJoin = this.getStyled('lineJoin');
        ctx.lineCap = this.getStyled('lineCap');

        var strokeColor = this.getStyledColor('strokeColor');
        var fillColor = this.getStyledColor('fillColor');

        if (strokeColor) ctx.strokeColor = strokeColor;
        if (fillColor) ctx.fillColor = fillColor;
    }
};

module.exports = Style;

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
        //# sourceMappingURL=R.style.js.map
        