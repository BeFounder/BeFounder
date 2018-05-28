//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },

    globalData : {
      OpenID : ""
    },

    Send : function(sql) {
      wx.request({
        url: 'https://867150985.myselftext.xyz/weapp/login',
        data: {
          sql: sql
        },
        header: {
          "content-type": "application/json;charset=utf8"
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    }

})