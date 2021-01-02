// pages/shopping/shopping_index.js
Page({
  data: {
    imgs: [
      '../../images/banner.png',
      '../../images/banner.png',
      '../../images/banner.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    //幻灯参数
    navData:[
      {
          text: '所有商品'
      },
      {
          text: '购车券'
      },
      {
          text: '保养套餐'
      },
      {
          text: '精品套餐'
      },
      {
          text: '育儿'
      },
      {
          text: '纠纷'
      },
      {
          text: '青葱'
      },
      {
          text: '上课'
      },
      {
          text: '下课'
      }
  ],
  currentTab: 0,
  navScrollLeft: 0
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
    switchNav:function(event){
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
    },
    switchTab:function(event){
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
  },
  showgoodsdetail:function(){
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail'
     
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