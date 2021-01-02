// pages/myorder/myorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    orderlist:[{
      "s_logo":'../../images/pic4.jpg',
      "s_name":2,
      "order_id":3,
      "cdate":4,
      "isPay":5,
      "orderStatus":2,
      "orderStatusName":7,
      "realTotalMoney":8,
      "orderNo":9,
      "orderGoodsStr":10,
      "orderStatusName":11,
      "goodNum":12,
      "s_id":13

    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  onChange(event) {
   /* wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });*/
  },
  showorderdetail:function(){
    wx.navigateTo({
      url: '../orderdetail/orderdetail',
    })
  }
})