var util = require('../../utils/util.js');  

var app = getApp()
Page({
  data: {
    navbar: ['失物招领', '寻物启事'],
    currentTab: 0,
    hiddenmodalput: true,//搜索框初始为不可见
    telHidden: true,//联系方式框初始为不可见
    titleArray : [

    ], 
    imageWidth: 0,
    imageHeight: 0,
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      titleArray : []
    })

    this.CallTitle();
  },

  Gotopage: function (event) {
    var url = event.currentTarget.dataset.url

    wx.navigateTo({
      url: `../${url}/${url}`,
    })
  },

  toPost:function(event)
  {
    wx.navigateTo({
      url: '../post/post',
    })
  },

  toUser: function (event) {
    wx.navigateTo({
      url: '../user/user',
    })
  },

  //搜索框
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  }  ,

  //联系方式
  getTel: function () {
    this.setData({
      telHidden: !this.data.telHidden
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      telHidden: true
    });
  },


  CallTitle : function() {
    var arr = this.data.titleArray;

    var nowType = "Post_" + (this.data.currentTab == 0 ? "Lost" : "Found")
    var mxID = 23333333;
    if (arr.length > 0) mxID = arr[arr.length - 1][nowType + "_identity"]

    var sql = "select * from " + nowType + ",User where " + nowType + "_identity<" + mxID + " and User.OpenID=" + nowType + ".OpenID" + " ORDER BY PostTime DESC LIMIT 5;"

    console.log(sql)

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
        for (var i = 0; i < res.data.length; i++)
          arr.push(res.data[i])

        console.log(arr)

        that.setData({
          titleArray: arr
        })
      }
    })

  },

  onLoad: function () {
    var wd = parseInt(wx.getSystemInfoSync().windowWidth / 3) - 2

    this.setData({
      imageWidth: wd,
      imageHeight: wd
    })
    this.CallTitle()
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