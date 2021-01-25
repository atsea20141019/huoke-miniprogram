//app.js
import axios from './utils/http'
App({
  onLaunch: function () {
    if(wx.getStorageSync('token')){
      // console.log(wx.getStorageSync('token'))
    }

    //设置基础数据
    axios.post('/wxc/index/bd_cfg').then(res => {
      this.globalData.dataBase = res.data
    })
  },
  globalData: {
    userInfo: null,
    token: null,
    client_id: null,
    webViewUrl: 'https://wechat.hk.zhongheinfo.com/#',
    dataBase: {},
    address: {},
    card_status: 2
  }
})