// pages/goodsdetail/goodsdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    duration:"500",
    imgUrls: [
      '../../images/pic4.jpg',
      '../../images/pic4.jpg'
    ],
    current: 0,
    show: false,
    //幻灯参数
  }, 
  swiperChange: function (e) {
    var that = this;
    if (e.detail.source == 'touch') {
      that.setData({
        current: e.detail.current
      })
    }
  }, 
  showPopup: function () {
    this.setData({ show: true });
  },

  onClose: function () {
    this.setData({ show: false });
  },
  onClick_gwc:function(){
    wx.navigateTo({
      url: '../shoppingcart/shoppingcart',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //自定义标题
    wx.setNavigationBarTitle({
      title: "商品标题"
    });
    this.showPopup();
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