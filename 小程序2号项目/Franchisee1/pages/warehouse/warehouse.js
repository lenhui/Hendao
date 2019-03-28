// pages/warehouse/warehouse.js
Page({

  data: {
    bool:true,
    operText: 'operText',
    opera: 'opera',
    orderLists: [{
      img: '../images/icon2.jpg',
      title: '大型油烟机多功能清洗大型油烟机多功能清洗大型油烟机多功能清洗大型油烟机多功能清洗大型油烟机多功能清洗大型油烟机多功能清洗大型油烟机多功能清洗大型油烟机多功能清洗',
      date: '2018-11-21',
      num: '1'
    }, {
      img: '../images/icon2.jpg',
      title: '木质面修复保养',
      date: '2018-11-21',
      num: '2'
    }, {
      img: '../images/icon2.jpg',
      title: '空气治理、家具护理',
      date: '2018-11-21',
      num: '2'
    }, {
      img: '../images/icon2.jpg',
      title: '空气治理、家具护理',
      date: '2018-11-21',
      num: '2'
    }, {
      img: '../images/icon2.jpg',
      title: '木质面修复保养',
      date: '2018-11-21',
      num: '2'
    }, {
      img: '../images/icon2.jpg',
      title: '空气治理、',
      date: '2018-11-21',
      num: '2'
    }, {
      img: '../images/icon1.jpg',
      title: '木质面修复保养',
      date: '2018-11-21',
      num: '2'
    }, {
      img: '../images/icon1.jpg',
      title: '空气治理、家具护理',
      date: '2018-11-21',
      num: '2'
    }],
  },
  jumpTos: function (e) {
    wx: wx.navigateTo({
      url: '../wareDestail/wareDestail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 操作事件
  operation: function (e) {
    this.setData({
      operText: 'operText1',
      opera: 'opera1',
      bool:false
    })
  },
  jumpDel:function(e){
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var orderLists = this.data.orderLists
    var that = this
    // 从数组中删除
    wx:wx.showModal({
      title: '确定删除吗？',
      content: '',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        console.log(res)
        if(res.confirm){
          orderLists.splice(index,1)
          that.setData({
            orderLists
          })
          wx.showToast({
            title: '删除成功',
            duration: 2000
          })
        } else if (res.cancel) {
          return false;
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  jumpEdit: function (e) {
    wx: wx.navigateTo({
      url: '../addServer/addServer',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  jumpUpper:function(e){
    var index = e.currentTarget.dataset.index;
    var orderLists = this.data.orderLists
    var that = this
    wx: wx.showModal({
      title: '确定上架吗？',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '确定',
      confirmColor: '',
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          that.data.orderLists.splice(index, 1)
          that.setData({
            orderLists
          })
          wx.showToast({
            title: '上架成功',
            duration: 2000
          })
        } else if (res.cancel) {
          return false;
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  stroke: function (e) {
    this.setData({
      operText: 'operText',
      opera: 'opera',
      bool: true,
      // severMain:'sever-main1'
    })
  }
})
