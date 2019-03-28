const app = getApp();
Page({
  data:{
    img: "../images/2.jpg",
    // 轮播图组件
    imgUrls: [{
      image: '/pages/images/dev2.jpg',
      linkUrl: ''
    }, {
        image: '/pages/images/2.jpg',
      linkUrl: ''
    }, {
        image: '/pages/images/2.jpg',
      linkUrl: ''
    }, {
        image: '../../imgs/banner.png',
      linkUrl: ''
    }, {
        image: '../../imgs/banner.png',
      linkUrl: ''
    }
    ],

    // 地区组件
    region: ['广东省', '广州市', '天河区'],
    customItem: '全部',
    IconArray:[{
      image: '/pages/images/icon2.jpg',
      text: '空气净化',
      linkUrl:'../../pages/houClean/houClean'
    }],
    region: ['广东省', '广州市', '天河区'],
    customItem: '全部',
    // 图标组件
    serviceType: [{
      img: '/pages/images/clean.png',
      title: '家庭保洁',
      linkUrl:'/pages/images/shutong.png'
      // colorBg: '#ccc',
    }, {
      img: '/pages/images/shutong.png',
      title: '家庭保洁',
      // colorBg: '#ccc',
    }, {
      img: '/pages/images/weixiu.png',
      title: '家庭保洁',
      // colorBg: '#ccc',
    }, {
      img: '/pages/images/kongtiao.png',
      title: '家庭除螨',
      // colorBg: '#ccc',
    }, {
      img: '/pages/images/weixiu.png',
      title: '白蚁防治',
      // colorBg: '#ccc',
    }, {
      img: '/pages/images/clean.png',
      title: '白蚁防治',
      // colorBg: '#ccc',
    }, {
      img: '/pages/images/shutong.png',
      title: '商城',
        linkUrl: '../shopping/shopping'
      // colorBg: '#ccc',
    }, {
      img: '/pages/images/clean.png',
      title: '技术视频',
      linkUrl:'../video/video'

      // colorBg: '#ccc',
    }],
    Width: '80rpx',
    Height: '80rpx',
		},
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
	onShow(e){
    // 获取用户信息
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
		 // 从缓存中获取到滚动的位置
		 var that = this
    wx.getStorage({
      key: 'key',
      success: function (res) {
        console.log(res)
        that.setData({
          scrollTop:res.data[0]
        })
      }
    })
    // 判断用户是否已经登录，获取默认为登录状态
    var openid = wx.getStorageSync('openid');
    console.log(openid)
    wx.request({
      url: getApp().data.serviceUrl + '/business/loginByOpenid',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openid: openid
      },
      success: function (res) {
        console.log(res)
        // 将登录信息存储到缓存中
        if (res.data.code == 0) {
          // 将会员信息存储到缓存中
          wx.setStorageSync("ordinaryMember", res.data.business);
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
    // 从缓存中获取到服务商的id值
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    that.setData({
      ordinaryMember: ordinaryMember
    })
	},
  onLoad(){
    var that = this
    // 获取用户信息
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    // 首页轮播图
    wx.request({
      url: getApp().data.serviceUrl + '/advertise/findAll',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        level:1
      },
      success: function (res) {
        console.log(res)
        var imgUrls  = res.data.mapList;
        that.setData({
          imgUrls: imgUrls
        })
        console.log(imgUrls)
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
    // 新增用户浏览量统计
    // 新增浏览小程序用户
    // 获取到用户的openId以及用户信息
    var openid = wx.getStorageSync('openid');
    var userInfo = wx.getStorageSync('userInfo');
    console.log(openid)
    console.log(userInfo)
    wx.request({
      url: getApp().data.serviceUrl + '/user/whetherExistUser',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        level: 1,
        openid: openid,
        nickName: encodeURI(userInfo.nickName),
        gender: userInfo.gender,
        avatarUrl: userInfo.avatarUrl,
        country: userInfo.country,
        province: userInfo.province,
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
    })
  },
  search:function(e){
    wx:wx.navigateTo({
      url: '../search/search',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  chooseServer:function(e){
    wx: wx.navigateTo({
      url: '../management/management',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 跳转到注册页
  registerUser:function(e){
    wx:wx.navigateTo({
      url: '../register/register',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  feedBackJump:function(e){
    wx: wx.navigateTo({
      url: '../feedBack/feedBack',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  lianxiKefu:function(e){
    wx: wx.navigateTo({
      url: '../customer/customer',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  hexiao: function (e) {
    var that = this;
    var businessId = that.data.ordinaryMember.id
    console.log(that.data.ordinaryMember)
    wx.scanCode({
      success: (res) => {
        var result = res.result
        console.log(result)
        var userOrderInfo = result.split(',')
        var orderNumber = userOrderInfo[0]
        var userOpenid = userOrderInfo[1]
        console.log(userOrderInfo[0])
        console.log(userOrderInfo[1])
        console.log("扫码结果");
        console.log(res);
        // 调用扫码接口
        wx.request({
          url: getApp().data.serviceUrl + '/businessOrder/statement',
          method: "GET",
          header: {
            'content-type': 'application/json'
          },
          data: {
            businessId: businessId,
            orderNumber: orderNumber,
            openid: userOpenid
            // openid:
          },
          success: function (res) {
            console.log(res)
            if(res.data.code == 1){
              wx.showModal({
                content: '销单失败',
                showCancel: false
              });
            } 
            else if (res.data.code == 3){
              wx.showModal({
                content: '该订单已失效',
                showCancel: false
              });
            } else if (res.data.code == 4){
              wx.showModal({
                content: '您不是本单的服务商',
                showCancel: false
              });
            }
            else if (res.data.code == 0){
              wx.showModal({
                content: '销单成功',
                showCancel: false
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
        this.setData({
          show: res.result
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  classDestail:function(e){
    console.log(e)
    var name = e.currentTarget.dataset.title;
    if (name == '商城'){
      wx: wx.navigateTo({
        url: '../shopping/shopping',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (name == '技术视频'){
      wx: wx.navigateTo({
        url: '../video/video',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      wx: wx.navigateTo({
        url: '../devDestail/devDestail',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  //用户点击右上角分享
  onShareAppMessage: function () {

  },
  // iji:function(){
  //   // console.log()
  // }

})