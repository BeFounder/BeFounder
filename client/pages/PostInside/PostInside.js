// pages/PostInside/PostInside.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item : {},

    imageWidth: 0,
    imageHeight: 0,
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
  
  }
})