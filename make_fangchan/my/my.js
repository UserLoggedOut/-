function n(n, t, o) {
    return t in n ? Object.defineProperty(n, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : n[t] = o, n;
}

var t, o = getApp();

Page((t = {
    name: "my",
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    data: {
        nickName: "",
        avatarUrl: "",
        copyright: "",
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    onShareAppMessage: function(n) {
        "button" === n.from && console.log(n.target);
    },
    setup: function() {
        var n = this;
        wx.showLoading({
            title: "数据加载中"
        }), o.util.request({
            url: "entry/wxapp/setup",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(t) {
                wx.hideLoading(), n.setData({
                    copyright: t.data.data.copyright
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    delet: function() {
        wx.showLoading({
            title: "数据加载中"
        }), o.util.request({
            url: "entry/wxapp/delet",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(n) {
                wx.hideLoading();
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    onLoad: function() {
        o.util.getUserInfo(function(n) {
            console.log(n.sessionid);
        }), wx.setNavigationBarColor({
            frontColor: o.globalData.font_color,
            backgroundColor: o.globalData.ba_color
        }), this.setup();
        var n = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(t) {
                        n.setData({
                            nickName: t.userInfo.nickName,
                            avatarUrl: t.userInfo.avatarUrl
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
}, n(t, "onPullDownRefresh", function() {
    wx.stopPullDownRefresh();
}), n(t, "tap_b37c5595", function(n) {
    wx.startPullDownRefresh();
}), n(t, "tap_0004090a", function(n) {
    wx.navigateTo({
        url: "../myroom/myroom"
    });
}), n(t, "tap_16fb809a", function(n) {
    wx.navigateTo({
        url: "../collection/collection"
    });
}), n(t, "tap_bf5c5f95", function(n) {
    this.delet(), wx.clearStorageSync();
}), n(t, "tap_af3cqf95", function(n) {
    wx.openSetting({});
}), t));