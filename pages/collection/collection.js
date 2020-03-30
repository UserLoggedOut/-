var t = getApp();

Page({
    name: "collection",
    data: {
        rents: [],
        active: !0
    },
    onShareAppMessage: function(t) {
        "button" === t.from && console.log(t.target);
    },
    mysc: function() {
        var a = this;
        wx.showLoading({
            title: "数据加载中"
        }), t.util.request({
            url: "entry/wxapp/mysc",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(t) {
                wx.hideLoading(), a.setData({
                    rents: t.data.data
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    onLoad: function() {
        t.util.getUserInfo(function(t) {
            console.log(t.sessionid);
        }), wx.setNavigationBarColor({
            frontColor: t.globalData.font_color,
            backgroundColor: t.globalData.ba_color
        }), this.mysc();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    tap_a42eae22: function(t) {
        var a = t.currentTarget.dataset.rent_id;
        wx.navigateTo({
            url: "../rentdetails/rentdetails?id=" + a
        });
    },
    tap_caac7aaf: function(t) {
        var a = t.currentTarget.dataset.buy_id;
        console.log(a), wx.navigateTo({
            url: "../buydetails/buydetails?id=" + a
        });
    },
    active: function(t) {
        0 == t.currentTarget.dataset.id ? this.setData({
            active: !0
        }) : this.setData({
            active: !1
        });
    }
});