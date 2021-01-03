// pages/card/components/card-one/card-one.js
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
    toGoodsDetail(e){
      wx.redirectTo({
        url: '/pages/goodsdetail/goodsdetail?goods_no='+e.currentTarget.dataset.goods_no
      })
    }
  }
})