// pages/about/about.js
Page({
  data:{
    // imageurl:'../../pages/images/banner1.jpg',
    title:'关于我们',
    content:''
  },
  onShow:function(e){
    var that = this
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/companyProfile/findAll',
      data: {
      },
      success: function (res) {
      // console.log(res)
      that.setData({
        imageurl: res.data.mapList.image,
        content: res.data.mapList.content
      })
        // 隐藏加载框
        setTimeout(function () {
          wx.hideLoading();
          return false;
        }, 1000)
      }
    })

  }
})