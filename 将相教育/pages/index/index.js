var app = getApp();
Page({
  data: {
    // 轮播图组件
    imgUrls: [
      
    ],
    // 字幕滚动
    imgUrls: [],
    // 地区组件
    serviceType: [
    ],
    imgList: [
    ],
  },
  // 轮播图
  // 位置定位
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  onLoad: function () {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo: function (e) {
    //console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
   
  },
  onShow: function () {
    var that = this
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          //console.log('未授权');
          wx.redirectTo({
            url: "../wxLogin/wxLogin"
          })
        }
      }
    })
  },
  onReady(e) {
    // 轮播图
    var that = this
    // wx.showLoading({
    //   title: '正在加载数据',
    // })
    wx.request({
      url: getApp().data.serviceUrl + '/advertise/findAll',
      data: {
      },
      success: function (res) {
        var imgUrls = res.data.mapList
        that.setData({
          imgUrls
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    });
    // 新增用户统计
    // 获取存储用户openId  
    var userOpenid = wx.getStorageSync('openid');
    var userInfo = wx.getStorageSync('userInfo');
    var nickName = encodeURI(userInfo.nickName);
    wx.request({
      url: getApp().data.serviceUrl + '/user/whetherExistUser',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      data: {
        openid: userOpenid,
        nickName: nickName,
        gender: userInfo.gender,
        avatarUrl: userInfo.avatarUrl,
        country: userInfo.country,
        city: userInfo.city
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    });
    // 请求会员信息,默认登录
    console.log(userOpenid)
    wx.request({
      url: getApp().data.serviceUrl + '/member/loginByOpenid',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      data: {
        openid: userOpenid,
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          // 将会员信息存储到缓存中
          wx.setStorageSync("ordinaryMember", res.data.member);
            // 获取该用户是否为会员，或者会员等级
          var ordinaryMember = wx.getStorageSync('ordinaryMember');
          if (ordinaryMember != '' && ordinaryMember != undefined && ordinaryMember != null) {
            wx.request({
              url: getApp().data.serviceUrl + '/member/findOne',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: "GET",
              data: {
                id: ordinaryMember.id,
              },
              success: function (res) {
                that.setData({
                  memberLevel: res.data.member.level
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
          }
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
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    // 获取到企业文化接口
    wx.request({
      url: getApp().data.serviceUrl + '/companyActivity/findSix',
      data: {
      },
      success: function (res) {
        console.log(res)
        var corporate = res.data.mapList
        that.setData({
          corporate
        })
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
  
  //用户点击右上角分享
  onShareAppMessage: function () {

  },
  // 跳转到更多企业文化
  corporateMore:function(){
    wx: wx.navigateTo({
      url: '../corporate/corporate',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  jumpUpVideo: function (e) {
    // 获取到会员信息
    var that = this;
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    var memberLevel = that.data.memberLevel
    console.log(memberLevel)
    if (ordinaryMember == '' || ordinaryMember == undefined || ordinaryMember == null) {
      wx: wx.showModal({
        title: '提示',
        content: '请先登录后上传',
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
      });
    } else {
      wx.request({
        url: getApp().data.serviceUrl + '/member/findOne',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "GET",
        data: {
          id: ordinaryMember.id,
        },
        success: function (res) {
          console.log(res)
          if (res.data.member.level == 0) {
            wx: wx.showModal({
              title: '提示',
              content: '您没有上传视频权限',
              showCancel: false
            })
          } else if (res.data.member.level == 1 || res.data.member.level == 2){
            wx: wx.navigateTo({
              url: '../uploadVideo/uploadVideo',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        },
        fail: function (e) {
          wx.showToast({
            title: '网络断开，稍后重试',
            icon: 'none',
            duration: 2000
          })
        }
      })
      }
  },
  jumpVideo: function (e) {
    // 获取到会员信息
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    if (ordinaryMember == '' || ordinaryMember == undefined || ordinaryMember == null){
      wx: wx.showModal({
        title: '提示',
        content: '请先登录后查看',
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
    });
    }else{
      wx.request({
        url: getApp().data.serviceUrl + '/member/findOne',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "GET",
        data: {
          id: ordinaryMember.id,
        },
        success: function (res) {
          console.log(res)
          if (res.data.member.level == 0 || res.data.member.level == 1 || res.data.member.level == 2) {
            wx: wx.navigateTo({
              url: '../videos/videos',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
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
  // 跳转到更多
  jumpMore: function (e) {
    var Id = e.currentTarget.dataset.id
    console.log(Id)
    wx.navigateTo({
      url: '../corpdestail/corpdestail?id=' + Id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})