// page/component/Componet/searchBox/searchBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    valueText:''
  },
  methods: {
    searchInput(e) {
      //console.log('打印' + e.detail.value)
      this.setData({
        valueText: e.detail.value
      })
     // console.log(this.data.valueText)

      this.triggerEvent('getSearchData', this.data.valueText);
    },
  }
})
