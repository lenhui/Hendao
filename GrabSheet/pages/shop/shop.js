// var page = 1;
// 初始化购物车数量
// var num = 0;
var isclick = true;
var idArray = [];
var testType;
Page({
  data:{
      // 全部分类
    multiIndex: [0, 0],
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    // 默认排序
    index: 0,
    array: [],
    // 下拉框组件框
    dropArray: [{
      "id": "10",
      "text": "会计类"
    }, {
      "id": "21",
      "text": "工程类"
    }],
    page:1,
    typeString: '全部类别',
    regionString:'所在地区',
    defalutString:'默认排序',
    dropColor: '#000',
    // 添加状态
    default_id:0,
    num:0,
    testType:[{}]
  },
  onShow: function (e) {
    var that = this;
    that.setData({
      page: 1
    })
  },
  onLoad:function(e){
    // 获取到全部分类数据
    var that = this
    var second_id = that.data.second_id
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/goods/page',
      data: {
        goodsTypeId:'',
        sortId:'',
        page:1
      },
      method:"GET",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var dataList = []
        var show = res.data.maplist
        var total = res.data.totalPages
        for (var i = 0; i < show.length; i++) {
          // var date = list[i].createTime;
          // 调用转换时间戳事件
          var date = show[i].create_time.substr(0, 10);
          var title = show[i].name;
          var mainContent = show[i].mainContent;
          var image = show[i].image;
          var price = show[i].price;
          var id = show[i].id;
          var typeId = show[i].goods_type_id;
          var goodId = show[i].id;
          // var default_id = false
          var obj = {};
          obj.date = date;
          obj.title = title;
          obj.mainContent = mainContent;
          obj.image = image;
          obj.id = id;
          obj.typeId = typeId;
          obj.goodId = goodId;
          obj.price = price;
          obj.addState = false;
          dataList.push(obj)
        }
        // console.log(date)
        that.setData({
          show: dataList,
          total: total
        });
        // 设置数组元素
        that.setData({
          show: that.data.show
        });
        // 隐藏加载框
        setTimeout(function () {
          wx.hideLoading();
          return false;
        }, 1000)
      }
    })
    // 一级分类
    wx.request({
      url: getApp().data.serviceUrl + '/goodsType/findAll',
      data: {
        'parentId': 0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.mapList.length > 0){
          testType = res.data.mapList[0];
          that.setData({
            testType
          })
        }
        // 获取一级分类的数据
        var firstList = res.data.mapList;
        var firstArr = []
        for (var i = 0; i < firstList.length; i++) {
          firstArr.push(firstList[i].name)
        }
        that.setData({
          multiArray: [firstArr, []],
          firstList,
          firstArr
        })
        // 获取一级分类的id
        var default_first_id = firstList[0]['id'];　
        if (default_first_id) {
          that.searchSecondInfo(default_first_id)
        }
      }
    });
    // 默认排序
    wx.request({
      url: getApp().data.serviceUrl + '/goodsSort/findAll',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var testArray = [{}];
        testArray.push(res.data.mapList[0]);
        testArray.id = 0;
        testArray.name = "全部类型";
        var array = res.data.mapList;
        array.unshift(testArray);
        var sortArray = [];
        for (var i = 0; i < array.length;i++){
          var name = array[i].name;
          var id = array[i].id;
          sortArray.push(name)
        }
        that.setData({
          array: sortArray,
          arrayList: array
        })
      }
    })
    var userOpenid = wx.getStorageSync('openid');
    // 查询商品总数
    wx.request({
      url: getApp().data.serviceUrl + '/shopCart/findGoodsCountSumByOpenid',
      data: {
        openid: userOpenid
      },
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        var totalNum = res.data.count_sum
        that.setData({
          totalNum
        })
      }
    })
  },
  // 获取一级分类数据函数 searchSecondInfo
  searchSecondInfo(first_id) {
    var that = this;
    if (first_id) {
        this.setData({
          get_first_id: first_id
        })
        wx.request({
          url: getApp().data.serviceUrl + '/goodsType/findAll',
          data: {
            'parentId': first_id
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            var secondList = res.data.mapList;
            var secondArr = []
            for (var i = 0; i < secondList.length; i++) {
              secondArr.push(secondList[i].name)
            }
            var firstArr = that.data.firstArr;
            that.setData({
              multiArray: [firstArr, secondArr],
              secondArr,
              secondList
            })
          }
        })
      } 
    // }
  },
  // 默认数据添加之后需要在每次滚动选择一级分类的时候，请求加载对应二级数据，监听picker滚动函数
  bindMultiPickerColumnChange: function (e) {
    var that = this
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    var get_first_id_session = this.data.get_first_id;
    switch (e.detail.column) {
      case 0:
        data.multiArray[0] = that.data.secondArr
        var firstList = this.data.firstList;
        var get_first_id = firstList[e.detail.value]['id'];
        if (get_first_id_session != get_first_id) {　　　　
          this.searchSecondInfo(get_first_id)
        }
        data.multiIndex[1] = 0;
        break;
    }
  },
  bindMultiPickerChange: function (e) {
    var that = this
    var second_key = 0;
    var secondList = this.data.secondList;
    if (that.data.secondList.length != 0){
      var select_key = e.detail.value[1];
      this.setData({
        second_id: secondList[select_key]['id']
      })
    this.setData({
      multiIndex: e.detail.value
    })
      var second_id = that.data.second_id
    var sort_id = that.data.sort_id
    var testa = [];
    testa = that.data.multiArray[1];;
    testType.name = testa[select_key];
    that.setData({ testType: testType });
    }else{
      testType.name = "全部类型";
      that.setData({ testType: testType });
     second_id = '';
      that.setData({
        second_id:''
      })
    }
    // 根据二级分类的id查询数据
    if (sort_id == 0){
      sort_id = ''
    }
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/goods/page',
      data: {
        goodsTypeId: second_id,
        sortId: sort_id,
        page: 1
      },
      method:"GET",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var dataList = []
        var show = res.data.maplist
        var total = res.data.totalPages
        for (var i = 0; i < show.length; i++) {
          // 调用转换时间戳事件
          var date = show[i].create_time.substr(0, 10);
          var title = show[i].name;
          var mainContent = show[i].mainContent;
          var image = show[i].image;
          var price = show[i].price;
          var id = show[i].id;
          var typeId = show[i].goods_type_id;
          var goodId = show[i].id;
          var obj = {};
          obj.date = date;
          obj.title = title;
          obj.mainContent = mainContent;
          obj.image = image;
          obj.id = id;
          obj.typeId = typeId;
          obj.goodId = goodId;
          obj.price = price;
          obj.addState = false;
          dataList.unshift(obj)
        }
        that.setData({
          show: dataList,
          total: total
        });
        // 设置数组元素
        that.setData({
          show: that.data.show,
          page:1
        });
        // 隐藏加载框
        setTimeout(function () {
          wx.hideLoading();
          return false;
        }, 1000)
      }
    })
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
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    var second_id = this.data.second_id
    var sort_id = this.data.sort_id
    wx.showNavigationBarLoading();
    var that = this;
    if (sort_id == 0){
      sort_id = ''
    }
    wx.request({
      url: getApp().data.serviceUrl + '/goods/page?page=1',
      data:{
        goodsTypeId: second_id,
        sortId: sort_id,
      },
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        var dataList = []
        var show = res.data.maplist
        for (var i = 0; i < show.length; i++) {
          var date = show[i].create_time.substr(0, 10);
          var title = show[i].name;
          var mainContent = show[i].mainContent;
          var image = show[i].image;
          var price = show[i].price;
          var id = show[i].id;
          var typeId = show[i].goods_type_id;
          var goodId = show[i].id;
          var obj = {};
          obj.date = date;
          obj.title = title;
          obj.mainContent = mainContent;
          obj.image = image;
          obj.id = id;
          obj.typeId = typeId;
          obj.goodId = goodId;
          obj.price = price;
          dataList.unshift(obj)
        }
        that.setData({
          show: dataList
        });
        // 设置数组元素
        that.setData({
          show: that.data.show,
          page:1
        });
        // 隐藏导航栏加载框
        setTimeout(function () {
          wx.hideNavigationBarLoading() //在标题栏中停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }, 1000);
        wx.stopPullDownRefresh()
      }
    })
  },
  onReachBottom: function () {
    var that = this;
    var second_id = that.data.second_id
    var sort_id = that.data.sort_id
    if (sort_id == 0) {
      sort_id = ''
    }
    // 页数+1
    var page = that.data.page
    // page = page + 1;
    if(page >= that.data.total){
       return false; 
      // 隐藏加载框
      wx.hideLoading();
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
        url: getApp().data.serviceUrl + '/goods/page',
        method: "GET",
        data: {
          page:that.data.page,
          goodsTypeId: second_id,
          sortId: sort_id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // 回调函数
          var total = res.data.totalPages;
          var dataList = that.data.show;
          var show = res.data.maplist;
          for (var i = 0; i < show.length; i++) {
            // 调用转换时间戳事件
            // var date = timeFormat(list[i].createTime)
            var title = show[i].name;
            var mainContent = show[i].mainContent;
            var image = show[i].image;
            var typeId = show[i].goods_type_id;
            var goodId = show[i].id;
            var id = show[i].id;
            var date = show[i].create_time.substr(0, 10);
            var obj = {};
            // obj.date = date;
            obj.title = title;
            obj.mainContent = mainContent;
            obj.id = id;
            obj.typeId = typeId;
            obj.date = date;
            obj.goodId = goodId;
            obj.image = image
            dataList.push(obj)
          }
          // 设置数据
          that.setData({
            show: that.data.show
          })
          // console.log(total)
          if (page * that.data.pageSize <= total * that.data.pageSize || show.length == 0 || total == 1) {
            that.setData({
              hasmoreData: false,
              // hiddenloading: true 
            })
          }
          // 隐藏加载框
          wx.hideLoading();
        }
      })
    }
  },
  // 默认排序
  bindPickerChange: function (e) {
    var that = this
    var arrayList = that.data.arrayList;
    var second_id = that.data.second_id
    var sort_id = arrayList[e.detail.value]['id']
    // 默认排序
    if (sort_id == 0){
        sort_id = ''
    }
    wx.showLoading({
      title: '正在加载数据',
    })
      wx.request({
        url: getApp().data.serviceUrl + '/goods/page',
        data: {
          goodsTypeId: second_id,
          sortId: sort_id,
          page:1,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          var show = res.data.maplist;
          var dataList = [];
          for (var i = 0; i < show.length; i++) {
            var obj = {};
            var image = show[i].image;
            var title = show[i].name;
            var price = show[i].price;
            var date = show[i].create_time.substr(0, 10);
            var id = show[i].id;
            var typeId = show[i].goods_type_id;
            var goodId = show[i].id;
            obj.title = title;
            obj.image = image;
            obj.price = price;
            obj.date = date;
            obj.typeId = typeId;
            obj.goodId = goodId;
            obj.id = id;
            dataList.push(obj)
          }
          that.setData({
            show: dataList,
            index: e.detail.value,
            sort_id: sort_id,
            page:1
          })
          // 隐藏加载框
          setTimeout(function () {
            wx.hideLoading();
            return false;
          }, 1000)
        }
      })  
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
  // 跳转到详情
  jumpDetail:function(e){
    // 获取到id值
    var Id = e.currentTarget.dataset.id
    wx:wx.navigateTo({
      url: '../shopDestails/shopDestails?id=' + Id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
  // 加入购物车
  addCart:function(e){
    if (isclick) {
      isclick = false;
      // 获取存储用户openId  
      var userOpenid = wx.getStorageSync('openid');
      // 会员信息
      var ordinaryMember = wx.getStorageSync('ordinaryMember');
      var memberId
      // var memberId = ordinaryMember.id
      if (ordinaryMember == null || ordinaryMember == '' || ordinaryMember == undefined) {
        memberId = ''
      } else {
        memberId = ordinaryMember.id
      }
      var that = this
      var typeId = e.currentTarget.dataset.typeid
      var goodId = e.currentTarget.dataset.gooodid
      wx.request({
        url: getApp().data.serviceUrl + '/shopCart/addOrUpdate',
        data: {
          openid: userOpenid,
          memberId: '',
          goodsId: goodId,
          goodsTypeId: typeId,
          status: 1
        },
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.code == 0) {
            // 查询商品总数
            wx.request({
              url: getApp().data.serviceUrl + '/shopCart/findGoodsCountSumByOpenid',
              data: {
                openid: userOpenid
              },
              method: "GET",
              header: {
                'content-type': 'application/text'
              },
              success: function (res) {
                var totalNum = res.data.count_sum
                that.setData({
                  totalNum
                })
              }
            })
          } else {
            wx: wx.showToast({
              title: '添加失败',
              duration: 2000
            })
          }
        }
      })
      //定时器
      setTimeout(function () {
        isclick = true;
      }, 500);
    } 
  },
  // 跳转到购物车
  jumpCart:function(e){
    wx.switchTab({
      url: '../cart/cart',
    })
  }
})
// 创建动画
function animation(animationData){
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
}