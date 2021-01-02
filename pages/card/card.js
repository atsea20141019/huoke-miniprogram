// pages/card/card.js
import axios from '../../utils/http'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardInfo: {},
    seller_id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.seller_id) {
      this.setData({
        seller_id: Number(options.seller_id) 
      })
    } else {
      this.setData({
        seller_id: null
      })
    }
    this.getCardInfo()
  },

  getCardInfo() {
    axios.post('/wxc/index/card_page', {
      seller_id: this.data.seller_id
    }).then(res => {
      this.setData({
        cardInfo: res.data
      })
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
  onShareAppMessage: function (res) {
    return {
      title: this.data.cardInfo.realname,
      path: '/pages/card/card?seller_id=' + this.data.cardInfo.seller_id
    }
  }
})