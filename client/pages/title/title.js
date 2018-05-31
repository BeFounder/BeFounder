// pages/title/title.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var util = require('../../utils/util.js')
var config = require('../../config')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    loading : false,
    buttonText : "进入BeFounder"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //跳转到index页面
  toIndex: function (event) {
    wx.redirectTo({
      url: '../index/index',
    })
  },

  /*Gotopage : function(event) {
    var url = event.currentTarget.dataset.url

    wx.navigateTo({
      url: `../${url}/${url}`,
    })
  },

  GetLoc : function() {
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res, "location")
        console.log(res.name)
        console.log(res.latitude)
        console.log(res.longitude)
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
        console.log("complete")
      }
    })
>>>>>>> 543f5f4d4cb1f67a1c3e3cd33e6f702988a55c0c
  }*/

  SaveUser : function() {
    var userInfo = this.data.userInfo
    var sql = "call insertNewUser("
    sql = sql + "'" + app.globalData.OpenID + "'" + ",'" + userInfo.avatarUrl + "','" + userInfo.nickName + "');"

    app.Send(sql)
  },

  bindGetUserInfo: function (e) {
    this.setData({
      loading : true
    })
    if (this.data.logged) return;

    util.showBusy('正在登录');

    var that = this;
    var userInfo = e.detail.userInfo;

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {

          // 检查登录是否过期
          wx.checkSession({
            success: function () {
              // 登录态未过期
              util.showSuccess('登录成功');
              that.setData({
                userInfo: userInfo,
                logged: true
              })


              setTimeout( function(){
                wx.redirectTo({
                  url: '../index/index',
                })
              }, 10)
            },

            fail: function () {
              qcloud.clearSession();
              // 登录态已过期，需重新登录
              var options = {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                userInfo: userInfo
              }
              that.doLogin(options);
            },
          })
        } else {
          util.showModel('用户未授权', e.detail.errMsg);
        }

      }
    });

    wx.login({
      success: function (e) {
        if (e.code) {
          wx.request({
            url: `${config.service.host}/weapp/getopenid`,
            data: {
              code: e.code
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              
              app.globalData.OpenID = res.data.openid

              that.SaveUser()
            },
            fail: function (error) {
              console.log(error);
            }
          })
        }
      }
    });

  },

  doLogin: function (options) {
    var that = this;

    wx.login({
      success: function (loginResult) {
        var loginParams = {
          code: loginResult.code,
          encryptedData: options.encryptedData,
          iv: options.iv,
        }
        qcloud.requestLogin({
          loginParams, success() {
            util.showSuccess('登录成功');

            that.setData({
              userInfo: options.userInfo,
              logged: true
            })

          },
          fail(error) {
            util.showModel('登录失败', error)
            console.log('登录失败', error)
          }
        });
      },
      fail: function (loginError) {
        util.showModel('登录失败', loginError)
        console.log('登录失败', loginError)
      },
    });
  }


})