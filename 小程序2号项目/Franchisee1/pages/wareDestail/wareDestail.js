Page({
  data: {

  },
  jumpApp: function () {
    wx.navigateTo({
      url: '../../pages/appointment/appointment',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  jumpEdit: function (e) {
    wx.navigateTo({
      url: '../addServer/addServer',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})