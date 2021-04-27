// pages/card/components/card-one/card-one.js
const app = getApp()
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

  ready(){
    this.setData({
      job_title: app.globalData.dataBase.job_title[this.data.cardInfo.client_card_cfg.job_title]
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    job_title: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
