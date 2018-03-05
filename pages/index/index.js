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
      // wfa-api request test url
      url: 'https://lyh-api.gameharbor.com.cn/caltest',
      method: "GET",
      //dataType: "json",
      //data: '{"qtype": "equation", "qparams": "x^3-1=0"}',
      success: function(result) {
        console.log('request success', result)
        var mockRequest = {
          //rootPlot: 'http://www4f.wolframalpha.com/Calculate/MSP/MSP43071f3cgg70cif650860000468ggch55cgh55i4?MSPStoreType=image/gif&s=39',
          error: false,
          msg: "api调用出错",
        }
        self.setData({
          requestSuccess: true,
          requestMsg: mockRequest.msg,
          realRootsCount: Math.round(Math.random() * 4),
          realRoots: ["1", "sqrt(2)", "-3.334512323"],
          complexRootsCount: Math.round(Math.random() * 4),
          complexRoots: ["3+i", "100-i", "3.5+3i"], 
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
      numberOfEquation:  1,
      requestSuccess: false
    })
  },
})
