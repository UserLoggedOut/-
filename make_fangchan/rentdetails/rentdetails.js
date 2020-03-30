var a = getApp();

Page({
    name: "rentdetails",
    data: {
        markers: [],
        rent_id: "",
        item: [],
        agent: [],
        thumbs: [],
        ftel: "",
        longitude: "",
        latitude: "",
        xiaoqu_name: "",
        str: 0,
        pay: "",
        panorama: ""
    },
    onShareAppMessage: function(a) {
        "button" === a.from && console.log(a.target);
        var t = this.data.rent_id, e = this.data.str;
        return {
            title: this.data.item.fang_name,
            path: "/make_fangchan/rentdetails/rentdetails?id=" + t + "&str=" + e
        };
    },
    home_img: function() {
        wx.switchTab({
            url: "../index/index"
        });
    },
    panorama: function(a) {
        var t = a.target.dataset.panorama;
        wx.navigateTo({
            url: "../panorama/panorama?panorama=" + t
        });
    },
    rentdetails: function() {
        var t = this;
        wx.showLoading({
            title: "数据加载中"
        }), a.util.request({
            url: "entry/wxapp/rentdetails",
            data: {
                m: "make_fangchan",
                rent_id: t.data.rent_id
            },
            cachetime: 30,
            success: function(a) {
                wx.hideLoading(), t.setData({
                    item: a.data.data,
                    agent: a.data.message,
                    xiaoqu_name: a.data.data.xiaoqu_name,
                    longitude: a.data.data.longitude,
                    latitude: a.data.data.latitude,
                    markers: [ {
                        latitude: a.data.data.latitude,
                        longitude: a.data.data.longitude,
                        name: "",
                        desc: ""
                    } ]
                }), console.log(a);
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    setup: function() {
        var t = this;
        wx.showLoading({
            title: "数据加载中"
        }), a.util.request({
            url: "entry/wxapp/setup",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(a) {
                wx.hideLoading(), t.setData({
                    pay: a.data.data.pay
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    onLoad: function(t) {
        var e = t.id, n = t.str;
        this.setData({
            rent_id: e,
            str: n
        }), a.util.getUserInfo(function(a) {}), a.globalData.font_color ? wx.setNavigationBarColor({
            frontColor: a.globalData.font_color,
            backgroundColor: a.globalData.ba_color
        }) : a.util.request({
            url: "entry/wxapp/setup",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(t) {
                wx.hideLoading(), wx.setNavigationBarColor({
                    frontColor: t.data.data.font_color,
                    backgroundColor: t.data.data.ba_color
                }), a.globalData.font_color = t.data.data.font_color, a.globalData.ba_color = t.data.data.ba_color, 
                a.globalData.setup = t.data.data;
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
        var o = wx.getStorageSync("posts_collected");
        if (o) {
            var i = o[e];
            this.setData({
                collected: i
            });
        } else (o = {})[e] = !1, wx.setStorageSync("posts_collected", o);
        this.rentdetails(), this.setup();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        var a = this, t = getCurrentPages();
        t[t.length - 2].str(a.data.str);
    },
    onPullDownRefresh: function() {},
    tap_7736e14a: function(a) {
        var t = a.currentTarget.dataset.agent_id;
        wx.navigateTo({
            url: "../roomlist/roomlist?id=" + t
        });
    },
    tap_as36e16a: function(t) {
        var e = this, n = wx.getStorageSync("posts_collected"), o = n[e.data.rent_id];
        o = !o;
        var i = n[e.data.rent_id] = o;
        1 == i && (wx.showLoading({
            title: "数据加载中"
        }), a.util.request({
            url: "entry/wxapp/mysc_zu",
            data: {
                m: "make_fangchan",
                fangyuan_id: e.data.rent_id
            },
            cachetime: 30,
            success: function(a) {
                wx.hideLoading();
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        })), 0 == i && (wx.showLoading({
            title: "数据加载中"
        }), a.util.request({
            url: "entry/wxapp/mysc_nozu",
            data: {
                m: "make_fangchan",
                fangyuan_id: e.data.rent_id
            },
            cachetime: 30,
            success: function(a) {
                wx.hideLoading();
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        })), wx.setStorageSync("posts_collected", n), e.setData({
            collected: o
        });
    },
    call: function(a) {
        var t = a.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    pay: function(t) {
        var e = t.currentTarget.dataset.ftel;
        this.setData({
            ftel: e
        });
        var n = this;
        0 == n.data.pay ? wx.makePhoneCall({
            phoneNumber: n.data.ftel
        }) : a.util.request({
            url: "entry/wxapp/pay",
            data: {
                m: "make_fangchan"
            },
            cachetime: "0",
            success: function(a) {
                a.data && a.data.data && !a.data.errno && wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: "MD5",
                    paySign: a.data.data.paySign,
                    success: function(a) {
                        wx.makePhoneCall({
                            phoneNumber: n.data.ftel
                        });
                    },
                    fail: function(a) {}
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "系统提示",
                    content: a.data.message ? a.data.message : "错误",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                });
            }
        });
    },
    marke: function(a) {
        var t = this;
        wx.navigateTo({
            url: "../bigmap/bigmap?address=" + a.currentTarget.dataset.item + "&latitude=" + t.data.latitude + "&longitude=" + t.data.longitude + "&xiaoqu_name=" + t.data.xiaoqu_name
        });
    },
    chakanimg: function(a) {
        var t = a.currentTarget.dataset.imgurl;
        wx.previewImage({
            current: t,
            urls: [ t ]
        });
    },
    navigation: function(a) {
        var t = this;
        wx.openLocation({
            latitude: parseFloat(t.data.latitude),
            longitude: parseFloat(t.data.longitude),
            name: "",
            address: ""
        });
    }
});