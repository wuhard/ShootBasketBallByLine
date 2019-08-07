import Singleton from "./Singleton";
import ShowScore from "./ShowScore";

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
export default class EffectPlayManager extends Singleton<EffectPlayManager> {

    @property(cc.Prefab)
    enterBallAni:cc.Prefab;

   
    
    @property(cc.Prefab)
    score:cc.Prefab;

    @property(cc.Prefab)
    bombBasket:cc.Prefab;

    
    @property(cc.Prefab)
    lineDieParticlePrefab:cc.Prefab;
    // LIFE-CYCLE CALLBACKS:

    //线的间隔
    linePointDieDis:number = 25;

    ///线的长度
    lineDis : number;
    
    linePartices:cc.Node[] = [];
    // onLoad () {}

    start () {
      
    }

    public PlayEnterBallAni(pos:cc.Vec2)
    {
        let ani = cc.instantiate(this.enterBallAni);
       // cc.log("PlayAni");
        ani.parent = this.node;
        ani.setPosition(pos);
    }

    ///得分动画
    public PlayScoreAni(pos:cc.Vec2,lineCount:number)
    {
       let score = cc.instantiate(this.score);
       var script = score.getComponent<ShowScore>(ShowScore);
       script.ShowScorePoint(lineCount);
       // cc.log("PlayAni");
       score.parent = this.node;
       score.setPosition(pos);
    }
    
    public PlayBombBasketAni(pos:cc.Vec2)
    {  
        let bombBasket = cc.instantiate(this.bombBasket);
        // cc.log("PlayAni");
        bombBasket.parent = this.node;
        bombBasket.setPosition(pos);

    }

    ///获取线的长度
    GetLineDis(points:cc.Vec2[]):number
    {
        this.lineDis = 0;
        for(var i = 0; i < points.length-1; i++)
        {
            this.lineDis += cc.pDistance(points[i], points[i+1]) 
        }

        return this.lineDis;
    }

    public PlayLineDieEffection(points:cc.Vec2[])
    {
        this.linePartices.splice(0,this.linePartices.length);
      
        if(points.length <= 0)
        {
            return;
        }

        var diePointNum = this.GetLineDis(points) / this.linePointDieDis + 1;
      //  cc.log(points.length + "  " + diePointNum);
        if(points.length > diePointNum)
        {
            
            for(var i = 0; i < diePointNum; i++)
            {
                let lineDie = cc.instantiate(this.lineDieParticlePrefab);
                lineDie.parent = this.node;
                this.linePartices.push(lineDie);
                if(points.length/diePointNum * i < points.length)
                {
                  
                    lineDie.setPosition(points[Math.floor(points.length/diePointNum * i)]);
                }
                
            }
        }
        else
        {
            for(var i = 0; i < points.length-1; i++)
            {
                
                let pointNum = cc.pDistance(points[i],points[i+1])/this.linePointDieDis;
                // cc.log(cc.pDistance(points[i],points[i+1])+ "  " + pointNum);
                let lineDie = cc.instantiate(this.lineDieParticlePrefab);
                lineDie.parent = this.node;
                this.linePartices.push(lineDie);
                lineDie.setPosition(points[i]);
                for(var j = 1; j < pointNum; j++)
                {
                    cc.log ("add");
                    let lineDie = cc.instantiate(this.lineDieParticlePrefab);
                    lineDie.parent = this.node;
                    this.linePartices.push(lineDie);
                    let x = (j+1)/pointNum*points[i+1].x + (pointNum - j - 1)/pointNum*points[i].x;
                    let y = (j+1)/pointNum*points[i+1].y + (pointNum - j - 1)/pointNum*points[i].y;
                    let pos = cc.v2(x,y);
                    lineDie.setPosition(pos);
                } 
              
            }
            
                let lineDie = cc.instantiate(this.lineDieParticlePrefab);
                lineDie.parent = this.node;
                this.linePartices.push(lineDie);
                lineDie.setPosition(points[points.length - 1]);
        }
    
    }

      
       
}
