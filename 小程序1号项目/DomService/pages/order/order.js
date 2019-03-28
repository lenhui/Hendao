// pages/demo/tabfullpage.js
var _self, app = getApp();
//默认新闻数据（来自api请求）
//每个选项下面的新闻列表
//  var waitting = [];
// var service = [
//   { orderType: '家庭保洁服务', state: '等待服务', src: '../images/2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '订单进度',id:5 },
//   { orderType: '家庭保洁', state: '等待服务', src: '../images/2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '订单进度',id:6},
//   { orderType: '家庭保洁', state: '等待服务', src: '../images/2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '订单进度',id:7 },
//   { orderType: '家庭保洁', state: '等待服务', src: '../images/2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '订单进度',id:8 },
// ];
// var evaluate = [
//   { orderType: '家庭保洁评价', state: '待评价', src: '../images/2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '去评价',id:9 },
//   { orderType: '家庭保洁', state: '待评价', src: '../images/2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '去评价',id:10 },
//   { orderType: '家庭保洁', state: '待评价', src: '../images/2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '去评价',id:11 },
//   { orderType: '家庭保洁', state: '待评价', src: '../images/2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '去评价',id:12 },
// ];
// var evaluated = [
//   { orderType: '家庭保洁评价', state: '已评价', src: '../images/2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '已评价', id: 9 },
//   { orderType: '家庭保洁', state: '已评价', src: '../images/2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '已评价', id: 10 },
//   { orderType: '家庭保洁', state: '已评价', src: '../images/2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '已评价', id: 11 },
//   { orderType: '家庭保洁', state: '已评价', src: '../images/2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '已评价', id: 12 },
// ];
//对应下面3个标签的新闻内容数据
// var newsAll = [waitting,service,evaluate,evaluated];
// newsALL.push(waitting);
// newsAll.waitting=xxx;
Page({
  data: {
    staticUrl: app.staticUrl,
    tabCurrentIndex: 0,
    swiperCurrentIndex: 0,
    tabHeight: 300,
    total: 0, //分页总数
    page: 0,
    tabs: [
      //标签名称 , 分类 id , 加载更多, 加载的页码
      {
        name: '待接单',
        id: 'waitting',
        loadingType: 0,
        page: 1
      },
      {
        name: '等待服务',
        id: 'service',
        loadingType: 0,
        page: 1
      },
      {
        name: '待评论',
        id: 'evaluate',
        loadingType: 0,
        page: 1
      },
      {
        name: '已评论',
        id: 'evaluated',
        loadingType: 0,
        page: 1
      }, {
        name: '已评论',
        id: 'evaluated',
        loadingType: 0,
        page: 1
      },

    ],
    newsAll: []
  },
  onLoad: function(e) {
    //  var that = this;
    //   that.funLoad()
  },
  onShow: function() {
    _self = this;
    _self.funLoad()
  },
  onReady: function() {
    //获取屏幕高度及比例
    var winInfo = wx.getSystemInfo({
      success: function(res) {
        var windowHeight = res.windowHeight;
        //获取头部标题高度
        wx.createSelectorQuery().select('#grace-tab-title').fields({
          size: true,
        }, function(res) {
          //计算得出滚动区域的高度
          _self.setData({
            tabHeight: windowHeight - res.height
          });
        }).exec();
      }
    });
  },
  tabChange: function(e) {
    var index = e.target.id.replace('tabTag-', '');
    this.setData({
      swiperCurrentIndex: index,
      tabCurrentIndex: index,
    });

  },
  // 轮播事假处理
  swiperChange: function(e) {
    var index = e.detail.current;
    this.setData({
      tabCurrentIndex: index,
    });
  },
  //每个选项滚动到底部
  scrollend: function(e) {
    //获取是哪个选项滚动到底？
    var index = e.currentTarget.dataset.scindex;
    var that = this;
    var newsAll = that.data.newsAll;
    var openid = wx.getStorageSync('openid');
    var status;
    console.log(index);
    //可以利用 tabs 携带的分类id 与服务器交互请求对应分类的数据
    console.log(this.data.tabs[index].id);
    if (this.data.tabs[index].id == 'waitting') {
      status = 0;
      var page = this.data.tabs[index].page;
      var total = that.data.total1
      console.log(page)
      console.log(total)
      //判断是否是最后一页
      if (this.data.tabs[index].page >= total) {
        return false
      } else {
        console.log('待接单')
        var tabs = that.data.tabs;
        for (var i = 0; i < tabs.length; i++) {
          if (i == index) {
            console.log(i)
            tabs[i].page = page + 1
          }
        }
        that.setData({
          tabs: tabs
        })
        wx.showLoading({
          title: '正在加载数据',
        })
        wx.request({
          url: getApp().data.serviceUrl + '/order/findAll',
          header: {
            'content-type': 'application/text'
          },
          method: "GET",
          data: {
            openid: openid,
            status: 0,
            page: page,
            evaluationStatus: 0
          },
          success: function(res) {
            console.log(res)
            var waitting = that.data.waitting;
            console.log(waitting)
            var waits = res.data.maplist;
            for (var i = 0; i < waits.length; i++) {
              waits[i]['state'] = '待接单'
              waits[i]['comment'] = '取消订单';
              var aAindex = (waits[i].address.lastIndexOf('区') || waits[i].address.lastIndexOf('县'));
              waits[i]['address'] = waits[i].address.substr(0, aAindex + 1);
              waitting.push(waits[i])
            }
            that.setData({
              waitting: waitting,
            })
            // 隐藏加载框
            setTimeout(function() {
              wx.hideLoading();
              return false;
            }, 1000)
            console.log(page)
            console.log(that.data.waitting)
            var newsAll = that.data.newsAll;
            newsAll[index] = that.data.waitting
            that.setData({
              newsAll: newsAll
            })
            console.log(that.data.newsAll)
          },
          fail: function(e) {
            wx.showToast({
              title: '网络断开，稍后重试',
              icon: 'none',
              duration: 2000
            })
          }
        });
      }
    } else if (this.data.tabs[index].id == 'service') {
      status = 2;
      var page = this.data.tabs[index].page;
      var total = that.data.total2
      console.log(page)
      console.log(total)
      //判断是否是最后一页
      if (this.data.tabs[index].page >= total) {
        return false
      } else {
        console.log('等待服务')
        // that.downFunction(2, page, 0, this.data.service, '等待接单', '订单进度', 1)
        var tabs = that.data.tabs;
        for (var i = 0; i < tabs.length; i++) {
          if (i == index) {
            console.log(i)
            tabs[i].page = page + 1
          }
        }
        that.setData({
          tabs: tabs
        })
        wx.showLoading({
          title: '正在加载数据',
        })
        wx.request({
          url: getApp().data.serviceUrl + '/order/findAll',
          header: {
            'content-type': 'application/text'
          },
          method: "GET",
          data: {
            openid: openid,
            status: 2,
            page: page,
            evaluationStatus: 0
          },
          success: function(res) {
            console.log(res)
            var service = that.data.service;
            console.log(service)
            var waits = res.data.maplist;
            for (var i = 0; i < waits.length; i++) {
              waits[i]['state'] = '等待服务'
              waits[i]['comment'] = '订单进度';
              var aAindex = (waits[i].address.lastIndexOf('区') || waits[i].address.lastIndexOf('县'));
              waits[i]['address'] = waits[i].address.substr(0, aAindex + 1);
              service.push(waits[i])
            }
            // console.log(waitting)
            that.setData({
              service: service,
              // total: totalPages
            })
            console.log(page)
            console.log(that.data.service)
            // 隐藏加载框
            setTimeout(function() {
              wx.hideLoading();
              return false;
            }, 1000)
            var newsAll = that.data.newsAll;
            newsAll[index] = that.data.service
            that.setData({
              newsAll: newsAll
            })
            console.log(that.data.newsAll)
          },
          fail: function(e) {
            wx.showToast({
              title: '网络断开，稍后重试',
              icon: 'none',
              duration: 2000
            })
          }
        });
      }

    } else if (this.data.tabs[index].id == 'evaluate') {
      status = 4;
      var page = this.data.tabs[index].page;
      var total = that.data.total3
      console.log(page)
      console.log(total)
      if (this.data.tabs[index].page >= total) {
        return false
      } else {
        // that.downFunction(4, page, 0, this.data.service, '待评价', '去评价', 1)
        var tabs = that.data.tabs;
        for (var i = 0; i < tabs.length; i++) {
          if (i == index) {
            tabs[i].page = page + 1
          }
        }
        page++;
        that.setData({
          tabs: tabs
        })
        wx.showLoading({
          title: '正在加载数据',
        })
        wx.request({
          url: getApp().data.serviceUrl + '/order/findAll',
          header: {
            'content-type': 'application/text'
          },
          method: "GET",
          data: {
            openid: openid,
            status: 4,
            page: page,
            evaluationStatus: 0
          },
          success: function(res) {
            console.log(res)
            var evaluate = that.data.evaluate;
            console.log(evaluate)
            var waits = res.data.maplist;
            for (var i = 0; i < waits.length; i++) {
              waits[i]['state'] = '待评论'
              waits[i]['comment'] = '去评论';
              var aAindex = (waits[i].address.lastIndexOf('区') || waits[i].address.lastIndexOf('县'));
              waits[i]['address'] = waits[i].address.substr(0, aAindex + 1);
              evaluate.push(waits[i])
            }
            that.setData({
              evaluate: evaluate,
              // total: totalPages
            })
            // 隐藏加载框
            setTimeout(function() {
              wx.hideLoading();
              return false;
            }, 1000)
            console.log(page)
            console.log(that.data.evaluate)
            var newsAll = that.data.newsAll;
            newsAll[index] = that.data.evaluate
            that.setData({
              newsAll: newsAll
            })
            console.log(that.data.newsAll)
          },
          fail: function(e) {
            wx.showToast({
              title: '网络断开，稍后重试',
              icon: 'none',
              duration: 2000
            })
          }
        });
      }
    } else if (this.data.tabs[index].id == 'evaluated') {
      status = 4;
      var page = this.data.tabs[index].page;
      var total = that.data.total4
      console.log(page)
      console.log(total)
      if (this.data.tabs[index].page >= total) {
        return false
      } else {
        console.log('已评价')
        // that.downFunction(4, page, 1, this.data.evaluated, '已评价', '已评价', 3)
        var tabs = that.data.tabs;
        for (var i = 0; i < tabs.length; i++) {
          if (i == index) {
            tabs[i].page = page + 1
          }
        }
        page++;
        that.setData({
          tabs: tabs
        })
        wx.showLoading({
          title: '正在加载数据',
        })
        wx.request({
          url: getApp().data.serviceUrl + '/order/findAll',
          header: {
            'content-type': 'application/text'
          },
          method: "GET",
          data: {
            openid: openid,
            status: 4,
            page: page,
            evaluationStatus: 1
          },
          success: function(res) {
            console.log(res)
            var evaluated = that.data.evaluated;
            console.log(evaluated)
            var waits = res.data.maplist;
            for (var i = 0; i < waits.length; i++) {
              waits[i]['state'] = '已评论'
              waits[i]['comment'] = '已评论';
              var aAindex = (waits[i].address.lastIndexOf('区') || waits[i].address.lastIndexOf('县'));
              waits[i]['address'] = waits[i].address.substr(0, aAindex + 1);
              evaluated.push(waits[i])
            }
            that.setData({
              evaluated: evaluated,
              // total: totalPages
            })
            // 隐藏加载框
            setTimeout(function() {
              wx.hideLoading();
              return false;
            }, 1000)
            var newsAll = that.data.newsAll;
            newsAll[index] = that.data.evaluated
            that.setData({
              newsAll: newsAll
            })
            console.log(that.data.evaluated)
            console.log(that.data.newsAll)
          },
          fail: function(e) {
            wx.showToast({
              title: '网络断开，稍后重试',
              icon: 'none',
              duration: 2000
            })
          }
        });
        // setTimeout(function () {
        //   var newsAll = that.data.newsAll;
        //   newsAll[index] = that.data.evaluated
        //   that.setData({
        //     newsAll: newsAll
        //   })
        //   console.log(that.data.newsAll)
        // }, 1000)
        // console.log(page)
      }
    }
  },
  orderCancel: function(e) {
    console.log(e)
    var that = this;
    // 获取到要取消订单的id
    var cancelId = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index;
    var orderNumber = e.currentTarget.dataset.ordernumber;
    var checkstatus = e.currentTarget.dataset.checkstatus;
    var openid = wx.getStorageSync('openid');
    console.log(checkstatus)
    // 可以把0变为其他数字和空的状态码换一下(重点)
    //  if (checkstatus == 0){
    //     checkstatus = 1
    //   }
    //   console.log(checkstatus)
    // console.log(orderNumber)
    if (checkstatus == 1) {
      wx.showModal({
        content: '订单正在取消中',
        showCancel: false
      });
    } else if (checkstatus == 3) {
      wx.showModal({
        content: '订单取消失败，请联系我们的客服人员',
        showCancel: false
      });
    } else if (checkstatus == 0) {
      wx: wx.showModal({
        title: '确定要取消该订单吗？',
        content: '',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function(res) {
          if (res.confirm) {
            wx.request({
              url: getApp().data.serviceUrl + '/ordertApplyCancel/apply',
              method: "GET",
              header: {
                'content-type': 'application/json'
              },
              data: {
                openid: openid,
                orderNumber: orderNumber
              },
              success: function(res) {
                console.log(res)
                if (res.data.code == 0) {
                  wx.showModal({
                    content: '订单取消成功',
                    showCancel: false
                  });
                  console.log(111)
                  that.funLoad();
                } else {
                  wx.showModal({
                    content: '订单取消失败',
                    showCancel: false
                  });
                }
              },
              fail: function(e) {
                wx.showToast({
                  title: '网络断开，稍后重试',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
          console.log(res)
          console.log(checkstatus)

        }
      })
    }
  },
  // 跳转到订单进度
  orderProgress: function(e) {
    var that = this;
    // 获取到要取消订单的id
    var orderId = e.currentTarget.dataset.id
    var orderNumber = e.currentTarget.dataset.ordernumber;
    wx: wx.navigateTo({
      // url: '../progress/progress',
      // + '&deviceId=' + deviceId
      url: '../progress/progress?id=' + orderId + '&orderNumber=' + orderNumber,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  orderEvaluate: function(e) {
    console.log(e)
    var orderId = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: '../comment/comment?id=' + orderId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 跳转详情界面
  jumpDetails: function(e) {
    // 获取到该条订单的id
    console.log(e)
    var orderId = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: '../orderDetails/orderDetails?id=' + orderId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  funLoad: function() {
    wx.showLoading({
      title: '正在加载数据',
    })
    var that = this;
    var tabs = that.data.tabs;
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].page = 1
    }
    // 清除加载数据
    that.setData({
      tabs: tabs,
      newsAll: []
    })
    console.log(that.data.tabs)
    // 获取用户的openid
    var openid = wx.getStorageSync('openid');
    var newsAll = that.data.newsAll;
    console.log(openid)
    wx.request({
      url: getApp().data.serviceUrl + '/order/findAll',
      header: {
        'content-type': 'application/text'
      },
      method: "GET",
      data: {
        openid: openid,
        // 待接单状态
        status: 0,
        page: 1,
        evaluationStatus: 0
      },
      success: function(res) {
        console.log(res)
        var waitting = [];
        var newsAll = that.data.newsAll;
        var waits = res.data.maplist;
        for (var i = 0; i < waits.length; i++) {
          waits[i]['state'] = '待接单'
          waits[i]['comment'] = '取消订单';
          var aAindex = (waits[i].address.lastIndexOf('区') || waits[i].address.lastIndexOf('县'));
          waits[i]['address'] = waits[i].address.substr(0, aAindex + 1);
        }
        console.log(waits)
        that.setData({
          waitting: waits,
          total1: res.data.totalPages
          // 计算总页数
        })
        console.log(that.data.waitting)
        newsAll[0] = that.data.waitting
        that.setData({
          newsAll: newsAll
        })
        console.log(that.data.newsAll)
      },
      fail: function(e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    });

    // 等待服务
    wx.request({
      url: getApp().data.serviceUrl + '/order/findAll',
      header: {
        'content-type': 'application/text'
      },
      method: "GET",
      data: {
        openid: openid,
        // 待接单状态
        status: 6,
        page: 1,
        evaluationStatus: 0
      },
      success: function(res) {
        console.log(res)
        var service = [];
        var newsAll = that.data.newsAll;
        var waits = res.data.maplist;
        for (var i = 0; i < waits.length; i++) {
          waits[i]['state'] = '等待服务'
          waits[i]['comment'] = '订单进度';
          var aAindex = (waits[i].address.lastIndexOf('区') || waits[i].address.lastIndexOf('县'));
          waits[i]['address'] = waits[i].address.substr(0, aAindex + 1);
        }
        console.log(waits)
        that.setData({
          service: waits,
          total2: res.data.totalPages
          // 计算总页数
        })
        newsAll[1] = that.data.service
        that.setData({
          newsAll: newsAll
        })
      },
      fail: function(e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    });
    // 待评价
    wx.request({
      url: getApp().data.serviceUrl + '/order/findAll',
      header: {
        'content-type': 'application/text'
      },
      method: "GET",
      data: {
        openid: openid,
        // 待接单状态
        status: 4,
        page: 1,
        evaluationStatus: 0
      },
      success: function(res) {
        console.log(res)
        var evaluate = [];
        var newsAll = that.data.newsAll;
        var waits = res.data.maplist;
        for (var i = 0; i < waits.length; i++) {
          waits[i]['state'] = '待评论'
          waits[i]['comment'] = '去评论';
          var aAindex = (waits[i].address.lastIndexOf('区') || waits[i].address.lastIndexOf('县'));
          waits[i]['address'] = waits[i].address.substr(0, aAindex + 1);
        }
        console.log(waits)
        that.setData({
          evaluate: waits,
          total3: res.data.totalPages
          // 计算总页数
        })
        console.log(that.data.evaluate)
        newsAll[2] = that.data.evaluate
        that.setData({
          newsAll: newsAll
        })
      },
      fail: function(e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    });
    // 已评价
    wx.request({
      url: getApp().data.serviceUrl + '/order/findAll',
      header: {
        'content-type': 'application/text'
      },
      method: "GET",
      data: {
        openid: openid,
        // 待接单状态
        status: 4,
        page: 1,
        evaluationStatus: 1
      },
      success: function(res) {
        console.log(res)
        var evaluated = [];
        var newsAll = that.data.newsAll;
        var waits = res.data.maplist;
        for (var i = 0; i < waits.length; i++) {
          waits[i]['state'] = '已评论'
          waits[i]['comment'] = '已评论';
          var aAindex = (waits[i].address.lastIndexOf('区') || waits[i].address.lastIndexOf('县'));
          waits[i]['address'] = waits[i].address.substr(0, aAindex + 1);
        }
        console.log(waits)
        that.setData({
          evaluated: waits,
          total4: res.data.totalPages
          // 计算总页数
        })
        console.log(that.data.evaluated)
        newsAll[3] = that.data.evaluated
        that.setData({
          newsAll: newsAll
        })
      },
      fail: function(e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    });
    setTimeout(function() {
      wx.hideLoading();
      console.log(that.data.newsAll)
    }, 1000)

    // 获取缓存距离
    wx.getStorage({
      key: 'key',
      success: function(res) {
        console.log(res)
        that.setData({
          scrollTop: res.data[0]
        })
      }
    })
  }
});