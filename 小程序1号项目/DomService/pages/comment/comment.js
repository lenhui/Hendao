const app = getApp();
var tempFilePaths = []
Page({
	data: {
		currentStarNumStatic: 4.2,
		currentStarNum: 3,
    photoBox: 'photoBox',
    openid: '',
    tempFilePaths: [],
    initText: '（选填）以家庭服务为核心设计所有产品及流程，行业首家家政服务套餐会员卡模式。颠覆传统家政行业无法控制的中介模式',
    // 上传照片
    UploadLists: [{
      img: '../../page/images/1.jpg'
    }, {
      img: '../../page/images/1.jpg'
    }],
    pic: [],
    phone: '',
	},
  onLoad: function (options) {
    var that = this;
    tempFilePaths = []
    this.setData({
      Id: options.id
    })
    var orderId = this.data.Id
    console.log(orderId)
    wx.request({
      url: getApp().data.serviceUrl + '/order/findOne',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        id: orderId
      },
      success: function (res) {
        console.log(res)
        // 将字符串转变为数组
        var imageArray = res.data.order.imageList.split(',')
        console.log(imageArray)
        var imageList = imageArray[0]
        that.setData({
          orderNumber: res.data.order.orderNumber,
          imageList: imageList
        })
        console.log(that.data.imageList)
      }
    })
    if (wx.getStorageSync('openid')) {
      this.setData({
        openid: wx.getStorageSync('openid')

      })
    }
  },
  conentInput:function(e){
    console.log(e)
    this.setData({
      conent: e.detail.value
    })
    console.log(this.data.conent)
  },
  bindChangePhone: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      phone: e.detail.value
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
            console.log(res)
            var data = res.data;
            tempFilePaths.push(data);
            if (tempFilePaths.length == 5) {
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
    console.log(index)
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
  starChange: function (e) {
    //获取点击值
    var val = e.detail;
    var commentText
    var that = this;
    if (val == 1){
      commentText = '服务非常差'
    } else if (val == 2){
      commentText = '服务一般'
    } else if (val == 3){
      commentText = '服务还好'
    } else if (val == 4){
      commentText = '服务非常好'
    } else if (val == 5){
      commentText = '服务超级好'
    }
    that.setData({
      val: val,
      commentText
    })
    console.log(that.data.val)
		console.log(val);
		wx.showToast({
			title: val + '星',
			icon:"none"
		})
	},
  // 提交评论
  submit:function(e){
    var that = this;
    var conent = that.data.conent;
    var val = that.data.val;
    console.log(val)
    var orderNumber = that.data.orderNumber;
    // 将数组转换为字符串
    var pic = that.data.pic.join(',');
    // var pic = that.data.pic;
    var openid = wx.getStorageSync('openid');
    console.log(openid)
    if (val == '' || val == undefined){
      wx.showModal({
        content: '请输入您的评分',
        showCancel: false
      });
    }
    else if (conent == undefined || conent == '') {
      wx.showModal({
        content: '请输入您的意见',
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
            // wx.showLoading({
            //   title: '正在提交中',
            // })
            wx.request({
              url: getApp().data.serviceUrl + '/orderEvaluate/add',
              data: {
                content: encodeURI(conent),
                imageList: pic,
                orderNumber: orderNumber,
                starLevel: val,
                openid: openid
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res)
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
                      conent: '',
                      pic: '',
                      val:''
                      // email: ''
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

  }
});