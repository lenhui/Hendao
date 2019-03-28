// pages/modifyInfo/modifyInfo.js
Page({
  data:{

  },
  onShow:function(e){
    // 获取用户用户名，密码
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    console.log(ordinaryMember)
    this.setData({
      name: ordinaryMember.name,
      userName: ordinaryMember.userName,
      password: ordinaryMember.password,
      email: ordinaryMember.email,
      phone: ordinaryMember.phone,
      company: ordinaryMember.company,
      position: ordinaryMember.position,
      industry: ordinaryMember.industry
    })
  },
  // 获取用户名
  handleUsername: function (e) {
    this.setData({
    })
    wx: wx.showModal({
      title: '提示',
      content: '用户名不可以修改',
      showCancel: false
    })
  },
  handleName: function (e) {
    this.setData({
    })
    wx: wx.showModal({
      title: '提示',
      content: '姓名不可以修改',
      showCancel: false
    })
  },
  handleTel: function (e) {
    this.setData({
      tel: e.detail.value,
    })
  },
  handleCode: function (e) {
    this.setData({
      code: e.detail.value,
    })
  },
  handlePwd: function (e) {
    this.setData({
      pwd: e.detail.value,
    })
  },
  handleAgain: function (e) {
    this.setData({
      pwdAgain: e.detail.value,
    })
  },
  // 密码失去焦点事件
  loseFocus: function (e) {
    var that = this
    var pwd = e.detail.value;
    if (pwd.length < 6 || pwd.length > 11) {
      wx.showModal({
        content: '密码长度输入错误，最少6位最大11位',
        showCancel: false
      });
      return false;
    } else {
      that.setData({
        pwd: pwd
      })
    }
  },
  loseFocusA: function (e) {
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
  handleEmail: function (e) {
    this.setData({
      email: e.detail.value,
    })
  },
  // 获取所在公司
  handleCompany: function (e) {
    this.setData({
      company: e.detail.value,
    })
  },
  // 获得所在职位
  handlePosition: function (e) {
    this.setData({
      position: e.detail.value,
    })
  },
  // 获得所属行业
  handleIndustry: function (e) {
    this.setData({
      industry: e.detail.value,
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e);
    var that = this;
    var password = e.detail.value.password;
    var apassword = e.detail.value.apassword;
    var email = e.detail.value.email;
    var phone = e.detail.value.phone;
    var company = e.detail.value.company;
    var position = e.detail.value.position;
    var industry = e.detail.value.industry;
    // 获取存储用户openId  
    var userOpenid = wx.getStorageSync('openid');
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    if (password == '' || password == undefined) {
      wx.showModal({
        content: '密码不可以为空',
        showCancel: false
      });
    } else if (apassword != password) {
      wx.showModal({
        content: '两次密码不一致',
        showCancel: false
      });
      return;
    } else if (phone == undefined || phone == '') {
      wx.showModal({
        content: '手机号不可以为空',
        showCancel: false
      });
    } else if (email == '') {
      wx.showModal({
        content: '邮箱号不能为空',
        showCancel: false
      });
    }
    else if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(email)) {
      wx.showModal({
        content: '邮箱号格式不正确',
        showCancel: false
      });
      // return false;
    }
    else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      wx.showModal({
        content: '手机格式不正确',
        showCancel: false
      });
    }
    else if (company == '' || company == undefined) {
      wx.showModal({
        content: '所在公司不可以为空',
        showCancel: false
      });
    } else if (position == '' || position == undefined) {
      wx.showModal({
        content: '所在职位不可以为空',
        showCancel: false
      });
    } else if (industry == '' || industry == undefined) {
      wx.showModal({
        content: '所属行业不可以为空',
        showCancel: false
      });
    }
    else {
      var name = encodeURI(ordinaryMember.userName);
      var userName = encodeURI(ordinaryMember.name);
      // var company = encodeURI(company);
      // var position = encodeURI(position);
      // var industry = encodeURI(industry);
      wx.request({
        url: getApp().data.serviceUrl + '/member/addOrUpdateMember',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          id: ordinaryMember.id,
          openid: userOpenid,
          name: userName,
          userName: name,
          company: encodeURI(company),
          position: encodeURI(position),
          industry: encodeURI(industry),
          password: password,
          email: email,
          phone: phone
        },
        success: function (res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '修改成功~',
              icon: 'loading',
              duration: 2000
            })
            // 延迟2秒后跳转到首页
            setTimeout(function () {
              wx: wx.navigateTo({
                url: '../login/login',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            }, 3000)
            // 将会员信息存储到缓存中

          } else if (res.data.code == 2) {
            wx.showModal({
              content: '该用户已存在，请重新填写',
              showCancel: false
            });
          }
          else {
            wx.showToast({
              title: '修改失败~',
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
  },
  // 提交
  submit: function (e) {
    console.log(e.detail.value.password)
    // 判断验证码是否正确
    var that = this;
    var code = this.data.code;
    var codeMsg = '111'//请求接口数据
    var pwd = this.data.pwd;
    var pwdAgain = this.data.pwdAgain;
    var tel = this.data.tel;
    // 获取存储用户openId  
    var userOpenid = wx.getStorageSync('openid');
    // 获取用户用户名，密码
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    // console.log(that.data.user)
    
    if (e.detail.value.ordinaryMember== '' || pwd == undefined) {
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
    else if (tel == undefined || tel == '') {
      wx.showModal({
        content: '手机号不可以为空',
        showCancel: false
      });
    } else if (tel.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(tel)) {
      wx.showModal({
        content: '手机格式不正确',
        showCancel: false
      });
    }
    else if (that.data.company == '' || that.data.company == undefined) {
      wx.showModal({
        content: '所在公司不可以为空',
        showCancel: false
      });
    } else if (that.data.position == '' || that.data.position == undefined) {
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
    else {
      var name = encodeURI(ordinaryMember.userName);
      var userName = encodeURI(ordinaryMember.name);
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
          id: ordinaryMember.id,
          openid: userOpenid,
          name: userName,
          userName: name,
          company: company,
          position: position,
          industry: industry,
          password: pwd,
          email: email,
          phone: phone
        },
        success: function (res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '修改成功~',
              icon: 'loading',
              duration: 2000
            })
            // 延迟2秒后跳转到首页
            setTimeout(function () {
              wx: wx.navigateTo({
                url: '../login/login',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            }, 3000)
            // 将会员信息存储到缓存中

          } else if (res.data.code == 2) {
            wx.showModal({
              content: '该用户已存在，请重新填写',
              showCancel: false
            });
          }
          else {
            wx.showToast({
              title: '修改失败~',
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
  },
  // 获取滚动条的位置
  scroll: function (event) {
    if (event.detail.scrollTop != 0) {
      console.log(event)
      //设置缓存
      wx.setStorage({
        key: 'key',
        // 缓存滑动的距离，和当前页面的id
        data: [event.detail.scrollTop, event.target.dataset.id]
      })
    }
  },
})
