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
export default class MenuPanel extends cc.Component {

    @property(cc.Label)
    scoreLabel: cc.Label = null;
    @property(cc.Label)
    levelLabel: cc.Label = null;
    
    @property(cc.Node)
    levelShowNode: cc.Node = null;


    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    public ShowLevelInfor(levelIndex:number,socreNum:number,maxLevel:number)
    {
        this.levelLabel.string = "第 " +  (levelIndex+1).toString() +" 关";
        this.scoreLabel.string = socreNum.toString();
        if(levelIndex == 0)
        {
            this.levelShowNode.getChildByName("LastLevelBtn").active = false;
        }
        else
        {
            this.levelShowNode.getChildByName("LastLevelBtn").active = true;
        }

        if(levelIndex == maxLevel-1)
        {
            this.levelShowNode.getChildByName("NextLevelBtn").active = false;
        }
        else
        {
            this.levelShowNode.getChildByName("NextLevelBtn").active = true;
        }

        this.levelShowNode.getChildByName("LastLevelBtn").getComponentInChildren<cc.Label>(cc.Label).string = levelIndex.toString();
        
        this.levelShowNode.getChildByName("LevelBtn").getComponentInChildren<cc.Label>(cc.Label).string = (levelIndex+1).toString();
        this.levelShowNode.getChildByName("NextLevelBtn").getComponentInChildren<cc.Label>(cc.Label).string = (levelIndex+2).toString();
    }
    // update (dt) {}
}
