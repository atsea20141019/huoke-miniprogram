//app.js
import axios from './utils/http'
import {siteConfig} from './utils/config'

App({
  onLaunch: function () {
    if (wx.getStorageSync('token')) {
      // console.log(wx.getStorageSync('token'))
    }

    //设置基础数据
    axios.post('/wxc/index/bd_cfg').then(res => {
      this.globalData.dataBase = res.data
    })
  },



  globalData: {
    userInfo: null,
    site: siteConfig()[wx.getAccountInfoSync().miniProgram.appId].site,
    token: null,
    client_id: null,
    webViewUrl: siteConfig()[wx.getAccountInfoSync().miniProgram.appId].webViewUrl,
    dataBase: {},
    address: {},
    card_status: 2
  }
})