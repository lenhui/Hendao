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
    array: ['分类', '普通订单', '高级订单'],
    // 区域
    region: ['区域', '区域', '区域'],
    customItem: '全部',
    // 判断是否登录注册
    login:true,
    list: [],//会员列表
    total: 0,//分页总数
    page: 1,
    pageNum: 1,//分页记录数
    pageSize: 10,//分页大小
    hasmoreData: true,//更多数据
    hiddenloading: true,//加载中
    scrollTop:0,
    scrollHeight:0
    // page:1
  },
  onShow:function(e){
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    var userOpenid = wx.getStorageSync('openid');
    // 请求会员信息
    wx.request({
      url: getApp().data.serviceUrl + '/member/loginByOpenid',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      data: {
        openid: userOpenid,
      },
      success: function (res) {
        if (res.data.code == 0) {
          // 将会员信息存储到缓存中
          wx.setStorageSync("ordinaryMember", res.data.member);
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    });
    // 从缓存中获取到滚动的位置
    // 获取缓存距离
    wx.getStorage({
      key: 'key',
      success: function (res) {
        console.log(res)
        that.setData({
          scrollTop:res.data[0]
        })
      }
    })
    that.setData({
      // page: 1,
      index: 0
    })
  },
  onLoad: function (e) {
    var that = this;
    // 设置高度
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight;
        var clientWidth = res.windowWidth;
        var ratio = 750 / clientWidth;
        var height = clientHeight * ratio;
        that.setData({
          scrollHeight: height
        });
      }
    })
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/orderInformation/page?page=1',
      data:{
        province: '',
        city: '',
        area: '',
        level:''
      },
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        var dataList = []
        var list = res.data.pageResult.content
        var total = res.data.pageResult.totalPages
        for (var i = 0; i < list.length;i++){
          // var date = list[i].createTime;
          // 调用转换时间戳事件
          var date = timeFormat(list[i].createTime)
          var title = list[i].title;
          var mainContent = list[i].mainContent;
          var id = list[i].id;
          var level = list[i].level;
          var obj = {};
          obj.date = date;
          obj.title = title;
          obj.level = level;
          obj.mainContent = mainContent;
          obj.id = id
          dataList.push(obj)
        }
        that.setData({
          list: dataList,
          total:total
        });
        // 设置数组元素
        that.setData({
          list: that.data.list
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
      url: getApp().data.serviceUrl + '/orderInformation/page?page=1',
      data:{
        province: encodeURI(province),
        city: encodeURI(city),
        area: encodeURI(area),
        level: level
      },
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        var dataList = []
        var list = res.data.pageResult.content
        for (var i = 0; i < list.length; i++) {
          // var date = list[i].createTime;
          // 调用转换时间戳事件
          var date = timeFormat(list[i].createTime)
          var title = list[i].title;
          var mainContent = list[i].mainContent;
          var id = list[i].id;
          var level = list[i].level;
          var obj = {};
          obj.date = date;
          obj.title = title;
          obj.mainContent = mainContent;
          obj.id = id;
          obj.level = level;
          dataList.push(obj)
        }
        that.setData({
          list: dataList
        });
        // 设置数组元素
        that.setData({
          list: that.data.list
        });
        // console.log(that.data.moment);
        // 隐藏导航栏加载框
        setTimeout(function () {
          wx.hideNavigationBarLoading() //在标题栏中停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }, 1000);
        wx.stopPullDownRefresh()
        // wx.hideNavigationBarLoading();
        // 停止下拉动作
        // wx.stopPullDownRefresh();
      }
    })
  },
  onReachBottom: function () {
    var that = this;
    var province = that.data.province;
    var city = that.data.city;
    var area = that.data.area;
    var levelType = that.data.levelType
    // 页数+1
    // var page = that.data.page;
    var page = that.data.page
    console.log(page)
    if(page >= that.data.total){
      return false;
    }else{
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
        url: getApp().data.serviceUrl + '/orderInformation/page',
        method: "GET",
        data: {
          page: that.data.page,
          province: encodeURI(province),
          city: encodeURI(city),
          area: encodeURI(area),
          level: levelType
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // 回调函数
          var total = res.data.pageResult.totalPages
          var dataList = that.data.list;
          var list = res.data.pageResult.content
          for (var i = 0; i < list.length; i++) {
            // 调用转换时间戳事件
            var date = timeFormat(list[i].createTime)
            var title = list[i].title;
            var mainContent = list[i].mainContent;
            var id = list[i].id;
            var level = list[i].level;
            var obj = {};
            obj.date = date;
            obj.title = title;
            obj.mainContent = mainContent;
            obj.id = id;
            obj.level = level;
            dataList.push(obj)
          }
          // 设置数据
          that.setData({
            list: that.data.list
          })
          // 隐藏加载框
          wx.hideLoading();
          // console.log(total)
          if (page * that.data.pageSize <= total * that.data.pageSize || list.length == 0) {
            that.setData({
              hasmoreData: false,
              // hiddenloading: true 
            })
          }

        }
      })
    }
  },
  // 默认排序
  bindPickerChange: function (e) {
    var that = this
    var classArray = e.detail.value;
    var province = that.data.province;
    var city = that.data.city;
    var area = that.data.area;
    var levelType;
    if (classArray == 0) {
      levelType = ''
    } else if (classArray == 1 || classArray == 2) {
      levelType = classArray - 1
    }
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/orderInformation/page',
      data: {
        page: 1,
        province: encodeURI(province),
        level: levelType,
        city: encodeURI(city),
        area: encodeURI(area),
      },
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var dataList = []
        var list = res.data.pageResult.content;
        var total = res.data.pageResult.totalPages
        for (var i = 0; i < list.length; i++) {
          // var date = list[i].createTime;
          // 调用转换时间戳事件
          var date = timeFormat(list[i].createTime)
          var title = list[i].title;
          var mainContent = list[i].mainContent;
          var id = list[i].id;
          var level = list[i].level;
          var obj = {};
          obj.date = date;
          obj.title = title;
          obj.mainContent = mainContent;
          obj.id = id;
          obj.level = level;
          dataList.push(obj)
        }
        that.setData({
          list: dataList
        });
        // 设置数组元素
        that.setData({
          list: that.data.list,
          total: total,
          levelType: levelType,
          page:1
        });
        if (that.data.page * that.data.pageSize <= total * that.data.pageSize || list.length == 0) {
          that.setData({
            hasmoreData: false,
            // hiddenloading: true 
          })
        }
        // 隐藏加载框
        setTimeout(function () {
          wx.hideLoading();
          return false;
        }, 1000)
      }
    })
    // }
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var nowShow = e.detail.value;//获取当前option显示的状态
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(0).step();
      this.setData({
        animationData2: animation.export()
      })
    } else {
      animation.rotate(180).step();
      this.setData({
        animationData2: animation.export()
      })
    }
    this.setData({
      selectShow: !nowShow,
      index: e.detail.value
    })
  },
  // 区域事件
  bindRegionChange: function (e) {
    var that = this
    var regionArray = e.detail.value;
    var province;
    var city;
    var area;
    var levelType = that.data.levelType
    console.log(regionArray)
    if (regionArray[0] == '全部') {
      province = '';
      city = '';
      area = '';
    } else if (regionArray[0] != '全部' && regionArray[1] == '全部') {
      province = regionArray[0];
      city = '';
      area = '';
    } else if (regionArray[0] != '全部' && regionArray[1] != '全部' && regionArray[2] == '全部') {
      province = regionArray[0];
      city = regionArray[1];
      area = '';
    } else {
      province = regionArray[0];
      city = regionArray[1];
      area = regionArray[2];
    }
    console.log(province)
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/orderInformation/page',
      data: {
        page: 1,
        province: encodeURI(province),
        level: levelType,
        city: encodeURI(city),
        area: encodeURI(area)
      },
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var dataList = []
        var list = res.data.pageResult.content;
        var total = res.data.pageResult.totalPages
        for (var i = 0; i < list.length; i++) {
          // var date = list[i].createTime;
          // 调用转换时间戳事件
          var date = timeFormat(list[i].createTime)
          var title = list[i].title;
          var mainContent = list[i].mainContent;
          var id = list[i].id;
          var level = list[i].level;
          var obj = {};
          obj.date = date;
          obj.title = title;
          obj.mainContent = mainContent;
          obj.id = id;
          obj.level = level;
          dataList.push(obj)
        }
        // console.log(date)
        that.setData({
          list: dataList,
          province : province,
          city : city,
          area : area
        });
        // 设置数组元素
        that.setData({
          list: that.data.list,
          total: total,
          page:1
        });
        if (that.data.page * that.data.pageSize <= total * that.data.pageSize || list.length == 0) {
          that.setData({
            hasmoreData: false,
            // hiddenloading: true 
          })
        }
        // 隐藏加载框
        setTimeout(function () {
          wx.hideLoading();
          return false;
        }, 1000)
      }
    });
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    //创建动画
    var nowShow = e.detail.value;//获取当前option显示的状态
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(0).step();
      this.setData({
        animationData: animation.export()
      })
    } else {
      animation.rotate(180).step();
      this.setData({
        animationData: animation.export()
      })
    }
    this.setData({
      selectShow: !nowShow,
      region: e.detail.value
    })
  },
  // 动画
  selectToggle: function () {
    var nowShow = this.data.selectShow;//获取当前option显示的状态
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(0).step();
      this.setData({
        animationData: animation.export()
      })
    } else {
      animation.rotate(180).step();
      this.setData({
        animationData: animation.export()
      })
    }
    this.setData({
      selectShow: !nowShow
    })
  },
  // 创建动画2
  selectToggle2: function () {
    var nowShow = this.data.selectShow;//获取当前option显示的状态
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(0).step();
      this.setData({
        animationData2: animation.export()
      })
    } else {
      animation.rotate(180).step();
      this.setData({
        animationData2: animation.export()
      })
    }
    this.setData({
      selectShow: !nowShow
    })
  },
  // 点击跳转事件
  jumpPage:function(e){
    // 获取到id值
    var Id = e.currentTarget.dataset.id
    var that = this
    // 获取到会员信息
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    var memberId;
    // 获取到订单的类别
    var orderLevel = e.currentTarget.dataset.level;
    console.log(e)
    console.log(orderLevel)
    if (ordinaryMember == null || ordinaryMember == '') {
      memberId = ''
    } else {
      memberId = ordinaryMember.id
    }
    setTimeout(run, 300)
    function run() {
      // console.log(that.data.memberOrder)
      if (!ordinaryMember || ordinaryMember == null) {
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
      else if (ordinaryMember && ordinaryMember.level == 0 && orderLevel != 0) {
        wx: wx.showModal({
          title: '提示',
          content: '此信息为【高级】会员信息，请先申请为高级会员后查看',
          showCancel: false
        })
      } 
      else {
        wx: wx.navigateTo({
          url: '../tender/tender?id=' + Id,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
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
    console.log(this.data.toView)
  },
  // 获取滚动条的位置
  scroll: function (event) {
    if (event.detail.scrollTop != 0) {
      console.log(event)
      //设置缓存
      wx.setStorage({
        key: 'key',
        // 缓存滑动的距离，和当前页面的id
        data: [event.detail.scrollTop, event.target.dataset.id]
      })
    }
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
