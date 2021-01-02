// pages/mine-xinxi/mine_xinxi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "name":"天使雪儿",
    "phone":"18301934716"
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
  get_phone:function(){
    //获取手机号参考地址：https://www.jianshu.com/p/3d6c3c80813f
    var that = this;
    wx.login({
      success(res) {
        console.log(res);
        var code = res.code
        wx.request({
          url: 'http://localhost/index/users/code2seesion',
          method: "post",
          data: {
            code
          },
          success: function (res) {
            console.log(res.data.openid);
            that.setData(res.data);
          }
        })
      }
    })
  },
  getPhoneNumber: function (e) {
    var that = this;
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.request({
        url: 'http://localhost/index/users/decodePhone',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sessionKey: that.data.session_key,
          uid: "",
        },
        method: "post",
        success: function (res) {
          console.log(res);
        }
      })
    }
  }
})