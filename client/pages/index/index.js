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
    tel : "",
    isPopping: true,//是否已经弹出  
    animPlus: {},//旋转动画  
    animCollect: {},//item位移,透明度  
    animTranspond: {},//item位移,透明度  
    animInput: {},//item位移,透明度
    sea:"",
    myOpenID :"",
  },

  plus: function () {
    if (this.data.isPopping) {
      //缩回动画  
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画  
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },
  input: function () {
    console.log("input")
  },
  transpond: function () {
    console.log("transpond")
  },
  collect: function () {
    console.log("collect")
  },

  //弹出动画  
  popp: function () {
    //plus顺时针旋转  
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(180).step();
    animationcollect.translate(10, -60).rotateZ(180).opacity(1).step();
    animationTranspond.translate(-50, -50).rotateZ(180).opacity(1).step();
    animationInput.translate(-60, 10).rotateZ(180).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },
  //收回动画  
  takeback: function () {
    //plus逆时针旋转  
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
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
      hiddenmodalput: true,
    })

    console.log(this.data.sea)
    wx.navigateTo({
      url: '../search/search?find=' + this.data.sea,
    })
    this.setData({
      sea: ""
    })
  }  ,

  search : function(e){
    this.setData({
      sea : e.detail.value
    })
  },

  //取消按钮  
  cancel: function () {
    this.setData({
      telHidden: true,
      hiddenmodalput: true
    });
  },

  getTel : function(e){
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
          tel : res.data[0]["Connection"]
        })

        that.setData({
          telHidden: false
        })
      }
    })
  },


  CallTitle : function() {
    var arr = this.data.titleArray;

    var nowType = "Post_" + (this.data.currentTab == 0 ? "Lost" : "Found")
    var mxID = 23333333;
    if (arr.length > 0) mxID = arr[arr.length - 1][nowType + "_identity"]

    var sql = "select * from " + nowType + ",User where " + nowType + "_identity<" + mxID + " and User.OpenID=" + nowType + ".OpenID and StatusCompleted=1" + " ORDER BY PostTime DESC LIMIT 5;"

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
        {
          arr.push(res.data[i])
        }

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
    
    this.setData({
      myOpenID : app.globalData.OpenID
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

  visTitle : function(e) {
    console.log(e)
    var that = this
    var i = e.currentTarget.dataset.noid

    getApp().globalData.nowPost = this.data.titleArray[i],
    getApp().globalData.nowType = this.data.currentTab == 0 ? "Lost" : "Found"

    wx.navigateTo({
      url: '../PostInside/PostInside',
    })
  },

  onReachBottom : function() {
    this.CallTitle();
  },

  onPullDownRefresh : function() {
    this.setData({
      titleArray : []
    })

    this.CallTitle();
    wx.stopPullDownRefresh();
  },

  CompleteTitle : function(e) {

    var that = this
    wx.showModal({
      title: '提示',
      content: '该帖子将被标记为完结，是否确认？',
      success: function (res) {
        if (res.confirm) {
          console.log(e)
          var i = e.currentTarget.dataset.nid

          var nowType = "Post_" + (that.data.currentTab == 0 ? "Lost" : "Found")
          var sql = "update " + nowType + " set StatusCompleted=0 where " + nowType + "_identity=" + that.data.titleArray[i][nowType + "_identity"]

          app.Send(sql)

          util.showSuccess("成功")

          that.setData({
            titleArray : []
          })
          that.CallTitle()
        }
      }
    })

    
  },

  DelTitle: function (e) {

    var that = this
    wx.showModal({
      title: '提示',
      content: '该帖子将被删除，是否确认？',
      success: function (res) {
        if (res.confirm) {
          console.log(e)
          var i = e.currentTarget.dataset.nid

          var nowType = that.data.currentTab == 0 ? "Lost" : "Found"
          var sql1 = "delete from " + nowType + "Comments where Post_" + nowType + "_identity=" + that.data.titleArray[i]["Post_" + nowType + "_identity"]

          wx.request({
            url: 'https://867150985.myselftext.xyz/weapp/login',
            data: {
              sql: sql1
            },
            header: {
              "content-type": "application/json;charset=utf8"
            },
            success: function (res) {
              var sql = "delete from Post_" + nowType + " where Post_" + nowType + "_identity=" + that.data.titleArray[i]["Post_" + nowType + "_identity"]

              console.log(sql)
              getApp().Send(sql)
              util.showSuccess("成功")

              that.onPullDownRefresh()

            }
          })

        }
      }
    })


  },
  getMap: function (e) {
    var i = e.currentTarget.dataset.noid
    var that = this

    wx.openLocation({
      latitude: parseFloat(that.data.titleArray[i]["Latitude"]),
      longitude: parseFloat(that.data.titleArray[i]["Longitude"]),
    })
  }

  

})