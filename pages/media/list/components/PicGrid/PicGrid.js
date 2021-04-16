// pages/media/list/components/PicGrid/PicGrid.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cover_img: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgsArr: []
  },

  ready() {
    let tmpArr = this.data.cover_img.split('|')
    this.setData({
      imgsArr: tmpArr
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImg(e) {
      let imgsArr = this.data.imgsArr
      wx.previewImage({
        current: e.currentTarget.dataset.src,
        urls: imgsArr,
      })
    },
  }
})