cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        this.path = this.addComponent('R.path');
        this.path.fillColor = 'none';
        this.path.lineWidth = 7;
        this.path.showHandles = false;
        this.path.StrokeColor = cc.Color.WHITE;
        
      

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
        }, this.node);
    },

    onTouchBegan: function (touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        this.points = [touchLoc];

        return true;
    },

    onTouchMoved: function (touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        this.points.push(touchLoc);
        this.path.points(this.points);
        //this.path.simplify();
       // this.path.smooth();
    },

    onTouchEnded: function (touch, event) {
        this.path.points(this.points);
        this.path.smooth();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
    },
});
