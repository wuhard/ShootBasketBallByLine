import Singleton from "./Singleton";

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
export default class ProduceBasketManager extends Singleton<ProduceBasketManager> {

    @property(cc.Prefab)
    smallBasket:cc.Prefab;

    @property(cc.Prefab)
    bigBasketL:cc.Prefab;

    
    @property(cc.Prefab)
    bigBasketR:cc.Prefab;

    @property(cc.Node)
    pos0:cc.Node;//左边位置
    @property(cc.Node)
    pos1:cc.Node;//中间位置
   
    @property(cc.Node)
    pos2:cc.Node;//右边位置
   
   

    @property(cc.Node)
    basketBackParent:cc.Node;//篮球背面图片
    @property(cc.Node)
    basketFrontParent:cc.Node;//篮球前面图片
    @property(cc.Node)
    basketParent:cc.Node;


    sizeType = 0;// 代表不带板，1代表有板子

    posType = -1;// -1代表左边，0代表中间，1代表右边
    @property(cc.Node)
    leftPos: cc.Node[] = [];
    @property(cc.Node)
    midPos: cc.Node[]= [];
    @property(cc.Node)
    rightPos:cc.Node[]= [];

  
    // LIFE-CYCLE CALLBACKS:

     onLoad () {

    //    var tempChildPos0 =this.pos0.children; 
    //     for (var i = 0; i < tempChildPos0.length; i++) 
    //     { 
          
    //         this.leftPos.push(tempChildPos0[i]);
    //     }

    //     var tempChildPos1 =this.pos1.children; 
    //     for (var i = 0; i < tempChildPos1.length; i++) 
    //     { 
    //         this.midPos.push(tempChildPos1[i]);
    //     }

    //     var tempChildPos2 =this.pos2.children; 
    //     for (var i = 0; i < tempChildPos2.length; i++) 
    //     { 
    //         this.rightPos.push(tempChildPos2[i]);
    //     }
    }

    start () {
       
        
    }

    ///获取位置信息
    GetPos():cc.Vec2
    {
       
        var posIndex = 0;
     
        switch(this.posType)
        {
            case -1:
                    posIndex = this.random(0,this.leftPos.length);
                    cc.log(this.leftPos[posIndex].name);
                    return this.leftPos[posIndex].convertToWorldSpaceAR(cc.v2(0,0));
                break;
            case 0:
                    posIndex = this.random(0,this.midPos.length);
                    cc.log(this.midPos[posIndex].name);
                    return this.midPos[posIndex].convertToWorldSpaceAR(cc.v2(0,0));
                break;
            case 1:
                    posIndex = this.random(0,this.rightPos.length);
                    cc.log(this.rightPos[posIndex].name);
                    return this.rightPos[posIndex].convertToWorldSpaceAR(cc.v2(0,0));
                break;
    

        }

    }



    public ProduceOneBasket()
    {   
        this.posType = this.random(-1,2);
        this.sizeType = this.random(0,2);

   
        let pos = this.GetPos();
       

        var startPos =  this.node.convertToNodeSpaceAR(pos);
      
        let tempbasket:cc.Node;
        switch(this.sizeType)
        {
            case 0:
                    tempbasket = cc.instantiate(this.smallBasket);
                    switch(this.posType)
                    {
                        case -1:
                                 tempbasket.rotation =  30;
                            break;
                        case 0:
                                tempbasket.rotation =  0;
                            break;
                        case 1:
                                tempbasket.rotation =  -30;
                            break;    
                    }
                break;

            case 1:
                    if(this.posType != 0)
                    {
                      
                        switch(this.posType)
                        {
                            case -1:
                                    tempbasket = cc.instantiate(this.bigBasketL);
                                break;
                         
                       
                            case 1:
                                    tempbasket = cc.instantiate(this.bigBasketR);
                                    cc.log(tempbasket.scaleX);
                                break;    
                        }
                    }
                    else 
                    {
                        tempbasket = cc.instantiate(this.smallBasket);
                    }
                    
                   
                break;
        }

      

        this.basketParent.addChild(tempbasket);

        this.basketParent.convertToNodeSpaceAR(startPos);

        tempbasket.position = startPos;

        tempbasket.getComponent("Basket").AdjustColliders();
        let backSp = tempbasket.getChildByName("BackSprite");
        let frontSp = tempbasket.getChildByName("FrontSprite");
        let bottom = tempbasket.getChildByName("BasketBottom");
        

       
        var frontSpWorldPos = tempbasket.convertToWorldSpaceAR(frontSp.getPosition());

        var frontTargetPos =  this.basketFrontParent.convertToNodeSpaceAR(frontSpWorldPos);

        frontSp.parent = this.basketFrontParent;

        frontSp.position = frontTargetPos;
        
         var backSpWorldPos = tempbasket.convertToWorldSpaceAR(backSp.getPosition());

         var backTargetPos =  this.basketBackParent.convertToNodeSpaceAR(backSpWorldPos);

         backSp.parent = this.basketBackParent;
         backSp.position = backTargetPos;

         switch(this.sizeType)
         {
             case 0:
                     
                     switch(this.posType)
                     {
                         case -1:
                                backSp.rotation = 30;
                                frontSp.rotation = 30;
                             break;
                         case 0:
                                backSp.rotation = 0;
                                frontSp.rotation = 0;
                             break;
                         case 1:
                                backSp.rotation = -30;
                                frontSp.rotation = -30;
                             break;    
                     }
                 break;
 
            //  case 1:
            //         switch(this.posType)
            //              {
            //                  case -1:
            //                         backSp.scaleX = -1
            //                         frontSp.rotation = 30;
            //                      break;
                          
                        
            //                  case 1:
            //                          tempbasket.scaleX =  -1;
            //                      break;    
            //              }
                    
            //      break;
         }
      
        
     

       
       
    }



    random(lower, upper) {

        return Math.floor(Math.random() * (upper - lower)) + lower;
        
    }

}
