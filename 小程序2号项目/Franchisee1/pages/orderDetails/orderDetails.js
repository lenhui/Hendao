// pages/orderDetails/orderDetails.js
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
	data:{
	
	},
  onLoad: function (options) {
    var that = this;
    // 获取服务商信息
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    var businessId = ordinaryMember.id;
    var orderNumber = options.orderNumber
    console.log(businessId)
    console.log(orderNumber)
    // wxbarcode.barcode('barcode', '123456799', 400, 350);
    this.setData({
      orderNumber: options.orderNumber
    })
    console.log(that.data.orderNumber)
    // 调用订单详情接口
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/businessOrder/findOneDetail',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        businessId: businessId,
        orderNumber: orderNumber
      },
      success: function (res) {
        console.log(res)
        var orderLists = res.data.businessOrder;
        console.log(orderLists)
        var contentName = res.data.contentName;
        var customerLists = res.data.order;
        var commentLists = res.data.orderEvaluate;
        var user = res.data.user;
        var status = orderLists.status;
        // 调用转换时间戳事件
        var orderDate = timeFormat(orderLists.createTime)
        var serverDate = timeFormat(orderLists.serviceTime)
        // 评论时间
        if (status == 1){
          commentContent = '';
          commentDate = '';
          startNum = '';
        } else if (status == 6){
          commentContent = '';
          commentDate = '';
          startNum = '';
        } else if (commentLists != null){
          var commentDate = timeFormat(commentLists.createTime)
          var commentContent = commentLists.content;
          var startNum = commentLists.starLevel
        }else{
          commentContent = '该用户还没有评论';
          commentDate = '';
          startNum = '';
        }
       
        // 用户图片详情
        var imageLists = orderLists.imageList;
        // 将字符串变为数组
        var imagesArray = imageLists.split(",");
        console.log(imagesArray)
        that.setData({
          orderLists: orderLists,
          contentName: contentName,
          customerLists:customerLists,
          commentLists: commentLists,
          imageLists: imagesArray,
          orderDate: orderDate,
          serverDate: serverDate,
          commentDate: commentDate,
          commentContent:commentContent,
          startNum:startNum,
          user: user,
          status: status
        })
        setTimeout(function () {
          wx.hideLoading();
        }, 2000)
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
})