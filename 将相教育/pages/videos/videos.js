/* global getApp Page wx */
const app = getApp()
let timeout
function debounce(func, wait) {
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(func, wait)
  }
}
let timeout2 = null
function throttle(func, wait) {
  return function () {
    if (!timeout2) {
      timeout2 = setTimeout(function () {
        clearTimeout(timeout2)
        timeout2 = null
        func()
      }, wait)
    }
  }
}
Page({
  data: {
    page:1,
    width: wx.getSystemInfoSync().windowWidth,
    height: wx.getSystemInfoSync().windowHeight,
    videoLoading: false,
    videoList: [],
    location: [],
    isLock: false,  // 当前栗子无用，如果有些弹窗控制不住背后的视频列表滚动的话，isLock的作用就发挥出来了。
    localIndex: 0,
    noPageScroll: false,
    isClick:false
  },
  tabChange: function (e) {
    var that = this;
    var page = 1;
    // 清空之前的数据
    that.setData({
      videoList: [],
      totalPage: '',
      videoHave: true,
      videoMore: true,
      // 添加遮罩层
      isClick: true,
      // page:1
    })
    wx.showLoading({
      title: '正在加载数据',
    })
    var index = e.target.id.replace('tabTag-', '');
    that.setData({
      swiperCurrentIndex: index,
      tabCurrentIndex: index,
    });
    // 部门id
    console.log(that.data.dataVideo)
    // 调用接口请求对应部门的视频
    setTimeout(function(){
        var departmentid = e.target.dataset.departmentid;
        console.log(departmentid)
      var pageList = {
        page: 1,
        departmentid: departmentid
      }
      that.setData({
        page,
        pageList,
        departmentid:departmentid
      })
      that.getVideoList(pageList)
    },500)
  // 点击被选中事件
  },
  info: {
    videoPlayDetail: {} // 存放所有视频的播放位置
  },
  onLoad(options) {
    var that = this;
    var page = that.data.page;
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  onShow:function(e){
    // 获取到会员信息
    wx.showLoading({
      title: '正在加载数据',
    })
    var that =this;
    that.setData({
      isClick: true
    })
    var ordinaryMember = wx.getStorageSync('ordinaryMember');
    var memberLevel = ordinaryMember.level;
    var page = that.data.page;
    var departmentid = ordinaryMember.departmentId;
    console.log(ordinaryMember)
    that.setData({
      memberLevel: memberLevel,
      // 所在部门
      departmentid: departmentid
  })
    if (memberLevel == 0){
      var pageList = {
            page: 1,
            departmentid: departmentid
          }
          that.setData({
            page,
            pageList
          })
          that.getVideoList(pageList)
    } else if (memberLevel == 1){
      var index = 0;
      that.setData({
        tabCurrentIndex: 0,
      });
      // 获取到分类部门信息
      wx.request({
        url: getApp().data.serviceUrl + '/department/findAll',
        method: "GET",
        header: {
          'content-type': 'application/json'
        },
        data: {

        },
        success: function (res) {
          console.log(res)
          that.setData({
            tabs: res.data.mapList
          })
          console.log(that.data.tabs)
          // 加载所在部门视频
          var initId = that.data.tabs[0].id;
          console.log(initId)
          var pageList = {
            page: 1,
            departmentid: initId
          }
          that.setData({
            page,
            pageList
          })
          that.getVideoList(pageList)
        }
      })
      //  获取到tabs下标为0的id
    // setTimeout(function () {
      console.log(111)  
    // }, 500)
      console.log(page)
    }
  },
  /**
   * 分页获取视频
   */
  getVideoList(pageList) {
    console.log(pageList)
    // console.log(this.data.page)
    var that = this
    // 加载下一页
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.request({
      url: getApp().data.serviceUrl + '/video/page',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      data: {
        departmentId: pageList.departmentid,
        page: pageList.page
      },
      success: function (res) {
        console.log(res)
        var dataVideo = res.data.pageResult.content;
        if (dataVideo.length == 0) {
          that.setData({
            videoMore: false
          })
        }
        for (var i = 0; i < dataVideo.length; i++) {
          dataVideo[i]['cover'] = '../images/fengmain.jpg'
          dataVideo[i]['src'] = dataVideo[i].path;
          // dataVideo[i]['src'] = 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
          dataVideo[i]['width'] = 480;
          dataVideo[i]['height'] = 272;
          dataVideo[i]['title'] = dataVideo[i].name;
          dataVideo[i]['isPlay'] = false;
        }
        that.setData({
          dataVideo: dataVideo,
          totalPage: res.data.pageResult.totalPages
        })
        that.setData({
          videoHaveMore: false
        })
        if (that.data.dataVideo == '' || that.data.dataVideo == null || that.data.dataVideo == null || that.data.dataVideo == []){
          that.setData({
            videoHave:false
          })
        }
        setTimeout(function () {
          that.setData({
            isClick: false
          })
          wx.hideLoading();
          return false;
        }, 1000)
      },
      fail: function (e) {
        wx.showToast({
          title: '网络断开，稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
    console.log(that.data.dataVideo)
    const { videoLoading, videoList } = this.data;
    console.log(this.data)
    if (videoLoading) {
      return
    }
    this.setData({
      videoLoading: true
    })
    // 模拟请求
    setTimeout(() => {
      let data = that.data.dataVideo
      console.log(data)
      this.setData({
        videoList: videoList.concat(this.formatVideoList(data)),
        videoLoading: false
      })
      // 给数据足够的渲染时间，之后进行视频位置的测量
      setTimeout(() => {
        this.getLocationInfo()
        if (pageList) { // 如果是首次进入，就自动播放第一个视频
          this.showVideoList(0)
        }
      }, 1000)
    }, 1000)
  },
  /**
   * 格式化视频列表
   * @param {Array} videoList 需要格式化的视频列表
   */
  formatVideoList(videoList) {
    const { width, height } = this.data
    return videoList.map(value => {
      let styleHight = width * value.height / value.width
      styleHight = styleHight > 0.7 * height ? 0.7 * height : styleHight
      return {
        ...value,
        styleHight: Math.floor(styleHight),
        currentTime: 0,
        isPlay: false
      }
    })
  },
  // 点击播放
  eventPlay(event) {
    const { index } = event.currentTarget.dataset
    this.showVideoList(index)
  },
  // 视频更新的时候不断的去记录播放的位置
  eventPlayupdate(event) {
    const { detail: { currentTime }, currentTarget: { dataset: { index } } } = event

    this.info.videoPlayDetail[index] = currentTime
  },
  // 到底加载更多
  onReachBottom() {
    var that = this;
    var page = that.data.page;
    var departmentid = that.data.departmentid;
    // page++;
    console.log(page)
    var totalPage = that.data.totalPage;
    console.log(totalPage)
    // this.getVideoList(page)
    if (page < totalPage){
      var page = page + 1;
      var pageList = {
        page: page,
        departmentid: departmentid
      }
      this.setData({
        page,
        pageList
      })
      this.getVideoList(pageList)
      // if (totalPage >1){
        
    }else{
      this.setData({
        videoMore: false
      })
      // }
      return false;
    }
  },
  // 设置播放的视频
  showVideoList(index) {
    let { videoList } = this.data
    videoList = videoList.map(value => {
      value.isPlay = false
      return value
    })
    if (index >= 0 && videoList[index]) {
      videoList[index].isPlay = true
    }
    this.setData({
      videoList
    })
  },
  // 全屏播放，设置当前页面滚动无效，全屏的时候，会触发滚动事件。
  eventFullScreen(event) {
    console.log(event)
    const { fullScreen } = event.detail
    this.setData({
      noPageScroll: fullScreen
    })
    // this.videoContext = wx.createVideoContext('myVideo')
  },
  onPageScroll({ scrollTop }) {
    if (this.data.noPageScroll) {
      return
    }
    // 获取数据分别放置到各自的节流防抖函数中，防止调用的时候数据已近发生改变
    // 节流，每200毫秒触发一次
    throttle(() => {
      console.log('throttle')
      let { location, localIndex, videoList } = this.data
      let index = 0
      for (let i = 0; i < location.length; i++) {
        if (location[i].start <= scrollTop && location[i].end >= scrollTop) {
          index = i
          break
        }
      }
      if (localIndex !== index) {
        videoList[localIndex].currentTime = this.info.videoPlayDetail[localIndex]
        this.setData({
          videoList
        })
        this.showVideoList()
      }
    }, 200)()

    // 防抖，只触发一次
    debounce(() => {
      console.log('debounce')
      let { location, isLock } = this.data
      if (!isLock) {
        let index = 0
        for (let i = 0; i < location.length; i++) {
          if (location[i].start <= scrollTop && location[i].end >= scrollTop) {
            index = i
            break
          }
        }
        this.showVideoList(index)
        this.setData({
          localIndex: index
        })
      }
    }, 200)()
  },
  // 测量当前的所有视频的高度，计算出视频播放与否的位置
  getLocationInfo() {
    const { videoList } = this.data
    var query = wx.createSelectorQuery()
    for (let i = 0; i < videoList.length; i++) {
      query.select(`#video${i}`).boundingClientRect()
    }
    const length = videoList.length
    const location = []
    query.exec(res => {
     
      let start = 0
      let end = 0
      let lei = 0
      for (let i = 0; i < length; i++) {
        if (i === 0) {
          start = 0
          end = videoList[i]['styleHight'] / 2
        } else {
          start = end
          end = lei + videoList[i]['styleHight'] / 2
        }
        location.push({
          start: start,
          end: end
        })
        lei = lei + res[i].height + 10
      }
      this.setData({
        location
      })
    })
  },
 
})
