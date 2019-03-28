var app = getApp();
Page({
  data: {
    // 轮播图组件
    imgUrls: [
    ],
    // 字幕滚动
    imgUrls:[],
    // 地区组件
    region: ['广东省', '广州市', '天河区'],
    customItem: '全部',
    IconArray: [{
      image: '/pages/images/icon2.jpg',
      text: '空气净化',
      linkUrl: '../../pages/houClean/houClean'
    }],
    region: ['广东省', '广州市', '天河区'],
    customItem: '全部',
    serviceType: [
    ],
    // 图标组件
    iconArray: [
      {
      image: '/pages/images/add.png',
      text: '招标信息',
      linkUrl: '../../pages/information/information',
      colorBg: '#FFC143',
    }, {
      image: '/pages/images/order0.png',
      linkUrl: '../../pages/management/management',
      text: '工程抢单',
      colorBg: '#FFC143',
    }, {
      image: '/pages/images/shop.png',
      linkUrl: '../../pages/shop/shop',
      text: '清洗设备',
        
      colorBg: '#FFC143',
    }, {
      image: '/pages/images/book3.png',
        linkUrl: '../../pages/certificate/certificate',
      text: '资质证书',
        colorBg: '#FFC143',
    }
    ],
    Width: '80rpx',
    Height: '80rpx',
    imgList: [
    ],
    // 招标展示
    // Tab横向切换
     tenderLists: [
    ],
    // 已完成订单
    hotList: [
      ],
    selected: true,
    selected1: false,
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
    // 获取到公司商标和联系热线
    wx.request({
      url: getApp().data.serviceUrl + '/helpline/findOne',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {

      },
      success: function (res) {
        var companyInfo = res.data.helpline;
        wx.setStorageSync("companyInfo", companyInfo);
        that.setData({
          companyInfo: companyInfo,
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
    var ordinaryMember= wx.getStorageSync('ordinaryMember');
    var memberId;
    // console.log(memberId)
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
    // 查询该会员订单表里未完成的订单数量
    if (ordinaryMember == null || ordinaryMember == '' || ordinaryMember == null){
     return false;
    }else{
      memberId = ordinaryMember.id
    }
    wx.request({
      url: getApp().data.serviceUrl + '/memberOrder/findUnfinishedCountByMemberId',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        memberId: memberId
      },
      success: function (res) {
        var orderCount = res.data.count;
        // 将订单量存储到缓存中
        wx.setStorageSync("orderCount", orderCount);
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
  onReady(e) {
    // 轮播图
    var that = this
    wx.showLoading({
      title: '正在加载数据',
    })
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
    // 字幕滚动
    wx.request({
      url: getApp().data.serviceUrl + '/announcement/findAll',
      data: {
      },
      header: {
        'content-type': 'application/text'
      },
      method: 'GET',
      success: function (res) {
        var msgList = res.data.mapList
        that.setData({
          msgList
        })
      },
      fail:function(e){
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    });
    // 公司活动
    wx.request({
      url: getApp().data.serviceUrl + '/companyActivity/findFour',
      data: {
      },
      header: {
        'content-type': 'application/text'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        var imgList = res.data.mapList;
        //图片集合
        var imgData = [];
        for (var i = 0; i < imgList.length;i++){
          var image_list = imgList[i].image;
          // 将字符串集合转换为数组
          // var image_array = [];
          // image_array = image_list.split(",");
          var obj = {};
          obj.image = image_list;
          obj.title = imgList[i].title;
          obj.id = imgList[i].id;
          imgData.push(obj)
        }
        that.setData({
          imgList: imgData
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
    // console.log(e.title),
    //   this.setData({
    //     msgList: [{ url: "url", title: "恭喜何总签下中央清洗项目" },
    //     { url: "url", title: "恭喜成都周总中央清洗项目圆满结束" },
    //     { url: "url", title: "恭喜宏泰节能加盟油烟机清洗项目" }]
    //   });
    // 获取存储到缓存中的会员信息
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
        
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
  });
  // 请求会员信息
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
        if (res.data.code == 0) {
          // 将会员信息存储到缓存中
          wx.setStorageSync("ordinaryMember", res.data.member);
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
   
  // 招标
    wx.request({
      url: getApp().data.serviceUrl + '/orderInformation/findTen',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      data: {

      },
      success: function (res) {
        var tenderLists = res.data.mapList;
        var tenderList = [];
        for (var i = 0; i < tenderLists.length; i++) {
          var obj = {};
          var title = tenderLists[i].title;
          var id = tenderLists[i].id;
          var date = tenderLists[i].create_time.substr(5, 5);
          obj.title = title;
          obj.date = date;
          obj.id = id;
          tenderList.push(obj)
        }
        that.setData({
          tenderLists: tenderList
        })
      }
    })
  // 热点资讯
    wx.request({
      url: getApp().data.serviceUrl + '/industryInformation/findTen',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      data: {

      },
      success: function (res) {
        var hotList = res.data.mapList;
        var hotLists = [];
        for (var i=0;i< hotList.length;i++){
          var obj = {};
          var title = hotList[i].title;
          var id = hotList[i].id;
          var date = hotList[i].create_time.substr(5,5);
          obj.title  = title;
          obj.date = date;
          obj.id = id;
          hotLists.push(obj)
        }
        that.setData({
          hotList: hotLists
        })
        // 隐藏加载框
        setTimeout(function () {
          wx.hideLoading();
          return false;
        }, 1000)
      }
    })
},
// 跳转到公司详情页
  jumpDetail:function(e){
    // 获取点击的id
    // console.log(e)
    var Id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../active/active?id=' + Id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 跳转到招标详情
  jumpTender:function(e){
    // 获取点击的id
    // console.log(e)
    var Id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../tender/tender?id=' + Id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 热点资讯跳转
  jumpInquiry:function(e){
    // 获取点击的id
    // console.log(e)
    var Id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../inquiry/inquiry?id=' + Id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  search: function (e) {
    wx: wx.navigateTo({
      url: '../search/search',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 招标展示
  // Tab横向切换
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
    })
  },
  //用户点击右上角分享
  onShareAppMessage: function () {

  },
  //进入行业资讯
  jumpInquiryAll:function(e){
    wx:wx.navigateTo({
      url: '../inquiryAll/inquiryAll',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  jumpInfo:function(e){
    wx: wx.navigateTo({
      url: '../information/information',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 资讯热线
  telCall1:function(e){
    var companyInfo = this.data.companyInfo
    wx.makePhoneCall({
      phoneNumber: companyInfo.phone //仅为示例，并非真实的电话号码
    })
  },
  // 固定热线
  telCall2: function (e) {
    var companyInfo = this.data.companyInfo
    wx.makePhoneCall({
      phoneNumber: companyInfo.landline //仅为示例，并非真实的电话号码
    })
  },
})