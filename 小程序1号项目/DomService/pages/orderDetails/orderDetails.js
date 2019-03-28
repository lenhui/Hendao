var wxbarcode = require('../../utils/index.js');
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
    code: 'https://www.baidu.com/s?wd=%E6%A1%A3%E6%A1%88&rsv_spt=1&rsv_iqid=0xb7b9fdca000a183f&issp=1&f=3&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=1&rsv_sug1=1&rsv_sug7=001&rsv_sug2=1&rsp=0&rsv_sug9=es_2_1&rsv_sug4=1457&rsv_sug=6'
// ---------------------
//   作者：十二指环 
// 来源：CSDN 
// 原文：https://blog.csdn.net/wtdask/article/details/73776356 
//   版权声明：本文为博主原创文章，转载请附上博文链接！
  },
  onLoad: function (options){
    var that = this;
    // 从缓存中获取到openid
    var openid = wx.getStorageSync('openid');
    console.log(openid)
    // wxbarcode.barcode('barcode', '123456799', 400, 350);
    this.setData({
      Id: options.id
    })
    console.log(this.data.Id)
    var orderId = this.data.Id;
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/order/findOne',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        id: orderId
      },
      success: function (res) {
        console.log(res)
        var order = res.data.order;
        var name = order.name;
        var phone = order.phone;
        var address = order.address;
        var addressDetail = order.addressDetail;
        // var cmbProvince = order.cmbProvince;
        // var cmbCity = order.cmbCity;
        // var cmbArea = order.cmbArea
        var orderNumber = order.orderNumber;
        wxbarcode.qrcode('qrcode', orderNumber +','+openid, 300, 600);
        var createTime = timeFormat(order.createTime);
        var serverType = res.data.map.type_name;
        var price = order.price;
        var status = order.status;
        that.setData({
          order: order,
          name: name,
          phone: phone,
          address: address,
          addressDetail: addressDetail,
          // cmbProvince: cmbProvince,
          // cmbCity: cmbCity,
          // cmbArea: cmbArea,
          orderNumber: orderNumber,
          createTime: createTime,
          serverType: serverType,
          price: price,
          status:status
        })
        console.log(that.data.status)
        setTimeout(function () {
          wx.hideLoading();
        }, 2000)
        // wxbarcode.barcode('barcode', '12345679', 680, 200);
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
  // 复制订单编号
  copyText:function(e){
    var orderNum = this.data.orderNumber
    wx.setClipboardData({
      data: orderNum,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  }
})

