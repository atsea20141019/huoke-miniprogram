import axios from '../../utils/http'
import {
  login
} from '../../utils/login'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    notlogin: true,
    wechat_avatar: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if (wx.getStorageSync('token')) {
      this.setData({
        notlogin: false,
        wechat_avatar: wx.getStorageSync('wechat_avatar'),
        wechat_nickname: wx.getStorageSync('wechat_nickname')
      })
    }

  },

  bindGetUserInfo(e) {
    let _this = this
    login(e)
    this.setData({
      notlogin: true
    })

    // app.globalData.userInfo = e.detail.userInfo
    // wx.login({
    //   success: codeRes => {
    //     console.log(codeRes)
    //     axios.post('/wxc/wx/mini_login', {
    //       code: codeRes.code,
    //       iv: e.detail.iv,
    //       data: e.detail.encryptedData
    //     }).then(res => {
    //       wx.setStorageSync('token', res.data.token)
    //       wx.setStorageSync('client_id', res.data.client_id)
    //       app.globalData.token = res.data.token
    //       app.globalData.client_id = res.data.client_id
    //       _this.setData({
    //         token: res.data.token
    //       })
    //       console.log(app.globalData)
    //     })
    //   }
    // })
  },

  toUrl(url) {
    wx.navigateTo({
      url: '/pages/webview/webview?url=' + encodeURIComponent(url) 
    })
  },

  toWebView(e) {
    if (wx.getStorageSync('token')) {
      let token = wx.getStorageSync('token')
      this.toUrl(app.globalData.webViewUrl + e.currentTarget.dataset.url + '?token=' + token)
    }
  },

  back() {
    if (getCurrentPages().length == 1) {
      // 打开分享卡片无法回退
      wx.redirectTo({
        url: '../card/card'
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
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