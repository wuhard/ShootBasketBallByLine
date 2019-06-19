import GameViewLogic from "./GameViewLogic";
import EnterBallAni from "./EnterBallAni";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
 
    properties: {
        body:cc.RigidBody,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.body = this.getComponent(cc.RigidBody);
         this.body.linearVelocity = cc.v2(1000,2000);
    },

    onBeginContact(contact, selfCollider, otherCollider) {
      
        if (otherCollider.node.name == 'ground') {
           var script = cc.find("Canvas/Logic").getComponent("GameViewLogic");

           script.instantiateOneBall();
           script.RemaveAllLine();
           this.node.destroy();

        }
        else if(otherCollider.node.name == 'BasketBottom')
        {
            cc.log("get one score");
            var script = cc.find("Canvas/Logic").getComponent("GameViewLogic");

            script.instantiateOneBall();
            script.RemoveBasketNode(otherCollider.node.parent);
            script.RemaveAllLine(otherCollider.node.parent);
            script.PlayEnterBallAni(otherCollider.node.convertToWorldSpaceAR(cc.v2(0, 0)));
            this.node.destroy();
            
        }
      
    }

   
});
