// // page/myOrder/myOrder.js
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
    ordering: [],
    total: 0,//分页总数
    page: 1,
    pageNum: 1,//分页记录数
    pageSize: 10,//分页大小
    hasmoreData: true,//更多数据
    hiddenloading: true//加载中
  },
  onShow: function (e) {
    var that = this;
    that.setData({
      ordering:'',
      page:1
    })
    // 获取到会员
    var ordinaryMember = wx.getStorageSync('ordinaryMember')
    if (!ordinaryMember || ordinaryMember == null || ordinaryMember == '') {
      wx: wx.showModal({
        title: '提示',
        content: '此信息为会员信息，请登录后查看',
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
    // else if (ordinaryMember && ordinaryMember.level == 0) {
    //   wx: wx.showModal({
    //     title: '提示',
    //     content: '此信息为【高级】会员信息，请先申请为高级会员后查看',
    //     showCancel: false
    //   })
    // }
    else{
      var memberId = wx.getStorageSync('ordinaryMember').id;
      wx.showLoading({
        title: '正在加载数据',
      })
      wx.request({
      url: getApp().data.serviceUrl + '/memberOrder/page',
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      data: {
          status: '',
          page: 1,
          memberId: memberId
        },
      success: function (res) {
        var ordering = res.data.maplist;
        var total = res.data.totalPages
        var dataList = [];
        for (var i = 0; i < ordering.length; i++) {
          var date = ordering[i].create_time
          var title = ordering[i].title;
          var mainContent = ordering[i].main_content;
          var memberOrderStatus = ordering[i].memberOrderStatus
          var id = ordering[i].id;
          var obj = {};
          obj.date = date;
          obj.title = title;
          obj.mainContent = mainContent;
          obj.id = id;
          obj.memberOrderStatus = memberOrderStatus;
          dataList.push(obj)
        }
        // console.log(date)
        that.setData({
          ordering: dataList,
          total: total
        });
        // 设置数组元素
        that.setData({
          ordering: that.data.ordering
        });
        if (that.data.ordering.length == 0) {
            wx.showModal({
              content: '您还没有订单，请先进行抢单',
              showCancel: false
            })
          wx.hideLoading();
          return false;
      }else{
          // 隐藏加载框
          setTimeout(function () {
            wx.hideLoading();
            return false;
          }, 1000)
      }
      }
    })
    }
   
  },
  onLoad: function (e) {
    // 请求更多活动
    var that = this;
   
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    // 获取到会员id
    var ordinaryMember = wx.getStorageSync('ordinaryMember')
    if (ordinaryMember) {
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();
      var memberId = wx.getStorageSync('ordinaryMember').id;
    wx.request({
      url: getApp().data.serviceUrl + '/memberOrder/page',
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      data:{
        status: '',
        page: 1,
        memberId: memberId
      },
      success: function (res) {
        var ordering = res.data.maplist;
        var total = res.data.totalPages
        var dataList = [];
        for (var i = 0; i < ordering.length; i++) {
          var date = ordering[i].create_time
          var title = ordering[i].title;
          var mainContent = ordering[i].main_content;
          var memberOrderStatus = ordering[i].memberOrderStatus
          var id = ordering[i].id;
          var obj = {};
          obj.date = date;
          obj.title = title;
          obj.mainContent = mainContent;
          obj.id = id;
          obj.memberOrderStatus = memberOrderStatus;
          dataList.push(obj)
        }
        console.log(date)
        that.setData({
          ordering: dataList,
          total: total
        });
        // 设置数组元素
        that.setData({
          ordering: that.data.ordering,
          page:1
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
    }
  },
  onReachBottom: function () {
    var that = this;
    var total = this.data.total
    // // 获取到会员id
    var ordinaryMember = wx.getStorageSync('ordinaryMember')
    var page = that.data.page
    if (page >= that.data.total) {
      return false;
    } else {
      // 页数+1
      var page = page + 1;
      this.setData({
        page
      })
      if (ordinaryMember) {
      // 显示加载图标
      wx.showLoading({
        title: '玩命加载中',
      })
        var memberId = wx.getStorageSync('ordinaryMember').id;
      // 请求数据 
      wx.request({
        url: getApp().data.serviceUrl + '/memberOrder/page',
        method: "GET",
        data: {
          status: '',
          page: page,
          memberId: memberId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          var ordering = res.data.maplist;
          var total = res.data.totalPages
          var dataList = that.data.ordering;
          for (var i = 0; i < ordering.length; i++) {
            var date = ordering[i].create_time
            var title = ordering[i].title;
            var mainContent = ordering[i].main_content;
            var memberOrderStatus = ordering[i].memberOrderStatus
            var id = ordering[i].id;
            var obj = {};
            obj.date = date;
            obj.title = title;
            obj.mainContent = mainContent;
            obj.id = id;
            obj.memberOrderStatus = memberOrderStatus;
            dataList.push(obj)
          }

          // 设置数据
          that.setData({
            ordering: that.data.ordering
          })
          if (that.data.page * that.data.pageSize <= total * that.data.pageSize || ordering.length == 0) {
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
    }
  },
  jumpAllOrder: function (e) {
    // 获取到id值
    var Id = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: '../orderDetails/orderDetails?id=' + Id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
    // 删除订单
  delOrder:function(e){
    var that =  this;
    var ordering = this.data.ordering;
    var index = e.currentTarget.dataset.index;
    // 获取到会员id
    var ordinaryMember = wx.getStorageSync('ordinaryMember')
    var memberId = wx.getStorageSync('ordinaryMember').id;
    var orderId = e.currentTarget.dataset.id;
    wx:wx.showModal({
      title: '确定删除订单吗？',
      content: '',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        if(res.confirm){
          // 调用删除接口
          wx.request({
            url: getApp().data.serviceUrl + '/memberOrder/deleteById',
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              orderInforId: orderId
            },
            success: function (res) {
              if(res.data.code == 0){
                wx.showToast({
                  title: '删除成功',
                  duration: 2000
                })
                // 从新加载渲染数据
                wx.request({
                  url: getApp().data.serviceUrl + '/memberOrder/page',
                  method: "GET",
                  header: {
                    'content-type': 'application/text'
                  },
                  data: {
                    status: '',
                    page: 1,
                    memberId: memberId
                  },
                  success: function (res) {
                    var ordering = res.data.maplist;
                    var total = res.data.totalPages
                    var dataList = [];
                    for (var i = 0; i < ordering.length; i++) {
                      var date = ordering[i].create_time
                      var title = ordering[i].title;
                      var mainContent = ordering[i].main_content;
                      var memberOrderStatus = ordering[i].memberOrderStatus
                      var id = ordering[i].id;
                      var obj = {};
                      obj.date = date;
                      obj.title = title;
                      obj.mainContent = mainContent;
                      obj.id = id;
                      obj.memberOrderStatus = memberOrderStatus;
                      dataList.push(obj)
                    }
                    // console.log(date)
                    that.setData({
                      ordering: dataList,
                      total: total
                    });
                    // 设置数组元素
                    that.setData({
                      ordering: that.data.ordering,
                      page:1
                    });
                  }
                })
              }else{
                wx.showToast({
                  title: '删除失败',
                  duration: 2000
                })
              }
          }
          }) 
        }
      }
      })
    },
})
