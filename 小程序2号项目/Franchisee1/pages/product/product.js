// pages/demo/product.js
let app = getApp();
Page({
  data: {
    staticUrl: app.staticUrl,
    // 轮播图组件
    imgUrls: [{
      image: '/pages/images/dev1.png',
      linkUrl: ''
    }, {
      image: '/pages/images/dev9.png',
      linkUrl: ''
    }, {
      image: '/pages/images/dev5.png',
      linkUrl: ''
    }, {
      image: '/pages/images/dev1.png',
      linkUrl: ''
    }, {
      image: '/pages/images/dev2.png',
      linkUrl: ''
    }
    ],
    imageListDetail: [],
    product: {
      name: "中央空调通风管道清洗机器人",
      imgs: [
        { imgUrl: '../../page/images/dev1.png' },
        { imgUrl: app.staticUrl + 'banners/2.png' },
        { imgUrl: app.staticUrl + 'banners/3.png' },
      ],
      price: 3188,
      priceMarket: 3200
    },
    active: 1,
    active: 1,
    //属性
    attrIsShow: false, //属性界面是否隐藏
    attrData: null, // attrdata用于记录用户选择的属性
    colorTips: [
      { name: '灰色', value: '灰色', checked: false },
      { name: '银色', value: '银色', checked: false }
    ],
    typeTips: [
      { name: '套餐一', value: '套餐一', checked: false },
      { name: '套餐二', value: '套餐二', checked: false },
      { name: '套餐三', value: '套餐三', checked: false }
    ],
    buyNum: 1
  },
  onLoad: function (options) {
    var that = this;
    // 获取到参数
    this.setData({
      Id: options.id
    })
    var goodsId = this.data.Id;
    // 获取到商品详情的内容
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
        var product = res.data.device;
        // 轮播图图片
        var imageList = product.imageList;
        // 详情图片
        var imageListDetail = product.imageListDetail;
        // 将字符创变为数组
        // 轮播图
        var image_array = [];
        // 详情图
        var image_desArray = [];
        var imgUrls = [];
        var imgDesPic = [];
        image_array = imageList.split(",");
        image_desArray = imageListDetail.split(",");
        if (image_array == '' || image_array == null || image_array == undefined) {
          image_array = ''
        } else {
          image_array = image_array
        }
        if (image_desArray == '' || image_desArray == null || image_desArray == undefined) {
          image_desArray = ''
        } else {
          image_desArray = image_desArray
        }
        console.log(image_array)
        console.log(image_desArray)
        for (var i = 0; i < image_array.length; i++) {
          var image = image_array[i];
          var linkUrl = '';
          var img = {}
          img.image = image;
          img.linkUrl = linkUrl;
          imgUrls.push(img)
          console.log(image)
        }
        that.setData({
          imgUrls: imgUrls,
          imageListDetail: image_desArray,
          product: product
        })
        console.log(that.data.imageListDetail)
        // var goodsList = []
        // var goodsDataList = res.data.mapList;
        // for (var i = 0; i < goodsDataList.length; i++)         {
        //   var id = goodsDataList[i].id;
        //   var classifyName = goodsDataList[i].name;
        //   var goods = goodsDataList[i].idArray
        //   var obj = {};
        //   obj.id = 'classType' + id;
        //   obj.classifyName = classifyName;
        //   obj.goods = goods
        //   goodsList.push(obj)
        // }
        // that.setData({
        //   goodsList: goodsList
        // })
        // console.log(that.data.goodsList)

      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
    console.log(this.data.Id)
  },
  share: function () {
    return {
      title: '扫码购',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        //console.log("转发成功:" + JSON.stringify(res));
        var shareTickets = res.shareTickets;
        //console.log(shareTickets.length)
        if (shareTickets.length == 0) {
          return false;
        }
        //可以获取群组信息
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            //console.log(res)
          }
        })
      },
      fail: function (res) {
        // 转发失败
        //console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  showComments: function () {
    this.setData({ active: 2 });
  },
  showInfo: function () {
    this.setData({ active: 1 });
  },
  buyNow: function () {
    //打开属性视图
    this.setData({ attrIsShow: true });
  },
  //属性
  attrSubmit: function (e) {
    //记录用户选择的属性
    this.attrData = e.detail.value;
    console.log(this.attrData);
    //关闭
    this.setData({ attrIsShow: false });
    //后续操作
    wx.showToast({
      title: "属性已经收集,请自行完善下一步代码",
      icon: "none"
    })
  },
  closeAttr: function () {
    this.setData({ attrIsShow: false });
  },
  colorChange: function (e) {
    var checkVal = e.detail.value;
    for (var i = 0; i < this.data.colorTips.length; i++) {
      if (checkVal.indexOf(this.data.colorTips[i].value + '') != -1) {
        this.data.colorTips[i].checked = true;
      } else {
        this.data.colorTips[i].checked = false;
      }
    }
    this.setData({ colorTips: this.data.colorTips });
  },
  typeChange: function (e) {
    var checkVal = e.detail.value;
    for (var i = 0; i < this.data.typeTips.length; i++) {
      if (checkVal.indexOf(this.data.typeTips[i].value + '') != -1) {
        this.data.typeTips[i].checked = true;
      } else {
        this.data.typeTips[i].checked = false;
      }
    }
    this.setData({ typeTips: this.data.typeTips });
  },
  buyNumChange: function (e) {
    console.log(e)
    var data = e.detail;
    this.setData({ buyNum: data[0] });
  },
  jumpTotal: function (e) {
    wx: wx.navigateTo({
      url: '../confirmation/confirmation',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  jumpIndex: function (e) {
    wx: wx.switchTab({
      url: '../index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})