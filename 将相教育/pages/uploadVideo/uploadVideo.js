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
    photoPro: 'photoPro',
    photoEqu: 'photoEqu',
    photoMar: 'photoMar',
    photoBra: 'photoBra',
    img: 'img',
    img2: 'img2',
    // 上传照片
    UploadLists: [{
      img: '../../pages/images/1.jpg'
    }, {
      img: '../../pages/images/1.jpg'
    }],
    pic: [],
    proPic: [],
    marPic: []
  },
  onLoad: function () {
    var that = this
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    wx.request({
      url: getApp().data.serviceUrl + '/member/findOne',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      data: {
        id: ordinaryMember.id,
      },
      success: function (res) {
        console.log(res)
        // member
        that.setData({
          memberId: res.data.member.adminId
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
  nameInput:function(e){
    console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },
  desInput:function(e){
    console.log(e.detail.value)
    this.setData({
      title: e.detail.value
    })
  },
  onShow: function () {
    // 从缓存中获取到部门id
    var departmentInfo = wx.getStorageSync('departmentInfo')
    console.log(departmentInfo)
    // 将字符串转为数组
    var departmentArray = departmentInfo.split(',')
    console.log(departmentArray)
    // var departmentValue = 
    this.setData({
      departmentInfo: wx.getStorageSync('departmentInfo'),
      departmentArray: departmentArray
    })
    console.log(this.data.departmentInfo)
  },
  // 服务类型跳转
  jumpType: function (e) {
    wx: wx.navigateTo({
      url: '../severType/severType',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 上传视频
  bindButtonTap: function () {
    var that = this
    console.log(111)
    // 选择要上传的视频
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        console.log(res)
        var tempPic = res.tempFilePath;
        console.log(tempPic)
        equPicFilePaths.push(tempPic)
        console.log(equPicFilePaths.length)
        if (equPicFilePaths.length <= 1) {
          // 调用上传视频接口
          wx.showLoading({
            title: '视频正在上传中',
          })
          wx.uploadFile({
            url: getApp().data.serviceUrl + '/video/upload',
            filePath: tempPic,
            name: 'file',
            header: {
              'content-type': 'multipart/form-data'
            },
            formData: {
              'userId': 10001
            },
            success: function (res) {
              console.log(res)
              console.log(res.data)
              console.log(res.data.code)
              console.log(res.data.fileEntity)
              var data = res.data;
              var videoArray = [];
              videoArray.push(data)
              console.log(equPicFilePaths)
              console.log(videoArray)
                // 隐藏加载
                that.setData({
                  photoEqu: 'photoEqu1',
                  equPic: videoArray
                  // equPic: equPicFilePaths
                })
                setTimeout(function () {
                  wx.hideLoading();
                  wx.showModal({
                    content: '视频上传成功',
                    showCancel: false
                  });
                }, 500)
            },
            fail: function (e) {
              wx.showModal({
                content: '视频上传失败请重新上传',
                showCancel: false
              });
            },
            complete: function (res) { },
          })
        }
      }
    })
  },
  // 删除视频
  deleteEqu: function (e) {
    var that = this;
    var memberId = that.data.memberId;
    var equPic = that.data.equPic;
    var equStr = equPic[0];
    console.log(equStr);
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此视频吗？',
      success: function (res) {
        if (res.confirm) {
          // console.log(proPic)
          console.log('点击确定了');
          // 调用删除视频接口
          // wx.request({
          //   url: getApp().data.serviceUrl + '/video/deleteById',
          //   method: "POST",
          //   header: {
          //     'content-type': 'application/x-www-form-urlencoded'
          //   },
          //   data: {
          //     adminId: memberId,
          //     id: equStr
          //     // id: '1'
          //   },
          //   success: function (res) {
          //    console.log(res)
          //   },
          //   fail: function (e) {
          //     wx.showToast({
          //       title: '网络断开，稍后重试',
          //       icon: 'none',
          //       duration: 2000
          //     })
          //   }
          // })
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
  jumpUpper: function (e) {
    var that = this;
    // 上传人姓名
    var name = that.data.name;
    // 选择部门
    var departmentId = that.data.departmentArray[0]
    console.log(departmentId)
    // 视频描述
    var title = that.data.title;
    console.log(title)
    var memberId = that.data.memberId;
    console.log(memberId)
    // 选择视频
    var equPic = that.data.equPic;
    console.log(equPic)
    var openid = that.data.openid
    if (name == undefined || name == ''){
      wx.showModal({
        content: '请输入您的姓名',
        showCancel: false
      });
      // return false;
    } else if (departmentId == '' || departmentId == undefined || departmentId == null) {
      wx.showModal({
        content: '请选择部门',
        showCancel: false
      });
      // return false;
    } else if (that.data.title == '' || that.data.title == undefined) {
      wx.showModal({
        content: '请输入视频描述',
        showCancel: false
      });
    } else if (equPic == undefined || equPic.length == 0) {
      wx.showModal({
        content: '请上传视频',
        showCancel: false
      });
      // return false;
    } else {
      wx.showModal({
        title: '确认',
        content: '您确定提交吗?',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: getApp().data.serviceUrl + '/video/add',
              data: {
                name: encodeURI(title),
                path: equPic[0],
                adminId: memberId,
                departmentId: departmentId
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                if (res.data.code == 0) {
                  wx.showToast({
                    title: '上传成功',
                    icon: 'none',
                    duration: 3000,
                    mask: true
                  })
                  setTimeout(function () {
                    that.setData({
                      text: '',
                      pic: '',
                      email: ''
                    })
                  }, 4000)
                  // 隐藏加载框
                  // wx.hideLoading();

                } else {
                  wx.showToast({
                    title: '上传失败！'
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
    }
    // 延迟2秒后跳转到首页
   
  },
  

})