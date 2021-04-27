// pages/media/article/article.js
import axios from '../../../utils/http'
import drawQrcode from '../../../utils/weapp.qrcode.min'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let article_id = Number(options.id) || 0
    let relation_id = Number(options.relation_id) || 0
    this.getDataList(article_id, relation_id)
  },

  makeQRcode() {
    let join_sys_id = this.data.dataList.join_sys_id
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: app.globalData.webViewUrl + '/my/sign?sys_id=' + join_sys_id
    })
  },

  getDataList(article_id, relation_id) {

    axios.post('/wxc/article/detail', {
      article_id: article_id,
      relation_id: relation_id
    }).then(res => {
      
      this.setData({
        dataList: res.data
      })
      let str = 'dataList.content'
      this.setData({
        [str]: res.data.content.replace(/style=""/gi, ' ')
      })
      this.setData({
        [str]: res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
      })

      this.makeQRcode()
    })
  },

  changeJoinStatus(e) {
    let str = 'dataList.join_status'
    this.setData({
      [str]: e.detail
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
    let _this = this
    var shareObj = {
      title: this.data.dataList.title,
      path: '/pages/media/article/article?id=' + this.data.dataList.article_id+'&from_id=' + wx.getStorageSync('client_id')+'&relation_id=' + this.data.dataList.relation_id,
      success: res => {
        axios.post('/wxc/article/forward', {
          article_id: _this.data.dataList.article_id,
          relation_id: Number(_this.data.dataList.relation_id) || 0,
          channel: 1
        })
      }
    }
    return shareObj
  }
})