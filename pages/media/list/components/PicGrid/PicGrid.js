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

  observers: {
    'cover_img': function (val) {
      if (val) {
        this.setImgsArr(val)
      }

    }
  },

  ready() {
    this.setImgsArr(this.data.cover_img)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setImgsArr(val) {
      this.setData({
        imgsArr: val.split('|')
      })
    },

    previewImg(e) {
      let imgsArr = this.data.imgsArr
      wx.previewImage({
        current: e.currentTarget.dataset.src,
        urls: imgsArr,
      })
    },
  }
})