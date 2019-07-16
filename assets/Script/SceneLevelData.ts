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

@ccclass
export default class SceneLevelData
{
    public  basketInfors:BasketInforJson[] = [];
    public  shootInfors: ShootInforJson[] = [];
}

export class BasketInforJson
{
    public basketPos:string = "78_200"; //篮球位置 78（左边x坐标） 350中间坐标  630右边坐标
    public moveEndPos: string = "100_100"; //移动终点坐标
    public basketType: number = 0; //篮筐类型 0是左边带板，1 左边不呆板， 2中间， 3右边带板， 4 右边不带板
    public moveDuringTime:number = 0; //移动时间
}

export class BasketInfor
{
    public basketPos:cc.Vec2 = cc.v2(0,0) ;
    public moveEndPos: cc.Vec2 ;//移动终点坐标
    public basketType: number = 0; //篮筐类型 0是左边带板，1 左边不呆板， 2中间， 3右边带板， 4 右边不带板
    public moveDuringTime:number = 0; //移动时间
    constructor()
    {
        
    }
}

export class ShootInforJson
{
    public shootType :number = 0; //0代表篮球 1代表炸弹
    public shootPos : string = "1000_2000"; //射击点的横坐标0-720
    public velocity: string = "1000_2000";//初始速度x_y
    public shootDelayTime = 1000; //射击延迟时间
}

export class ShootInfor
{
    public shootType :number = 0; //0代表篮球 1代表炸弹
    public shootPos : cc.Vec2; //射击点的横坐标0-720
    public velocity: cc.Vec2;//初始速度x_y
    public shootDelayTime = 1000; //射击延迟时间

}
    

