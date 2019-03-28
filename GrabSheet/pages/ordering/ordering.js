// page/myOrder/myOrder.js
Page({

  data: {
    // Tab横向切换
    // 全部订单
    orderLists: [],
    // 已完成订单
    Ordered: [],
    // 未完成订单
    Ordering: [],
    selected: true,
    selected1: false,
    selected2: false,

  },

  // Tab横向切换
  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
  // 删除订单
  delOrder: function (e) {
    console.log(e)
    var that = this;
    var orderLists = this.data.orderLists;
    var index = e.currentTarget.dataset.index
    wx: wx.showModal({
      title: '确定删除订单吗？',
      content: '',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          orderLists.splice(index, 1)
          that.setData({
            orderLists
          })
          wx.showToast({
            title: '删除成功',
            duration: 2000
          })
        } else if (res.confirm) {
          return false;
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
