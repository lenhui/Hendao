// pages/tender/tender.js
Page({
  data: {
    activePic: [],
    hotList: [],
    contentTitle: '',
    contentDate: '',
    contentDate: '',
    contentName: '',
    contentPhone: '',
    contentMain: '',
    contentDes: '',
    address: '',
    // isGrabed:false,
    login:true,
    Id: ''
  },
  onLoad: function (options) {
     // 获取到公司商标和联系热线
    var companyInfo = wx.getStorageSync('companyInfo');
    this.setData({
      companyInfo
    })
    // 获取到参数
    this.setData({
      Id: options.id
    })
    // console.log(this.data.Id)
  },
    // 加载详情信息
  onShow:function(){
    var Id = this.data.Id
    var that = this
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/orderInformation/findOne',
      data: {
        id: Id
      },
      success: function (res) {
        // console.log(res)
        // 获得浏览量
        var count = res.data.count
        var contentData = res.data.orderInformation
        var isGrabed = contentData.status
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
          isGrabed: isGrabed,
          count:count
        })
        // 隐藏加载框
        setTimeout(function () {
          wx.hideLoading();
          return false;
        }, 1000)
        // getLocalTime(contentData.createTime)
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
        id: Id
      },
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var relevant = res.data.mapList;
        var relevants = [];
        for (var i = 0; i < relevant.length; i++) {
          var obj = {};
          var title = relevant[i].title;
          var id = relevant[i].id;
          var level = relevant[i].level;
          var date = relevant[i].create_time.substr(5, 5);
          var dateDes = relevant[i].create_time.substr(0, 4);
          var city = relevant[i].cmb_city.substr(0, 2);
          obj.title = title;
          obj.date = date;
          obj.dateDes = dateDes;
          obj.id = id;
          obj.level = level;
          obj.city = city;
          relevants.push(obj)
        }
        that.setData({
          relevants: relevants
        })
      }
    })
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
  // 抢下此单
  grabSheet:function(e){
    var that= this
    var Id = this.data.Id;
    console.log(Id)
    // 获得会员id
    var ordinaryMember = wx.getStorageSync('ordinaryMember')
    if (ordinaryMember.level == 0){
      wx.showModal({
        content: '您还不是高级会员，请先申请为高级会员后抢单',
        showCancel: false
      });
    }else{
      var memberId = wx.getStorageSync('ordinaryMember').id;
      console.log(memberId)
      wx.request({
        url: getApp().data.serviceUrl + '/memberOrder/add',
        data: {
          id: Id,
          memberId: memberId
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.code == 0) {
            wx: wx.showToast({
              title: '抢单成功',
              duration: 2000,
            })
            that.setData({
              isGrabed: true
            })
          } else {
            wx: wx.showToast({
              title: '抢单失败',
              duration: 2000,
            })
          }
        }
      })
    }
  },
  // 跳转事件
  jumpPage: function (e) {
    var that = this
    // 获取到会员信息
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    var memberId;
    // 获取到id值
    var Id = e.currentTarget.dataset.id;
    // var orderStatus = this.data.list[]
    // 获取到订单的类别
    var orderLevel = e.currentTarget.dataset.level
    // console.log(orderLevel)
    // console.log(Id);
    // 获取到该会员未完成的订单数量
    var orderCount = wx.getStorageSync('orderCount');
    // console.log(orderCount)
    // 查看此订单的用户信息
    if (ordinaryMember == null || ordinaryMember == '') {
      memberId = ''
    } else {
      memberId = ordinaryMember.id
    }
    wx.request({
      url: getApp().data.serviceUrl + '/memberOrder/findByOrderInforIdAndMemberId',
      method: "GET",
      data: {
        orderInforId: Id,
        memberId: memberId,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var memberOrder = res.data.memberOrder;
        // var orderMemberId = memberOrder.memberId
        that.setData({
          memberOrder
        })
        // console.log(that.data.memberOrder)
      }
    })
    setTimeout(run, 300)
    function run() {
      //  console.log(that.data.memberOrder)
      if (!ordinaryMember || ordinaryMember == null) {
        wx: wx.showModal({
          title: '提示',
          content: '此信息为会员信息，请登录后查看',
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
      }
      else if (ordinaryMember && ordinaryMember.level == 0 && orderLevel != 0) {
        wx: wx.showModal({
          title: '提示',
          content: '此信息为【高级】会员信息，请先申请为高级会员后查看',
          showCancel: false
        })
      }
      else if (e.currentTarget.dataset.bioaji == 'red' && that.data.memberOrder == null) {
        wx: wx.showModal({
          title: '提示',
          content: '此信息已被抢，请查看其他信息',
          showCancel: false
        })
      } else if (orderCount >= 10) {
        wx: wx.showModal({
          title: '提示',
          content: '您的未完成订单量不能超过10条，请完成后查看',
          showCancel: false
        })
        that.setData({

        })
      }
      else {
        wx: wx.navigateTo({
          url: '../allOrder/allOrder?id=' + Id,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    }
  },
  // 拨打电话
  telCall:function(e){
    var contentPhone = this.data.contentPhone
    wx.makePhoneCall({
      phoneNumber: contentPhone //仅为示例，并非真实的电话号码
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