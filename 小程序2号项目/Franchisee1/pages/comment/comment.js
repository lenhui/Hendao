const app = getApp();
Page({
  data: {
    orderLists: [{
      img: '../images/1.jpg',
      title: '海天招牌拌饭酱（香辣香菇味）300g海天出品',
      price: '22',
      num: '1'
    }, {
      img: '../images/1.jpg',
      title: '海天招牌拌饭酱（香辣香菇味）300g海天出品',
      price: '34',
      num: '2'
    }, {
      img: '../images/3.jpg',
      title: '海天招牌拌饭酱（香辣香菇味）300g海天出品',
      price: '12',
      num: '2'
    }, {
      img: '../images/dev2.jpg',
      title: '海天招牌拌饭酱（香辣香菇味）300g海天出品',
      price: '16',
      num: '2'
    }, {
      img: '../images/1.jpg',
      title: '海天招牌拌饭酱（香辣香菇味）300g海天出品',
      price: '43',
      num: '2'
    }, {
      img: '../images/2.jpg',
      title: '海天招牌拌饭酱（香辣香菇味）300g海天出品',
      price: '43',
      num: '2'
    }, {
      img: '../images/3.jpg',
      title: '海天招牌拌饭酱（香辣香菇味）300g海天出品',
      price: '43',
      num: '2'
    }, {
      img: '../images/dev1.jpg',
      title: '海天招牌拌饭酱（香辣香菇味）300g海天出品',
      price: '43',
      num: '2'
    }],
  },
  starChange: function (e) {
    //获取点击值
    var val = e.detail;
    console.log(val);
    wx.showToast({
      title: val + '星',
      icon: "none"
    })
  }
});