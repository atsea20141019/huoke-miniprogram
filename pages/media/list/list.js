import axios from '../../../utils/http'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    query: {
      page: 1,
      status: 1
    },
    isnext: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList()
  },

  //获取动态列表
  getDataList() {
    let _this = this
    let dataList = this.data.dataList
    axios.post('/wxc/article/lists', this.data.query).then(res => {
      dataList = dataList.concat(res.data.list)
      this.setData({
        dataList: dataList,
        isnext: res.data.isnext
      })

      if(res.data.isnext){
        let str = 'query.page'
        this.setData({
          [str]: ++_this.data.query.page
        })
      }
    })
  },

  goToPage(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.page + '?id=' + e.currentTarget.dataset.id
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
    if(this.data.isnext){
      this.getDataList()
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})