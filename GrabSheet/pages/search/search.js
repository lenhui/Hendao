// pages/search/search.js
Page({
  data:{
    hotList:[],
    url: [
      '../about/about',
      '../order/order',
      '../Customer/Customer',
      '../feedBack/feedBack',
    ],
    result:false,
    state: ''
  },
  onLoad(e) {
    // 获取屏幕的高度
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var winWidth = sysInfo.windowWidth;
    var that = this
    this.setData({
      height: winHeight,
      // winWidth: winWidth
    })
    // 热门搜索
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/searchType/findAll',
      data: {
        name: ''
      },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res)
        var searchArray = res.data.mapList
        that.setData({
          hotList: searchArray,
        })
        // 隐藏加载框
        setTimeout(function () {
          wx.hideLoading();
          return false;
        }, 1000)
      }
    })
  },
  searchText:function(e){
    var searchText = e.detail.value
    this.setData({
      searchText: searchText
    })
  },
  search:function(e){
    var that = this;
    var searchText = that.data.searchText; 
    if (searchText == '' || searchText == undefined){
      searchText = ''
    }else{
      searchText = encodeURI(searchText)
    }
    wx.request({
      url: getApp().data.serviceUrl + '/searchType/findAll',
      data: {
        name: searchText
      },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res)
        var searchArray = res.data.mapList
        if (searchArray.length == 0){
          wx.showModal({
            content: '找不到您要搜索的内容，请重新输入',
            showCancel: false
          });
        }else{
          that.setData({
            hotList: searchArray,
          })
        }  
      }
    })
  },
  jumpRes:function(e){
    var Id = e.currentTarget.dataset.id
    console.log(e)
    if(Id == 1){
      wx: wx.navigateTo({
        url: '../information/information',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else if(Id==2){
      wx: wx.navigateTo({
        url: '../management/management',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else if(Id == 3){
      wx: wx.navigateTo({
        url: '../shop/shop',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (Id == 4){
      wx: wx.navigateTo({
        url: '../certificate/certificate',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (Id == 5){
      wx: wx.navigateTo({
        url: '../activeMore/activeMore',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (Id == 6){
      wx: wx.navigateTo({
        url: '../inquiryAll/inquiryAll',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  }
})
