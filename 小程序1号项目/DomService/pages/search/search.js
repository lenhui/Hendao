// pages/demo/search.js
let app = getApp();
Page({
  data: {
    staticUrl: app.staticUrl,
    searchKey: "",
    searchClose: false
  },
  searchChange: function (e) {
    var key = e.detail.value;
    this.setData({ searchKey: key });
    if (key.length >= 1) {
      this.setData({ searchClose: true });
    } else {
      this.setData({ searchClose: false });
    }
  },
  clearKey: function () {
    this.setData({ searchClose: false, searchKey: "" });
  },
  searchNow: function () {
    wx.showToast({
      title: '开始搜索 ' + this.data.searchKey,
      icon: "none"
    })
  }
})