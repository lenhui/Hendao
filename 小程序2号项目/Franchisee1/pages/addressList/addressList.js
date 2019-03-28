Page({

  data: {
    addressList: [],
    items: [
      { name: 'USA', value: '家庭保洁' },
      { name: 'CHN', value: '甲醛检测与治理', checked: 'true' },
      { name: 'BRA', value: '家电清洗' },
      { name: 'JPN', value: '除四害' },
      { name: 'ENG', value: '商业厨房清洗保养' },
    ]
  },

  onLoad: function (options) {
    console.log(options)
    var arr = wx.getStorageSync('addressList') || [];
      console.log("缓存数据：" + arr);
    // 更新数据  
    this.setData({
      addressList: arr
    });

  },
  onShow: function () {
    this.onLoad();
    var addressList = this.data.addressList;
    var addressArray = [];
    for (var i = 0; i < addressList.length;i++){
      var address = addressList[i].address;
      var consignee = addressList[i].consignee;
      var mobile = addressList[i].mobile;
      var transportDay = addressList[i].transportDay;
      var value = addressList[i].consignee;
      var checked = '';
      var obj = {};
      obj.address = address;
      obj.consignee = consignee;
      obj.mobile = mobile;
      obj.transportDay = transportDay;
      obj.value = value;
      obj.checked = checked;
      addressArray.push(obj)
    }

    this.setData({
      addressList: addressArray
    })
    console.log(this.data.addressList)
  },
    
  addAddress: function () {
    wx.navigateTo({ url: '../address/address' });
  },

  /* 删除item */
  delAddress: function (e) {
    this.data.addressList.splice(e.target.id.substring(3), 1);
    // 更新data数据对象  
    if (this.data.addressList.length > 0) {
      this.setData({
        addressList: this.data.addressList
      })
    wx.setStorageSync('addressList', this.data.addressList);

    } else {
      this.setData({
        addressList: this.data.addressList
      })
      wx.setStorageSync('addressList', []);
    }
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    

  }

})