// page/myOrder/myOrder.js
Page({

  data: {
    // Tab横向切换
    // 全部订单
    orderLists: [{
      img: '../images/dev1.png',
      title: '扁平型管道清扫机器人300g海天出品',
      price: '22',
      num: '1'
    }, {
      img: '../images/dev9.png',
      title: '扁平型管道清扫机器人300g海天出品',
      price: '34',
      num: '2'
    }, {
      img: '../images/dev5.png',
      title: '扁平型管道清扫机器人）300g海天出品',
      price: '12',
      num: '2'
    }, {
      img: '../images/dev2.jpg',
      title: '扁平型管道清扫机器人300g海天出品',
      price: '16',
      num: '2'
    }, {
      img: '../images/dev9.png',
      title: '扁平型管道清扫机器人300g海天出品',
      price: '43',
      num: '2'
    }, {
      img: '../images/dev5.png',
      title: '扁平型管道清扫机器人300g海天出品',
      price: '43',
      num: '2'
    }, {
      img: '../images/dev9.png',
      title: '扁平型管道清扫机器人300g海天出品',
      price: '43',
      num: '2'
    }, {
      img: '../images/dev2.jpg',
      title: '扁平型管道清扫机器人300g海天出品',
      price: '43',
      num: '2'
      }, {
        img: '../images/dev2.jpg',
        title: '扁平型管道清扫机器人300g海天出品',
        price: '43',
        num: '2'
      }, {
        img: '../images/dev2.jpg',
        title: '扁平型管道清扫机器人300g海天出品',
        price: '43',
        num: '2'
      }, {
        img: '../images/dev2.jpg',
        title: '扁平型管道清扫机器人300g海天出品',
        price: '43',
        num: '2'
      }, {
        img: '../images/dev2.jpg',
        title: '扁平型管道清扫机器人300g海天出品',
        price: '43',
        num: '2'
      }, {
        img: '../images/dev2.jpg',
        title: '扁平型管道清扫机器人300g海天出品',
        price: '43',
        num: '2'
      }, {
        img: '../images/dev2.jpg',
        title: '扁平型管道清扫机器人300g海天出品',
        price: '43',
        num: '2'
      }],
    // 已完成订单
    Ordered: [{
      img: '../images/dev2.jpg',
      title: '扁平型管道清扫机器人300g海天出品',
      price: '43',
      num: '2'
    }, {
      img: '../images/dev5.png',
      title: '扁平型管道清扫机器人300g海天出品',
      price: '12',
      num: '2'
    }, {
      img: '../images/dev5.png',
      title: '扁平型管道清扫机器人300g海天出品',
      price: '22',
      num: '1'
    }],
    // 待支付订单
    Ordering: [{
      img: '../images/dev9.png',
      title: '扁平型管道清扫机器人300g海天出品',
      price: '43',
      num: '2'
    }],
    selected: true,
    selected1: false,
    selected2: false,

  },

  // Tab横向切换
  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
  jumpshopDes: function (e) {
    wx: wx.navigateTo({
      url: '../product/product',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
