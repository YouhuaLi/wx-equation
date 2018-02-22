//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    equationResult: {},
    userInfo: {},
    hasUserInfo: false,
    numberOfEquation: 1,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  solveEquation: function(event) {
    console.log('event value is:', event.detail.value)
    var self = this
    wx.request({
      url: 'https://api.seniverse.com/v3/weather/now.json?key=j7hypthtk9wgvhtp&location=' + "shanghai" + '&language=zh-Hans&unit=c',
      success: function(result) {
        console.log('request success', result)
        self.setData({
          equationResult: ["100", "3+9i"]
          }
        )
      }
    }
    )
  },
  addEquation: function (event) {
    this.setData({
      numberOfEquation: this.data.numberOfEquation + 1
      }
    )
  },
  resetEquationNumber: function (event) {
    this.setData({
      numberOfEquation:  1
    }
    )
  },
})
