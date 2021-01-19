import axios from '../../utils/http'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    duration: "500",
    imgUrls: [],
    current: 0,
    show: false,
    //幻灯参数
    goodsDetail: {},
    cartNum: 0
  },
  swiperChange: function (e) {
    var that = this;
    if (e.detail.source == 'touch') {
      that.setData({
        current: e.detail.current
      })
    }
  },
  showPopup: function () {
    this.setData({
      show: true
    });
  },

  onClose: function () {
    this.setData({
      show: false
    });
  },
  onClick_gwc: function () {
    wx.navigateTo({
      url: '../shoppingcart/shoppingcart',
    })
  },
  addCart(e) {
    let _this = this
    console.log(e)
    //读取本地缓存
    wx.getStorage({
      key: 'cart_list',
      success(res) {
        console.log('成功了')
        let goodsItem = {
          goods_no: e.currentTarget.dataset.goods_no,
          goods_name: e.currentTarget.dataset.goods_name,
          imgUrls: e.currentTarget.dataset.imgurls,
          price: e.currentTarget.dataset.price * 100,
          quantum: 1
        }

        let cartList = res.data
        let cartNum = 1
        res.data.map((item, index) => {
          if (e.currentTarget.dataset.goods_no === item.goods_no) {
            goodsItem.quantum = item.quantum + 1
            cartList.splice(index, 1)
          }
          cartNum += item.quantum
        })


        cartList.push(goodsItem)
        _this.setData({
          cartNum: cartNum
        })
        wx.setStorage({
          key: 'cart_list',
          data: cartList
        })

      },
      fail(res) {
        console.log('失败了')
        //第一次保存
        wx.setStorage({
          key: 'cart_list',
          data: [{
            goods_no: e.currentTarget.dataset.goods_no,
            goods_name: e.currentTarget.dataset.goods_name,
            imgUrls: e.currentTarget.dataset.imgurls,
            price: e.currentTarget.dataset.price * 100,
            quantum: 1
          }],
          success() {
            _this.setData({
              cartNum: 1
            })
          }
        })
      }
    })

    wx.showToast({
      title: '已添加到购物车',
      icon: 'success',
      duration: 2000
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    this.getGoodsDetail(options.goods_no)

    //设置购物车数量
    wx.getStorage({
      key: 'cart_list',
      success(res) {
        let cartNum = 0
        res.data.map(item => {
          cartNum += item.quantum
        })
        _this.setData({
          cartNum: cartNum
        })
      }
    })

    // this.showPopup();
  },
  getGoodsDetail(goods_no) {
    axios.post('/wxc/goods/detail', {
      goods_no: goods_no
    }).then(res => {
      //自定义标题
      wx.setNavigationBarTitle({
        title: res.data.name
      });
      this.setData({
        imgUrls: res.data.cover_img.split('|')
      })
      this.setData({
        goodsDetail: res.data
      })
      let str = 'goodsDetail.content'
      this.setData({
        [str]: res.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
      })
    })
  },

  butGoods(e) {
    wx.getStorage({
      key: 'token',
      success: (res) => {
        console.log('已经登录了')
        wx.navigateTo({
          url: '../shoppingbuy/shoppingbuy?goods_no=' + e.currentTarget.dataset.goods_no + '&quantum=1'
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
                  wx.setStorageSync('wechat_avatar', res.data.wechat_avatar)
                  wx.setStorageSync('wechat_nickname', res.data.wechat_nickname)
                  app.globalData.token = res.data.token
                  app.globalData.client_id = res.data.client_id
                  wx.navigateTo({
                    url: '../shoppingbuy/shoppingbuy?goods_no=' + e.currentTarget.dataset.goods_no + '&quantum=1'
                  })
                }
              })
            }
          }
        })
      }
    })


    // if (!wx.getStorageSync('token')) {
    //   login(e)
    // }
    // wx.navigateTo({
    //   url: '../shoppingbuy/shoppingbuy?goods_no=' + e.currentTarget.dataset.goods_no + '&quantum=1'
    // })
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