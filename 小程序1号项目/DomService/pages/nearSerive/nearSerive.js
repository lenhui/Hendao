// pages/nearSerive/nearSerive.js
Page({
  data:{

  },
  chooseServer:function(e){
    wx:wx.navigateTo({
      url: '../management/management',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})
