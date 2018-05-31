var app = getApp()
Page({
  data: {
    navbar: ['失物招领', '寻物启事'],
    currentTab: 0,
    hiddenmodalput: true,//搜索框初始为不可见
    telHidden: true,//联系方式框初始为不可见
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
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

})