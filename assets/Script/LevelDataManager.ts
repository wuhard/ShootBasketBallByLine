import Singleton from "./Singleton";
import ProduceBasketManager from "./ProduceBasketManager";
import SceneLevelData, { BasketInforJson } from "./SceneLevelData";
import {BasketInfor} from "./SceneLevelData";
import {ShootInfor} from "./SceneLevelData";
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

    //读取关卡数据
    LoadJson(json_name:string) {
        let json_url = 'json/' + json_name;
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(json_url, (err, object) => {
                if (err) {
                    reject(err);
                } else {
                    this.levelData = object;
                    cc.log(this.levelData[0].basketInfors[0].basketPos);
                    cc.log(this.levelData.length);
                   // this.StringToNumberArray(this.levelData[0].basketPos);
                }
            });
        });
    }
    
    ///获取某一个关卡的篮筐信息
    public GetBasketInforsByLevel(levelIndex:number):BasketInfor[]
    {
        let infors:BasketInfor[] = [];
        for(var i = 0; i < this.levelData[levelIndex].basketInfors.length; i++)
        {
            let oneInfor = new BasketInfor();
            cc.log(this.StringToVec2(this.levelData[levelIndex].basketInfors[i].basketPos));
            oneInfor.basketPos = this.StringToVec2(this.levelData[levelIndex].basketInfors[i].basketPos);
            oneInfor.basketType = this.levelData[levelIndex].basketInfors[i].basketType;
            oneInfor.moveEndPos = this.StringToVec2(this.levelData[levelIndex].basketInfors[i].moveEndPos)
            oneInfor.moveDuringTime =  this.levelData[levelIndex].basketInfors[i].moveDuringTime;
            infors.push(oneInfor);
        }
        return infors;
    }

    ///获取某一关卡的射击信息
    public GetShootInforByLevel(levelIndex:number):ShootInfor[]
    {
        let infors:ShootInfor[] = [];
        for(var i = 0; i < this.levelData[levelIndex].shootInfors.length; i++)
        {
            let oneInfor = new ShootInfor();
         
            oneInfor.shootType = this.levelData[levelIndex].shootInfors[i].shootType;
            oneInfor.shootPos = this.StringToVec2(this.levelData[levelIndex].shootInfors[i].shootPos);
            oneInfor.velocity = this.StringToVec2(this.levelData[levelIndex].shootInfors[i].velocity)
            oneInfor.shootDelayTime =  this.levelData[levelIndex].shootInfors[i].shootDelayTime;
            infors.push(oneInfor);
        }
        return infors;
    }


    public GetLevelLength():number
    {
        return this.levelData.length;
    }


    ///字符串转vec2
    public StringToVec2(str:string):cc.Vec2
    {
        let vecNum = this.StringToNumberArray(str);
        return cc.v2(vecNum[0],vecNum[1]);
    }

    //字符串转换成数组
    public StringToNumberArray(str:string):number[]
    {
        var num : number[] = [];
        var numStr = str.split('_');
        for(var i = 0; i < numStr.length; i++)
        {
            num.push(Number(numStr[i]));      
        }

        return num;
    }

}
