// pages/inquiry/inquiry.js
// 时间戳转换
function add0(m) { return m < 10 ? '0' + m : m }
function timeFormat(timestamp) {
  //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
  var time = new Date(timestamp);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
}
Page({
  data: {
    activePic: ["../images/info1.png", "../images/info2.png", "../images/info1.png", "../images/info2.png"]
  },
  onLoad: function (options){
    // 获取到屏幕的高度
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight;
        var clientWidth = res.windowWidth;
        var ratio = 750 / clientWidth;
        var height = clientHeight * ratio;
        that.setData({
          height: height
        });
      }
    });
    // 获取到公司商标和联系热线
    var companyInfo = wx.getStorageSync('companyInfo');
    that.setData({
      companyInfo
    })
    // 获取到参数
    this.setData({
      Id: options.id
    })
    console.log(this.data.Id)
    // 加载详情信息
    var Id = this.data.Id
    var that = this
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/industryInformation/findOne',
      data: {
        id: Id
      },
      success: function (res) {
        // console.log(res)
        // var objList = res.data.industryInformation;
        // var date = timeFormat(objList.createTime);
        // var imageList = res.data.imageList;
        // // 将字符串集合转换为数组
        // var image_array = [];
        // image_array = imageList.split(",");
        // var content = objList.content;
        // var mainContent = objList.mainContent;
        // var title = objList.title;
        // if (image_array == '' || image_array == null || image_array == undefined){
        //     image_array = ''
        // } else{
        //   image_array = image_array
        // }
        // that.setData({
        //   date: date,
        //   content: content,
        //   mainContent: mainContent,
        //   image_array: image_array,
        //   title:title
        // })
        console.log(res)
        var contentArrays = [];
        var title = res.data.industryInformation.title;
        var date = timeFormat(res.data.industryInformation.createTime);
        var mainContent = res.data.industryInformation.mainContent;
        // 内容详情
        var contentArray = res.data.mapList;
        for (var i = 0; i < contentArray.length; i++) {
          var content = contentArray[i].content;
          var imageArray = contentArray[i].imageArray;
          var obj = {};
          obj.content = content;
          obj.imageArray = imageArray;
          contentArrays.push(obj)
        }
        console.log(contentArrays)
        that.setData({
          // activePic: image_array,
          title: title,
          date: date,
          mainContent: mainContent,
          contentArrays: contentArrays
        })
        // 隐藏加载框
        setTimeout(function () {
          wx.hideLoading();
          return false;
        }, 1000)
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
    // 相关信息
    wx.request({
      url: getApp().data.serviceUrl + '/industryInformation/findTenExceptId',
      data: {
        id: Id
      },
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var recommend = res.data.mapList;
        var recommens = [];
        for (var i = 0; i < recommend.length; i++) {
          var obj = {};
          var title = recommend[i].title;
          var id = recommend[i].id;
          var date = recommend[i].create_time.substr(5, 5);
          // var city = recommend[i].cmb_city.substr(0, 2);
          console.log(date)
          obj.title = title;
          obj.date = date;
          obj.id = id;
          // obj.city = city;
          recommens.push(obj)
        }
        that.setData({
          recommens: recommens
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
  jumpPage:function(e){
    // 获取点击的id
    // console.log(e)
    var Id = e.currentTarget.dataset.id
    console.log(Id)
    wx.navigateTo({
      url: '../inquiry/inquiry?id=' + Id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 资讯热线
  telCall1: function (e) {
    var companyInfo = this.data.companyInfo
    wx.makePhoneCall({
      phoneNumber: companyInfo.phone //仅为示例，并非真实的电话号码
    })
  },
  // 固定热线
  telCall2: function (e) {
    var companyInfo = this.data.companyInfo
    wx.makePhoneCall({
      phoneNumber: companyInfo.landline //仅为示例，并非真实的电话号码
    })
  },
})