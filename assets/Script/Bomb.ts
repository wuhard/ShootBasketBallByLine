import GameViewLogic from "./GameViewLogic";
import EffectPlayManager from "./EffectPlayManager";

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
export default class Bomb extends cc.Component {

    body:cc.RigidBody;

    gameViewLogic:GameViewLogic;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.body = this.getComponent(cc.RigidBody);
    }

    onBeginContact(contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider) {
     
        if (otherCollider.body.node.name == 'ground') {
            this.gameViewLogic = cc.find("Canvas/Logic").getComponent<GameViewLogic>(GameViewLogic);
 
            this.node.destroy();
         } 
         else if(otherCollider.body.node.name == 'BasketBottom')
         {
            // cc.log("get one score");
             this.gameViewLogic = cc.find("Canvas/Logic").getComponent<GameViewLogic>(GameViewLogic);
 
           
             this.gameViewLogic.RemoveBasketNode(otherCollider.body.node.parent);
             this.gameViewLogic.RemaveAllLine();
            
            // this.gameViewLogic.ShowLosePanel(true);
             let basketWorld = otherCollider.body.node.parent.convertToWorldSpaceAR(cc.v2(0, 0));
             let basketLocalPos =  otherCollider.body.node.parent.parent.convertToNodeSpaceAR(basketWorld);
             this.gameViewLogic.ProduceBoomBasket(basketLocalPos);
  
             this.node.destroy();

         
            
            
         }
       
     }
 
     ProduceNextBasket()
     {
       // cc.log("ProduceNextBasket");
        this.gameViewLogic.ProduceNextLevelBasketCase(2);
        //
     }
    

 }
