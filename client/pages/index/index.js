var app = getApp()
Page({
  data: {
    navbar: ['失物招领', '寻物启事', '我的信息'],
    currentTab: 0
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
})