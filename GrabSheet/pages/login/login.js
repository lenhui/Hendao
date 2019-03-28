// pages/login/login.js
Page({
  data:{
    loginCode:'loginCode'
  },
  // 获取用户信息
  userInput: function (e) {
    this.setData({
      name: e.detail.value,
    })
    console.log(this.data.name)
  },
  handleCode: function (e) {
    this.setData({
      code: e.detail.value,
    })
    console.log(this.data.code)
  },
  // 跳转注册页面
  jumpRes:function(e){
    wx:wx.navigateTo({
      url: '../register/register',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 登录
  loginBtn:function(e){
    var that = this;
    // 获取存储用户openId  
    var userOpenid = wx.getStorageSync('openid');
    var name = this.data.name;
    var code = this.data.code;
    console.log(code)
    console.log(name)
    if (name == '' || name == undefined) {
      wx.showModal({
        content: '用户名不可以为空',
        showCancel: false
      });
      return;
    } else if (code == '' || code == undefined){
      wx.showModal({
        content: '请输入密码',
        showCancel: false
      });
      return;
    } else{
      // wx.showLoading({
      //   title: '',
      // })
      wx.request({
        url: getApp().data.serviceUrl + '/member/login',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
          method: "POST",
          data: {
            openid:userOpenid,
            userName: encodeURI(name),
            password: code
          },
        success: function (res) {
         console.log(res)
          if (res.data.code == 0) {
            // 将会员信息存储到缓存中
            console.log(res.data.member)
            wx.setStorageSync("ordinaryMember", res.data.member);
            wx.showToast({
              title: '登录成功'
            });
            // 延迟2秒后跳转到首页
            setTimeout(function () {
              wx.switchTab({
                url: '../index/index',
              })
            }, 3000)
            that.setData({
            });
            // 隐藏加载框
            // wx.hideLoading();
          } else {
            wx.showModal({
              content: '用户不存在或密码错误，请确认后登录。',
              showCancel: false
            });
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
    }
  }
})