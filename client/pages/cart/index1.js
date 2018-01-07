var app = getApp()
Page( {
  data: {
    cartImg: '../../images/cart-null.png',
    tipWords: '购物车空空如也'
  },
  data:{
    goodsList: {
    saveHidden: true,
    totalPrice: 0,
    allSelect: true,
    noSelect: false,
    list: []
  },
  delBtnWidth: 120,    //删除按钮宽度单位（rpx）
},


  //获取元素自适应后的实际宽度
  getEleWidth:function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);  //以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth:function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  onLoad: function () {
    this.initEleWidth();
    this.onShow();
  },
  onShow: function () {
    var shopList = [];
    // 获取购物车数据,后期需要更新
    var shopCarInfoMem = wx.getStorageSync('shopCarInfo');
    if (shopCarInfoMem && shopCarInfoMem.shopList) {
      shopList = shopCarInfoMem.shopList
    }
    this.data.goodsList.list = shopList;
    this.setGoodsList(this.getSaveHide(), this.totalPrice(), shopList);
  },
  //toIndexPage: function () {
    //wx.switchTab({
      //url: "/pages/index/index"
    //});
  //},

  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var index = e.currentTarget.dataset.index;

    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var left = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，container位置不变
        left = "margin-left:0px";
      } else if (disX > 0) {//移动距离大于0，container left值等于手指移动距离
        left = "margin-left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          left = "left:-" + delBtnWidth + "px";
        }
      }
      var list = this.data.goodsList.list;
      if (index != "" && index != null) {
        list[parseInt(index)].left = left;
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), list);
      }
    }
  },

  touchE: function (e) {
    var index = e.currentTarget.dataset.index;
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
      var list = this.data.goodsList.list;
      if (index !== "" && index != null) {
        list[parseInt(index)].left = left;
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), list);

      }
    }
  },
  //删除功能定义
  delItem: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList.list;
    list.splice(index, 1);
    this.setGoodsList(this.getSaveHide(), this.totalPrice(), list);
  },
   //当前订单总价格
  totalPrice: function () {
    var list = this.data.goodsList.list;
    var total = 0;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      if (curItem.active) {
        total += parseFloat(curItem.price) * curItem.number;
      }
    }
    total = parseFloat(total.toFixed(2));//js浮点计算bug，取两位小数精度
    return total;
  },
  //商品数量增加，这个需要后期更新
  jiaBtnTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList.list;
    if (index !== "" && index != null) {
      if (list[parseInt(index)].number < 10) {
        list[parseInt(index)].number++;
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), list);
      }
    }
  },
    //商品数量减少，这个需要后期更新
  jianBtnTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList.list;
    if (index !== "" && index != null) {
      if (list[parseInt(index)].number > 1) {
        list[parseInt(index)].number--;
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), list);
      }
    }
  },
  //不清楚
  editTap: function () {
    var list = this.data.goodsList.list;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      curItem.active = false;
    }
    this.setGoodsList(!this.getSaveHide(), this.totalPrice(), list);
  },
   //不清楚
  saveTap: function () {
    var list = this.data.goodsList.list;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      curItem.active = true;
    }
    this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
  },
   //不清楚
  getSaveHide: function () {
    var saveHidden = this.data.goodsList.saveHidden;
    return saveHidden;
  },
   //不清楚
  deleteSelected: function () {
    var list = this.data.goodsList.list;
     /*
      for(let i = 0 ; i < list.length ; i++){
            let curItem = list[i];
            if(curItem.active){
              list.splice(i,1);
            }
      }
      */
  },
},
)