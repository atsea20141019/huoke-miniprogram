// pages/shoppingbuy/shoppingbuy.js
import axios from '../../utils/http'
import areaList from '../../utils/area'
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
    address_one: null,

    addressList: [],

    show: false,
    show2: false,
    realname: '',
    mobile: '',
    region: '',
    address: '',
    is_default: 1,

    show3: false,
    areaList: areaList,
    type: 'create'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      num: options.quantum
    })
    this.getAddress()
    this.getGoodsDetail(options.goods_no)
  },
  handleGetMessage(e) {
    console.log(e)
  },
  //获取默认地址
  getAddress() {
    let _this = this
    axios.post('/wxc/address/lists', {
      count: 1
    }).then(res => {
      // _this.setData({
      //   [address.realname]: res.data.list[0].realname,
      //   [address.mobile]: res.data.list[0].mobile,
      //   [address.region]: res.data.list[0].region,
      //   [address.address]: res.data.list[0].address
      // })

      // console.log(res.data.list[0])

      _this.setData({
        address_one: res.data.list[0]
      })

    })
  },
  showPopup() {
    let _this = this
    axios.post('/wxc/address/lists', {
      count: 1000
    }).then(res => {
      console.log(res.data)
      _this.setData({
        addressList: res.data.list
      })
    })
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  selectAddress2() {
    let url = app.globalData.webViewUrl + '/my/address?token=' + wx.getStorageSync('token')
    // let url = 'http://192.168.0.5:8080/#/my/address?token='+wx.getStorageSync('token') + '&page=shoppingbuy&num=' + this.data.num 
    wx.navigateTo({
      url: '../webview/webview?url=' + encodeURIComponent(url)
    })
  },
  selectAddress(e) {
    console.log(e.currentTarget.dataset.add)
    this.setData({
      address: e.currentTarget.dataset.add
    })
    this.setData({
      show: false
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
    console.log(e)
    this.setData({
      num: e.detail
    })
  },

  onSubmit() {
    let relation_id = wx.getStorageSync('relation_id')
    axios.post('/wxc/order/create', {
      goods_no: this.data.goodsDetail.goods_no,
      quantum: this.data.num,
      address_id: this.data.address_one.address_id
    }).then(res => {
      console.log(res)
      if (res.code !== 200) {
        wx.showModal({
          content: res.msg,
          showCancel: false
        })
        return false
      }

      if(res.data.amount === 0){
        wx.redirectTo({
          url: '/pages/order/order'
        })
        return false
      }

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

  add(e) {
    console.log(e.currentTarget.dataset.info)
    this.setData({
      type: e.currentTarget.dataset.type,
      show2: true
    })
  },

  del(e) {
    let _this = this
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          axios.post('/wxc/address/remove', {
            address_id: e.currentTarget.dataset.info
          }).then(res => {
            _this.showPopup()
            _this.getAddress()
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  showArea() {
    this.setData({
      show3: true
    })
  },

  onClose3() {
    this.setData({
      show3: false
    })
  },

  submitArea(e) {
    let addrInfo = e.detail.values[0].name + e.detail.values[1].name + e.detail.values[2].name
    this.setData({
      region: addrInfo
    })
    this.setData({
      show3: false
    })
  },

  addAddress(e) {
    let _this = this
    // let type = e.currentTarget.dataset.type
    axios.post('/wxc/address/' + this.data.type, {
      mobile: this.data.mobile,
      realname: this.data.realname,
      region: this.data.region,
      address: this.data.address,
      is_default: this.data.is_default,
    }).then(res => {
      _this.setData({
        show2: false,
        show: false
      })
      _this.getAddress()
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