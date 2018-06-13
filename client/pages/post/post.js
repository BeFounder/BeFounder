var config = require('../../config')
var util = require('../../utils/util.js')
var photoNum = 0
var theType = ""
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address : "",
    latitude : "", 
    longitude : "",
    addPhotoCheck : true,
    photoArray : [
        
    ],
    imageWidth : 0,
    imageHeight : 0,
    checked : false,

    chooses : [
      { name: 'Lost', value: "寻物启事" },
      { name: 'Found', value: "失物招领" }
    ],
    tel : "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var wd = parseInt(wx.getSystemInfoSync().windowWidth / 3)

    this.setData({
      imageWidth : wd,
      imageHeight : wd
    })


    var sql = "select Connection from User where OpenID='" + getApp().globalData.OpenID + "'"
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
          tel: res.data[0]["Connection"]
        })
      }
    })

    photoNum = 0
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

  Mapcheck : function(e){

    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
      },

      fail: function (e) {
        that.setData({
          address: ""
        })
      }
    })
  },


  uploadPhoto: function () {
    var that = this
    if (photoNum == 3) return;

    // 选择图片
    wx.chooseImage({
      count: 3-photoNum,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var n = res.tempFilePaths.length
        photoNum += n
        if (photoNum == 3) that.setData({ addPhotoCheck : false })
        console.log(photoNum)
        for (var i = 0; i < n; i++)
        {
          var filePath = res.tempFilePaths[i]

          var pA = that.data.photoArray
          pA.push(filePath)
          that.setData({
            photoArray: pA
          })
        }
      },
      fail: function (e) {
        console.error(e)
      }
    })
  },

  previewImage: function (e) {
    var that = this
    var current = e.target.dataset.nowurl
    wx.previewImage({
      current : current,
      urls: that.data.photoArray
    })
  },

  delImage : function(e) {
    var that = this
    var id = e.target.dataset.nowid

    wx.showModal({
      title: '提示',
      content: '是否删除这张图片？',
      success : function(res){
        if (res.confirm)
        {
          var nA = that.data.photoArray
          nA.splice(id, 1)
          photoNum--
          that.setData({
            photoArray : nA,
            addPhotoCheck: (photoNum < 3)
          })
        }
      }
    })
  },

  submitTopic : function(e) {

    var alldata = e.detail.value
    var that = this

    wx.showModal({
      title: '提示',
      content: '是否确认发布这条帖子？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          var fl = 0;
          for (var i = 0; i < alldata.title.length; i++)
            if (alldata.title[i] != ' ') fl = 1;
          if (alldata.title === "" || alldata.title === null || fl == 0) {
            util.showModel("提示", '标题不能为空')
            return
          }
          if (theType === "") {
            util.showModel("提示", "请选择发帖区域：失物招领或者寻物启事")
            return
          }
          if (that.data.tel == null || that.data.tel == "")
          {
            util.showModel("提示","未填写联系方式，请先前往个人页面填写联系方式")
            return
          }

          var urls = []
          var suc = 0

          var sql1 = "update User set " + theType + "_Post_num=" + theType + "_Post_num+1 where OpenID = '" + getApp().globalData.OpenID + "'";
          getApp().Send(sql1)

          if (0 == photoNum) {
            var sql = "insert into Post_" + theType + " values(NULL,'" + app.globalData.OpenID + "',"
            sql = sql + "Now(),'" + alldata.title + "',"

            for (var i = 0; i < suc; i++)
              sql = sql + "'" + res.data['imgUrl'] + "',"
            for (var i = suc; i < 3; i++)
              sql = sql + "NULL,"

            var adr = "NULL,NULL,NULL,"

            if (that.data.address != "" && that.data.address != null) adr = "'" + that.data.address + "'," + that.data.longitude + "," + that.data.latitude + ","
            sql = sql + "'" + alldata.others + "',0," + adr + "1,1);"

            app.Send(sql)
            
            var pages = getCurrentPages();
            var prePage = pages[pages.length - 2]
            prePage.onPullDownRefresh()

            wx.navigateBack()
            util.showSuccess('发表成功！')
          }

          // 上传图片
          for (var i = 0; i < photoNum; i++)
            wx.uploadFile({
              url: config.service.uploadUrl,
              filePath: that.data.photoArray[i],
              name: 'file',

              success: function (res) {
                res = JSON.parse(res.data)
                urls.push(res.data['imgUrl'])
                suc++

                console.log(suc)
                if (suc == photoNum) {
                  var sql = "insert into Post_" + theType + " values(NULL,'" + app.globalData.OpenID + "',"
                  sql = sql + "Now(),'" + alldata.title + "',"

                  for (var i = 0; i < suc; i++)
                    sql = sql + "'" + urls[i] + "',"
                  for (var i = suc; i < 3; i++)
                    sql = sql + "NULL,"

                  var adr = "NULL,NULL,NULL,"
                  if (that.data.address != "" && that.data.address != null) adr = "'" + that.data.address + "'," + that.data.longitude + "," + that.data.latitude + ","
                  sql = sql + "'" + alldata.others + "',0," + adr + "1,1);"

                  sql = sql.split('&hc').join('\n');
                  console.log(sql)
                  app.Send(sql)

                  var pages = getCurrentPages();
                  var prePage = pages[pages.length - 2]
                  prePage.onPullDownRefresh()

                  wx.navigateBack()
                  util.showSuccess('发表成功！')
                }
              },

              fail: function (e) {
                util.showModel('上传图片失败')
                return;
              }
            })

        } else {
          console.log('用户点击取消')
          return
        }
      }
    })

    
    
  },

  radioChange : function(e) {
    theType = e.detail.value;
  }

})