// Componet/broadcast/broadcast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 控制是否有指示点
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 1000,
    // previousMargin:30,
    // nextMargin:20,
    // 控制是横向还是竖向的
    vertical:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
