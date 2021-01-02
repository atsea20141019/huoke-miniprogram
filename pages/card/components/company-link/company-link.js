// pages/index/components/company-link/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageLogo: {
      type: String,
      value: ''
    },
    companyName: {
      type: String,
      value: ''
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
    toSite() {
      console.log('123')
      wx.switchTab({
        url: '/pages/site/site'
      })
    }
  }
})