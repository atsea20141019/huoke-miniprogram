var util = require('../../../../utils/util')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    created_at: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    createdTime: ''
  },

  // ready() {
  //   let createdTime = this.data.created_at.split(' ')[0]
  //   console.log(this.data.title)
  //   this.setData({
  //     createdTime: createdTime
  //   })
  // },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
