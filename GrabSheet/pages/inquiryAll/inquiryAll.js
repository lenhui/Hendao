// pages/management/management.js
// 获得下标
var indexId;
// var page = 1;
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
Page({
  data: {
    contentlist: [],
    // 分类
    index: 0,
    // 判断是否登录注册
    login: true,
    list: [],//会员列表
    total: 0,//分页总数
    page: 1,
    pageNum: 1,//分页记录数
    pageSize: 10,//分页大小
    hasmoreData: true,//更多数据
    hiddenloading: true,//加载中
    // page:1
  },
  onShow: function (e) {
    var that = this;
    that.setData({
      page: 1
    })
  },
  onLoad: function (e) {
    var that = this;
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/industryInformation/page',
      data: { 
        page:1
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var dataList = []
        var list = res.data.maplist
        console.log(list)
        var total = res.data.totalPages
        for (var i = 0; i < list.length; i++) {
          // var date = list[i].createTime;
          // 调用转换时间戳事件
          var date = list[i].create_time
          var title = list[i].title;
          var mainContent = list[i].main_content;
          var id = list[i].id;
          var obj = {};
          obj.date = date;
          obj.title = title;
          obj.mainContent = mainContent;
          obj.id = id
          dataList.push(obj)
        }
        that.setData({
          list: dataList,
          total: total
        });
        // 设置数组元素
        that.setData({
          list: that.data.list,
        });
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
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    var province = that.data.province;
    var city = that.data.city;
    var area = that.data.area;
    var level = that.data.level
    wx.request({
      url: getApp().data.serviceUrl + '/industryInformation/page',
      data: {
        page:1
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var dataList = []
        var list = res.data.maplist
        var total = res.data.totalPages
        for (var i = 0; i < list.length; i++) {
          // var date = list[i].createTime;
          // 调用转换时间戳事件
          var date = list[i].create_time
          var title = list[i].title;
          var mainContent = list[i].main_content;
          var id = list[i].id;
          var obj = {};
          obj.date = date;
          obj.title = title;
          obj.mainContent = mainContent;
          obj.id = id
          dataList.push(obj)
        }
        console.log(date)
        that.setData({
          list: dataList,
          total: total
        });
        // 设置数组元素
        that.setData({
          list: that.data.list,
          page: 1
        });
        // console.log(that.data.moment);
        // 隐藏导航栏加载框
        setTimeout(function () {
          wx.hideNavigationBarLoading() //在标题栏中停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }, 1000);
        wx.stopPullDownRefresh()
      }
    })
  },
  onReachBottom: function () {
    var that = this;
    // 页数+1
    // var page = that.data.page;
    var page = that.data.page
    console.log(page)
    if (page >= that.data.total) {
      return false;
    } else {
      // 页数+1
      var page = page + 1;
      this.setData({
        page
      })
      // 显示加载图标
      wx.showLoading({
        title: '玩命加载中',
      })
      // 请求数据
      wx.request({
        url: getApp().data.serviceUrl + '/industryInformation/page',
        method: "GET",
        data: {
          page: page,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          var dataList = that.data.list;
          var list = res.data.maplist
          console.log(list)
          var total = res.data.totalPages
          for (var i = 0; i < list.length; i++) {
            // var date = list[i].createTime;
            // 调用转换时间戳事件
            var date = list[i].create_time
            var title = list[i].title;
            var mainContent = list[i].main_content;
            var id = list[i].id;
            var obj = {};
            obj.date = date;
            obj.title = title;
            obj.mainContent = mainContent;
            obj.id = id
            dataList.push(obj)
          }
          that.setData({
            list: dataList,
            total: total
          });
          // 设置数组元素
          that.setData({
            list: that.data.list
          });
          // 隐藏加载框
          wx.hideLoading();
          // console.log(total)
          if (that.data.page * that.data.pageSize <= total * that.data.pageSize || list.length == 0) {
            that.setData({
              hasmoreData: false,
              // hiddenloading: true 
            })
          }

        }
      })
    }
    
  },
    // console.log('picker发送选择改变，携带值为', e.detail.value)
  // 点击跳转事件
  jumpPage: function (e) {
    // 获取到id值
    console.log(e)
    var Id = e.currentTarget.dataset.id
    if (this.data.login) {
      wx: wx.navigateTo({
        url: '../inquiry/inquiry?id=' + Id,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx: wx.showModal({
        title: '提示',
        content: '此信息为【高级】会员信息，请登录后查看',
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
  },

  jumpTo: function (e) {
    // 获取id
    var title = e.currentTarget.dataset.title;
    var Id = e.currentTarget.dataset.id;
    this.setData({
      toView: title,
      curId: Id,
    })
  },
  jumpTos: function (e) {
    // console.log(e.currentTarget.dataset.index)
    wx: wx.navigateTo({
      url: '../serDetails/serDetails',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})
