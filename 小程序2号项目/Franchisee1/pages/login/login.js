// pages/demo/login.js
Page({
  data: {
		pnpre : '86',
		pnpres : ['86', '01', '11', '26', '520'],
    getCode: '获取验证码',
    disabled: false,
  },
  onShow:function(){
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    console.log(ordinaryMember)
  },
	changePre : function(e){
		this.setData({ pnpre: this.data.pnpres[e.detail.value]})
	},
	loginWithWx : function(){
		wx.showToast({
			title: '请完善对应登录代码',
			icon : "none"
		});
	},
  phoneInput:function(e){
    console.log(e)
    this.setData({
      phone: e.detail.value
    })
    // console.log(this.data.phone)
  },
  codeInput:function(e){
    console.log(e)
    this.setData({
      code: e.detail.value
    })
  },
  // 获取验证码
  // 获取验证码倒计时
  getCode: function (e) {
    var that = this
    var phone = this.data.phone;
    console.log(phone)
    var warn = null;
    var state = 0;
    console.log(that.data.phone)
    // 后端判断输入的手机号是否已被注册，例如：1为已注册，0为未注册
    if (phone == undefined || phone == '') {
      warn = '手机号码不可以为空'
      console.log(warn)
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = '手机格式不正确'
    }
    // else if (state == 1) {
    //   warn = '该手机号已被注册'
    // } 
    else {
      // 获取验证码接口调用
      console.log(phone)
      var openid = wx.getStorageSync('openid');
      wx.request({
        url: getApp().data.serviceUrl + '/phoneVerificationCode/getVerificationCode',
        method: "GET",
        header: {
          'content-type': 'application/json'
        },
        data: {
          openid: openid,
          phone: phone
        },
        success: function (res) {
          console.log(res)
          // 将登录信息存储到缓存中
          if (res.data.code == 0) {
            wx.showToast({
              title: '短信验证码已发送',
              icon: 'none',
              duration: 2000
            });
            that.setData({
              codeMsg: res.data.verificationCode
            })
          }
          //短信验证码
          console.log(res.data.verificationCode)
        },
        fail: function (e) {
          wx.showToast({
            title: '网络断开，稍后重试',
            icon: 'none',
            duration: 2000
          })
          console.log(222)
        }
      })
      // 获取验证码接口调用结束
      var num = 61;
      if (!that.data.disabled) {
        var timer = setInterval(function () {
          num--;
          if (num <= 61 && num >= 0) {
            that.setData({
              getCode: num + 's',
              disabled: true,
              color: '#bfbfbf'
            })
          } else {
            that.setData({
              getCode: '获取验证码',
              disabled: false,
              color: '#06C2F6'
            })
            clearInterval(timer)
          }
        }, 1000)
      }
    }
    if (warn != null) {
      wx.showModal({
        title: '提示',
        content: warn
      })
      that.setData({
        getCode: '获取验证码',
        disabled: false,
        color: '#06C2F6'
      })
    }
    return;
  },
  loginNow : function(e){
    var that = this;
    // 获取存储用户openId  
    var userOpenid = wx.getStorageSync('openid');
    var phone = this.data.phone;
    var warn = null;
    var codeMsg = that.data.codeMsg//请求接口数据
    var code = this.data.code;
    console.log(code)
    console.log(phone)
    if (phone == undefined || phone == '') {
      wx.showModal({
        content: '手机号码不可以为空',
        showCancel: false
      });
       console.log(warn)
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      wx.showModal({
        content: '手机格式不正确',
        showCancel: false
      });
    }
    else if (code == '' || code == undefined) {
     wx.showModal({
    content: '请输入验证码',
    showCancel: false
     });
     return;
     } else if (code != codeMsg) {
      wx.showModal({
      content: '验证码有误',
      showCancel: false
    });
      return;
   } else {
      // wx.showLoading({
      //   title: '',
      // })
      wx.request({
        url: getApp().data.serviceUrl + '/business/loginByPhone',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        data: {
          openid: userOpenid,
          phone: phone,
          verificationCode: code
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 0 && res.data.business != null) {
            // 将会员信息存储到缓存中
            console.log(res.data.business)
            wx.setStorageSync("ordinaryMember", res.data.business);
            // var ordinaryMember = wx.getStorageSync('ordinaryMember');
            // console.log(ordinaryMember)
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
          } else if (res.data.code == 0 && res.data.business == null){
            wx.showModal({
              content: '请先注册后登录',
              showCancel: false
            });
          } else if (res.data.code == 4){
            wx.showModal({
              content: '验证码有误，请重新获取',
              showCancel: false
            });
          } else if (res.data.code == 1){
            wx.showModal({
              content: '登录失败',
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
  },
  zhuce:function(){
    wx: wx.navigateTo({
      url: '../register/register',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})