var t = getApp();

Page({
    name: "zugou",
    data: {
        jtbjt: "http://qty83k.creatby.com/materials/113959/origin/e5755b44e5893b703b1e824d4f1e504e_origin_PteSZAD.jpg",
        bjt: ""
    },
    setup: function() {
        var o = this;
        wx.showLoading({
            title: "数据加载中"
        }), t.util.request({
            url: "entry/wxapp/setup",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(t) {
                wx.hideLoading(), o.setData({
                    bjt: t.data.data.icon
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    onShareAppMessage: function(t) {
        "button" === t.from && console.log(t.target);
    },
    onLoad: function() {
        wx.setNavigationBarColor({
            frontColor: t.globalData.font_color,
            backgroundColor: t.globalData.ba_color
        }), this.setup();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    tap_a7fc3294: function(t) {
        wx.navigateTo({
            url: "../seekbuy/seekbuy"
        });
    },
    tap_84a1f83d: function(t) {
        wx.navigateTo({
            url: "../renting/renting"
        });
    }
});