import axios from '../../../../utils/http'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataList: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    goodsDetail: {},
    coverImgArr: ''
  },

  // observers: {
  //   'dataList.goods_no': function(goods_no){
  //     console.log(goods_no)
  //     console.log(this.data.dataList)
  //   }
  // },

  ready() {
    if (this.data.dataList.goods_no) {
      this.getGoodsDetail()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getGoodsDetail() {
      axios.post('/wxc/goods/detail', {
        goods_no: this.data.dataList.goods_no
      }).then(res => {
        console.log(res)
        this.setData({
          goodsDetail: res.data,
          coverImgArr: res.data.cover_img.split('|')
        })
      })
    },
    getPhoneNumber(e) {
      let _this = this
      wx.login({
        success: res => {
          axios.post('/wxc/wx/mini_phone', {
            code: res.code,
            iv: e.detail.iv,
            data: e.detail.encryptedData
          }).then(res => {
            if (res.code === 200) {
              _this.onSubmit()
            } else {
              wx.showToast({
                title: '请重新参与',
                icon: 'error',
                duration: 2000
              })
            }
          })
        }
      })
    },

    onSubmit() {
      let _this = this
      axios.post('/wxc/article/join', {
        article_id: _this.data.dataList.article_id,
        relation_id: _this.data.dataList.relation_id,
        channel: 2
      }).then(res => {
        if (res.code === 200) {
          if (res.data.status === 0) {
            wx.requestPayment({
              timeStamp: res.data.payment.timeStamp,
              nonceStr: res.data.payment.nonceStr,
              package: res.data.payment.package,
              signType: res.data.payment.signType,
              paySign: res.data.payment.paySign,
              success: function (res) {
                // 支付成功后的回调函数
                _this.triggerEvent('myevent', 1)
              }
            })
          }else{
            this.triggerEvent('myevent', res.data.status)
          }

          
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'error',
            duration: 2000
          })
        }

      })
    }
  }
})