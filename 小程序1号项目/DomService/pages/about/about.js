// pages/about/about.js

Page({
  data:{
    imageurl:'../../pages/images/banner1.jpg',
    title:'关于我们',
    content:'广东洁邦环保工程有限公司（简称洁邦家政）成立于2010年，是一家专注于精细化现代家政服务和工程保洁的实体公司。公司开创一站式家政服务商业模式，注重标准化服务和清洁产品自主研发，凭借灵活的经营模式和高标准服务体系赢得众多终端客户认可。2016年，洁邦家政借助互联网成熟的渠道、专业技术经验、质量上乘的产品口碑和创新研发技术，建立了以生产、销售、技术培训、营销推广、O2O服务模式于一体的多元化整合营销体系，为有志于环保科技行业创业者提供一站式的解决方案，为社会各届战略合作伙伴提供坚实的营运基础和雄厚的技术保障。,专注做精细化现代家政服务与工程清洁的实体公司，开创一站式家政服务商业模式，以客户体验式营销方式为市场支点。强大的技术团队支持，成熟的店面运营模式，多渠道的营销方式、完善的售后制度、全方位的培训支持，加入我们，这些都是你的'
  },
  onLoad:function(){
    var that = this
    // 获取公司简介
    wx.request({
      url: getApp().data.serviceUrl + '/companyProfile/findAll',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {

      },
      success: function (res) {
        console.log(res)
        var imageurl = res.data.mapList.image;
        var content = res.data.mapList.content;
        that.setData({
          imageurl: imageurl,
          content: content
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
  }
})