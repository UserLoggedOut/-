function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = getApp();

Page({
    data: (t = {
        latitude: 23.11084,
        longitude: 109.57339,
        scale: 12,
        markers: [],
        area: "",
        maps: "",
        rental: ""
    }, a(t, "area", ""), a(t, "status", 0), a(t, "click", 0), t),
    first: function() {
        var a = this;
        console.log(123456);
        var t = a.data.area;
        "" == t ? e.util.request({
            url: "entry/wxapp/loadmap",
            data: {
                m: "make_fangchan",
                rental: a.data.rental
            },
            cachetime: 30,
            success: function(t) {
                var e = t.data.data;
                a.setData({
                    area: e
                }), a.area(e);
            },
            fail: function(a) {}
        }) : (console.log(12), a.area(t));
    },
    onLoad: function(a) {
        wx.setNavigationBarColor({
            frontColor: e.globalData.font_color,
            backgroundColor: e.globalData.ba_color
        });
        var t = this;
        t.setData({
            rental: a.rental ? a.rental : 1,
            latitude: a.latitude,
            longitude: a.longitude
        }), console.log("rental11l=" + t.data.rental);
    },
    onShow: function() {
        this.first();
    },
    callouttap: function(a) {
        var t = this;
        t.setData({
            click: 1
        }), console.log(555);
        var l = t.data.status;
        console.log("label=" + l);
        var o = a.markerId;
        console.log(o), 0 == l && e.util.request({
            url: "entry/wxapp/maps",
            data: {
                m: "make_fangchan",
                id: o,
                rental: t.data.rental
            },
            cachetime: 30,
            success: function(a) {
                console.log(a.data.data);
                var e = a.data.data;
                console.log("home1=" + e), t.marker(e, "");
            },
            fail: function(a) {}
        }), 1 == l && (1 == t.data.rental ? (wx.setStorageSync("markerId", o), wx.switchTab({
            url: "../buy/buy"
        })) : (wx.setStorageSync("markerId", o), console.log("sss=" + o), wx.switchTab({
            url: "../rent/rent?rental=0"
        })));
    },
    area: function(a) {
        for (var t = this, e = [], l = 0; l < a.length; l++) e.push({
            id: a[l].id,
            iconPath: "/resources/marker_red.png",
            width: 1,
            height: 1,
            latitude: parseFloat(a[l].latitude),
            longitude: parseFloat(a[l].longitude),
            callout: {
                content: a[l].area.substring(0, 3) + "\n" + a[l].area.substring(3) + " " + a[l].num,
                color: "#ffffff",
                fontSize: 10,
                textAlign: "center",
                bgColor: "#3EBBF3a8",
                padding: 15,
                borderRadius: 1e3,
                display: "ALWAYS"
            }
        });
        t.setData({
            status: 0,
            markers: e,
            latitude: t.data.latitude,
            longitude: t.data.longitude
        });
    },
    marker: function(a, t) {
        console.log("home=" + a);
        var e = this, l = [];
        if (1 == a[0].rental) var o = " 元 /㎡", r = "/resources/marker_blue.png"; else var o = " 元 /月", r = "/resources/marker_red.png";
        for (var n = 0; n < a.length; n++) l.push({
            id: a[n].id,
            iconPath: r,
            width: 10,
            height: 10,
            latitude: parseFloat(a[n].latitude),
            longitude: parseFloat(a[n].longitude),
            callout: {
                content: a[n].xiaoqu_name + " | " + a[n].num + "套\n均价 " + a[n].price + o,
                color: "#ffffff",
                fontSize: 12,
                textAlign: "center",
                bgColor: "#3EBBF3",
                padding: 8,
                borderRadius: 5,
                display: "ALWAYS"
            }
        });
        if (console.log(parseFloat(a[0].latitude)), "" !== t) {
            console.log(a.length);
            for (var s = 0; s < a.length; s++) if (a[s].id == t) var i = a[s];
            console.log(133333), e.setData({
                status: 1,
                latitude: i.latitude,
                longitude: i.longitude,
                markers: l,
                scale: 15
            });
        } else e.setData({
            latitude: a[0].latitude,
            longitude: a[0].longitude,
            markers: l,
            scale: 15,
            status: 1
        });
    },
    allmarkers: function() {
        var a = this;
        "" == a.data.maps ? e.util.request({
            url: "entry/wxapp/allmarkers",
            data: {
                m: "make_fangchan",
                rental: a.data.rental
            },
            cachetime: 30,
            success: function(t) {
                a.setData({
                    maps: t.data.data
                }), a.marker(t.data.data, "");
            },
            fail: function(a) {}
        }) : a.marker(a.data.maps, "");
    },
    regionchange: function(a) {
        var t = this;
        t.mapCtx = wx.createMapContext("myMap"), console.log(t.mapCtx), 1 !== t.data.click && t.mapCtx.getScale({
            success: function(a) {
                var e = parseInt(a.scale), l = t.data.status;
                console.log("aaa" + a.scale), console.log("niha" + t.data.status), e < 12 && 0 !== l && (console.log(1e5), 
                t.first()), 15 >= e && e >= 14 && 1 !== l && (console.log(1111), console.log(t.data.status), 
                t.allmarkers());
            }
        }), t.setData({
            click: 0
        });
    },
    maptap: function() {
        var a = this;
        a.mapCtx = wx.createMapContext("myMap"), a.mapCtx.getScale({
            success: function(t) {
                var e = parseInt(t.scale), l = a.data.status;
                15 >= e && e >= 14 && 1 !== l && a.allmarkers();
            }
        });
    }
});