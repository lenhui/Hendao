// page/myOrder/myOrder.js
Page({
  data: {
    // Tab横向切换
    // 全部订单
    // lists1: ["../images/1.jpg","../images/2.jpg"],
    // 已完成订单
    // lists2: ["../images/2.jpg", "../images/1.jpg"],
    // 未完成订单
    // lists3: ["../images/1.jpg", "../images/1.jpg"],
    selected: true,
    selected1: false,
    selected2: false,
    curNav:'1',
    Id:1
  },
  onShow(e){
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
      }
    })
    // 获取资质挂靠说明
    if (that.data.curNav == 1) {
      // 挂靠说明
      wx.showLoading({
        title: '正在加载数据',
      })
      wx.request({
        url: getApp().data.serviceUrl + '/certificateDescribe/findOne',
        data: {
        },
        success: function (res) {
          // console.log(res)
          var certificateDescribe = res.data.certificateDescribe
          that.setData({
            contactPerson: certificateDescribe.contactPerson,
            content: certificateDescribe.content,
            phone: certificateDescribe.phone
          })
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
      }) 
    }
  },
  onLoad(e){
    var that = this
    // 证书分类
    wx.request({
      url: getApp().data.serviceUrl + '/certificateType/findAll',
      data: {
      },
      success: function (res) {
        var certificateClass = res.data.mapList;
        that.setData({
          certificateClass
        })
      }
    })
    // 资质证书图片
    wx.request({
      url: getApp().data.serviceUrl + '/certificateHonor/findAll',
      data: {
        certificateTypeId: this.data.curNav
      },
      success: function (res) {
        var lists1=res.data.mapList
        that.setData({
          lists1: lists1
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
  // Tab横向切换
  selected: function (e) {
    var that = this
    // 获取到id
    var Id = e.currentTarget.dataset.id
    that.setData({
      curNav:Id
    })
    if (that.data.curNav == 1){
      // 挂靠说明
      wx.showLoading({
        title: '正在加载数据',
      })
      wx.request({
        url: getApp().data.serviceUrl + '/certificateDescribe/findOne',
        data: {
        },
        success: function (res) {
          // console.log(res)
          var certificateDescribe = res.data.certificateDescribe
          that.setData({
            contactPerson:certificateDescribe.contactPerson,
            content:certificateDescribe.content,
            phone: certificateDescribe.phone
          })
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
      }) 
    }
    // 挂靠说明
    wx.showLoading({
      title: '正在加载数据',
    })
    // 资质证书图片
    wx.request({
      url: getApp().data.serviceUrl + '/certificateHonor/findAll?certificateTypeId=' + Id,
      data: {
      },
      success: function (res) {
        var lists1=res.data.mapList
        that.setData({
          lists1: lists1
        })
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
    }) 
  },
})
