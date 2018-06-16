Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput:true,
    userInfo : {},
    conne : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    var sql = "Select * from User where OpenID = '" + getApp().globalData.OpenID + "'"


    console.log(sql)
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
          userInfo: res.data[0]
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
  
  //搜索框
  setTel: function () {
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

    console.log(this.data.Connection)

    var sql = "update User set Connection = '" + this.data.conne + "' where OpenID = '" + this.data.userInfo["OpenID"] + "'"

    console.log(sql)

    getApp().Send(sql)
    this.onLoad()
  },  

  toMessage: function (event) {
    wx.navigateTo({
      url: '../message/message',
    })
  },

  ConnectionInput: function (e) {
    this.setData({
      conne : e.detail.value
    })
  },
})