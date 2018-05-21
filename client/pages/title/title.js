// pages/title/title.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
})