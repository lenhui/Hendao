// pages/demo/timeline.js
let app = getApp();
Page({
  data: {
		staticUrl : app.staticUrl
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    this.setData({
      Id: options.id,
      orderNumber: options.orderNumber
    })
    var orderId = this.data.Id;
    var orderNumber = this.data.orderNumber;
    console.log(orderId)
    console.log(orderNumber)
    // 进度接口
    wx.request({
      url: getApp().data.serviceUrl + '/orderProgressLog/findAll',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        orderNumber: orderNumber
      },
      success: function (res) {
      console.log(res)
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})