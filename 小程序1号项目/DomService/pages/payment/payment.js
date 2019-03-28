// pages/payment/payment.js
Page({
  data:{
    confirm:false,
    orderId:''
  },
  onLoad: function (options) {
    console.log(options)
    // var that = this;
    // 获取到参数
    this.setData({
      orderId: options.id
    })
    // 在缓存中拿到该订单的信息
    var orderInfo = wx.getStorageSync('orderInfo');
    console.log(orderInfo)
    this.setData({
      orderInfo:orderInfo
    })
    console.log(this.data.orderId)
  },
  confirmPayment:function(e){
    var that = this;
    var orderId = that.data.orderId
    console.log(orderId)
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: getApp().data.serviceUrl + '/order/payment',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        orderId: orderId,
        appid: getApp().data.appId,
        openid: openid
      },
      success: function (res) {
        console.log(res)
        var pay = res.data.mapResult;
        console.log(pay)
        //发起支付
        var timeStamp = pay.timeStamp;
        console.log(timeStamp)
        var packages = pay.package;
        console.log(packages)
        var paySign = pay.paySign;
        console.log(paySign)
        var nonceStr = pay.nonceStr;
        var signType = pay.signType
        console.log(nonceStr)
        var param = { "timeStamp": timeStamp, "package": packages, "paySign": paySign, "signType": "MD5", "nonceStr": nonceStr };
        console.log(param)
        that.setData({
          param:param
          // 计算总页数
        })
        that.pay(param)
        // that.setData({
        //   timeStamp: timeStamp,
        //   packages: packages,
        //   paySign: paySign,
        //   signType:signType,
        //   nonceStr: nonceStr
        // })
        // console.log(that.data.signType)
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
    // that.setData({
    //   confirm:true
    // })
  },
  // 取消支付事件
  cancel:function(e){
    var that = this;
    that.setData({
      confirm: false
    })
  },
  // 确认支付
  pay: function (param) {
    var that = this;
    console.log("支付")
    console.log(param)
    console.log(param.package)
    // console.log(timeStamp)
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
        console.log('支付成功')
        wx.navigateTo({
          url: '../index/index'
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  confirm:function(e){
    var that = this;
    setTimeout(function () {
      wx.showModal({
        title: '温馨提示',
        content: '支付成功',
        showCancel: false
      });
    }, 1000)
    that.setData({
      confirm: false
    })
  } 
})