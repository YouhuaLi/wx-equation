//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    numberOfEquation: 1,
    requestSuccess: false,
    rootPlot: '',
    altForms: '',
    realSolution: '',
    complexSolution: '',
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
      // wfa-api request url
      // url: 'https://api.wfa_api.com/caltest?qtype=equation&qparams=...
      success: function(result) {
        console.log('request success', result)
        var mockRequest = {
          rootPlot: 'http://www4f.wolframalpha.com/Calculate/MSP/MSP43071f3cgg70cif650860000468ggch55cgh55i4?MSPStoreType=image/gif&s=39',
          altForms: '-2 (246 x^3 + 5) = 0',
          realSolution: 'x = -(5/246)^(1/3)',
          complexSolution: 'x = -(-1)^(2/3) (5/246)^(1/3)'
        }
        self.setData({
          requestSuccess: true,
          rootPlot: mockRequest.rootPlot,
          altForms: mockRequest.altForms,
          realSolution: mockRequest.realSolution,
          complexSolution: mockRequest.complexSolution
        })
      }
    })
  },
  addEquation: function (event) {
    this.setData({
      numberOfEquation: this.data.numberOfEquation + 1
    })
  },
  resetEquationNumber: function (event) {
    this.setData({
      numberOfEquation:  1
    })
  },
})
