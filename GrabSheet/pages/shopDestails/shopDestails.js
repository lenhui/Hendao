// pages/shopDestails/shopDestails.js
Page({
  data:{
    shopDestails:[]
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
    console.log(this.data.Id)
    // 加载详情信息
    var Id = this.data.Id
    var that = this
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/goods/findOneByMap',
      data: {
        id: Id
      },
      success: function (res) {
        console.log(res)
        var shopDestails = res.data.goodsMap;
        var array = [];
        array.push(shopDestails)
        console.log(shopDestails)
        that.setData({
          shopDestails: array
        })
        // 隐藏加载框
        setTimeout(function () {
          wx.hideLoading();
          return false;
        }, 1000)
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
  // 资讯热线
  // telCall: function (e) {
  //   var consulting = this.data.shopDestails
  //   wx.makePhoneCall({
  //     phoneNumber: consulting.consulting_way //仅为示例，并非真实的电话号码
  //   })
  // },
})
