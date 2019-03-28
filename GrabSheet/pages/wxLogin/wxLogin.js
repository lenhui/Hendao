Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              that.queryUsreInfo();
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      that.queryUsreInfo();
      console.log("插入小程序登录用户信息成功！");
      //授权成功后，跳转进入小程序首页
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '拒绝授权，您将无法进入小程序，请授权之后再进入!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    wx.getUserInfo({
      success: function (res) {
        var data = res.userInfo;
        console.log(data);
        wx.setStorageSync("userInfo", data);
        //用户已经授权过
        wx: wx.switchTab({
          url: '../index/index',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    });
}
})