//app.js
App({
  data: {
    // serviceUrl: "https://bz7c.com/domesticService",
    serviceUrl: "http://localhost:8080/domesticService",
    // serviceUrl:"http://localhost:8080/domesticService",
    // userInfo: null,
    deviceId: '1',
    latitude: '',
    longitude: '',
    appId: 'wx917b30bb96e3291b',
    openid: '',
  },
  staticUrl: "https://staticimgs.oss-cn-beijing.aliyuncs.com/",
  onLaunch: function () {
    var that = this;
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    var app = this;
    // wx.setStorageSync('logs', logs)
    wx.getSetting({
      success: res => {
        console.log(res)
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
    userInfo: null,
    hasLogin: false,
    shops: [
      {
        id: 1,
        img: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/shops/shop_1.jpg',
        distance: 1.8,
        sales: 1475,
        logo: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/shops/logo_1.jpg',
        name: '杨国福麻辣烫(东四店)',
        desc: '满25减8；满35减10；满60减15（在线支付专享）'
      },
      {
        id: 2,
        img: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/shops/shop_2.jpg',
        distance: 2.4,
        sales: 1284,
        logo: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/shops/logo_2.jpg',
        name: '忠友麻辣烫(东四店)',
        desc: '满25减8；满35减10；满60减15（在线支付专享）'
      },
      {
        id: 3,
        img: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/shops/shop_3.jpg',
        distance: 2.3,
        sales: 2039,
        logo: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/shops/logo_3.jpg',
        name: '粥面故事(东大桥店)',
        desc: '满25减8；满35减10；满60减15（在线支付专享）'
      },
      {
        id: 4,
        img: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/shops/shop_4.jpg',
        distance: 3.4,
        sales: 400,
        logo: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/shops/logo_4.jpg',
        name: '兄鸡',
        desc: '满25减8；满35减10；满60减15（在线支付专享）'
      }
    ]
  },
  rd_session: null,
  login: function () {
    var self = this;
    wx.login({
      success: function (res) {
        console.log('wx.login', res)
        server.getJSON('/WxAppApi/setUserSessionKey', { code: res.code }, function (res) {
          console.log('setUserSessionKey', res)
          self.rd_session = res.data.data.rd_session;
          self.globalData.hasLogin = true;
          wx.setStorageSync('rd_session', self.rd_session);
          self.getUserInfo();
        });
      }
    });
  },

})