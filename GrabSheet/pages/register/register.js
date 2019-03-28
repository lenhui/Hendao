Page({
  data:{
    getCode:'获取验证码',
    disabled:false,
    color:'#06C2F6'
  },
  // 获取用户名
  handleUsername:function(e){
    this.setData({
      user: e.detail.value,
    })
  },
  handleName:function(e){
    this.setData({
      name:e.detail.value,
    })
    console.log(this.data.tel)
  },
  handleTel: function (e) {
    this.setData({
      tel: e.detail.value,
    })
    console.log(this.data.tel)
  },
  handleCode: function (e) {
    this.setData({
      code: e.detail.value,
    })
    console.log(this.data.code)
  },
  handlePwd: function (e) {
    this.setData({
      pwd: e.detail.value,
    })
    console.log(this.data.pwd)
  },
  handleAgain: function (e) {
    this.setData({
      pwdAgain: e.detail.value,
    })
    console.log(this.data.pwdAgain)
  },
  //密码失去焦点事件
  loseFocus:function(e){
    var that = this
    console.log(e)
    var pwd = e.detail.value;
    if (pwd.length < 6 || pwd.length > 11){
      wx.showModal({
        content: '密码长度输入错误，最少6位最大11位',
        showCancel: false
      });
      return false;
    }else{
      that.setData({
        pwd: pwd
      })
    }

    console.log(e)
  },
  loseFocusA:function(e){
    console.log(e)
    var pwd = this.data.pwd
    var pwdAgain = e.detail.value;
    if (pwdAgain != pwd) {
      wx.showModal({
      content: '两次密码不一致，请重新输入',
     showCancel: false
    });
    } 
    },
  // 获取邮箱号
  handleEmail:function(e){
    this.setData({
      email: e.detail.value,
    })
  },
  // 获取所在公司
  handleCompany:function(e){
    this.setData({
      company: e.detail.value,
    })
  },
  // 获得所在职位
  handlePosition:function(e){
    this.setData({
      position: e.detail.value,
    })
  },
  // 获得所属行业
  handleIndustry:function(e){
    this.setData({
      industry: e.detail.value,
    })
  },
  // 获取验证码倒计时
  getCode:function(e){
    console.log(this.data.pwd2)
  },
  // 获取验证码倒计时
  getCode:function(e){
    var that = this
    var tel = this.data.tel;
    var warn = null;
    var state = 0;
    console.log(that.data.tel)
    // 后端判断输入的手机号是否已被注册，例如：1为已注册，0为未注册
    if (tel == undefined || tel == ''){
      warn = '手机号码不可以为空'
      console.log(warn)
    } else if (tel.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(tel)){
      warn = '手机格式不正确'
    } else if (state == 1){
      warn = '该手机号已被注册'
    }else{
      wx.showToast({
        title: '短信验证码已发送',
        icon: 'none',
        duration: 2000
      });
      var num = 61;
      if (!that.data.disabled) {
        var timer = setInterval(function () {
          num--;
          if (num <= 61 && num >= 0) {
            that.setData({
              getCode: num + 's后重新发送',
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
    if(warn != null){
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
   
  // 提交
  submit:function(e){
    // 判断验证码是否正确
    var that = this;
    var code = this.data.code;
    var codeMsg = '111'//请求接口数据
    var pwd = this.data.pwd;
    var pwdAgain = this.data.pwdAgain;
    var tel = this.data.tel;
    // 获取存储用户openId  
    var userOpenid = wx.getStorageSync('openid');
    console.log(that.data.user)
    if (that.data.name == '' || that.data.name == undefined) {
      wx.showModal({
        content: '姓名不可以为空',
        showCancel: false
      });
      return;
    } else if (that.data.user == '' || that.data.user == undefined){
      wx.showModal({
        content: '用户名不可以为空',
        showCancel: false
      });
      return;
    }
    // if (that.data.user == '' || that.data.user == undefined){
    //   wx.showModal({
    //     content: '用户名不可以为空',
    //     showCancel: false                                                                                                                 
    //   });
    //   return;
    // }
    // else if (that.data.name == '' || that.data.name== undefined){
    //   wx.showModal({
    //     content: '姓名不可以为空',
    //     showCancel: false
    //   });
    //   return;
    // }
    else if (pwd == '' || pwd == undefined) {
      wx.showModal({
        content: '密码不可以为空',
        showCancel: false
      });
    } else if (pwdAgain != pwd) {
      wx.showModal({
        content: '两次密码不一致',
        showCancel: false
      });
      return;
    } 
     else if (tel == undefined || tel == ''){
      wx.showModal({
        content: '手机号不可以为空',
        showCancel: false
      });
    } else if (tel.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(tel)){
      wx.showModal({
        content: '手机格式不正确',
        showCancel: false
      });
    } else if (that.data.email == '') {
      wx.showModal({
        content: '邮箱号不能为空',
        showCancel: false
      });
    }
    else if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(that.data.email)) {
      wx.showModal({
        content: '邮箱号格式不正确',
        showCancel: false
      });
      // return false;
    }
     else if (that.data.company == '' || that.data.company == undefined){
      wx.showModal({
        content: '所在公司不可以为空',
        showCancel: false
      });
    } else if (that.data.position == '' || that.data.position == undefined){
      wx.showModal({
        content: '所在职位不可以为空',
        showCancel: false
      });
    } else if (that.data.industry == '' || that.data.industry == undefined) {
      wx.showModal({
        content: '所属行业不可以为空',
        showCancel: false
      });
    }
    else{
      var name = encodeURI(that.data.user);
      var userName = encodeURI(that.data.name);
      var company = encodeURI(that.data.company);
      var position = encodeURI(that.data.position);
      var industry = encodeURI(that.data.industry);
      var pwd = that.data.pwd;
      var email = that.data.email;
      var phone = that.data.tel;
      wx.request({
        url: getApp().data.serviceUrl + '/member/addOrUpdateMember',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          id: '',
          openid: userOpenid,
          name: userName,
          userName: name,
          company: company,
          position: position,
          industry:industry,
          password:pwd,
          email: email,
          phone: phone
        },
        success: function (res) {
          if(res.data.code == 0){
            wx.showToast({
              title: '注册成功~',
              icon: 'loading',
              duration: 2000
            })
            // 延迟2秒后跳转到首页
            setTimeout(function () {
             wx:wx.navigateTo({
               url: '../login/login',
               success: function(res) {},
               fail: function(res) {},
               complete: function(res) {},
             })
            }, 3000)
            // 将会员信息存储到缓存中
            
          } else if (res.data.code == 2){
            wx.showModal({
              content: '该用户已存在，请重新填写',
              showCancel: false
            });
          }
          else{
            wx.showToast({
              title: '注册失败~',
              icon: 'loading',
              duration: 2000
            })
          }
          console.log(res);
        },
        fail: function (e) {
          wx.showToast({
            title: '网络断开，稍后重试',
            icon: 'none',
            duration: 2000
          })
        }
      });
      // wx.showToast({
      //   title: '提交成功~',
      //   icon: 'loading',
      //   duration: 2000
      // })
    }
  }
})