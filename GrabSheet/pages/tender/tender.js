// pages/tender/tender.js
Page({
  data: {
    activePic: ["../images/3.png", "../images/3.png", "../images/3.png", "../images/3.png"],
    login:true,
    hotList: [{
      text: '[12-04]【重庆】重庆市万州人民医院中央',
      date:'17小时前'
    }, {
      text: '[12-04]【广州】重庆市万州人民医院中央',
      date:'3天前'
    }, {
        text: '[12-04]【江苏】重庆市万州人民医院中央',
        date: '17小时前'
    }, {
        text: '[12-04]【湖北】重庆市万州人民医院中央',
        date: '17小时前'
    }, {
        text: '[12-04]【山西】重庆市万州人民医院中央',
        date: '17小时前'
    }, {
        text: '[12-04]【北京】重庆市万州人民医院中央',
        date: '17小时前'
    }, {
        text: '[12-04]【浙江】重庆市万州人民医院中央',
        date: '17小时前'
    }, {
        text: '[12-04]【重庆】重庆市万州人民医院中央',
        date: '17小时前'
    }],
    contentTitle:'',
    contentDate:'',
    contentDate: '',
    contentName:'',
    contentPhone:'',
    contentMain:'',
    contentDes:'',
    address:'',
    // login:true,
    Id:''
  },
  onLoad: function (options){
    // 获取到公司商标和联系热线
    var companyInfo = wx.getStorageSync('companyInfo');
    this.setData({
      companyInfo
    })
    // 获取到参数
    this.setData({
      Id: options.id
    })
  },
  onShow:function(){
    // 加载详情信息
    var Id = this.data.Id
    var that = this
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/orderInformation/findOne',
      data: {
        id:Id
      },
      success: function (res) {
        // 获得浏览量
        var count = res.data.count
        var contentData = res.data.orderInformation
        // 调用转换时间戳事件
        var createTime = timeFormat(contentData.createTime)
        that.setData({
          contentTitle: contentData.title,
          contentDate: createTime,
          contentName: contentData.name,
          contentPhone: contentData.phone,
          contentMain: contentData.mainContent,
          contentDes: contentData.content,
          address: contentData.address,
          area: contentData.cmbArea,
          city: contentData.cmbCity,
          province: contentData.cmbProvince,
          contactMethod: contentData.contactContent,
          count: count
        })
        // getLocalTime(contentData.createTime)
        for (var i = 0; i < contentData.length;i++){
          var obj = contentData[i]
        }
        // 隐藏加载框
        setTimeout(function () {
          wx.hideLoading();
          return false;
        }, 1000)
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    });
    // 相关信息
    wx.request({
      url: getApp().data.serviceUrl + '/orderInformation/findTenExceptId',
      data: {
       id:Id
      },
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var relevant = res.data.mapList;
        var relevants = [];
        for (var i = 0; i < relevant.length; i++) {
          var obj = {};
          var title = relevant[i].title;
          var id = relevant[i].id;
          var date = relevant[i].create_time.substr(5, 5);
          var city = relevant[i].cmb_city.substr(0, 2);
          console.log(date)
          obj.title = title;
          obj.date = date;
          obj.id = id;
          obj.city = city;
          relevants.push(obj)
        }
        that.setData({
          relevants: relevants
        })
        
      }
    })
    // 判断用户是否登录注册过
    // this.setData({
    //   login: true
    // })
    if(!this.data.login){
      wx:wx.showModal({
        title: '提示',
        content: '此信息为【高级】会员信息，请登录后查看',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function(res) {
          if(res.confirm){
            wx: wx.navigateTo({
              url: '../login/login',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
    // 时间戳转换
    function add0(m) { return m < 10 ? '0' + m : m }
    function timeFormat(timestamp) {
      //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
      var time = new Date(timestamp);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var seconds = time.getSeconds();
      return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
    }
  },
  // 跳转事件
  jumpPage:function(e){
    // 获取点击的id
    // console.log(e)
    var Id = e.currentTarget.dataset.id
    console.log(Id)
    if(this.data.login){
      wx:wx.navigateTo({
        url: '../tender/tender?id=' + Id,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
      wx:wx.showModal({
        title: '提示',
        content: '此信息为【高级】会员信息，请登录后查看',
        showCancel: true,
        cancelText: '取消',
       
        confirmText: '确定',
        
        success: function(res) {
          if(res.confirm){
            wx:wx.navigateTo({
              url: '../login/login',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  memberLogin:function(e){
    wx: wx.showModal({
      // title: '提示',
      content: '确认跳转到注册页面',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          wx: wx.navigateTo({
            url: '../register/register',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      }
    })
  },
  // 资讯热线
  telCall1: function (e) {
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