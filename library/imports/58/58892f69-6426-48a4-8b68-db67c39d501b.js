"use strict";
cc._RF.push(module, '588929pZCZIpIto22fDnVAb', 'R.utils');
// raphael/utils/R.utils.js

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function mixin(dst, src, addon) {
    for (var key in src) {
        if (!addon || addon && !dst[key]) {
            if (_typeof(src[key]) === 'object') {
                dst[key] = {};
                for (var subKey in src[key]) {
                    dst[key][subKey] = src[key][subKey];
                }
            } else {
                dst[key] = src[key];
            }
        }
    }
}

module.exports = {
    defineClass: function defineClass() {
        var defines = {
            properties: {},
            statics: {}
        };

        for (var i = 0, ii = arguments.length; i < ii; i++) {
            var d = arguments[i];

            mixin(defines.properties, d.properties);
            mixin(defines.statics, d.statics);
            mixin(defines, d, true);
        }

        return defines;
    },

    tesselateBezier: require('./R.tesselateBezier'),
    path2curve: require('R.curve').path2curve,
    drawDashPoints: require('R.dash').drawDashPoints
};

cc._RF.pop();