const app = getApp();
Page({
  data:{
    // 轮播图组件
    // imgUrls: [{
    //   image: '../../pages/images/1.jpg',
    //   linkUrl: ''
    // }, {
    //     image: '../../pages/images/2.jpg',
    //   linkUrl: ''
    // }, {
    //     image: '../../pages/images/1.jpg',
    //   linkUrl: ''
    // }, {
    //     image: '../../pages/images/1.jpg',
    //   linkUrl: ''
    // }, {
    //     image: '../../pages/images/2.jpg',
    //   linkUrl: ''
    // }
    // ],
    // 地区组件
    region: ['广东省', '广州市', '天河区'],
    customItem: '全部',
    IconArray:[{
      image: '/pages/images/icon2.jpg',
      text: '空气净化',
      linkUrl:'../../pages/houClean/houClean'
    }],
    region: ['广东省', '广州市', '天河区'],
    customItem: '全部',
    // 图标组件
    // iconArray: [{
    //   image: '/pages/images/icon2.jpg',
    //   text: '空气净化',
    //   linkUrl:'../../pages/serDetails/serDetails'
    //   // colorBg: '#ccc',
    // }, {
    //   image: '/pages/images/icon2.jpg',
    //   text: '家具贴膜',
    //   // colorBg: '#ccc',
    // }, {
    //   image: '/pages/images/icon2.jpg',
    //     text: '油烟机清洗',
    //   // colorBg: '#ccc',
    // }, {
    //   image: '/pages/images/icon2.jpg',
    //     text: '家庭除螨',
    //   // colorBg: '#ccc',
    // }, {
    //   image: '/pages/images/icon2.jpg',
    //     text: '白蚁防治',
    //   // colorBg: '#ccc',
    // }],
    Width: '80rpx',
    Height: '80rpx',
    // nearList: [{
    //   image: '/pages/images/1.jpg',
    //   imgUrl: '../nearSerive/nearSerive'
    // }, {
    //   image: '/pages/images/1.jpg',
    //   imgUrl: ''
    // }, {
    //   image: '/pages/images/1.jpg',
    //   imgUrl: ''
    // }, {
    //   image: '/pages/images/1.jpg',
    //   imgUrl: ''
    // }],
			//被展示的菜单
		showingIndex: 0,
		//第一个选项相关
		orderIndex: 0,
		orderList: ['综合排序'],
		//第二个选项相关
		cateIndex: 0,
		cateList: ['销量'],
		//价格排序
		priceOrder: 1,
		//筛选条件
		// where1Tips: [
    //   { name: "家电清洗", value: 1, checked: true },
		// 	{ name: "家庭保洁", value: 2 },
		// 	{ name: "空气净化", value: 3 },
		// 	{ name: "除四害", value: 4 },
		// 	{ name: "甲醛治理与检测", value: 5 }
		// ],
		// where2Tips: [
		// 	{ name: "油烟机清洗", value: 1 },
		// 	{ name: "洗衣机清洗", value: 2, checked: true },
		// 	{ name: "热水器清洗", value: 3 },
		// 	{ name: "中央空调清洗", value: 4 },
		// 	{ name: "冰箱清洗", value: 5 }
		// ],
		// 附近商家
		nearLists:[{
			title:'标题信息',
			src:'../../imgs/imgbanner.png',
			desTilte:'描述信息......',
			tips:'标签',
      price:'100'
		},{
			title:'标题信息',
			src:'../../imgs/banner.png',
			desTilte:'描述信息......',
        tips: '标签',
        price: '100'
		},{
			title:'标题信息',
			src:'../../imgs/banner.png',
			desTilte:'描述信息......',
        tips: '标签',
        price: '100'
		},{
			title:'标题信息',
			src:'../../imgs/banner.png',
			desTilte:'描述信息......',
        tips: '标签',
        price: '100'
		},{
			title:'标题信息',
			src:'../../imgs/banner.png',
			desTilte:'描述信息......',
        tips: '标签',
        price: '100'
		},{
			title:'标题信息',
			src:'../../imgs/banner.png',
			desTilte:'描述信息......',
        tips: '标签',
        price: '100'
		},{
			title:'标题信息',
			src:'../../imgs/banner.png',
			desTilte:'描述信息......',
        tips: '标签',
        price: '100'
		},{
			title:'标题信息',
			src:'../../imgs/banner.png',
			desTilte:'描述信息......',
        tips: '标签',
        price: '100'
		},{
			title:'标题信息',
			src:'../../imgs/banner.png',
			desTilte:'描述信息......',
        tips: '标签',
        price: '100'
		},{
			title:'标题信息',
			src:'../../imgs/banner.png',
			desTilte:'描述信息......',
        tips: '标签',
        price: '100'
		},{
			title:'标题信息',
			src:'../../imgs/banner.png',
			desTilte:'描述信息......',
        tips: '标签',
        price: '100'
		},{
			title:'标题信息',
			src:'../../imgs/banner.png',
			desTilte:'描述信息......',
        tips: '标签',
        price: '100'
		},{
			title:'标题信息',
			src:'../../imgs/imgbanner.png',
			desTilte:'描述信息......',
        tips: '标签',
        price: '100'
		}],
		shaixuan:false,
		staticUrl: app.staticUrl,
		grace_filter:'grace-filter1',
		grace_filter_options:'grace-filter-options1',
		grace_filter_buttons:'grace-filter-buttons1',
		grace_mask:'grace-mask1',
		mask:false,
		grace_news_list:'grace-news-list',
    show:false
  },
  // 位置定位
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
	onShow(e){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          //console.log('未授权');
          wx.redirectTo({
            url: "../wxLogin/wxLogin"
          })
        }
      }
    })
		 // 从缓存中获取到滚动的位置
		var that = this
    wx.getStorage({
      key: 'key',
      success: function (res) {
        console.log(res)
        that.setData({
          scrollTop:res.data[0]
        })
      }
    })
    // 首页轮播图
    wx.request({
      url: getApp().data.serviceUrl + '/advertise/findAll',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        level:0
      },
      success: function (res) {
        var imgUrls = res.data.mapList;
        that.setData({
          imgUrls: imgUrls
        })
        console.log(imgUrls)
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
    // 首页公告
    wx.request({
      url: getApp().data.serviceUrl + '/announcement/findAll',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        level:0
      },
      success: function (res) {
        console.log(res)
        var notice = res.data.mapList;
        that.setData({
          notice: notice
        })
        console.log(notice)
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
    // 获取服务类型
    wx.request({
      url: getApp().data.serviceUrl + '/type/findAll',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        parentId:0
      },
      success: function (res) {
        console.log(res)
        if(res.data.mapList){
          that.setData({
            show: true
          })
        }
        var serverArray = [];
        var serverType = res.data.mapList;
      //  添加商城
        // var obj = {}; 
        // obj.name = '商城';
        // obj.image = '../../pages/images/server1.jpg';
        // obj.linkUrl = '../../pages/shopping/shopping'
        // serverType.push(obj)
        that.setData({
          serviceType: serverType
        })
        console.log(that.data.serviceType)
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
    // 新增浏览小程序用户
    // 获取到用户的openId以及用户信息
    var openid = wx.getStorageSync('openid');
    var userInfo = wx.getStorageSync('userInfo');
    console.log(openid)
    console.log(userInfo)
    wx.request({
      url: getApp().data.serviceUrl + '/user/whetherExistUser',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        level:0,
        openid: openid,
        nickName: encodeURI(userInfo.nickName),
        gender: userInfo.gender,
        avatarUrl: userInfo.avatarUrl,
        country: userInfo.country,
        province: userInfo.province,
        city: userInfo.city
      },
      success: function (res) {
        console.log(res)
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
  // 字幕滚动
  onLoad(e) {
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
				console.log(that.data.scrollHeight)
      }
    })
    console.log(e.title),
      this.setData({
        msgList: [{ url: "url", title: "随缘刚刚预定了家庭保洁服务" },
          { url: "url", title: "件等叶梦刚刚预定了家庭保洁服务" },
          { url: "url", title: "随缘刚刚预定了家庭保洁服务" }]
      });
    // 获取用户信息
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
	 // 获取滚动条的位置
  scroll: function (event) {
		var that = this
    if (event.detail.scrollTop != 0) {
      // console.log(event)
      //设置缓存
      wx.setStorage({
        key: 'key',
        // 缓存滑动的距离，和当前页面的id
        data: [event.detail.scrollTop, event.target.dataset.id]
      })
			if(event.detail.scrollTop >= 550){
				// setTimeout(function(){
					that.setData({grace_filter:'grace-filter',grace_filter_options:'grace-filter-options',grace_filter_buttons:'grace-filter-buttons',grace_news_list:'grace-news-list1'});
				// },1000)
			}else{
				// setTimeout(function(){
					that.setData({grace_filter:'grace-filter1',grace_filter_options:'grace-filter-options1',grace_filter_buttons:'grace-filter-buttons1',grace_news_list:'grace-news-list',shaixuan:false,});
				// },1000)
			}
    }
  },
  getUserInfo: function (e) {
    //console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
		
  },
  search:function(e){
    wx:wx.navigateTo({
      url: '../search/search',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  chooseServer:function(e){
    wx: wx.navigateTo({
      url: '../management/management',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
	changeOrder: function (e) {
		var tapIndex = e.target.dataset.itemid;
		this.setData({ orderIndex: tapIndex });
		this.setData({ showingIndex: 0 });
		this.getList();
		this.setData({
			mask:false
		})
	},
	showOptions1: function () {
		if (this.data.showingIndex != 0) { 
			this.setData({showingIndex: 0,mask:false}); 
			return; 
			}
			console.log(this.data.scrollTop)
				this.setData({ showingIndex: 1});
	},
	showOptions2: function () {
		if (this.data.showingIndex != 0) { this.setData({ showingIndex: 0 }); return; }
		this.setData({ showingIndex: 2 });
	},
	showOptions99: function () {
		if (this.data.showingIndex != 0) { this.setData({ showingIndex: 0,mask:false }); return; }
		this.setData({ showingIndex: 99});

    // 加载筛选中分类的数据
    var that = this;
    wx.request({
      url: getApp().data.serviceUrl + '/type/findAll',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        parentId: 0
      },
      success: function (res) {
        console.log(res)
        var oneClassArray = [];
        var oneClass = res.data.mapList;
        for (var i = 0; i < oneClass.length;i++){
          var name = oneClass[i].name;
          var value = oneClass[i].id;
          var checked = '';
          var obj = {};
          obj.name = name;
          obj.value = value;
          obj.checked = checked;
          oneClassArray.push(obj)
        }
      that.setData({
        where1Tips:oneClassArray
      })
        console.log(that.data.where1Tips)
       
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
	changeCate: function (e) {
		var tapIndex = e.target.dataset.itemid;
		this.setData({ cateIndex: tapIndex });
		this.setData({ showingIndex: 0 });
		this.getList();
	},
	//价格排序
	changePriceOrder: function () {
		if (this.data.priceOrder == 1) {
			this.setData({ priceOrder: 2 });
		} else {
			this.setData({ priceOrder: 1 });
		}
		wx.showModal({
			title: '价格排序已经切换',
			content: '对应的值保存在 priceOrder 变量中 ^_^'
		});
		this.getList();
	},
	//提交条件
	formsubmit: function (e) {
		console.log(e)
		var _self = this
		wx.showModal({
			title: '请观察控制台',
			content: '条件以表单形式提交 ^_^'
		});
		_self.setData({ showingIndex: 0 });
		this.getList();
	},
	//重置表单
	formReset: function () {
		var _self = this;
		for (var i = 0; i < _self.data.where1Tips.length; i++) {
			_self.data.where1Tips[i].checked = false;
		}
		_self.setData({ where1Tips: _self.data.where1Tips });
		for (var i = 0; i < _self.data.where2Tips.length; i++) {
			_self.data.where2Tips[i].checked = false;
		}
		_self.setData({ where2Tips: _self.data.where2Tips });
		_self.setData({ showingIndex: 0 });
		this.getList();
	},
	//筛选页面js
	changeFunc: function (e) {
		var checkVal = e.detail.value;
    console.log(checkVal)
		for (var i = 0; i < this.data.where1Tips.length; i++) {
			if (checkVal.indexOf(this.data.where1Tips[i].value + '') != -1) {
				this.data.where1Tips[i].checked = true;
			} else {
				this.data.where1Tips[i].checked = false;
			}
		}
		this.setData({ where1Tips: this.data.where1Tips });

    // 获取到产品分类的数据
    var that = this;
    wx.request({
      url: getApp().data.serviceUrl + '/content/findIdListAndType',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        parentId: checkVal
      },
      success: function (res) {
        console.log(res)
        var twoClassArray = [];
        var twoClass = res.data.mapList;
        for (var i = 0; i < twoClass.length; i++) {
          var name = twoClass[i].name;
          var value = twoClass[i].id;
          var checked = '';
          var obj = {};
          obj.name = name;
          obj.value = value;
          obj.checked = checked;
          twoClassArray.push(obj)
        }
        that.setData({
          where2Tips: twoClassArray
        })
        console.log(that.data.where2Tips)
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
	changeFunc2: function (e) {
		var checkVal = e.detail.value;
		for (var i = 0; i < this.data.where2Tips.length; i++) {
			if (checkVal.indexOf(this.data.where2Tips[i].value + '') != -1) {
				this.data.where2Tips[i].checked = true;
			} else {
				this.data.where2Tips[i].checked = false;
			}
		}
		this.setData({ where2Tips: this.data.where2Tips });
	},
	//条件更新后执行统一函数（如重新读取数据等）
	getList: function () {
		console.log('条件更新后执行统一函数（如重新读取数据等）');

	},
  // 下拉加载力臣服务
  bindDownLoad:function(){
    var that = this;
    //获取是哪个选项滚动到底？
    // var index = e.currentTarget.dataset.scindex;
    // var that = this;
    // var newsAll = that.data.newsAll;
    // var openid = wx.getStorageSync('openid');
    // var status;
    // console.log(index);
    //可以利用 tabs 携带的分类id 与服务器交互请求对应分类的数据
    // console.log(this.data.tabs[index].id);
    // if (this.data.tabs[index].id == 'waitting') {
    //   status = 0;
    //   var page = this.data.tabs[index].page;
    //   var total = that.data.total1
    //   console.log(page)
    //   console.log(total)
      //判断是否是最后一页
      // if (this.data.tabs[index].page >= total) {
      //   return false
      // } else {
      //   console.log('待接单')
      //   var tabs = that.data.tabs;
      //   for (var i = 0; i < tabs.length; i++) {
      //     if (i == index) {
      //       console.log(i)
      //       tabs[i].page = page + 1
      //     }
      //   }
      //   that.setData({
      //     tabs: tabs
      //   })
        wx.request({
          url: getApp().data.serviceUrl + '/content/findAllByDeleteFlag',
          header: {
            'content-type': 'application/text'
          },
          method: "GET",
          data: {
            // openid: openid,
            // status: 0,
            // page: page,
            // evaluationStatus: 0
          },
          success: function (res) {
            console.log(res)
            var nearLists = that.data.nearLists;
            var contentList = res.data.contentList;
            for (var i = 0; i < contentList.length;i++){
              var title = contentList[i].name;
              var src = contentList[i].image;
              var desTilte = contentList[i].detail;
              var price = contentList[i].price;
              var id = contentList[i].id;
              var tips = '标签';
              var obj = {};
              obj.title = title;
              obj.src = src;
              obj.desTilte = desTilte;
              obj.tips = tips;
              obj.price = price;
              obj.id = id;
              nearLists.push(obj)
            }
            that.setData({
              nearLists: nearLists
            })
            console.log(that.data.nearLists)
          },
          fail: function (e) {
            wx.showToast({
              title: '网络断开，稍后重试',
              icon: 'none',
              duration: 2000
            })
          }
        });
       
  },
	jumpShop:function(e){
    console.log(e)
    // 获取到服务类型的id
    var typeId = e.currentTarget.dataset.id
		wx: wx.navigateTo({
      url: '../serDetails/serDetails?id=' + typeId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
	},
  jumpGoodShop:function(e){
    wx: wx.navigateTo({
      url: '../serDetails/serDetails',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 跳转到分类页面
  jumpClassType:function(e){
    console.log(e)
    // 获取到服务类型的id
    var typeId = e.currentTarget.dataset.id
     wx: wx.navigateTo({
       url: '../houClean/houClean?id=' + typeId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //用户点击右上角分享
  onShareAppMessage: function () {

  }

})