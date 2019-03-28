var app = getApp();
// var server = require('../../utils/server');
var indexId;
Page({
  data: {
    // operText: 'operText1',
    bool: true,
		editState:false,
		lower:'lower',
    // opera: 'opera1',
    goods: {
      1: {
        id: 1,
        name: '标题信息',
        pic: '../../imgs/banner.png',
        sold: 1014,
        price: 2,
				opera:'操作'
      },
      2: {
        id: 2,
        name: '标题信息',
        pic: '../../imgs/banner.png',
        sold: 1029,
        price: 3
      },
      3: {
        id: 3,
        name: '标题信息',
        pic: '../../imgs/banner.png',
        sold: 1030,
        price: 2
      },
      4: {
        id: 4,
        name: '标题信息',
        pic: '../images/dev3.jpg',
        sold: 1059,
        price: 1,
      },
      5: {
        id: 5,
        name: '标题信息',
        pic: '../images/dev3.jpg',
        sold: 1029,
        price: 2
      },
      6: {
        id: 6,
        name: '标题信息',
        pic: '../images/dev3.jpg',
        sold: 1064,
        price: 2
      },
      7: {
        id: 7,
        name: '标题信息',
        pic: '../images/dev3.jpg',
        sold: 814,
        price: 3
      },
      8: {
        id: 8,
        name: '香菇',
        pic: '../images/dev3.jpg',
        sold: 124,
        price: 3
      },
      9: {
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
				// 获取到右侧的id值
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
        id: 'leh',
        classifyName: '果汁饮品',
        goods: [1, 3, 5]
      },
      {
        id: 'leh2',
        classifyName: '正新鸡排',
        goods: [5, 8, 9]
      },
      {
        id: 'leh3',
        classifyName: '香辣鸡腿',
        goods: [1, 3, 5, 9, 8]
      },
    ],
  },
  onLoad: function (options) {
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
  // 操作事件
  operation: function (e) {
    // indexId = e.currentTarget.dataset.index
    // this.setData({
    //   operText: 'operText1',
    //   opera: 'opera1',
    //   bool: false,
    //   // severMain:'sever-main1'
    // })
		console.log(e)
		var that = this;
		
		// 获取到右侧点击商品的id值
		var goodId = e.currentTarget.dataset.id;
		// 循环所有右侧的商品
		var goods = that.data.goods;
		var goodsArr = Object.keys(goods);
// 		console.log(goodsArr.length)
// 		for(var i=0;i<goodsArr.length;i++){
// 			console.log(goodsArr[i])
// 			if(goodsArr[i] == goodId){
// 				// 事件操作
// 			} 
// 		}

  },
	radioChange:function(e){
		var that =this;
		that.setData({
			lower:'lower-choose',
		})
	},
	// 长按进入编辑状态
	edit:function(e){
		var that =this;
		that.setData({
			editState:true,
		})
	},
  jumpAdd: function (e) {
    wx: wx.navigateTo({
      url: '../addServer/addServer',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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
	jumpDown:function(e){
		var that =this;
		that.setData({
			// editState:false,
			lower:'lower',
		})
	},
	jumpCancel:function(e){
		var that =this;
		that.setData({
			editState:false,
		})
	},
})

