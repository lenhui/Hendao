// page/me/me.js
const app = getApp()
//console.log(app.globalData) 
Page({
  data: {
    userInfo:'',
    // accountPhone: '18211575555',
    num: '1',
    userInfo: {},
    // 新品推荐
    myList: [{
      iconPath: '../../pages/images/card.png',
      text: '关于我们'
    }, {
      iconPath: '../../pages/images/card.png',
      text: '我的抢单'
    },{
      iconPath: '../../pages/images/card.png',
      text: '联系客服'
    },{
      iconPath: '../../pages/images/card.png',
      text: '意见反馈'
    }],
    Url: [
      '../about/about',
      '../order/order',
      '../Customer/Customer',
      '../feedBack/feedBack',
    ]
  },
  //获取头像
  onShow: function () {
    var that = this;
    // wx.setStorageSync("ordinaryMember", '');
    var userInfo = wx.getStorageSync('userInfo');
    var userOpenid = wx.getStorageSync('openid');
    // 获取用户信息
    that.setData({
      userInfo: userInfo
    })
    // 请求会员信息
    wx.request({
      url: getApp().data.serviceUrl + '/member/loginByOpenid',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      data: {
        openid: userOpenid,
      },
      success: function (res) {
        if (res.data.code == 0) {
          // 将会员信息存储到缓存中
          wx.setStorageSync("ordinaryMember", res.data.member);
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
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    // 查看会员申请记录
    var memberId;
    if (ordinaryMember == '' || ordinaryMember == undefined || ordinaryMember == null){
      return false;
    }else{
      memberId = ordinaryMember.id
    }
    wx.request({
      url: getApp().data.serviceUrl + '/applySeniorMemberRecord/findOne',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        memberId: memberId
      },
      success: function (res) {
        console.log(res)
        // 获得申请记录
        if (res.data.applySeniorMemberRecord == null || res.data.applySeniorMemberRecord == '' || res.data.applySeniorMemberRecord == undefined){
          return false;
        }else{
          var status = res.data.applySeniorMemberRecord.status
          console.log(status)
          if (status == 1) {
            wx.setStorageSync("ordinaryMember", res.data.member);
          }
          that.setData({
            status: status,
            applySeniorMemberRecord: res.data.applySeniorMemberRecord
          })
        }
        }
    })
    that.setData({
      ordinaryMember: ordinaryMember,
      userName: ordinaryMember.userName,
      isLevel: ordinaryMember.level,
    })
  },
  // 跳转到登录页
  jumpLogin: function (e) {
    wx: wx.navigateTo({
      url: '../login/login',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  memberJump: function () {
    wx.navigateTo({
      url: '../member/member'
    })
  },
  balanceJump: function () {
    wx: wx.navigateTo({
      url: '../account/account',
      success: function (res) {
        // console.log(res.errMsg)
      },
      fail: function (res) {
        // console.log(res.errMsg)
      },
      complete: function (res) {
        //console.log(res.errMsg)
      },
    })
  },
  JumpLink: function (e) {
    var Index = e.currentTarget.dataset.link;
    if (Index == 1 || Index == 2){
      wx:wx.switchTab({
        url: this.data.Url[Index],
      })
    }else{
      wx: wx.navigateTo({
        url: this.data.Url[Index],
      })
    }
  },
  // 申请为高级会员
  seniorMember:function(e){
    var that = this;
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    // var memberId = ordinaryMember.id
    var status = that.data.status
    // console.log(memberId)
    if (!ordinaryMember || ordinaryMember == null){
      wx.showModal({
        title: '提示',
        content: '您还没有登录，请先登录',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          if (res.confirm) {
            // 延迟3秒后跳转到首页
            setTimeout(function () {
              wx: wx.navigateTo({
                url: '../login/login',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            }, 2000)
          }
        }
        })
    } else if (that.data.applySeniorMemberRecord == null){
      wx.request({
        url: getApp().data.serviceUrl + '/applySeniorMemberRecord/apply',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          memberId: ordinaryMember.id
        },
        success: function (res) {
          if (res.data.code == 0) {
            wx.showModal({
              content: '已发送申请，请您耐心等待审核',
              showCancel: false
            });
            that.setData({
              status: 0
            })
          } else {
            wx.showModal({
              content: '申请失败，请重新申请',
              showCancel: false
            });
          }
          // 获得申请记
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
      else if (status == 0){
        wx.showModal({
        content: '您已申请，正在审核中......',
        showCancel: false
      });
    } else if (status == 1){
      // 获取到高级会员的信息
      wx.showModal({
        content: '恭喜您已成为高级会员',
        showCancel: false
      });
    } else if (status == 2){
      wx.showModal({
        content: '您的审核没有通过，请重新申请，或联系我们的客服',
        showCancel: false
      });
    } else if (status == 3){
      wx: wx.showModal({
        title: '提示',
        content: '您的会员已过期，是否要重新申请',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) {
      if (res.confirm) {
      wx.request({
        url: getApp().data.serviceUrl + '/applySeniorMemberRecord/apply',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          memberId: ordinaryMember.id
        },
        success: function (res) {
          if(res.data.code == 0){
            wx.showModal({
              content: '已发送申请，请您耐心等待审核',
              showCancel: false
            });
            that.setData({
              status : 0
            })
          }else{
            wx.showModal({
              content: '申请失败，请重新申请',
              showCancel: false
            });
          }
          // 获得申请记
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
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  // 退出事件
  loginOut:function(e){
    // 获取存储用户openId  
    var userOpenid = wx.getStorageSync('openid');
    var that = this
    wx.showModal({
      title: '确认',
      content: '您确定退出吗?',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          // wx.showLoading({
          //   title: '正在提交中',
          // })
          wx.request({
            url: getApp().data.serviceUrl + '/member/logOutByOpenid',
            data: {
              openid: userOpenid
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.code == 0) {
                console.log(getCurrentPages())
                wx.setStorageSync("ordinaryMember", ''); 

                var ordinaryMember = wx.getStorageSync('ordinaryMember');
                that.setData({
                  ordinaryMember: ordinaryMember,
                })
                // wx.setStorageSync('userInfo','')
                wx.showToast({
                  title: '退出成功！',
                  duration: 2000
                });
                
              } else {
                wx.showToast({
                  title: '您还没有登录！',
                  duration: 2000
                });
              }
            }
          })
        } else {
          console.log('用户点击辅助操作')
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
  },
  // 跳转到修改用户信息
  modifyInfo:function(e){
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    if (!ordinaryMember || ordinaryMember == null){
      wx: wx.showModal({
        title: '提示',
        content: '请先登录后修改',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) {
          if (res.confirm) {
            wx: wx.navigateTo({
              url: '../login/login',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      wx: wx.navigateTo({
        url: '../modifyInfo/modifyInfo',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
   
  }
})
