// pages/Customer/Customer.js
Page({
  data:{

  },
  contentInput(e){
    this.setData({
      contentInput: e.detail.value
    })
  },
  nameInput(e) {
    this.setData({
      nameInput: e.detail.value
    })
  },
  telInput(e) {
    this.setData({
      telInput: e.detail.value
    })
  },
  submit(e){
    var that = this
    var content = that.data.contentInput;
    var name = encodeURI(encodeURI(that.data.nameInput));
    var tel = that.data.telInput;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    console.log(content)
    if (content == undefined || content == '' || content == null){
      wx.showToast({
        title: '留言不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return true;
    } else if (that.data.nameInput == '' || that.data.nameInput == undefined){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return true;
    } else if (that.data.telInput == '' || that.data.telInput == undefined){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return true;
    } else if (that.data.telInput.length < 11 || !myreg.test(that.data.telInput)){
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return true;
    }
    else{
      console.log(name)
      wx.request({
        url: getApp().data.serviceUrl + '/contactCustomer/addOrUpdate',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        data: {
          id:'',
          content: encodeURI(that.data.contentInput),
          name: encodeURI(that.data.nameInput),
          phone: that.data.telInput
        },
        success: function (res) {
          console.log(res)
          if(res.data.code == 0){
            wx.showToast({
              title: '提交成功',
              icon: 'none',
              duration: 3000,
              mask: true
            })
          setTimeout(function(){
            that.setData({
              content: '',
              name: '',
              tel: ''
            })
          },4000)
            return true;
            }else{
            wx.showModal({
              title: '提示',
              content: '提交失败，可能是反馈内容过长或含有特殊字符！',
              success: function (res) {
                if (res.confirm) {

                } else {
                  wx.navigateBack({
                    url: '../../pages/index/index'
                  })
                }
              },
              fail:function(res){
                wx.showToast({
                  title: '网络断开，稍后重试',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
            }
          }
        })
      }
    }
})
