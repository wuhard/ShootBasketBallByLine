import Singleton from "./Singleton";


// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
let talefun = (<any>cc).talefun;

@ccclass
export default class AudioPlayManager extends Singleton<AudioPlayManager> {

    @property(cc.AudioClip)
    bgAudio:string;

    @property(cc.AudioSource)
    audioSource:cc.AudioSource;

    
    start () {
        this.PlayBgMusic();
        
    }

    public lateUpdate() {
        // let context = cc.sys.__audioSupport.context;
        // if (context.state === 'suspended') {
        //     context.resume();
        // }
    }
       

    public PlayBgMusic()
    {
      
        cc.audioEngine.play(this.bgAudio,true,1);
        
    }

    public PlayEffect(effectPath:string,isLoop:boolean = false,extentName:string = ".mp3")
    {
        var url;
        if(effectPath.lastIndexOf("resources") != -1)
        {
            if(effectPath.lastIndexOf(".") != -1)
            {
                url = cc.url.raw(effectPath);
            }
            else
            {
                url = cc.url.raw(effectPath+extentName);
            }
            
          
        }
        else
        {
            if(effectPath.lastIndexOf(".") != -1)
            {
                url = cc.url.raw("resources/sounds/" + effectPath);
            }
            else
            {
                url = cc.url.raw("resources/sounds/" + effectPath + extentName);
            }
            
           
        }
  
       
        cc.audioEngine.play(url,isLoop,1);
    }
}
