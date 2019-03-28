var app = getApp();
// var server = require('../../utils/server');
Page({
  data: {
		goods:{
			1:{
				id: 1,
				name: '家庭保洁',
				pic: '../../imgs/banner.png',
				sold: 1014,
				price: 2
			},
			2:{
				id: 2,
				name: '标题信息',
				pic: '../../imgs/banner.png',
				sold: 1029,
				price: 3
			},
			3:{
				id: 3,
				name: '标题信息',
				pic: '../../imgs/banner.png',
				sold: 1030,
				price: 2
			},
			4:{
				id: 4,
				name: '标题信息',
				pic: '../images/dev3.jpg',
				sold: 1059,
				price: 1,
			},
			5:{
				id: 5,
				name: '标题信息',
				pic: '../images/dev3.jpg',
				sold: 1029,
				price: 2
			},
			6:{
				id: 6,
				name: '标题信息',
				pic: '../images/dev3.jpg',
				sold: 1064,
				price: 2
			},
			7:{
				id: 7,
				name: '标题信息',
				pic: '../images/dev3.jpg',
				sold: 814,
				price: 3
			},
			8:{
				id: 8,
				name: '香菇',
				pic: '../images/dev3.jpg',
				sold: 124,
				price: 3
			},
			9:{
				id: 9,
				name: '香菇',
				pic: '../images/dev3.jpg',
				sold: 124,
				price: 3
			}
		},
    goodsList: [
      {
        id: 'hot',
        classifyName: '热销',
        goods: [1, 2, 3, 4, 5]
      },
      {
        id: 'new',
        classifyName: '新品',
        goods: [1, 3]
      },
      {
        id: 'vegetable',
        classifyName: '蔬菜',
        goods: [1, 6, 5]
      },
      {
        id: 'mushroom',
        classifyName: '蘑菇',
        goods: [2, 7, 8, 9]
      },
      {
        id: 'food',
        classifyName: '主食',
				goods: [3, 4]
      },
      {
        id:'leh',
        classifyName:'果汁饮品',
        goods:[1,3,5]
      },
      {
        id: 'leh2',
        classifyName: '正新鸡排',
        goods:[5, 8, 9]
      },
      {
        id: 'leh3',
        classifyName: '香辣鸡腿',
        goods:[1, 3, 5,9,8]
      },
    ],
  },
  onLoad: function (options) {
		var that = this;
    // 获取到参数
    this.setData({
      Id: options.id
    })
    var typeId = that.data.Id;
    console.log(this.data.Id)
    // 左边导航栏的商品分类栏
    wx.request({
      url: getApp().data.serviceUrl + '/type/findAll',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        parentId: typeId
      },
      success: function (res) {
        console.log(res)
        var goodsList = []
        var goodsDataList = res.data.mapList;
        for (var i = 0; i < goodsDataList.length; i++) {
          var id = goodsDataList[i].id;
          var classifyName = goodsDataList[i].name;
          var goods = goodsDataList[i].idArray
          var obj = {};
          obj.id = 'classType' + id;
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
      url: getApp().data.serviceUrl + '/content/findAllByDeleteFlag',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {

      },
      success: function (res) {
        console.log(res)
        var goodsData = {};
        var goods = res.data.contentList
        for (var i = 0; i < goods.length; i++) {
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
  },
  onShow: function () {
    this.setData({
      classifySeleted: this.data.goodsList[0].id
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
	jumpTos:function(e){
		 wx: wx.navigateTo({
      url: '../serDetails/serDetails',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
	}
})

