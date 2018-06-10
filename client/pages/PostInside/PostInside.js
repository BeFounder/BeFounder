// pages/PostInside/PostInside.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item : {},

    imageWidth: 0,
    imageHeight: 0,
    comment : "",
    commentsArray : [],
    telHidden : true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var wd = parseInt(wx.getSystemInfoSync().windowWidth / 3) - 2

    this.setData({
      imageWidth: wd,
      imageHeight: wd
    })
    
    this.setData({
      item : getApp().globalData.nowPost
    })

    var nT = getApp().globalData.nowType
    var sql = "select * from " + nT + "Comments,User where Post_" + nT + "_identity =" + this.data.item["Post_" + nT + "_identity"] + " and User.OpenID=" + nT + "Comments.OpenID"

    var that = this

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
          commentsArray : res.data
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
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
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

  CommentInput : function(e){
    this.setData({
      comment : e.detail.value
    })
  },

  CommentAdd : function(){
    console.log(this.data.comment)

    var app = getApp();

    var fl = 0;
    for (var i = 0; i < this.data.comment.length; i++)
      if (this.data.comment[i] != ' ') fl = 1;
    if (this.data.comment === "" || this.data.comment === null || fl == 0) {
      util.showModel("提示", '内容不能为空')
      return
    }

    var nowType = app.globalData.nowType;
    var sql = "insert into " + nowType + "Comments values(NULL," + this.data.item["Post_Lost_identity"] + ",'" + app.globalData.OpenID + "','" + this.data.comment + "',Now())"

    app.Send(sql)

    var sql1 = "update User set " + nowType + "Comments_num=" + nowType + "Comments_num+1 where OpenID='" + app.globalData.OpenID + "'"

    app.Send(sql1)

    this.onLoad();

    this.setData({
      comment : ""
    })
  },

  previewImage: function (e) {

    var that = this
    var current = e.target.dataset.nowurl
    if (current == null) return
    var i = e.target.dataset.nowid

    var urls = [];
    for (var k = 1; k <= 3; k++)
      if (that.data.item["Photo" + k] != null) urls.push(that.data.item["Photo" + k])

    wx.previewImage({
      current: current,
      urls: urls
    })
  },

  cancel : function(){
    this.setData({
      telHidden : true
    })
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
})