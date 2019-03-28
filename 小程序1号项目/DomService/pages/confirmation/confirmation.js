// pages/confirmation/confirmation.js
Page({
  data:{
    isAddress:false,
    confirm: false
  },
  pay:function(e){
    this.setData({
      confirm:true
    })
  },
  // 取消支付事件
  cancel: function (e) {
    var that = this;
    that.setData({
      confirm: false
    })
  },
  jumpAddress:function(e){
    wx:wx.navigateTo({
      url: '../addressList/addressList',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 确认支付
  confirm: function (e) {
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
  },
 
})