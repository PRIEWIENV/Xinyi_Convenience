var app = getApp()
Page({
    data: {
        
    },
    onLoad: function(options) {

        var that = this
        //调用服务器api
        wx.request({
            url: 'http://www.huanqiuxiaozhen.com/wemall/venues/getBrandAndType?id=' + options.id,
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                that.setData({
                    brandList: res.data.data
                });
            }
        })
    }

})