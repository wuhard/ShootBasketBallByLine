(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AudioPlayManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7d5c4tz8VxLAIb19dIsyObZ', 'AudioPlayManager', __filename);
// Script/AudioPlayManager.ts

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
var AudioPlayManager = /** @class */ (function (_super) {
    __extends(AudioPlayManager, _super);
    function AudioPlayManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AudioPlayManager.prototype.start = function () {
        this.PlayBgMusic();
    };
    AudioPlayManager.prototype.lateUpdate = function () {
        // let context = cc.sys.__audioSupport.context;
        // if (context.state === 'suspended') {
        //     context.resume();
        // }
    };
    AudioPlayManager.prototype.PlayBgMusic = function () {
        cc.audioEngine.play(this.bgAudio, true, 1);
    };
    AudioPlayManager.prototype.PlayEffect = function (effectPath, isLoop, extentName) {
        if (isLoop === void 0) { isLoop = false; }
        if (extentName === void 0) { extentName = ".mp3"; }
        var url;
        if (effectPath.lastIndexOf("resources") != -1) {
            if (effectPath.lastIndexOf(".") != -1) {
                url = cc.url.raw(effectPath);
            }
            else {
                url = cc.url.raw(effectPath + extentName);
            }
        }
        else {
            if (effectPath.lastIndexOf(".") != -1) {
                url = cc.url.raw("resources/sounds/" + effectPath);
            }
            else {
                url = cc.url.raw("resources/sounds/" + effectPath + extentName);
            }
        }
        cc.audioEngine.play(url, isLoop, 1);
    };
    __decorate([
        property(cc.AudioClip)
    ], AudioPlayManager.prototype, "bgAudio", void 0);
    __decorate([
        property(cc.AudioSource)
    ], AudioPlayManager.prototype, "audioSource", void 0);
    AudioPlayManager = __decorate([
        ccclass
    ], AudioPlayManager);
    return AudioPlayManager;
}(Singleton_1.default));
exports.default = AudioPlayManager;

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
        //# sourceMappingURL=AudioPlayManager.js.map
        