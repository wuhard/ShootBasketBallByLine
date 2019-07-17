import EnterBallAni from "./EnterBallAni";

// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;
let talefun = (<any>cc).talefun;

@ccclass
export default class ShowScore extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    @property(cc.Node)
    score:cc.Node[] = [];
    start(){
          
    }

    public ShowScorePoint(scoreNum:number)
    {
        for(var i = 0; i < this.score.length; i++)
        {
            this.score[i].active = false;
        }

        this.score[scoreNum].active = true;
    }
    
   
}
