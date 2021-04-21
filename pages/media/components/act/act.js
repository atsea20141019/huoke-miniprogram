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

  },

  /**
   * 组件的方法列表
   */
  methods: {
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
          this.triggerEvent('myevent', res.data.status)
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