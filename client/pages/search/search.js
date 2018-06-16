// pages/PostInside/PostInside.js
var util = require('../../utils/util.js');
var ss = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},

    imageWidth: 0,
    imageHeight: 0,
    comment: "",
    titleArray: [],
    telHidden: true,
    notfind : true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options != "" && options != null) ss = []
    if (ss.length==0) ss = options.find.split(" ");

    console.log(ss)

    var that = this
    var str = "("
    for (var i = 0; i < ss.length; i++)
      str = str + "PostTitle like '%" + ss[i] + "%' and "
    str = str + "true) or ("
    for (var i = 0; i < ss.length; i++)
      str = str + "Description like '%" + ss[i] + "%' and "
    str = str + "true)"

    var arr = []
    var fd = false
    var sql1 = "select * from Post_Lost,User where User.OpenID=Post_Lost.OpenID and StatusCompleted=1 and (" + str + ")"
    var sql2 = "select * from Post_Found,User where User.OpenID=Post_Found.OpenID and StatusCompleted=1 and (" + str + ")"

    console.log(sql1)
    wx.request({
      url: 'https://867150985.myselftext.xyz/weapp/login',
      data: {
        sql: sql1
      },
      header: {
        "content-type": "application/json;charset=utf8"
      },
      success: function (res) {
        for (var i = 0; i < res.data.length; i++)
        {
          res.data[i]["type"] = "失物招领"
          arr.push(res.data[i])
          fd = true
        }

        wx.request({
          url: 'https://867150985.myselftext.xyz/weapp/login',
          data: {
            sql: sql2
          },
          header: {
            "content-type": "application/json;charset=utf8"
          },
          success: function (res) {
            for (var i = 0; i < res.data.length; i++) {
              res.data[i]["type"] = "寻物启事"
              arr.push(res.data[i])
              fd = true
            }

            arr.sort(function(a,b){
              if (a["PostTime"] < b["PostTime"]) return 1;
              if (a["PostTime"] > b["PostTime"]) return -1;
              return 0;
            })

            that.setData({
              titleArray : arr,
              notfind : !fd
            })
          }
        })
      }
    })
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
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2]
    prePage.onPullDownRefresh()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      titleArray : []
    })
    this.onLoad()
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

  

  getTel: function (e) {
    var that = this
    var ii = e.currentTarget.dataset.ii
    console.log(e)

    var sql = "select Connection from User where OpenID='" + ii + "'"

    wx.request({
      url: 'https://867150985.myselftext.xyz/weapp/login',
      data: {
        sql: sql
      },
      header: {
        "content-type": "application/json;charset=utf8"
      },
      success: function (res) {
        that.setData({
          tel: res.data[0]["Connection"]
        })

        that.setData({
          telHidden: false
        })
      }
    })
  },

  visTitle: function (e) {
    console.log(e)
    var that = this
    var i = e.currentTarget.dataset.noid

    getApp().globalData.nowPost = this.data.titleArray[i]
    getApp().globalData.nowType = this.data.titleArray[i]["type"] == "失物招领" ? "Lost" : "Found"

    wx.navigateTo({
      url: '../PostInside/PostInside',
    })
  },

  previewImage: function (e) {
    var that = this
    var current = e.target.dataset.nowurl
    if (current == null) return
    var i = e.target.dataset.nowid

    var urls = [];
    for (var k = 1; k <= 3; k++)
      if (that.data.titleArray[i]["Photo" + k] != null) urls.push(that.data.titleArray[i]["Photo" + k])

    wx.previewImage({
      current: current,
      urls: urls
    })
  },
})