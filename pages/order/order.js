// pages/order/order.js
import axios from '../../utils/http'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList(0)
  },

  getOrderList(status){
    axios.post('/wxc/order/lists', {
      status: status
    }).then(res => {
      let arr = []
      let activeTxt = ['', '未付款', '待核销', '已核销', '已取消']
      res.data.list.map(item => {
        item.picUrl = item.cover_img.split('|')[0]
        item.status_txt = activeTxt[item.status]
        arr.push(item)
      })

      this.setData({
        orderList: arr
      })
    })
  },

  changeOrderList(e) {
    this.setData({
      active: e.detail.index
    })
    this.getOrderList(e.detail.index)
  },

  topPay(e){
    let _this = this
    // console.log(e.currentTarget.dataset.info)
    let info = e.currentTarget.dataset.info
    axios.post('/wxc/order/wx_pay', {
      order_no: info.order_no
    }).then(res => {
      console.log(res.data)

      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.paySign,
        success: function (res) {
          _this.getOrderList(2)
          // 支付成功后的回调函数
          // wx.redirectTo({
          //   url: '/pages/order/order'
          // })

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