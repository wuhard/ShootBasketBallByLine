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
    colliders: cc.Node[] = [];


    offsets:cc.Vec2[] = [];
   


    onLoad () {
       for(var i = 0; i < this.colliders.length; i++)
       {
           this.offsets.push(this.colliders[i].position);
       }
    }

    start(){
       
      
       
    }
    
    MoveToPos(colliderNode:cc.Node,pos : cc.Vec2){
        
        this.scheduleOnce(function(){
                colliderNode.position = pos;
            },0.01);
    }
    

    onEnter() {
        
    }

    public AdjustColliders()
    {

        for(var i = 0; i < this.colliders.length; i++)
        {
            this.MoveToPos(this.colliders[i],this.offsets[i]);
        }
    }
    
    public RemoveBasket()
    {
        this.backSprit.destroy();
        this.frontSprit.destroy();
        for(var i = 0; i < this.colliders.length; i++)
        {
            this.colliders[i].destroy();
        }
        this.node.destroy();
    }

    public AdJustSprites()
    {

    }
 
}
