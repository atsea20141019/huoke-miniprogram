// custom-tab-bar/custom-tab-bar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 0,
    list: [
      '/pages/card/card',
      '/pages/shop/shop',
      '/pages/site/site',
      '/pages/my/my'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(event) {
    const selected = event.detail
    this.setData({
      selected
    })
    wx.switchTab({
      url: this.data.list[selected]
    })
  },

  onChange2(event) {
    console.log(event.detail)
    this.setData({
      active: event.detail
    });
    switch (event.detail) {
      case 0:
        // 首页
        wx.switchTab({
          url: '/pages/card/card'
        });
        break;
      case 1:
        // 商城
        wx.switchTab({
          url: '/pages/shop/shop'
        });
        break;
      case 2:
        // 官网
        wx.switchTab({
          url: '/pages/site/site'
        });
        break;
      case 3:
        // 我的
        wx.switchTab({
          url: '/pages/my/my'
        });
        break;
    }
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