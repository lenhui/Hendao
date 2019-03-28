// page/news/news.js
var tempFilePaths = []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    photoBox: 'photoBox',
    // 上传照片
    UploadLists: [{
      img: '../../page/images/1.jpg'
    }, {
      img: '../../page/images/1.jpg'
    }],
    pic: [],
    // address:'广东省广州市天河区',
    // 地区组件
    // region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
		date1 : '点击选择',
		show1 : true,
		date2: '点击选择',
		show2: true,
  },
  onLoad: function (options) {
    console.log(options)
    tempFilePaths = [];
    var that = this;
    // 获取到参数
    this.setData({
      Id: options.id
    })
    console.log(this.data.Id)
  },
  onShow: function () {
  },
		showDate1 : function(){
		this.setData({ show1 : false});
	},
	showDate2: function (e) {
    console.log(e)
		this.setData({ show2 : false });
	},
	changeDate1 : function(e){
		this.setData({ date1 : e.detail.date, show1 : true});
	},
	changeDate2: function (e) {
		this.setData({ date2: e.detail.date, show2: true });
    console.log(this.data.date2)
	},
  handleName: function (e) {
    this.setData({
      name: e.detail.value,
    })
    console.log(this.data.tel)
  },
  handlePhone: function (e) {
    this.setData({
      phone: e.detail.value,
    })
    console.log(this.data.tel)
  },
  // 所在地区
  chooseLocation: function () {
    var _this = this;
    wx.chooseLocation({
      success(res) {
      console.log(res)
        _this.setData({
          address: res.address,
          addrName: res.name,
          latitude: res.latitude,
          longitude: res.longitude
        })
        console.log(_this.data.addrName)
      }
      
    });
    
  },
  // handleTel: function (e) {
  //   this.setData({
  //     tel: e.detail.value,
  //   })
  //   console.log(this.data.tel)
  // },
  // handleCode: function (e) {
  //   this.setData({
  //     code: e.detail.value,
  //   })
  //   console.log(this.data.code)
  // },
  // handlePwd: function (e) {
  //   this.setData({
  //     pwd: e.detail.value,
  //   })
  //   console.log(this.data.pwd)
  // },
  // handleAgain: function (e) {
  //   this.setData({
  //     pwdAgain: e.detail.value,
  //   })
  //   console.log(this.data.pwdAgain)
  // },
  // handleServerName: function (e) {
  //   this.setData({
  //     serverName: e.detail.value,
  //   })
  // },
  // 详细地址
  handleDesAdr: function (e) {
    this.setData({
      desAdress: e.detail.value,
    })
    console.log(this.data.desAdress)
  },
  beizhu:function(e){
    this.setData({
      beizhu:e.detail.value,
    })
    console.log(this.data.beizhu)
  },
  // 照片上传方法
  chooseimage: function () {
    // var _this = this;
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success: function (res) {
    //     var tempPic = res.tempFilePaths;
    //     tempFilePaths.push(tempPic)
    //     console.log(tempFilePaths.length)
    //     if (tempFilePaths.length == 5) {
    //       _this.setData({
    //         photoBox: 'photoBox1',
    //         pic: tempFilePaths
    //       })
    //     }
    //     // tempFilePaths = []
    //     // return false;
    //     else {
    //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //       _this.setData({
    //         // pic: res.tempFilePaths
    //         pic: tempFilePaths
    //       })
    //     }
    //   }
    // })
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
  // 位置定位
  bindRegionChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit:function(e){
    console.log(e)
  },
  // 提交事件
  submit:function(e){
   
      // 延迟2秒后跳转到首页
    // setTimeout(function(){
    // 判断验证码是否正确
    var that = this;
    var name = this.data.name
    console.log(name)
    var phone = this.data.phone;
    console.log(phone)
    var warn = null;
    var serviceTime = this.data.date2;
    console.log(serviceTime)
    var desAdress = this.data.desAdress;
    console.log(desAdress)
    // var region = this.data.region;
    // console.log(region)
    // 所在地区
    var address = that.data.address;
    var addrName = that.data.addrName;
    var latitude = that.data.latitude;
    var longitude = that.data.longitude;
    var pic = that.data.pic.join(',');
    console.log(pic)
    var beizhu = this.data.beizhu;
    console.log(beizhu)
    // var pic = that.data.pic;
    var openid = wx.getStorageSync('openid');
    console.log(openid)
    var contentId = this.data.Id
    console.log(contentId)
    if (that.data.name == '' || that.data.name == undefined) {
      wx.showModal({
        content: '联系人不可以为空',
        showCancel: false
      });
      return;
    }
    else if (phone == undefined || phone == '') {
      warn = '手机号码不可以为空'
      console.log(warn)
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = '手机格式不正确'
    }
    else if (serviceTime == '' || serviceTime == undefined) {
      wx.showModal({
        content: '服务时间不能为空',
        showCancel: false
      });
    }
    else if (address == '') {
      wx.showModal({
        content: '请选择所在地',
        showCancel: false
      });
    }
    //  else if (region[0] == '全部' && region[1] == '全部' && region[2] == '全部') {
    //   wx.showModal({
    //     content: '所在地区不可都为全部',
    //     showCancel: false
    //   });
    // }
     else if (desAdress == '' || desAdress == undefined){
      wx.showModal({
        content: '详细地址不可以为空',
        showCancel: false
      });
    } else if (that.data.pic.length == 0 && that.data.pic == '') {
      wx.showModal({
        content: '请上传图片',
        showCancel: false
      });
      // return false;
    } else if (beizhu == '' || beizhu == undefined){
      wx.showModal({
        content: '请备注',
        showCancel: false
      });
    }
    else {
      // 获取用户的Openid
      console.log(222)
      var openid = wx.getStorageSync('openid');
      // 调用下单接口
      wx.request({
        url: getApp().data.serviceUrl + '/order/placeOrder',
        // url: getApp().data.serviceUrl + '/advertise/findAll',
        method: "post",
        header: {
          // 'content-type':'application /x-www-form-urlencoded'
          // 'content-type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          contentId: contentId,
          openid: openid,
          name: encodeURI(name),
          phone: phone,
          imageList: pic,
          addressDetail: encodeURI(desAdress),
          serviceTime: serviceTime,
          addressName: encodeURI(addrName),
          address: encodeURI(address),
          longitude: that.data.longitude,
          latitude: that.data.latitude,
          detail: encodeURI(beizhu)
          // level: 0
        },
        success: function (res) {
          console.log(111)
          console.log(res)
          // 将订单信息存放在缓存中
          wx.setStorageSync("orderInfo",res.data.order);
          var orderId = res.data.order.id
          if(res.data.code == 0){
            wx: wx.showModal({
              title: '提示',
              content: '订单提交成功，将跳转到支付页面',
              showCancel: true,
              cancelText: '取消',
              confirmText: '确定',
              success: function (res) {
                console.log(res)
                if (res.confirm) {
                  wx: wx.navigateTo({
                    url: '../../pages/payment/payment?id=' + orderId,
                    success: function (res) { },
                    fail: function (res) { },
                    complete: function (res) { },
                  })
                  // orderLists.splice(index, 1)
                  // that.setData({
                  //   orderLists
                  // })
                  // wx.showToast({
                  //   title: '删除成功',
                  //   duration: 2000
                  // })
                } else if (res.confirm) {
                  return false;
                }
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        },
        fail: function (e) {
          console.log(666)
          wx.showToast({
            title: '网络断开，稍后重试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } 
    if (warn != null) {
      wx.showModal({
        title: '提示',
        content: warn 
      })
      that.setData({
        getCode: '获取验证码',
        disabled: false,
        color: '#feb70f'
      })
    }
   
  },
	// 跳转到服务时间
	jumpTime:function(e){
		wx: wx.navigateTo({
      url: '../serTimes/serTimes',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
	}
})