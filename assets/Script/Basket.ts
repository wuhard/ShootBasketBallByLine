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
export default class Basket extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    @property(cc.Node)
    backSprit: cc.Node;
    @property(cc.Node)
    frontSprit: cc.Node;
   
    @property(cc.Node)
    colliderR: cc.Node;
    @property(cc.Node)
    colliderL: cc.Node;
    @property(cc.Node)
    colliderB: cc.Node;



    onLoad () {
        
    }

    start(){
        var offsetR = this.colliderR.position;
        var offsetL = this.colliderL.position;
        var offsetB = this.colliderB.position;
      
        this.MoveToPos(this.colliderR,offsetR);
        this.MoveToPos(this.colliderL,offsetL);
        this.MoveToPos(this.colliderB,offsetB);
    }
    
    MoveToPos(colliderNode:cc.Node,pos : cc.Vec2){
        
        this.scheduleOnce(function(){
                colliderNode.position = pos;
            },0);
    }
    

    onEnter() {
        
    }

    touchStart(event : cc.Event.EventTouch) 
    {
        
    }

    touchMove(event : cc.Event.EventTouch) {
        
    }

    touchEnd(event : cc.Event.EventTouch) {
        
    }

    touchCancel(event : cc.Event.EventTouch) {
        
    }

    public instantiateOneBall()
    {
      
      
    }

    public PlayEnterBallAni(pos:cc.Vec2)
    {
       
    }

    public ProduceOneBasket(pos:cc.Vec2)
    {
       
    }

    public RemaveAllLine()
    {
       
    }

    public RemoveNode(nodeObj:cc.Node)
    {
       
    }
}
