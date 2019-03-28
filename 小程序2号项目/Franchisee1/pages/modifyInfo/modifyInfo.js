Page({
  data: {
    checkboxBox: [{
      type: '家庭保洁',
      id: '1'
    }, {
      type: '甲醛检测与治理',
      id: '2'
    }, {
      type: '除四害',
      id: '3'
    }, {
      type: '商业厨房清洗保养',
      id: '4'
    }, {
      type: '家电清洗',
      id: '5'
    }],
    pic: [],
    // 地区组件
    // region: ['广东省', '广州市', '海珠区'],
    region: '',
    desAdress: '',
    customItem: '全部',
    delLists: [],
    getCode: '获取验证码',
    disabled: false,
    color: '#06C2F6'
  },
  onShow: function () {
    console.log(this.data.region)
    var that = this;
    // 服务类型数据加载
    wx.request({
      url: getApp().data.serviceUrl + '/type/findAll',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        parentId: 0
      },
      success: function (res) {
        console.log(res)
        var checkboxBox = [];
        var checkArray = res.data.mapList;
        console.log(checkArray)
        for (var i = 0; i < checkArray.length; i++) {
          var id = checkArray[i].id;
          var type = checkArray[i].name;
          var obj = {};
          obj.type = type;
          obj.id = id;
          checkboxBox.push(obj)
        }
        that.setData({
          checkboxBox: checkboxBox,
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
    // var region = [];
    // region.push(regUserInfo.cmbProvince, regUserInfo.cmbCity, regUserInfo.cmbArea);
    // console.log(regUserInfo)
    // this.setData({
    //   name: regUserInfo.name,
    //   userName: regUserInfo.userName,
    //   phone: regUserInfo.phone,
    //   password: regUserInfo.password,
    //   address: regUserInfo.address,
    //   region: region,
    //   // 用户id
    //   id: regUserInfo.id
    // })
  },
  onLoad: function () {
    // 获取用户用户名，密码
    var that = this;
    var regUserInfo = wx.getStorageSync('ordinaryMember');
    console.log(regUserInfo)
    console.log(regUserInfo.id)
    wx.request({
      url: getApp().data.serviceUrl + '/business/findOne',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        id: regUserInfo.id
      },
      success: function (res) {
        console.log(res)
        var modifyInfo = res.data.business;
        var mapList = res.data.mapList;
        var checkboxBox = that.data.checkboxBox;
        var checkedArray = [];
        var array = [];
        for (var i = 0; i < checkboxBox.length; i++) {
          var tempObj = {};
          var checkedId = checkboxBox[i].id
          var id = checkboxBox[i].id;
          var type = checkboxBox[i].type;
          var checked = '';
          for (var j = 0; j < mapList.length; j++) {
            if (checkedId == mapList[j].id) {
              checked = true;
            }
          }
          tempObj.id = id;
          tempObj.type = type;
          tempObj.checked = checked;
          checkedArray.push(tempObj)
          that.setData({
            checkboxBox: checkedArray,
            delLists: mapList
          })
          console.log(checkedArray)
          console.log(that.data.delLists)
        }
        var region = [];
        region.push(modifyInfo.cmbProvince, modifyInfo.cmbCity, modifyInfo.cmbArea);
        console.log(modifyInfo)
        that.setData({
          name: modifyInfo.name,
          userName: modifyInfo.userName,
          phone: modifyInfo.phone,
          password: modifyInfo.password,
          address: modifyInfo.address,
          serverName: modifyInfo.content,
          region: region,
          // 用户id
          id: modifyInfo.id
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 位置定位
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
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
  handleUserName: function (e) {
    this.setData({
    })
    wx: wx.showModal({
      title: '提示',
      content: '用户名不可以修改',
      showCancel: false
    })
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
  //   console.log(this.data.code)
  },
  // handlePwd: function (e) {
  //   this.setData({
  //     pwd: e.detail.value,
  //   })
  //   console.log(this.data.pwd)
  // },
  // handleAgain: function (e) {
  //   this.setData({
  //     pwdAgain: e.detail.value,
  //   })
  //   console.log(this.data.pwdAgain)
  // },
  // handleServerName: function (e) {
  //   this.setData({
  //     serverName: e.detail.value,
  //   })
  // },
  // 详细地址
  handleDesAdr: function (e) {
    this.setData({
      address: e.detail.value,
    })
    console.log(this.data.address)
  },
  // 获取验证码倒计时
  getCode: function (e) {
    console.log(this.data.pwd2)
  },
  // 获取验证码倒计时
  getCode: function (e) {
    console.log(e)
    var that = this
    var tel = this.data.tel;
    var warn = null;
    var state = 0;
    console.log(tel)
    // 后端判断输入的手机号是否已被注册，例如：1为已注册，0为未注册
    if (tel == undefined || tel == '') {
      warn = '手机号码不可以为空'
      console.log(warn)
    } else if (tel.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(tel)) {
      warn = '手机格式不正确'
    }
    //  else if (state == 1) {
    //   warn = '该手机号已被注册'
    // } 
    else if (!that.data.disabled){
      // 获取验证码接口调用
      console.log(tel)
      var openid = wx.getStorageSync('openid');
      wx.request({
        url: getApp().data.serviceUrl + '/phoneVerificationCode/getVerificationCode',
        method: "GET",
        header: {
          'content-type': 'application/json'
        },
        data: {
          openid: openid,
          phone: tel
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
  // 选择服务类型
  radioChange: function (e) {
    var that = this
    var checkboxBox = this.data.checkboxBox
    console.log(checkboxBox)
    var delLists = this.data.delLists
    console.log(delLists)
    // 获取到被选中的id
    var id = e.currentTarget.dataset.id
    console.log(id)
    for (var i = 0; i < checkboxBox.length; i++) {
      if (checkboxBox[i].id == id) {
        if (checkboxBox[i].checked) {
          checkboxBox[i].checked = false;
          for (var j = 0; j < delLists.length; j++) {
            if (delLists[j].id == id) {
              delLists.splice(j--, 1)
            }
          }
          console.log(i)
        } else {
          checkboxBox[i].checked = true;
          delLists.push(this.data.checkboxBox[i])//循环错了数组
        }
      }
      that.setData({
        checkboxBox: checkboxBox,
        delLists: delLists

      })
    }
    console.log(that.data.delLists)    
  },
  // 提交
  formSubmit: function (e) {
    // 判断验证码是否正确
    var that = this;
    var state = 0;
    var code = this.data.code;
    var warn = null;
    var tel = this.data.tel;
    var codeMsg = that.data.codeMsg//请求接口数据
    var pwd = e.detail.value.password;
    var pwdAgain = e.detail.value.password;
    var name = this.data.name
    var userName = this.data.userName
    var serverName = this.data.serverName;
    var delLists = this.data.delLists;
    console.log(serverName)
    var delListsId = [];
    for (var i = 0; i < delLists.length; i++) {
      var typeId = delLists[i].id;
      delListsId.push(typeId)
    }
    delListsId = delListsId.join(",")
    console.log(delListsId)
    var desAdress = this.data.address;
    //用户id
    var id = this.data.id
    console.log(pwd)
    // console.log(pwdAgain)
    var serverName = e.detail.value.serverName;
    var delLists = this.data.delLists;
    console.log(delLists)
    var region = this.data.region;
    if (that.data.name == '' || that.data.name == undefined) {
      wx.showModal({
        content: '姓名不可以为空',
        showCancel: false
      });
      return;
    } else if (that.data.userName == '' || that.data.userName == undefined) {
      wx.showModal({
        content: '用户名不可以为空',
        showCancel: false
      });
      return;
    }
    else if (tel == undefined || tel == '') {
      warn = '手机号码不可以为空'
      console.log(warn)
    } else if (tel.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(tel)) {
      warn = '手机格式不正确'
    } 
    // else if (state == 1) {
    //   warn = '该手机号已被注册'
    // }
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
    } else if (pwd == '' || pwd == undefined) {
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
    } else if (serverName == '' || serverName == undefined) {
      wx.showModal({
        content: '服务名称不可以为空',
        showCancel: false
      });
    } else if (delLists == '') {
      wx.showModal({
        content: '请选择服务类型',
        showCancel: false
      });
    } else if (region == '') {
      wx.showModal({
        content: '请选择所在地',
        showCancel: false
      });
    }
    else {
      // 获取用户的Openid
      var openid = wx.getStorageSync('openid');
      // 调用修改接口
      wx.request({
        url: getApp().data.serviceUrl + '/business/addOrUpdate',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          id: id,
          openid: openid,
          name: encodeURI(name),
          userName: encodeURI(userName),
          phone: tel,
          content: encodeURI(serverName),
          typeIdStr: delListsId,
          password: pwd,
          verificationCode: code,
          cmbProvince: encodeURI(region[0]),
          cmbCity: encodeURI(region[1]),
          cmbArea: encodeURI(region[2]),
          address: encodeURI(desAdress)
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 0) {
            // 将注册用户信息保存到本地内存
            var regUserInfo = res.data.business;
            wx.setStorageSync("regUserInfo", regUserInfo);
            wx.showToast({
              title: '修改成功~',
              icon: 'loading',
              duration: 2000
            })
          } 
          else if (res.data.code == 7){
            wx.showModal({
              content: '输入的手机号与绑定的手机号码不一致，请重新输入',
              showCancel: false
            });
          }
          else {
            wx: wx.showToast({
              title: '修改失败',
              icon: '',
              image: '',
              duration: 2000,
              mask: true,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        }
      })

    }
    if (warn != null) {
      wx.showModal({
        title: '提示',
        content: warn
      })
      that.setData({
        getCode: '获取验证码',
        disabled: false,
        color: '#feb70f'
      })
    }
  },
  jumpType: function (e) {
    wx: wx.navigateTo({
      url: '../severType/severType',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  changeAccordion: function (e) {
    var accordionIndex = e.currentTarget.id;
    if (this.data.accordionActive == accordionIndex) { accordionIndex = ''; }
    this.setData({ accordionActive: accordionIndex })
  }
})