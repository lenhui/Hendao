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
    activeMore: [],
    activeList: [],//会员列表
    total: 0,//分页总数
    page: 1,
    pageNum: 1,//分页记录数
    pageSize: 10,//分页大小
    hasmoreData: true,//更多数据
    hiddenloading: true//加载中
  },
  onLoad: function (e) {
    var that = this;
    that.setData({
      page: 1
    })
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/companyActivity/page?page=1',
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        console.log(res)
        var activeList = res.data.pageResult.content;
        var total = res.data.pageResult.totalPages
        var dataList = [];
        for (var i = 0; i < activeList.length; i++) {
          var date = timeFormat(activeList[i].createTime)
          var title = activeList[i].title;
          var mainContent = activeList[i].mainContent;
          var imageList = activeList[i].image;
          var imgArr = [];
          // var imgArr = imageList.split(",");
          // console.log(imgArr)
          var id = activeList[i].id;
          var obj = {};
          obj.date = date;
          obj.title = title;
          obj.mainContent = mainContent;
          obj.image = imageList
          obj.id = id
          dataList.push(obj)
        }
        // console.log(date)
        that.setData({
          activeList: dataList,
          total: total
        });
        // 设置数组元素
        that.setData({
          activeList: that.data.activeList
        });
        // 隐藏加载框
        setTimeout(function () {
          wx.hideLoading();
          return false;
        }, 1000)
      }
    })
  },
  // onLoad:function(e){
  //   // 请求更多活动
  //   var that = this;

  // },
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: getApp().data.serviceUrl + '/companyActivity/page?page=1',
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        var dataList = []
        var activeList = res.data.pageResult.content;
        for (var i = 0; i < activeList.length; i++) {
          // var date = list[i].createTime;
          // 调用转换时间戳事件
          var date = timeFormat(activeList[i].createTime)
          var title = activeList[i].title;
          var mainContent = activeList[i].mainContent;
          var id = activeList[i].id;
          var imageList = activeList[i].imageList;
          var imgArr = [];
          var imgArr = imageList.split(",");
          var obj = {};
          obj.date = date;
          obj.title = title;
          obj.mainContent = mainContent;
          obj.image = imgArr[0];
          obj.id = id;
          dataList.push(obj)
        }
        that.setData({
          activeList: dataList
        });
        // 设置数组元素
        that.setData({
          activeList: that.data.activeList,
          page: 1
        });
        // console.log(that.data.moment);
        // 隐藏导航栏加载框
        setTimeout(function () {
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        }, 1000);
        wx.stopPullDownRefresh()
      }
    })
  },
  onReachBottom: function () {
    var that = this;
    // 页数+1
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
        url: getApp().data.serviceUrl + '/companyActivity/page',
        method: "GET",
        data: {
          page: page
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res)
          // 回调函数
          var total = res.data.pageResult.totalPages
          console.log(total)
          var dataList = that.data.activeList;
          var activeList = res.data.pageResult.content;
          for (var i = 0; i < activeList.length; i++) {
            // 调用转换时间戳事件
            var date = timeFormat(activeList[i].createTime)
            var title = activeList[i].title;
            var mainContent = activeList[i].mainContent;
            var id = activeList[i].id;
            var obj = {};
            obj.date = date;
            obj.title = title;
            obj.mainContent = mainContent;
            obj.id = id;
            dataList.push(obj)
          }
          // 设置数据
          that.setData({
            activeList: that.data.activeList
          })
          console.log(that.data.activeList)
          // console.log(total)
          if (that.data.page * that.data.pageSize <= total * that.data.pageSize || activeList.length == 0) {
            that.setData({
              hasmoreData: false,
              // hiddenloading: true 
            })
            console.log(111)
          }
          // 隐藏加载框
          wx.hideLoading();
        }
      })
    }

  },
  // 跳转到更多
  jumpMore: function (e) {
    var Id = e.currentTarget.dataset.id
    console.log(Id)
    wx.navigateTo({
      url: '../corpdestail/corpdestail?id=' + Id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})