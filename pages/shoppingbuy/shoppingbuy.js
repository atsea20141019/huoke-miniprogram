// pages/shoppingbuy/shoppingbuy.js
import axios from '../../utils/http'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    num: 1,
    price: 0,
    imgUrls: '',
    address: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress()
    this.getGoodsDetail(options.goods_no)
  },
  handleGetMessage(e) {
    console.log(e)
  },
  //获取默认地址
  getAddress() {
    axios.post('/wxc/address/lists', {
      count: 1
    }).then(res => {
      this.setData({
        address: res.data.list[0]
      })
    })
  },
  selectAddress() {
    let url = app.globalData.webViewUrl + '/my/address?token=' + wx.getStorageSync('token')
    // let url = 'http://192.168.0.5:8080/#/my/address?token='+wx.getStorageSync('token') + '&page=shoppingbuy&num=' + this.data.num 
    wx.navigateTo({
      url: '../webview/webview?url=' + encodeURIComponent(url)
    })
  },
  getGoodsDetail(goods_no) {
    axios.post('/wxc/goods/detail', {
      goods_no: goods_no
    }).then(res => {
      this.setData({
        imgUrls: res.data.cover_img.split('|')[0]
      })
      this.setData({
        goodsDetail: res.data
      })
      this.setData({
        price: res.data.sale_price
      })
    })
  },
  onChangeNum(e) {
    this.setData({
      num: e.detail,
      price: e.detail * this.data.goodsDetail.sale_price
    })
  },

  onSubmit() {
    axios.post('/wxc/order/create', {
      goods_no: this.data.goodsDetail.goods_no,
      quantum: this.data.num,
      address_id: this.data.address.address_id
    }).then(res => {
      console.log(res)
      wx.requestPayment({
        timeStamp: res.data.payment.timeStamp,
        nonceStr: res.data.payment.nonceStr,
        package: res.data.payment.package,
        signType: res.data.payment.signType,
        paySign: res.data.payment.paySign,
        success: function (res) {
          // 支付成功后的回调函数
          wx.redirectTo({
            url: '/pages/order/order'
          })
        }
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
  onShareAppMessage: function () {

  }
})