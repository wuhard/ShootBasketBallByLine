import Singleton from "./Singleton";
import Basket from "./Basket";
import {BasketInfor} from "./SceneLevelData";
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
    basketBackParent:cc.Node;//篮球背面图片
    @property(cc.Node)
    basketFrontParent:cc.Node;//篮球前面图片
    @property(cc.Node)
    basketParent:cc.Node;


    sizeType = 0;// 代表不带板，1代表有板子

    posType = -1;// -1代表左边，0代表中间，1代表右边
    @property(cc.Node)
    basketBornPos: cc.Node[] = [];
   
    basketList:cc.Node[] = [];
     
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
    GetPos(index:number):cc.Vec2
    {    
        return this.basketBornPos[index].convertToWorldSpaceAR(cc.v2(0,0));
    }

    public ProduceOneBasketCase(basketInfors: BasketInfor[])
    {
        let tempbasket:cc.Node;
        let basketCount = basketInfors.length;
        let startPos:cc.Vec2;
        for(var i = 0; i < basketCount; i++)
        {
            startPos = basketInfors[i].basketPos;
            switch(basketInfors[i].basketType)
            {
                case 0:
                    break;
                case  1:
                     break;
                case 2:
                     tempbasket = cc.instantiate(this.smallBasket);
                     break;
                case  3:
                    break;
                case 4:
                    break;                              
            }

            this.basketParent.addChild(tempbasket);
   
            this.basketParent.convertToNodeSpaceAR(startPos);
    
            tempbasket.position = startPos;
    
            var basketS =  tempbasket.getComponent<Basket>(Basket);
            basketS.AdjustColliders();
            this.basketList.push(tempbasket);
    
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
        }

    }

   public ProduceOneBasketByPos(basketPos:number[])
   {
     
        this.sizeType = this.random(0,2);
        let pos ;
        let startPos;

        for(var i = 0; i < basketPos.length; i++)
        {
            if(basketPos[i] != 0)
            {
                pos = this.GetPos(i);
                startPos = this.node.convertToNodeSpaceAR(pos);
                let tempbasket:cc.Node;
                if(i < 2)
                {
                    this.posType = -1;
                }
                else if(i < 4)
                {
                    this.posType = 0;
                }
                else
                {
                    this.posType = 1;
                }

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
        
                var basketS =  tempbasket.getComponent<Basket>(Basket);
                basketS.AdjustColliders();
                this.basketList.push(tempbasket);
        
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
         
                 }
              
            }
        }
    
   }


    public ProduceOneBasket()
    {   
        this.posType = this.random(-1,2);
        this.sizeType = this.random(0,2);


        let pos = this.GetPos(0);
       

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

        var basketS =  tempbasket.getComponent<Basket>(Basket);
        basketS.AdjustColliders();
        this.basketList.push(tempbasket);

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

    //获取篮筐的位置类型（左 中 右）
    public GetPosType():number
    {
        return this.posType;
    }

    public RemoveOneBasket(basketNode:cc.Node)
    {
        var nodeIndex = this.basketList.indexOf(basketNode);
        var targetBasket = this.basketList[nodeIndex];
        var script = targetBasket.getComponent<Basket>(Basket);
        script.RemoveBasket();
        this.basketList.splice(nodeIndex,1);
    }

    public RemoveAllBaskets()
    {
        var lenght = this.basketList.length;
        
        for(var i = 0; i < lenght; i++)
        {
            this.RemoveOneBasket(this.basketList[0]);
        }

       
    }

    random(lower, upper) {

        return Math.floor(Math.random() * (upper - lower)) + lower;
        
    }

}
