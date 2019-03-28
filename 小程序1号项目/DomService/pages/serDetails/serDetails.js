Page({
  data:{

  },
  onLoad:function(options){
    var that = this;
    // 获取到参数
    this.setData({
      Id: options.id
    })
    var serverId = this.data.Id;
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/content/findOne',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        id: serverId
      },
      success: function (res) {
       console.log(res)
      //  获获取到专业服务的数据
        var servers = res.data.content.imageList;
        var imageListDevice = res.data.content.imageListDevice;
        var imageListAdvantage = res.data.content.imageListAdvantage;
        var desText = res.data.content.detail 
        // 将字符创变为数组
        // 专业的服务图
        var image_array = [];
        // 设备展示图
        var image_devArray = [];
        // 项目优势图
        var image_advArray = [];
        var imgUrls = [];
        var imgDevPic = [];
        var imgAdv = [];
        image_array = servers.split(",");
        image_devArray = imageListDevice.split(",");
        image_advArray = imageListAdvantage.split(",");
        if (image_array == '' || image_array == null || image_array == undefined) {
          image_array = ''
        } else {
          image_array = image_array
        }
        if (image_devArray == '' || image_devArray == null || image_devArray == undefined) {
          image_devArray = ''
        } else {
          image_devArray = image_devArray
        }
        if (image_advArray == '' || image_advArray == null || image_advArray == undefined) {
          image_advArray = ''
        } else {
          image_advArray = image_advArray
        }
        that.setData({
          imageAarray: image_array,
          imageDevArray: image_devArray,
          imageAdvArray: image_devArray,
          desText: desText,
          contentId: res.data.content.id
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
  },
  jumpApp:function(){
    var contentId = this.data.contentId;
    wx.navigateTo({
      url: '../../pages/appointment/appointment?id=' + contentId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})