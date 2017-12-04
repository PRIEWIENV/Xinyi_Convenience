var app = getApp()
Page( {
  data: {
    userInfo: {},
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [ {
      id: 'myorder',
      icon: '../../images/iconfont-dingdan.png',
      text: '我的订单',
      isunread: true,
      unreadNum: 2,
      pages: ['pages/order']
    }, {
        icon: '../../images/iconfont-card.png',
        text: '我的代金券',
        isunread: false,
        unreadNum: 2,
        pages: ['pages/coupon']
      }, {
        icon: '../../images/info.png',
        text: '绑定info账号',
        isunread: true,
        unreadNum: 1,
        pages: ['pages/account']
      }, {
        icon: '../../images/barcode_2d.png',
        text: '我的二维码'
      }, {
        icon: '../../images/iconfont-kefu.png',
        text: '联系客服',
        
     }, {
        icon: '../../images/iconfont-help.png',
        text: '常见问题',
        pages: ['pages/questions']
      }], 

  },

  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  },

  
  
})