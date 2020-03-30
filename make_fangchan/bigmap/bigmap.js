var a = require("../libs/bmap-wx.min.js"), e = getApp(), t = [];

Page({
    data: {
        markers: [],
        latitude: "",
        longitude: "",
        address: "",
        xiaoqu_name: "",
        placeData: {},
        red: "green",
        li: "",
        ak: ""
    },
    marke: function(a) {
        this.setData({
            address: a.currentTarget.dataset.item
        }), this.biaoji();
    },
    makertap: function(a) {
        var e = this, r = a.markerId;
        e.showSearchInfo(t, r), e.changeMarkerColor(t, r);
    },
    setup: function() {
        var a = this;
        e.util.request({
            url: "entry/wxapp/setup",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(e) {
                a.setData({
                    ak: e.data.data.ak
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    biaoji: function() {
        var e = this;
        new a.BMapWX({
            ak: e.data.ak
        }).search({
            query: e.data.address,
            location: e.data.latitude + "," + e.data.longitude,
            fail: function(a) {},
            success: function(a) {
                (t = a.wxMarkerData).push({
                    latitude: e.data.latitude,
                    longitude: e.data.longitude,
                    iconPath: "/resources/marker_yellow.png",
                    label: {
                        content: e.data.xiaoqu_name,
                        color: "#ffffff",
                        fontSize: 12,
                        textAlign: "center",
                        bgColor: "#3EBBF3",
                        padding: 8,
                        borderRadius: 5,
                        x: -25,
                        y: -70
                    }
                }), e.setData({
                    markers: t
                });
            },
            iconPath: "/resources/marker_red.png",
            iconTapPath: "/resources/marker_red.png"
        });
    },
    onLoad: function(a) {
        console.log("color=" + e.globalData.font_color), wx.setNavigationBarColor({
            frontColor: e.globalData.font_color,
            backgroundColor: e.globalData.ba_color
        }), this.setup();
        var t = a.address, r = a.latitude, o = a.longitude, n = a.xiaoqu_name;
        this.setData({
            address: t,
            latitude: r,
            longitude: o,
            xiaoqu_name: n
        }), this.biaoji();
    },
    showSearchInfo: function(a, e) {
        this.setData({
            placeData: {
                title: "名称：" + a[e].title + "\n",
                address: "地址：" + a[e].address + "\n",
                telephone: "电话：" + a[e].telephone
            }
        });
    },
    changeMarkerColor: function(a, e) {
        for (var t = this, r = [], o = 0; o < a.length; o++) a[o].iconPath = o == e ? "/resources/marker_yellow.png" : "/resources/marker_red.png", 
        r[o](a[o]);
        t.setData({
            markers: r
        });
    }
});