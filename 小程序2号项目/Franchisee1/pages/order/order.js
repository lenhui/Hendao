// pages/demo/tabfullpage.js
var _self, app = getApp();
//默认新闻数据（来自api请求）
//每个选项下面的新闻列表
var waitting = [
  // { serverType: '家庭保洁', name: '张雅雅',tel:'15434543454',state:'待接单',orderNum:'134234554345',orderTime:'2016-06-25 14:19',address:'五彩国际望江西路与合作化南路',remarks:'请准时服务',content:'接下此单'},
  // { serverType: '家庭保洁', name: '张雅雅', tel: '15434543454', state: '待接单', orderNum: '134234554345', orderTime: '2016-06-25 14:19', address: '五彩国际望江西路与合作化南路', remarks: '请准时服务', content: '接下此单'},
  // { serverType: '家庭保洁', name: '张雅雅', tel: '15434543454', state: '待接单', orderNum: '134234554345', orderTime: '2016-06-25 14:19', address: '五彩国际望江西路与合作化南路', remarks: '请准时服务', content: '接下此单' }, 
];
var servering = [
  // { serverType: '家庭保洁', name: '张雅雅', tel: '15434543454', state: '待服务', orderNum: '134234554345', orderTime: '2016-06-25 14:19', address: '五彩国际望江西路与合作化南路', remarks: '请准时服务',content: '开始服务' },
  // { serverType: '家庭保洁', name: '张雅雅', tel: '15434543454', state: '待服务', orderNum: '134234554345', orderTime: '2016-06-25 14:19', address: '五彩国际望江西路与合作化南路', remarks: '请准时服务', content: '开始服务' },
  // { serverType: '家庭保洁', name: '张雅雅', tel: '15434543454', state: '待服务', orderNum: '134234554345', orderTime: '2016-06-25 14:19', address: '五彩国际望江西路与合作化南路', remarks: '请准时服务', content: '开始服务' }, 
];
var finished = [
  // { serverType: '家庭保洁', name: '张雅雅', tel: '15434543454', state: '已完成', orderNum: '134234554345', orderTime: '2016-06-25 14:19', address: '五彩国际望江西路与合作化南路', remarks: '请准时服务', content: '订单详情' },
  // { serverType: '家庭保洁', name: '张雅雅', tel: '15434543454', state: '已完成', orderNum: '134234554345', orderTime: '2016-06-25 14:19', address: '五彩国际望江西路与合作化南路', remarks: '请准时服务', content: '订单详情' },
  // { serverType: '家庭保洁', name: '张雅雅', tel: '15434543454', state: '已完成', orderNum: '134234554345', orderTime: '2016-06-25 14:19', address: '五彩国际望江西路与合作化南路', remarks: '请准时服务', content: '订单详情' },
]
//对应下面3个标签的新闻内容数据
var newsAll = [waitting,servering,finished];
var amapFile = require('../../libs/amap-wx.js');
Page({
	data: {
    staticUrl: app.staticUrl,
		tabCurrentIndex: 0,
		swiperCurrentIndex: 0,
		tabHeight : 300,
		tabs: [
      //标签名称 , 分类 id , 加载更多, 加载的页码
      { name: '待接单', id: 'waitting' , loadingType : 0, page : 1,number:20},
      { name: '待服务', id: 'servering', loadingType: 0, page: 1},
      { name: '已完成', id: 'finished', loadingType: 0, page: 1}
		],
    newsAll: [],
    key: '094ac8a1cb22bb019cfd61dc50ccd812',
    show: false,
    currentLo: null,
    currentLa: null,
    newCurrentLo: null,
    newCurrentLa: null,
    distance: 0,
    duration: 0,
    markers: null,
    scale: 16,
    polyline: null,
    statusType: 'car',
    includePoints: []
	},
  onLoad:function(){
    var that = this
    that.funLoad()
  },
	onShow:function(){
    // 获取到当前地理位置
		_self = this;
    wx.getLocation({
      success(res) {
        console.log(res)
        _self.setData({
          currentLo: res.longitude,
          currentLa: res.latitude,
          includePoints: [{
            longitude: res.longitude,
            latitude: res.latitude
          }],

        });
      }
    })
	},
	onReady: function () {
		//获取屏幕高度及比例
    var that = this
		var winInfo = wx.getSystemInfo({
			success: function (res) {
				var windowHeight = res.windowHeight;
				//获取头部标题高度
				wx.createSelectorQuery().select('#grace-tab-title').fields(
					{
						size: true,
					}, function (res) {
						//计算得出滚动区域的高度
            that.setData({ tabHeight: windowHeight - res.height });
					}
				).exec();
			}
		});
	},	
	tabChange: function (e) {
		var index = e.target.id.replace('tabTag-', '');
		this.setData({ swiperCurrentIndex: index, tabCurrentIndex: index });
	},
	swiperChange: function(e){
		var index = e.detail.current;
		this.setData({ tabCurrentIndex: index });
	},
  // 每个选项滚动到底部
  //每个选项滚动到底部
  scrollend: function (e) {
    //获取是哪个选项滚动到底？
    var index = e.currentTarget.dataset.scindex;
    var that = this;
    var newsAll = that.data.newsAll;
    var openid = wx.getStorageSync('openid');
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    var businessId = ordinaryMember.id
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
          url: getApp().data.serviceUrl + '/businessOrder/mapListPage',
          header: {
            'content-type': 'application/text'
          },
          method: "GET",
          data: {
            businessId: businessId,
            status: 0,
            page: page,
            // evaluationStatus: 0
          },
          success: function (res) {
            console.log(res)
            var waitting = that.data.waitting;
            console.log(waitting)
            var waits = res.data.mapList;
            for (var i = 0; i < waits.length; i++) {
              waits[i]['state'] = '待接单'
              waits[i]['content'] = '接下此单'
              waitting.push(waits[i])
            }
            that.setData({
              waitting: waitting,
            })
            // 隐藏加载框
            setTimeout(function () {
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
          fail: function (e) {
            wx.showToast({
              title: '网络断开，稍后重试',
              icon: 'none',
              duration: 2000
            })
          }
        });
      }
    } else if (this.data.tabs[index].id == 'servering') {
      status = 1;
      var page = this.data.tabs[index].page;
      var total = that.data.total2
      console.log(page)
      console.log(total)
      //判断是否是最后一页
      if (this.data.tabs[index].page >= total) {
        return false
      } else {
        console.log('待服务')
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
          url: getApp().data.serviceUrl + '/businessOrder/mapListPage',
          header: {
            'content-type': 'application/text'
          },
          method: "GET",
          data: {
            businessId: businessId,
            status: 1,
            page: page,
          },
          success: function (res) {
            console.log(res)
            var service = that.data.service;
            console.log(service)
            var waits = res.data.mapList;
            for (var i = 0; i < waits.length; i++) {
              waits[i]['state'] = '待服务'
              waits[i]['content'] = '开始服务'
              service.push(waits[i])
            }
            console.log(service)
            that.setData({
              service: service,
              // total2: res.data.totalPages
              // 计算总页数
            })
            console.log(page)
            console.log(that.data.service)
            // 隐藏加载框
            setTimeout(function () {
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
          fail: function (e) {
            wx.showToast({
              title: '网络断开，稍后重试',
              icon: 'none',
              duration: 2000
            })
          }
        });
      }

    } else if (this.data.tabs[index].id == 'finished') {
      console.log(111)
      status = 2;
      var page = this.data.tabs[index].page;
      var total = that.data.total3
      console.log(page)
      console.log(total)
      if (this.data.tabs[index].page >= total) {
        return false
      } else {
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
          url: getApp().data.serviceUrl + '/businessOrder/mapListPage',
          header: {
            'content-type': 'application/text'
          },
          method: "GET",
          data: {
            businessId: businessId,
            status: 2,
            page: page,
          },
          success: function (res) {
            console.log(res)
            var finished = that.data.finished;
            console.log(finished)
            var waits = res.data.mapList;
            for (var i = 0; i < waits.length; i++) {
              waits[i]['state'] = '已完成'
              waits[i]['content'] = '订单详情'
              finished.push(waits[i])
            }
            console.log(finished)
            that.setData({
              finished: finished,
            })
            console.log(page)
            console.log(that.data.finished)
            // 隐藏加载框
            setTimeout(function () {
              wx.hideLoading();
              return false;
            }, 1000)
            var newsAll = that.data.newsAll;
            newsAll[index] = that.data.finished
            that.setData({
              newsAll: newsAll
            })
            console.log(that.data.newsAll)
          },
          fail: function (e) {
            wx.showToast({
              title: '网络断开，稍后重试',
              icon: 'none',
              duration: 2000
            })
          }
        });
      }
    }
  },
  // 接单事件
  receipt:function(e){
    console.log(e)
    var that = this;
    var orderNumber = e.currentTarget.dataset.orderinfo;
    var checkstatus = e.currentTarget.dataset.checkstatus;
    var openid = wx.getStorageSync('openid');
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    var businessId = ordinaryMember.id;
    // 调用接单接口
    if (checkstatus == 1){
      wx.showModal({
        content: '用户已取消此条订单',
        showCancel: false
      });
    } else if (checkstatus == 3){
      wx.showModal({
        content: '正在审核此条订单',
        showCancel: false
      });
    } else if (checkstatus == 0){
      wx.request({
        url: getApp().data.serviceUrl + '/businessOrder/receiveOrder',
        method: "GET",
        header: {
          'content-type': 'application/json'
        },
        data: {
          orderNumber: orderNumber,
          openid: openid,
          businessId: businessId

        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 0) {
            wx.showModal({
              content: '接单成功',
              showCancel: false
            });
            // 重新加载数据
            that.funLoad();
          } else if (res.data.code == 1) {
            wx.showModal({
              content: '接单失败',
              showCancel: false
            });
          }
        },
        fail: function (e) {
          wx.showToast({
            title: '网络断开，稍后重试',
            icon: 'none',
            duration: 2000
          })
        }
      }) 
    }
  },
  // 开始服务
  severing:function(e){
    console.log(e)
    var that = this;
    var orderNumber = e.currentTarget.dataset.orderinfo;
    var checkstatus = e.currentTarget.dataset.checkstatus;
    var status = e.currentTarget.dataset.status;
    console.log(checkstatus)
    var openid = wx.getStorageSync('openid');
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    var businessId = ordinaryMember.id;
    // 调用开始服务接口
    if (checkstatus == 1) {
      wx.showModal({
        content: '用户已取消此条订单',
        showCancel: false
      });
    } else if (checkstatus == 3) {
      wx.showModal({
        content: '正在审核此条订单',
        showCancel: false
      });
    } else if (status == 6){
      wx.showModal({
        content: '订单正在服务中......',
        showCancel: false
      });
    }
    else if (checkstatus == 0){
      wx.request({
        url: getApp().data.serviceUrl + '/businessOrder/startService',
        method: "GET",
        header: {
          'content-type': 'application/json'
        },
        data: {
          orderNumber: orderNumber,
          openid: openid,
          businessId: businessId
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 0) {
            wx.showModal({
              content: '您点击了开始服务，请准时上门服务',
              showCancel: false
            });
          that.funLoad();
          }

        },
        fail: function (e) {
          wx.showToast({
            title: '网络断开，稍后重试',
            icon: 'none',
            duration: 2000
          })
        }
      }) 
    }
  },
  // 拨打电话
  callPhone:function(e){
    // console.log(e)

    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
  },
  // 复制地址
  copyAddress:function(e){
    console.log(e)
    var address = e.currentTarget.dataset.address;
    // console.log(address)
    // var orderNum = this.data.orderNumber
    wx.setClipboardData({
      data: address,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  // 跳转到路线导航
  routeLine: function (e) {
    console.log(e)
    var orderNumber = e.currentTarget.dataset.orderinfo;
    wx: wx.navigateTo({
      // url: '../routeLine/routeLine',
      url: '../routeLine/routeLine?orderNumber=' + orderNumber,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 跳转到订单详情
  jumpDestail: function (e) {
    var orderNumber = e.currentTarget.dataset.orderinfo; 
    console.log(e)
    wx: wx.navigateTo({
      url: '../orderDetails/orderDetails?orderNumber=' + orderNumber,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 跳转到导航
  navigation: function (e) {
    console.log(e)
    var addressInfo = e.currentTarget.dataset.address;
    var addrName = e.currentTarget.dataset.addrname;
    var latitudeInfo = e.currentTarget.dataset.latitude;
    var longitudeInfo = e.currentTarget.dataset.longitude;
    var that = this
    // 待确定经纬度
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        wx.openLocation({
          latitude: latitudeInfo,//后端请求接口
          longitude: longitudeInfo,//后端请求接口
          scale: 18,
          name: addrName,//终点位置
          address: addressInfo//终点详细地理位置
        })
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  }, 
  funLoad: function (e) {
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
    // 获取到用户的登录id
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    if (ordinaryMember == null || ordinaryMember == undefined || ordinaryMember == '') {
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
    } else {
      wx.showLoading({
        title: '正在加载数据',
      })
      var businessId = ordinaryMember.id
      console.log(ordinaryMember)
      var newsAll = that.data.newsAll;
      console.log(openid)
      wx.request({
        url: getApp().data.serviceUrl + '/businessOrder/mapListPage',
        method: "GET",
        header: {
          'content-type': 'application/json'
        },
        data: {
          businessId: businessId,
          // 待接单状态
          status: 0,
          page: 1,
        },
        success: function (res) {
          console.log(res)
          var waitting = [];
          var newsAll = that.data.newsAll;
          var waits = res.data.mapList;
          console.log(waits)
          for (var i = 0; i < waits.length;i++){
            waits[i]['state'] = '待接单'
            waits[i]['content'] = '接下此单'
            // waits[i]['comment'] = '取消订单'
          }
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
        fail: function (e) {
          wx.showToast({
            title: '网络断开，稍后重试',
            icon: 'none',
            duration: 2000
          })
        }
      });
      // 待服务
      wx.request({
        url: getApp().data.serviceUrl + '/businessOrder/mapListPage',
        method: "GET",
        header: {
          'content-type': 'application/json'
        },
        data: {
          businessId: businessId,
          // 待接单状态
          status: 1,
          page: 1,
        },
        success: function (res) {
          console.log(res)
          var service = [];
          var newsAll = that.data.newsAll;
          var waits = res.data.mapList;
          for (var i = 0; i < waits.length; i++) {
            waits[i]['state'] = '待服务'
            waits[i]['content'] = '开始服务'
          }
          console.log(service)
          that.setData({
            service: waits,
            total2: res.data.totalPages
            // 计算总页数
          })
          console.log(that.data.service)
          newsAll[1] = that.data.service
          that.setData({
            newsAll: newsAll
          })
          console.log(that.data.newsAll)
        },
        fail: function (e) {
          wx.showToast({
            title: '网络断开，稍后重试',
            icon: 'none',
            duration: 2000
          })
        }
      });
      // 已完成
      wx.request({
        url: getApp().data.serviceUrl + '/businessOrder/mapListPage',
        method: "GET",
        header: {
          'content-type': 'application/json'
        },
        data: {
          businessId: businessId,
          // 待接单状态
          status: 2,
          page: 1,
        },
        success: function (res) {
          console.log(res)
          // var finished = [];
          var newsAll = that.data.newsAll;
          var waits = res.data.mapList;
          for (var i = 0; i < waits.length; i++) {
            waits[i]['state'] = '已完成'
            waits[i]['content'] = '订单详情'
            // waits[i]['comment'] = '取消订单'
          }
          console.log(finished)
          that.setData({
            finished: waits,
            total3: res.data.totalPages
            // 计算总页数
          })
          console.log(that.data.finished)
          newsAll[2] = that.data.finished
          that.setData({
            newsAll: newsAll
          })
        },
        fail: function (e) {
          wx.showToast({
            title: '网络断开，稍后重试',
            icon: 'none',
            duration: 2000
          })
        }
      });
    }
    setTimeout(function () {
      wx.hideLoading();
      console.log(that.data.newsAll)
    }, 1000)

    // 获取缓存距离
    wx.getStorage({
      key: 'key',
      success: function (res) {
        console.log(res)
        that.setData({
          scrollTop: res.data[0]
        })
      }
    })
  },
});