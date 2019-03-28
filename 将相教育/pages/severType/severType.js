// pages/severType/severType.js
Page({
  data:{
    items: [

    ],
    s:''
  },
  onShow: function (){
    var that = this
    var departmentInfo = wx.getStorageSync('departmentInfo')
    console.log(departmentInfo)
    var departmentArray = departmentInfo.split(',')
    console.log(departmentArray)
    wx.request({
      url: getApp().data.serviceUrl + '/department/findAll',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {

      },
      success: function (res) {
        var items = res.data.mapList;
        for (var i = 0; i < items.length; i++){
          items[i]['value'] = items[i].name
        that.setData({
          items: items
        })
          if (items[i].id == departmentArray[0]){
            items[i].checked = 'true'
          }
        }
        
        console.log(that.data.items)
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
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var departmentInfo = e.detail.value
    // 将选择的部门存储
    wx.setStorageSync("departmentInfo", '');
    wx.setStorageSync("departmentInfo", departmentInfo);
  }
})