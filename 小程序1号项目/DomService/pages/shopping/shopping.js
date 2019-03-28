var app = getApp();
var server = require('../../utils/server');
Page({
  data: {
    goods: {
      1: {
        id: 1,
        name: '扁平型管道清扫机器人',
        pic: '../images/dev1.png',
        sold: 1014,
        price: 2
      },
      2: {
        id: 2,
        name: '中央空调清洗机',
        pic: '../images/dev2.png',
        sold: 1029,
        price: 3
      },
      3: {
        id: 3,
        name: '中央空调清洗消毒机',
        pic: '../images/dev5.png',
        sold: 1030,
        price: 2
      },
      4: {
        id: 4,
        name: '中央空调多功能清洗机',
        pic: '../images/dev4.png',
        sold: 1059,
        price: 1
      },
      5: {
        id: 5,
        name: '大功率负压涡轮吸尘器',
        pic: '../images/dev5.png',
        sold: 1029,
        price: 2
      },
      6: {
        id: 6,
        name: '颗粒物测试仪',
        pic: '../images/dev9.png',
        sold: 1064,
        price: 2
      },
      7: {
        id: 7,
        name: '第七代管道清扫机器人',
        pic: '../images/dev7.png',
        sold: 814,
        price: 3
      },
      8: {
        id: 8,
        name: '管道清扫机器人控制箱',
        pic: '../images/dev8.png',
        sold: 124,
        price: 3
      },
      9: {
        id: 9,
        name: '升降型管道清扫机器人',
        pic: '../images/dev9.png',
        sold: 102,
        price: 5
      }
    },
    goodsList: [
      {
        id: 'hot',
        classifyName: '清洗保养设备',
        goods: [1, 2, 3, 4, 5]
      },
      {
        id: 'new',
        classifyName: '中央空调吸尘设备',
        goods: [1, 3]
      },
      {
        id: 'vegetable',
        classifyName: '大型油烟机清洗设备',
        goods: [1, 6, 5]
      },
      {
        id: 'mushroom',
        classifyName: '清洗药剂',
        goods: [2, 7, 8, 9]
      },
      {
        id: 'food',
        classifyName: '清洗吸尘产品',
        goods: [3, 4]
      }
    ],
    cart: {
      count: 0,
      total: 0,
      list: {}
    },
    status:'',
    showCartDetail: false
  },
  onLoad: function (options) {
    var shopId = options.id;
    var that = this;
    for (var i = 0; i < app.globalData.shops.length; ++i) {
      if (app.globalData.shops[i].id == shopId) {
        this.setData({
          shop: app.globalData.shops[i]
        });
        break;
      }
    }
    // 左边导航栏的商品分类栏
    wx.request({
      url: getApp().data.serviceUrl + '/device/findIdListAndType',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {

      },
      success: function (res) {
        console.log(res)
        var goodsList = []
        var goodsDataList = res.data.mapList;
        for (var i = 0; i < goodsDataList.length; i++){
          var id = goodsDataList[i].id;
          var classifyName = goodsDataList[i].name;
          var goods = goodsDataList[i].idArray
          var obj = {};
          obj.id = 'classType'+id;
          obj.classifyName = classifyName;
          obj.goods = goods
          goodsList.push(obj)
        }
          that.setData({
            goodsList: goodsList
          })
        console.log(that.data.goodsList)
        
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
    // 右边导航栏商品列表
    wx.request({
      url: getApp().data.serviceUrl + '/device/findAllByDeleteFlag',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {

      },
      success: function (res) {
        console.log(res)
        var goodsData = {};
        var goods = res.data.deviceList
        for (var i = 0; i < goods.length;i++){
          var id = goods[i].id;
          var name = goods[i].name;
          var pic = goods[i].image;
          var price = goods[i].price;
          var obj = {};
          obj.id = id;
          obj.name = name;
          obj.pic = pic;
          obj.price = price
          // jquery怎样向json中的object添加键值对（元素）？
          goodsData[id] = obj
        }
        console.log(goodsData)
        that.setData({
          goods: goodsData,
        })
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
  onShow: function () {
    this.setData({
      classifySeleted: this.data.goodsList[0].id
    });
  },
  tapAddCart: function (e) {
    // 获取到该点击商品的id
    var that = this;
    var goodsId = e.target.dataset.id
    // 获取到该商品的内容
    wx.request({
      url: getApp().data.serviceUrl + '/device/findOne',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        id: goodsId
      },
      success: function (res) {
        console.log(res)
        // 商品状态
        var goodsStatus = res.data.device.status;
        // 判断是否商品已下架
        if (goodsStatus == 1){
          wx: wx.showModal({
            title: '提示',
            content: '该商品已下架，请选择其他商品购买',
            showCancel: true,
            cancelText: '取消',
            confirmText: '确定',
            success: function (res) {
            },
            fail: function (res) { },
            complete: function (res) { },
          })
          console.log('商品已下架')
        }else{
          that.addCart(e.target.dataset.id);
        }
        console.log(goodsStatus)
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
    console.log(goodsId)
  },
  tapReduceCart: function (e) {
    this.reduceCart(e.target.dataset.id);
  },
  addCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    this.data.cart.list[id] = num + 1;
    this.countCart();
  },
  reduceCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    if (num <= 1) {
      delete this.data.cart.list[id];
    } else {
      this.data.cart.list[id] = num - 1;
    }
    this.countCart();
  },
  countCart: function () {
    var count = 0,
      total = 0;
    for (var id in this.data.cart.list) {
      var goods = this.data.goods[id];
      count += this.data.cart.list[id];
      total += goods.price * this.data.cart.list[id];
    }
    this.data.cart.count = count;
    this.data.cart.total = total;
    this.setData({
      cart: this.data.cart
    });
  },
  follow: function () {
    this.setData({
      followed: !this.data.followed
    });
  },
  onGoodsScroll: function (e) {
    if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }
    var scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = this.data.goodsList.length;
    this.data.goodsList.forEach(function (classify, i) {
      var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.id;
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted
    });
  },
  tapClassify: function (e) {
    var id = e.target.dataset.id;
    this.setData({
      classifyViewed: id
    });
    var self = this;
    setTimeout(function () {
      self.setData({
        classifySeleted: id
      });
    }, 100);
  },
  showCartDetail: function () {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  hideCartDetail: function () {
    this.setData({
      showCartDetail: false
    });
  },
  submit: function (e) {
    server.sendTemplate(e.detail.formId, null, function (res) {
      if (res.data.errorcode == 0) {
        wx.showModal({
          showCancel: false,
          title: '恭喜',
          content: '订单发送成功！下订单过程顺利完成，本例不再进行后续订单相关的功能。',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack();
            }
          }
        })
      }
    }, function (res) {
      console.log(res)
    });
  },
  jumpProduct:function(e){
    var goodsId = e.currentTarget.dataset.goodsid
    console.log(goodsId)
    wx:wx.navigateTo({
      url: '../product/product?id=' + goodsId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  jumpTotal:function(e){
    wx:wx.navigateTo({
      url: '../confirmation/confirmation',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
});

