var tempFilePaths = []
var proPicFilePaths = []
var equPicFilePaths = []
var advPicFilePaths = []
var marPicFilePaths = []
var braPicFilePaths = []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    photoBox: 'photoBox',
    photoPro:'photoPro',
    photoEqu:'photoEqu',
    photoMar: 'photoMar',
    photoBra: 'photoBra',
    img:'img',
    img2:'img2',
    // 上传照片
    UploadLists: [{
      img: '../../pages/images/1.jpg'
    }, {
      img: '../../pages/images/1.jpg'
    }],
    pic: [],
    proPic:[],
    marPic:[]
  },
  onLoad: function () {
    tempFilePaths = [],
    proPicFilePaths = [],
    equPicFilePaths = [],
    advPicFilePaths = [],
    marPicFilePaths = [],
    braPicFilePaths = []
  },

  onShow: function () {
  },
  // 照片上传方法
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempPic = res.tempFilePaths;
        tempFilePaths.push(tempPic)
        console.log(tempFilePaths.length)
        if (tempFilePaths.length == 5) {
          _this.setData({
            photoBox: 'photoBox1',
            pic: tempFilePaths
          })
        }
        // tempFilePaths = []
        // return false;
        else {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.setData({
            // pic: res.tempFilePaths
            pic: tempFilePaths
          })
        }
      }
    })
  },
  // 服务类型跳转
  jumpType:function(e){
    wx:wx.navigateTo({
      url: '../severType/severType',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 上传服务项目图
  choosePro:function(e){
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res)
        var tempPic = res.tempFilePaths;
        proPicFilePaths.push(tempPic)
        // console.log(proPicFilePaths.length)
        if (proPicFilePaths.length == 6) {
          _this.setData({
            photoPro: 'photoPro1',
            proPic: proPicFilePaths
          })
        }
        // tempFilePaths = []
        // return false;
        else {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.setData({
            // pic: res.tempFilePaths
            proPic: proPicFilePaths
          })
          console.log(_this.data.proPic)
        }
      }
    })
  },
  // 上传设备展示图
  chooseEqu:function(e){
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res)
        var tempPic = res.tempFilePaths;
        equPicFilePaths.push(tempPic)
        // console.log(proPicFilePaths.length)
        if (equPicFilePaths.length == 4) {
          _this.setData({
            photoEqu: 'photoEqu1',
            equPic: equPicFilePaths
          })
        }
        // tempFilePaths = []
        // return false;
        else {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.setData({
            // pic: res.tempFilePaths
            equPic: equPicFilePaths
          })
        }
      }
    })
  },
  // 设备优势
  chooseAdv: function (e) {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res)
        var tempPic = res.tempFilePaths;
        advPicFilePaths.push(tempPic)
        // console.log(proPicFilePaths.length)
        if (advPicFilePaths.length == 1) {
          _this.setData({
            // img: 'img1',
            advPic: advPicFilePaths
          })
        }
        // tempFilePaths = []
        // return false;
        else {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.setData({
            // pic: res.tempFilePaths
            advPic: advPicFilePaths
          })
        }
      }
    })
  },
  // 品牌优势
  chooseBra:function(e){
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res)
        var tempPic = res.tempFilePaths;
        braPicFilePaths.push(tempPic)
        // console.log(proPicFilePaths.length)
        if (braPicFilePaths.length == 1) {
          _this.setData({
            // img: 'img1',
            braPic: braPicFilePaths
          })
        }
        // tempFilePaths = []
        // return false;
        else {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.setData({
            // pic: res.tempFilePaths
            braPic: braPicFilePaths
          })
        }
      }
    })
  },
  // 上传市场图片
  chooseMar: function (e) {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res)
        var tempPic = res.tempFilePaths;
        marPicFilePaths.push(tempPic)
        // console.log(proPicFilePaths.length)
        if (marPicFilePaths.length == 1) {
          _this.setData({
            // img: 'img1',
            marPic: marPicFilePaths
          })
        }
        // tempFilePaths = []
        // return false;
        else {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.setData({
            // pic: res.tempFilePaths
            marPic: marPicFilePaths
          })
        }
      }
    })
  },
  deletePic: function (e) {
    var that = this;
    var pic = that.data.pic;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    // console.log(index)
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log(pic)
          console.log('点击确定了');
          pic.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          photoBox: 'photoBox',
          pic
        });
      }
    })
  },
  deletePro:function(e){
    var that = this;
    var proPic = that.data.proPic;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log(proPic)
          console.log('点击确定了');
          // console.log(proPic)
          proPic.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          photoPro: 'photoPro',
          proPic
        });
      }
    })
  },
  // 删除设备展示图
  deleteEqu:function(e) {
    var that = this;
    var equPic = that.data.equPic;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          // console.log(proPic)
          console.log('点击确定了');
          // console.log(proPic)
          equPic.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          photoEqu: 'photoEqu',
          equPic
        });
      }
    })
  },
  // 删除设备优势
  deleteAdv: function (e) {
    var that = this;
    var advPic = that.data.advPic;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          // console.log(proPic)
          console.log('点击确定了');
          // console.log(proPic)
          advPic.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          photoAdv: 'photoAdv',
          advPic
        });
      }
    })
  },
  // 删除品牌优势
  deleteBra: function (e) {
    var that = this;
    var braPic = that.data.braPic;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          // console.log(proPic)
          console.log('点击确定了');
          // console.log(proPic)
          braPic.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          photoBra: 'photoBra',
          braPic
        });
      }
    })
  },
  // 删除市场优势
  deleteMar: function (e) {
    var that = this;
    var marPic = that.data.marPic;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          // console.log(proPic)
          console.log('点击确定了');
          // console.log(proPic)
          marPic.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          photoMar: 'photoMar',
          marPic
        });
      }
    })
  },
  jumpUpper: function (e) {
    wx.showToast({
      title: '上架成功',
      icon: 'success',
      duration: 2000
    })
    // 延迟2秒后跳转到首页
    setTimeout(function () {
      wx.switchTab({
        url: '../management/management',
      })
    }, 1500)
  },
  jumpWarehouse:function(e){
    wx.showToast({
      title: '已放入仓库',
      icon: 'success',
      duration: 2000
    })
    // 延迟2秒后跳转到首页
    setTimeout(function () {
      wx.navigateTo({
        url: '../warehouse/warehouse',
      })
    }, 1500)
  },
})