var a = getApp();

Page({
    name: "myroom",
    data: {
        rents: [],
        active: !0,
        fang_id: ""
    },
    onShareAppMessage: function(a) {
        "button" === a.from && console.log(a.target);
    },
    myfy: function() {
        var t = this;
        wx.showLoading({
            title: "数据加载中"
        }), a.util.request({
            url: "entry/wxapp/myfy",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(a) {
                wx.hideLoading(), console.log(a), t.setData({
                    rents: a.data.data
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    onLoad: function() {
        a.util.getUserInfo(function(a) {
            console.log(a.sessionid);
        }), wx.setNavigationBarColor({
            frontColor: a.globalData.font_color,
            backgroundColor: a.globalData.ba_color
        });
    },
    onReady: function() {},
    onShow: function() {
        this.myfy();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    active: function(a) {
        0 == a.currentTarget.dataset.id ? this.setData({
            active: !0
        }) : this.setData({
            active: !1
        });
    },
    revoke: function(t) {
        var n = t.currentTarget.dataset.fang_id;
        this.setData({
            fang_id: n
        });
        var e = this;
        a.util.request({
            url: "entry/wxapp/myfy",
            data: {
                m: "make_fangchan",
                id: e.data.fang_id
            },
            cachetime: 30,
            success: function(a) {
                e.setData({
                    rents: a.data.data.lists
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    revokes: function(t) {
        var n = t.currentTarget.dataset.fang_id;
        this.setData({
            fang_id: n
        });
        var e = this;
        a.util.request({
            url: "entry/wxapp/myfy",
            data: {
                m: "make_fangchan",
                id: e.data.fang_id
            },
            cachetime: 30,
            success: function(a) {
                e.setData({
                    rents: a.data.data.lists
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    del: function(t) {
        var n = this, e = t.currentTarget.dataset.fang_id;
        n.setData({
            fang_id: e
        }), a.util.request({
            url: "entry/wxapp/myfy_del",
            data: {
                m: "make_fangchan",
                id: n.data.fang_id
            },
            cachetime: 30,
            success: function(a) {},
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    dels: function(t) {
        var n = this, e = t.currentTarget.dataset.fang_id;
        n.setData({
            fang_id: e
        }), a.util.request({
            url: "entry/wxapp/myfy_del",
            data: {
                m: "make_fangchan",
                id: n.data.fang_id
            },
            cachetime: 30,
            success: function(a) {},
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    }
});