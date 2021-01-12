// pages/shoppingcart/shoppingcart.js
import axios from '../../utils/http'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    goods_no: '',
    quantum: 1,
    price: 0,
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.getStorage({
      key: 'cart_list',
      success(res) {
        _this.setData({
          dataList: res.data,
          goods_no: res.data[0].goods_no,
          quantum: res.data[0].quantum,
          price: res.data[0].price,
          totalPrice: res.data[0].quantum * res.data[0].price
        })
      }
    })

  },

  onChangeNum(e) {
    let _this = this
    this.setData({
      quantum: e.detail,
      totalPrice: e.detail * e.currentTarget.dataset.price
    })

  },

  radioChange(e) {
    let _this = this
    this.setData({
      goods_no: e.detail.value
    })
    this.data.dataList.map((item, index) => {
      if (item.goods_no === e.detail.value) {
        _this.setData({
          quantum: item.quantum,
          price: item.price,
          totalPrice: item.price * item.quantum,
        })
      }
    })

  },

  deleteItem() {
    let _this = this
    wx.showModal({
      content: '确定从购物车中删除该商品？',
      success(res) {
        if (res.confirm) {
          wx.getStorage({
            key: 'cart_list',
            success(res) {
              let cartList = res.data
              res.data.map((item, index) => {
                if (_this.data.goods_no === item.goods_no) {
                  cartList.splice(index, 1)
                }
              })

              _this.setData({
                dataList: cartList
              })


              wx.setStorage({
                key: 'cart_list',
                data: cartList
              })



            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  onSubmit(e) {
    let _this = this

    wx.getStorage({
      key: 'token',
      success: (res) => {
        console.log('已经登录了')
        wx.redirectTo({
          url: '../shoppingbuy/shoppingbuy?goods_no=' + _this.data.goods_no + '&quantum=' + _this.data.quantum
        })
      },
      fail: () => {
        console.log('还没有登录')
        wx.login({
          success: codeRes => {
            console.log(codeRes)
            if (codeRes.code) {
              axios.post('/wxc/wx/mini_login', {
                code: codeRes.code,
                iv: e.detail.iv,
                data: e.detail.encryptedData
              }).then(res => {
                if (res.code === 200) {
                  wx.setStorageSync('token', res.data.token)
                  wx.setStorageSync('client_id', res.data.client_id)
                  app.globalData.token = res.data.token
                  app.globalData.client_id = res.data.client_id
                  wx.redirectTo({
                    url: '../shoppingbuy/shoppingbuy?goods_no=' + _this.data.goods_no + '&quantum=' + _this.data.quantum
                  })
                }
              })
            }
          }
        })
      }
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