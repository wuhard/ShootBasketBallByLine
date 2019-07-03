import Singleton from "./Singleton";
import ProduceBasketManager from "./ProduceBasketManager";
import SceneLevelData from "./SceneLevelData";

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
export default class LevelDataManager extends Singleton<LevelDataManager> {

   public levelData:SceneLevelData[] = [];


    start () {
        this.LoadJson("LevelData");
    }

    LoadJson(json_name:string) {
        let json_url = 'json/' + json_name;
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(json_url, (err, object) => {
                if (err) {
                    reject(err);
                } else {
                    this.levelData = object;
                   // this.StringToNumberArray(this.levelData[0].basketPos);
                }
            });
        });
    }
    
    public GetBasketPos(levelIndex:number):number[]
    {
        return this.StringToNumberArray(this.levelData[levelIndex].basketPos);
    }


    //字符串转换成数组
    public StringToNumberArray(str:string):number[]
    {
        var num : number[] = [];
        for(var i = 0; i < str.length; i++)
        {
            num.push(Number(str.substr(i,1)));
           cc.log(Number(str.substr(i,1)));
        }

        return num;
    }

}
