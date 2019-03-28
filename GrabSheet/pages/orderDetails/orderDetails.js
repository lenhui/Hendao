// pages/tender/tender.js
Page({
  data: {
    // 订单初始状态
    // status:0,
    contentTitle: '',
    contentDate: '',
    contentDate: '',
    contentName: '',
    contentPhone: '',
    contentMain: '',
    contentDes: '',
    address: '',
    orderState:0,
    login: true,
    Id: ''
  },
 
  onLoad: function (options) {
    // 获取到参数

    this.setData({
      Id: options.id
    })
    console.log(this.data.Id)
    // 获取到公司商标和联系热线
    var companyInfo = wx.getStorageSync('companyInfo');
    this.setData({
      companyInfo
    })
    // 加载详情信息
    var Id = this.data.Id
    var that = this
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/memberOrder/findOneByOrderInforId',
      data: {
        orderInforId: Id
      },
      success: function (res) {
        console.log(res)
        var memberOrder = res.data.memberOrder;
        console.log(memberOrder.status)
        // 将订单存储
        wx.setStorageSync("memberOrder", memberOrder);
        var orderInformation = res.data.orderInformation;
        // var contentData = res.data.orderInformation
        // 调用转换时间戳事件
        var createTime = timeFormat(orderInformation.createTime)
        var orderState = memberOrder.status
        console.log(orderState)
        that.setData({
          contentTitle: orderInformation.title,
          contentDate: createTime,
          contentName: orderInformation.name,
          contentPhone: orderInformation.phone,
          contentMain: orderInformation.mainContent,
          contentDes: orderInformation.content,
          address: orderInformation.address,
          area: orderInformation.cmbArea,
          city: orderInformation.cmbCity,
          province: orderInformation.cmbProvince,
          contactMethod: orderInformation.contactContent,
          orderState: orderState
        })
        // getLocalTime(contentData.createTime)
        console.log(orderInformation)
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
  // 订单状态事件
  orderState:function(e){
    var that = this;
    var Id = that.data.Id;
      wx.request({
        url: getApp().data.serviceUrl + '/memberOrder/update',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          orderInforId:Id,
          status: 1
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 0){
            that.setData({
              orderState: 1
            })
          }else{
            wx:wx.showToast({
              title: '修改失败',
              icon: '',
              image: '',
              duration: 2000,
              mask: true,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          }
        }
    })
    
  },
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