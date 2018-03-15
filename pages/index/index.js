//index.js
//获取应用实例
var sprintf = require('sprintf.js').sprintf
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
    e1_left: "x^3",
    e1_right: "-8",
    e2_left: "",
    e2_right: "",
    e3_left: "",
    e3_right: "",
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
    //console.log('event value is:', event.detail.value)
    var self = this
    wx.request({
      // wfa-api request test url
      url: 'https://lyh-api.gameharbor.com.cn/solve',
      method: "POST",
      dataType: "json",
      data: sprintf('{"e1_left": "%1s", "e1_right": "%2s", "e2_left": "%3s", "e2_right": "%4s", "e3_left": "%5s", "e3_right": "%6s"}', this.data.e1_left, this.data.e1_right, this.data.e2_left, this.data.e2_right, this.data.e3_left, this.data.e3_right),
     //console.log('data is:', data),
      success: function(result) {
        console.log("result data is:", result.data)   
        if (!result.data.real_roots || result.data.real_roots == "null"){
          console.log("real_roots data is:", (!result.data.real_roots || result.data.real_roots == "null"))     
          result.data.real_roots=[]
        }
        if (!result.data.complex_roots || result.data.complex_roots == "null") {
          console.log("complex_roots data is:", result.data.complex_roots)
          result.data.complex_roots = []
        }
        self.setData({
          requestSuccess: !result.data.error,
          requestMsg: "test",
          realRootsCount: result.data.real_roots.length,
          realRoots: result.data.real_roots,
          complexRootsCount: result.data.complex_roots.length,
          complexRoots: result.data.complex_roots, 
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
  bindKeyInput_left: function (e) {
    //console.log(e);
    switch( e.target.id ){
      case "e1_left":
        this.setData({
          e1_left: e.detail.value
        });
        break;
      case "e2_left":
      //console.log("update e2 left")
      this.setData({
        e2_left: e.detail.value
      });
      break;
      case "e3_left":
        this.setData({
          e3_left: e.detail.value
        });
    }

  },
  bindKeyInput_right: function (e) {
    switch (e.target.id) {
      case "e1_right":
        this.setData({
          e1_right: e.detail.value
        });
        break;
      case "e2_right":
        //console.log("update e2 right")
        this.setData({
          e2_right: e.detail.value
        });
        break;
      case "e3_right":
        this.setData({
          e3_right: e.detail.value
        });
    }
  },
})
