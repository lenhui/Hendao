// graceUI/components/graceStar.js
Component({
  properties: {
    starNum : {
      type : Number,
      value : 5
    },
    value : {
      type : Number,
      value : 0
    },
    starImg: {
      type : Object,
      value : [
        "/graceUI/imgs/star.png",
        "/graceUI/imgs/star-active.png"
      ]
    },
    canTap : {
      type : Boolean,
      value : true
    }
  },
  data: {
     
  },
  methods: {
    changNum : function(e){
      if (!this.data.canTap){return ;}
      var val = e.currentTarget.dataset.val;
      this.setData({value : val + 1});
      this.triggerEvent("starChange", val+1);
    }
  }
})
