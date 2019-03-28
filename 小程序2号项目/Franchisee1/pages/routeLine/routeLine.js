var amapFile = require('../../libs/amap-wx.js');
Page({
  data: {
    key: '094ac8a1cb22bb019cfd61dc50ccd812',
    show: false,
    currentLo: null,
    currentLa: null,
    newCurrentLo: null,
    newCurrentLa: null,
    distance: 0,
    duration: 0,
    markers: null,
    scale: 16,
    polyline: null,
    statusType: 'car',
    includePoints: []
  },
  onLoad(options) {
    console.log(options)
    var _this = this;
    // 从缓存中获取到服务商信息接口
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    var orderNumber = options.orderNumber
    var businessId = ordinaryMember.id;
    // _this.setData({
    //   orderNumber: options.orderNumber,
    //   businessId:businessId
    // })
    wx.getLocation({
      success(res) {
        _this.setData({
          currentLo: res.longitude,
          currentLa: res.latitude,
          includePoints: [{
            longitude: res.longitude,
            latitude: res.latitude
          }],
          markers: [{
            id: 0,
            longitude: res.longitude,
            latitude: res.latitude,
            title: res.address,
            iconPath: '../../imgs/gy-a.png',
            width: 32,
            height: 32
          }]
        });
      }
    })
    // 调用订单详情接口
    wx.request({
      url: getApp().data.serviceUrl + '/businessOrder/findOneDetail',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        businessId: businessId,
        orderNumber: orderNumber
      },
      success: function (res) {
        console.log(res)
        _this.setData({
          addressInfo: res.data.order.address,
          nameInfo: res.data.order.name,
          latitudeInfo: res.data.order.latitude,
          longitudeInfo: res.data.order.longitude
        })
      }
    })
  },
  getAddress(e) {
    var _this = this;
    wx.chooseLocation({
      success(res) {
        var markers = _this.data.markers;
        markers.push({
          id: 0,
          longitude: res.longitude,
          latitude: res.latitude,
          title: res.address,
          iconPath: '../../imgs/gy.png',
          width: 32,
          height: 32
        });
        var points = _this.data.includePoints;
        points.push({
          longitude: res.longitude,
          latitude: res.latitude
        });
        _this.setData({
          newCurrentLo: res.longitude,
          newCurrentLa: res.latitude,
          includePoints: points,
          markers: markers,
          show: true
        });
        _this.getPolyline(_this.data.statusType);
      }
    });
  },
  drawPolyline(self, color) {
    return {
      origin: this.data.currentLo + ',' + this.data.currentLa,
      destination: this.data.newCurrentLo + ',' + this.data.newCurrentLa,
      success(data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        self.setData({
          distance: data.paths[0].distance,
          duration: parseInt(data.paths[0].duration / 60),
          polyline: [{
            points: points,
            color: color,
            width: 6,
            arrowLine: true
          }]
        });
      }
    }
  },
  getPolyline(_type) {
    var amap = new amapFile.AMapWX({ key: this.data.key });
    var self = this;
    switch (_type) {
      case 'car':
        amap.getDrivingRoute(this.drawPolyline(this, "#0091ff"));
        break;
      case 'walk':
        amap.getWalkingRoute(this.drawPolyline(this, "#1afa29"));
        break;
      case 'ride':
        amap.getRidingRoute(this.drawPolyline(this, "#1296db"));
        break;
      default:
        return false;
    }
  },
  goTo(e) {
    var _type = e.currentTarget.dataset.type;
    this.setData({ statusType: _type });
    this.getPolyline(_type);
  },
  // 跳转到导航
  navigation:function(e){
    var that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        wx.openLocation({
          latitude: that.data.latitudeInfo,//后端请求接口
          longitude: that.data.longitudeInfo,//后端请求接口
          scale: 18,
          name: that.data.nameInfo,//终点位置
          address: that.data.addressInfo//终点详细地理位置
        })
      that.setData({
        latitude: res.latitude,
        longitude: res.longitude
      })
      }
    })
  }
})
