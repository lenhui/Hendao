// pages/severType/severType.js
Page({
  data: {
    items: [
      { name: 'USA', value: '家庭保洁' },
      { name: 'CHN', value: '甲醛检测与治理', checked: 'true' },
      { name: 'BRA', value: '家电清洗' },
      { name: 'JPN', value: '除四害' },
      { name: 'JPN', value: '除螨' },
      { name: 'ENG', value: '商业厨房清洗保养' },
    ]
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
})