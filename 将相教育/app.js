//app.js
App({
  data: {
    // serviceUrl: "http://localhost:8080/jxjy",
    serviceUrl: "https://jx8e.com/jxjy",
    deviceId: '1',
    latitude: '',
    longitude: '',
    appId: 'wxe8d758f777cf8170',
    openid: '',
  },
  onLaunch: function () {
    var that = this;
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    var app = this;
    // wx.setStorageSync('logs', logs)
    wx.getSetting({
      success: res => {
        // console.log(res)
      }
    })
    //获取用户openid
    // setTimeout(function(){
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: getApp().data.serviceUrl + '/user/getOpenid',
            data: {
              js_code: res.code,
              appId: getApp().data.appId
            },
            success: function (res) {
              // var openId = res.mapList.openid
              console.log(res)
              try {
                wx.setStorageSync('openid', res.data.mapList.openid);
                wx.setStorageSync('spSession', res.data.mapList.spSession);
              } catch (e) {
                //console.log("set error");
              }
            }
          });
        } else {
          //console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    // },1000)

    // 获取用户信息
    // setTimeout(function(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
                this.globalData.userInfo = res.userInfo
              }
            }
          })
        }
      }
    })
    // },5000)
  },
  globalData: {
    userInfo: null
  }
})