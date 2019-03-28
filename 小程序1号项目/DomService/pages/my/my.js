// page/me/me.js
const app = getApp()
//console.log(app.globalData) 
Page({
  data: {
    accountPhone: '18211575555',
    num: '1',
    userInfo: {},
    // 新品推荐
    myList: [{
      iconPath: '../../pages/images/card.png',
      text: '关于我们'
    }, {
      iconPath: '../../pages/images/card.png',
      text: '联系客服'
    },{
      iconPath: '../../pages/images/card.png',
      text: '意见反馈'
      }, {
        iconPath: '../../pages/images/card.png',
        text: '我的商城订单'
      },
    {
      iconPath: '../../pages/images/card.png',
      text: '加盟商入驻'
    }],
    Url: [
      '../about/about',
      '../customer/customer',
      '../feedBack/feedBack',
      '../mallOrder/mallOrder',
      '../register/register',
    ]
  },
  //获取头像
  onLoad: function () {
  //  获取到用户信息
    var openid = wx.getStorageSync('openid');
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName
    })
    console.log(userInfo)
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
    wx: wx.navigateTo({
      url: this.data.Url[Index],
    })

  }
})
