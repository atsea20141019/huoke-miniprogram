import axios from '../../utils/http'
const app = getApp()
Page({
  data: {
    imgs: [
      'https://api.qk.zhongheinfo.com/attachment/default/avatar/20200729/5f21021e2fb76.png',
      'https://api.qk.zhongheinfo.com/attachment/default/avatar/20200729/5f2102291eae8.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    //幻灯参数
    navData: {},
    currentTab: 0,
    navScrollLeft: 0,
    goodsList: [],
    query: {
      count: 10000
    }
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  switchNav: function (event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }

    this.getGoodsList(cur)
  },
  getGoodsList(cate) {
    let goods_cate = cate
    if (cate == 0) {
      goods_cate = null
    } else {
      goods_cate = Number(cate)
    }
    let _this = this
    axios.post('/wxc/goods/lists', {
      count: _this.data.query.count,
      goods_cate: goods_cate
    }).then(res => {
      _this.setData({
        goodsList: res.data.list
      })
    })
  },
  switchTab: function (event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })

    this.setData({
      navData: app.globalData.dataBase.goods_cate
    })

    this.getGoodsList(0)
  },
  showgoodsdetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/goodsdetail/goodsdetail?goods_no=' + e.currentTarget.dataset.no
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})