// pages/card/components/pics-list/pics-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coverImg: {
      type: Array,
      value: []
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
    viewImg(e) {
      let _this = this
      wx.previewImage({
        current: e.currentTarget.dataset.imgsrc,
        urls: _this.data.coverImg
      })
    }
  }
})