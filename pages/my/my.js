import axios from '../../utils/http'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    notlogin: true,
    wechat_avatar: '',
    card_status: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let _this = this
    wx.getStorage({
      key: 'token',
      success(res) {
        _this.setData({
          notlogin: false
        })
      }
    })

    wx.getStorage({
      key: 'card_status',
      success(res) {
        _this.setData({
          card_status: res.data
        })
      }
    })

    // if (wx.getStorageSync('token')) {
    //   this.setData({
    //     notlogin: false,
    //     wechat_avatar: wx.getStorageSync('wechat_avatar'),
    //     wechat_nickname: wx.getStorageSync('wechat_nickname')
    //   })
    // }

  },

  getUserProfile(e) {
    let _this = this
    wx.getUserProfile({
      desc: '业务需要',
      success: res1 => {
        wx.login({
          success: codeRes => {
            if (codeRes.code) {
              axios.post('/wxc/wx/mini_login', {
                code: codeRes.code,
                iv: res1.iv,
                data: res1.encryptedData
              }).then(res => {
                if (res.code === 200) {
                  wx.setStorageSync('token', res.data.token)
                  wx.setStorageSync('client_id', res.data.client_id)
                  wx.setStorageSync('wechat_avatar', res.data.wechat_avatar)
                  wx.setStorageSync('wechat_nickname', res.data.wechat_nickname)
                  wx.setStorageSync('card_status', res.data.card_status)
                  app.globalData.token = res.data.token
                  app.globalData.client_id = res.data.client_id

                  _this.setData({
                    notlogin: false
                  })

                  _this.setData({
                    card_status: res.data.card_status
                  })

                }
              })
            }
          }
        })
      }
    })



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