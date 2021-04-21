import axios from './http'
const app = getApp()
export function login(e) {
  let _this = this
  app.globalData.userInfo = e.detail.userInfo
  wx.login({
    success: codeRes => {
      axios.post('/wxc/wx/mini_login', {
        code: codeRes.code,
        iv: e.detail.iv,
        data: e.detail.encryptedData
      }).then(res => {
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('client_id', res.data.client_id)
        app.globalData.token = res.data.token
        app.globalData.client_id = res.data.client_id
      })
    },
    fail: res => {
      return false
    }
  })
}