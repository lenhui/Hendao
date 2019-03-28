// var area = require('../../utils/area.js');

var areaInfo = []; //所有省市区县数据
var provinces = []; //省
var provinceNames = []; //省名称
var citys = []; //城市
var cityNames = []; //城市名称
var countys = []; //区县
var countyNames = []; //区县名称
var value = [0, 0, 0]; //数据位置下标
var addressList = null;
Page({
  data: {
    transportValues: ["收货时间不限", "周六日/节假日收货", "周一至周五收货"],
    transportIndex: 0,
    provinceIndex: 0, //省份
    cityIndex: 0, //城市
    countyIndex: 0, //区县
    // 地区组件
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
  },
  onLoad: function (options) {
  },
  // 位置定位
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  onShow: function () {
 
  },

  bindTransportDayChange: function (e) {

    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({

      transportIndex: e.detail.value

    })

  },


  bindCountyNameChange: function (e) {
    var that = this;
    console.log('picker county 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countyIndex: e.detail.value
    })
  },
  saveAddress: function (e) {
    var that = this;
    var consignee = e.detail.value.consignee;
    var mobile = e.detail.value.mobile;
    var transportDay = e.detail.value.transportDay;
    var region = that.data.region;
    var provinceName = region[0];
    var cityName = region[1];
    var countyName = region[2];
    var address = e.detail.value.address;
    console.log(transportDay + "," + provinceName + "," + cityName + "," + countyName + "," + address); //输出该文本 
    var arr = wx.getStorageSync('addressList') || [];
    console.log("arr,{}", arr);
    addressList = {
      consignee: consignee,
      mobile: mobile,
      address: provinceName + cityName + countyName + address,
      transportDay: transportDay
    }
    arr.push(addressList);
    wx.setStorageSync('addressList', arr);
    wx.navigateBack({
    })
  }
})