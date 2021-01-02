class Axios {
  post(url, data, formType) {
    return this.request("POST", url, data, formType)
  }
  get(url, data, formType) {
    return this.request("GET", url, data, formType)
  }
  put(url, data, formType) {
    return this.request("PUT", url, data, formType)
  }
  update(url, data, formType) {
    return this.request("UPDATE", url, data, formType)
  }
  detete(url, data, formType) {
    return this.request("DELETE", url, data, formType)
  }
  request(method, url, data, formType) {
    return new Promise((resolve, reject) => {
      var comtentType = formType ? 'application/x-www-form-urlencoded' : 'application/json'
      wx.request({
        url: "https://api.hk.zhongheinfo.com" + url,
        method: method,
        data: data,
        header: {
          "content-type": comtentType,
          "client-token": wx.getStorageSync('client-token')
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
}
module.exports = new Axios()