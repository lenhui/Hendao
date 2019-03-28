// page/feedBack/feedBack.js
var tempFilePaths = []
Page({
  data: {
    photoBox: 'photoBox',
    openid: '',
    tempFilePaths: [],
    initText: '请填写您的意见',
    // 上传照片
    UploadLists: [{
      img: '../../page/images/1.jpg'
    }, {
      img: '../../page/images/1.jpg'
    }],
    pic: [],
    phone: '',
  },
  onLoad: function () {
    tempFilePaths = []
    if (wx.getStorageSync('openid')) {
      this.setData({
        openid: wx.getStorageSync('openid')
      })
    }
  },
  onShow: function () {

  },

  bindChangePhone: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  textInput(e) {
    this.setData({
      textInput: e.detail.value
    })
  },
  bindChangeEmail(e) {
    this.setData({
      emailInput: e.detail.value
    })
  },
  // 照片上传方法
  chooseimage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempPic = res.tempFilePaths;
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          pic: tempFilePaths
        })
        wx.showLoading({
          title: '玩命上传中',
        })
        // 上传图片
        wx.uploadFile({
          url: getApp().data.serviceUrl + '/upload/imgUpload',
          filePath: tempPic[0],
          name: 'file',
          header: {},
          formData: {
            'userId': 10001
          },
          success: function (res) {
            var data = res.data;
            console.log(data)
            // console.log('图片：' +res.data)
            // tempFilePaths = that.data.tempFilePaths;
            tempFilePaths.push(data);
            // console.log(tempFilePaths)
            // console.log('分割' + tempFilePaths)
            if (tempFilePaths.length == 3) {
              that.setData({
                photoBox: 'photoBox1',
                pic: tempFilePaths
              })
              // 隐藏加载框
              wx.hideLoading();
              return false;
            } else {
              that.setData({
                pic: tempFilePaths
              })
              console.log(tempFilePaths)
              // 隐藏加载框
              wx.hideLoading();
            }
          },
          fail: function (e) {
            wx.showToast({
              title: '网络断开，稍后重试',
              icon: 'none',
              duration: 2000
            })
          },
          complete: function (res) { },
        })
      }
      // }
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
  submit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var that = this;
    var text = that.data.textInput;
    var email = that.data.emailInput;
    var myreg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    // 将数组转换为字符串
    var pic = that.data.pic.join(',');
    // var pic = that.data.pic;
    var openid = that.data.openid
    if (text == undefined || text == '') {
      wx.showModal({
        content: '请输入您的意见',
        showCancel: false
      });
      // return false;
    } else if (that.data.pic.length == 0 && that.data.pic == '') {
      wx.showModal({
        content: '请上传图片',
        showCancel: false
      });
      // return false;
    } else if (that.data.emailInput == '') {
      wx.showModal({
        content: '邮箱号不能为空',
        showCancel: false
      });
    } else if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(email)) {
      wx.showModal({
        content: '邮箱号格式不正确',
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
          // for (var i=0;i<pic.length;i++){
          //   pic = pic.split(',');
          // }
          // console.log(pic)
          if (res.confirm) {
            // wx.showLoading({
            //   title: '正在提交中',
            // })
            wx.request({
              url: getApp().data.serviceUrl + '/feedback/addOrUpdate',
              data: {
                content: encodeURI(that.data.textInput),
                imageList: pic,
                email: email,
                openid: openid
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(that.data.pic)
                if (res.data.code == 0) {
                  wx.showToast({
                    title: '提交成功',
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
                    title: '提交失败！'
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

  },
})
