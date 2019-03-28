// page/me/me.js
const app = getApp()
//console.log(app.globalData) 
Page({
  data: {
    userInfo:'',
    // accountPhone: '18211575555',
    num: '1',
    userInfo: {},
    // 新品推荐
    // myList: [{
    //   iconPath: '../../pages/images/card.png',
    //   text: '关于我们'
    // }, {
    //   iconPath: '../../pages/images/card.png',
    //   text: '联系客服'
    // },{
    //   iconPath: '../../pages/images/card.png',
    //   text: '意见反馈'
    // }],
    // Url: [
    //   '../about/about',
    //   '../customer/customer',
    //   '../feedBack/feedBack'
    // ]
  },
  onShow: function () {
    var that = this;
    // 从缓存中获取用户的登录信息
    // wx.setStorageSync("ordinaryMember", '');
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    that.setData({
      ordinaryMember: ordinaryMember
    })
    console.log(ordinaryMember)
  },
  onLoad(){
    //  获取到用户信息
    var openid = wx.getStorageSync('openid');
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      avatarUrl: userInfo.avatarUrl
    })
    console.log(userInfo)
  },
  // 跳转到登录页
  jumpLogin: function (e) {
    wx: wx.navigateTo({
      url: '../login/login',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  JumpAbout: function () {
    wx.navigateTo({
      url: '../about/about'
    })
  },
  Jumpkefu: function () {
    wx: wx.navigateTo({
      url: '../customer/customer',
      success: function (res) {
        // console.log(res.errMsg)
      },
      fail: function (res) {
        // console.log(res.errMsg)
      },
      complete: function (res) {
        //console.log(res.errMsg)
      },
    })
  },
  JumpFeedback: function (e) {
    wx.navigateTo({
      url: '../feedBack/feedBack'
    })
  },
  Jumpwarehouset:function(e){
    wx.navigateTo({
      url: '../warehouse/warehouse'
    })
  },
  // 退出事件
  loginOut:function(e){
    // 获取存储用户openId  
    var userOpenid = wx.getStorageSync('openid');
    console.log(userOpenid)
    var that = this
    wx.showModal({
      title: '确认',
      content: '您确定退出吗?',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          // wx.showLoading({
          //   title: '正在提交中',
          // })
          wx.request({
            url: getApp().data.serviceUrl + '/business/logOutByOpenid',
            data: {
              openid: userOpenid
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res)
              if (res.data.code == 0) {
                // console.log(getCurrentPages())
                wx.setStorageSync("ordinaryMember", ''); 
                var ordinaryMember = wx.getStorageSync('ordinaryMember');
                that.setData({
                  ordinaryMember: ordinaryMember,
                })
                // wx.setStorageSync('userInfo','')
                wx.showToast({
                  title: '退出成功！',
                  duration: 2000
                });
                
              } else {
                wx.showToast({
                  title: '您还没有登录！',
                  duration: 2000
                });
              }
            }
          })
        } else {
          console.log('用户点击辅助操作')
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    });
  },
  // 跳转到修改用户信息
  modifyInfo:function(e){
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    if (!ordinaryMember || ordinaryMember == null) {
      wx: wx.showModal({
        title: '提示',
        content: '请先登录后修改',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) {
          if (res.confirm) {
            wx: wx.navigateTo({
              url: '../login/login',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx: wx.navigateTo({
        url: '../modifyInfo/modifyInfo',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
   
  },
  JumpMallOrder:function(e){
    wx:wx.navigateTo({
      url: '../mallOrder/mallOrder',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})
