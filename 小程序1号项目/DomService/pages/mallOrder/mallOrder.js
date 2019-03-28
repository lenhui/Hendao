// pages/demo/tabfullpage.js
var _self, app = getApp();
//默认新闻数据（来自api请求）
//每个选项下面的新闻列表
var waitting = [
  { orderType: '设备类型1', state: '待付款', src: '../images/dev2.jpg', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', address: '广州市天河区棠下东路13号', comment: '取消订单', pay: '去付款', price:'400',num:'2', id: 1 },
  { orderType: '设备类型5', state: '待付款', src: '../images/dev2.jpg', orderName: '语欣青柠生姜水润保湿护发素420ml 深层滋养润发精华 平衡控油 柔顺亮泽 所有发质成人儿童男女通用', address: '广州市天河区棠下东路13号', comment: '取消订单', pay: '去付款', price: '400', num: '2', num: '2', id: 2 },
  { orderType: '设备类型6', state: '待付款', src: '../images/dev2.jpg', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', address: '广州市天河区棠下东路13号', comment: '取消订单', pay: '去付款', price: '400', num: '2', id: 3 },
  { orderType: '设备类型9', state: '待付款', src: '../images/dev2.jpg', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', address: '广州市天河区棠下东路13号', comment: '取消订单', pay: '去付款', price: '400', num: '2', id: 4 },
];
var shipped = [
  { orderType: '设备类型1', state: '待发货', src: '../images/dev2.jpg', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', address: '广州市天河区棠下东路13号', comment: '修改地址', id: 5 },
  { orderType: '设备类型2', state: '待发货', src: '../images/dev2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', comment: '修改地址', id: 6 },
  { orderType: '设备类型3', state: '待发货', src: '../images/dev2.jpg', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', address: '广州市天河区棠下东路13号', comment: '修改地址', id: 7 },
  { orderType: '设备类型4', state: '待发货', src: '../images/dev2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', comment: '修改地址', id: 8 },
];
var received = [
  { orderType: '设备类型3', state: '待收货', src: '../images/dev2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', comment: '确认收货', id: 9 },
  { orderType: '设备类型4', state: '待收货', src: '../images/dev2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', comment: '确认收货', id: 10 },
  { orderType: '设备类型6', state: '待收货', src: '../images/dev2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', comment: '确认收货', id: 11 },
  { orderType: '设备类型7', state: '待收货', src: '../images/dev2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', comment: '确认收货', id: 12 },
];
var evaluate = [
  { orderType: '设备类型4', state: '待评价', src: '../images/dev2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '去评价', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', id: 9 },
  { orderType: '设备类型3', state: '待评价', src: '../images/dev2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '去评价', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', id: 10 },
  { orderType: '设备类型8', state: '待评价', src: '../images/dev2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '去评价', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', id: 11 },
  { orderType: '设备类型9', state: '待评价', src: '../images/dev2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '去评价', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', id: 12 },
];
var evaluated = [
  { orderType: '设备类型2', state: '已评价', src: '../images/dev2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '交易完成', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', id: 9 },
  { orderType: '设备类型1', state: '已评价', src: '../images/dev2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '交易完成', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', id: 10 },
  { orderType: '设备类型5', state: '已评价', src: '../images/dev2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '交易完成', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', id: 11 },
  { orderType: '设备类型7', state: '已评价', src: '../images/dev2.jpg', date: '2018-06-30 10:23', address: '广州市天河区棠下东路13号', comment: '交易完成', orderName: '港版美素佳儿（Friso） 金装婴幼儿配方奶粉 3段 1-3岁 900g/罐 荷兰原装进口', price: '400', num: '2', id: 12 },
];
//对应下面3个标签的新闻内容数据
var newsAll = [waitting,shipped,received,evaluate,evaluated];
Page({
  data: {
    staticUrl: app.staticUrl,
    tabCurrentIndex: 0,
    swiperCurrentIndex: 0,
    tabHeight: 300,
    tabs: [
      //标签名称 , 分类 id , 加载更多, 加载的页码
      { name: '待付款', id: 'waitting', loadingType: 0, page: 1 },
      { name: '待发货', id: 'service', loadingType: 0, page: 1 },
      { name: '待收货', id: 'evaluate', loadingType: 0, page: 1 },
      { name: '待评价', id: 'evaluated', loadingType: 0, page: 1 },
      { name: '已评价', id: 'evaluated', loadingType: 0, page: 1 },
    ],
    newsAll: newsAll
  },
  onShow: function (e) {
    var that = this;
    // 获取用户的openid
    var openid = wx.getStorageSync('openid');
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
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {

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
  onLoad: function () {
    _self = this;
  },
  onReady: function () {
    //获取屏幕高度及比例
    var winInfo = wx.getSystemInfo({
      success: function (res) {
        var windowHeight = res.windowHeight;
        //获取头部标题高度
        wx.createSelectorQuery().select('#grace-tab-title').fields(
          {
            size: true,
          }, function (res) {
            //计算得出滚动区域的高度
            _self.setData({ tabHeight: windowHeight - res.height });
          }
        ).exec();
      }
    });
  },
  tabChange: function (e) {
    var index = e.target.id.replace('tabTag-', '');
    this.setData({ swiperCurrentIndex: index, tabCurrentIndex: index });
  },
  swiperChange: function (e) {
    var index = e.detail.current;
    this.setData({ tabCurrentIndex: index });
  },
  //每个选项滚动到底部
  scrollend: function (e) {
    //获取是哪个选项滚动到底？
    var index = e.currentTarget.dataset.scindex;
    console.log(index);
    //可以利用 tabs 携带的分类id 与服务器交互请求对应分类的数据
    console.log(this.data.tabs[index].id);
    //加载更多的演示
    //判断当前是否正在加载
    if (this.data.tabs[index].loadingType === 1) {
      return false;
    }
    //判断是否是最后一页
    if (this.data.tabs[index].page > 3) {
      this.data.tabs[index].loadingType = 2;//全部
      this.setData({ tabs: this.data.tabs });
      return;
    }
    this.data.tabs[index].loadingType = 1;//加载中
    this.setData({ tabs: this.data.tabs });
    //模拟延迟
    setTimeout(function () {
      _self.data.newsAll[index] = _self.data.newsAll[index].concat(news);
      _self.setData({ newsAll: _self.data.newsAll });
      //分页
      _self.data.tabs[index].page++;
      _self.data.tabs[index].loadingType = 0;//恢复加载状态
      _self.setData({ tabs: _self.data.tabs });
      //
    }, 1000);
  },
  orderCancel: function (e) {
    // 获取到要取消订单的id
    var cancelId = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index;
    wx: wx.showModal({
      title: '确定要取消该订单吗？',
      content: '',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
      }
    })
  },
  // 订单支付跳转
  orderPay:function(e){
    wx: wx.navigateTo({
      url: '../confirmation/confirmation',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 跳转到订单进度
  orderProgress: function (e) {
    wx: wx.navigateTo({
      url: '../progress/progress',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // orderEvaluate: function (e) {
  //   wx: wx.navigateTo({
  //     url: '../comment/comment',
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },
  orderAddress:function(e){
    wx: wx.navigateTo({
      url: '../addressList/addressList',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 跳转到评价页面
  orderToEvaluate: function (e) {
    wx: wx.navigateTo({
      url: '../shopComment/shopComment',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 跳转详情界面
  jumpDetails: function (e) {
    wx: wx.navigateTo({
      url: '../orderDetails/orderDetails',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
});