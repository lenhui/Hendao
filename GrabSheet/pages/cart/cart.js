// page/cart/cart.js
var isclick = true;
Page({
  data: {
    goodsNum:'0',
    cartList:[]
  },
  onShow:function(e){
    // 获取存储用户openId  
    var userOpenid = wx.getStorageSync('openid');
    wx.showLoading({
      title: '正在加载数据',
    })
    var that = this
    wx.request({
      url: getApp().data.serviceUrl + '/shopCart/findAllByOpenid',
      data: {
        openid: userOpenid
      },
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        var cartList = res.data.mapList
        that.setData({
          cartList
        })
        if (that.data.cartList.length == 0) {
          wx.showModal({
            content: '您还没有加设备到购物车哦！',
            showCancel: false
          })
          wx.hideLoading();
          return false;
        }else{
          // 隐藏加载框
          setTimeout(function () {
            wx.hideLoading();
            return false;
          }, 1000)
        }
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
  shopDes:function(e){
    console.log(e)
    var Id = e.currentTarget.dataset.gooodid
    wx:wx.navigateTo({
      url: '../shopDestails/shopDestails?id=' + Id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  addCart:function(e){
    if (isclick) {
      isclick = false;
      // 获取存储用户openId  
      var userOpenid = wx.getStorageSync('openid');
      // 会员信息
      var ordinaryMember = wx.getStorageSync('ordinaryMember');
      var that = this
      var typeId = e.currentTarget.dataset.typeid
      var goodId = e.currentTarget.dataset.gooodid
      var memberId;
      if (ordinaryMember == null || ordinaryMember == '' || ordinaryMember == undefined) {
        memberId = ''
      } else {
        memberId = ordinaryMember.id
      }
      wx.request({
        url: getApp().data.serviceUrl + '/shopCart/addOrUpdate',
        data: {
          openid: userOpenid,
          memberId: memberId,
          goodsId: goodId,
          goodsTypeId: typeId,
          status: 1
        },
        method: "GET",
        header: {
          'content-type': 'application/text'
        },
        success: function (res) {
          if (res.data.code == 0) {
            wx.request({
              url: getApp().data.serviceUrl + '/shopCart/findAllByOpenid',
              data: {
                openid: userOpenid
              },
              method: "GET",
              header: {
                'content-type': 'application/text'
              },
              success: function (res) {
                var cartList = res.data.mapList
                that.setData({
                  cartList
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
  minusCart:function(e){
    if(isclick){
      isclick = false;
      // 获取存储用户openId  
      var userOpenid = wx.getStorageSync('openid');
      // 会员信息
      var ordinaryMember = wx.getStorageSync('ordinaryMember');
      var memberId;
      // var memberId = ordinaryMember.id
      if (ordinaryMember == null || ordinaryMember == '' || ordinaryMember == undefined) {
        memberId = ''
      } else {
        memberId = ordinaryMember.id
      }
      var that = this
      var typeId = e.currentTarget.dataset.typeid
      var goodId = e.currentTarget.dataset.gooodid
      var count = e.currentTarget.dataset.count
      function minusRequest(){
        wx.request({
          url: getApp().data.serviceUrl + '/shopCart/addOrUpdate',
          data: {
            openid: userOpenid,
            memberId: '',
            goodsId: goodId,
            goodsTypeId: typeId,
            status: 0
          },
          method: "GET",
          header: {
            'content-type': 'application/text'
          },
          success: function (res) {
            if (res.data.code == 0) {
              wx.request({
                url: getApp().data.serviceUrl + '/shopCart/findAllByOpenid',
                data: {
                  openid: userOpenid
                },
                method: "GET",
                header: {
                  'content-type': 'application/text'
                },
                success: function (res) {
                  var cartList = res.data.mapList
                  that.setData({
                    cartList
                  })
                }
              })
            } else {
              wx: wx.showToast({
                title: '减除失败',
                duration: 2000
              })
            }
          }
        })
      }
      if (count == 1) {
        wx.showModal({
          title: '确认',
          content: '您确定从购物车中删除此商品吗?',
          confirmText: "确定",
          cancelText: "取消",
          success: function (res) {
            if (res.confirm) {
              minusRequest()
            }
          }
        })
      } else {
        minusRequest()
        }
      //定时器
      setTimeout(function () {
        isclick = true;
      }, 500);
    }
  },
  // 进入商城
  goodsShop:function(e){
    wx.navigateTo({
      url: '../shop/shop',
    })
  }
  
})
