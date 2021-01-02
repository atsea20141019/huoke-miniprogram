// pages/card/components/share-btn/share-btn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardInfo: {
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
    
    addPhoneContact() {
      console.log(this.data)
      let _this = this
      wx.addPhoneContact({
        firstName: _this.data.cardInfo.realname,
        photoFilePath: _this.data.cardInfo.client_card_cfg.avatar,
        mobilePhoneNumber: _this.data.cardInfo.mobile,
        title: '销售顾问',
        organization: _this.data.cardInfo.company_card_cfg.name,
        weChatNumber: _this.data.cardInfo.client_card_cfg.wechat
    
      })
    }
  }
})