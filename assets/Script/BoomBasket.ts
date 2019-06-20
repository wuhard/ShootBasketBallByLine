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
export default class BoomBasket extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    @property(cc.Node)
    boom0: cc.Node;
    @property(cc.Node)
    boom1: cc.Node;
   
    @property(cc.Node)
    boom2: cc.Node;
    @property(cc.Node)
    boom3: cc.Node;
  



    onLoad () {
        
    }

    start(){
        this.boom();
        this.scheduleOnce(function() {
            // 这里的 this 指向 component
             this.destroyBoom();
        }, 1);//2s后执行一次
       
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
        this.boom();
    }


    random(lower, upper) {

        return Math.floor(Math.random() * (upper - lower)) + lower;
        
        }

    boom()
    {
        var force0 = new cc.Vec2(this.random(-1100,-500),this.random(-100,0));
        var force1 = new cc.Vec2(this.random(20,100),this.random(0,500));
        var force2 = new cc.Vec2(this.random(300,800),this.random(0,500));
        var force3 = new cc.Vec2(this.random(0,100),this.random(200,800));
      
        this.boom0.getComponent(cc.RigidBody).applyLinearImpulse(force0, this.boom0.getComponent(cc.RigidBody).getWorldCenter(),true)
        this.boom1.getComponent(cc.RigidBody).applyLinearImpulse(force1, this.boom1.getComponent(cc.RigidBody).getWorldCenter(),true)
        this.boom2.getComponent(cc.RigidBody).applyLinearImpulse(force2, this.boom2.getComponent(cc.RigidBody).getWorldCenter(),true)
        this.boom3.getComponent(cc.RigidBody).applyLinearImpulse(force3, this.boom3.getComponent(cc.RigidBody).getWorldCenter(),true)


    }
 
    destroyBoom()
    {
        this.node.destroy();
    }
}
