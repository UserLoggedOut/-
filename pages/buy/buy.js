var a = getApp();

Page({
    name: "buy",
    data: {
        value: 0,
        red: "#f35150",
        mianjicolor: 1,
        leixingcolor: 1,
        quyu: "",
        money: "",
        huxing: "",
        pingfa: "",
        leixing: "",
        buys: [],
        area: [],
        markerId: "",
        str: 0,
        page: 1,
        mappage: 1,
        search_value: "",
        leibiecolor: 1,
        leibie: ""
    },
    search_submit: function(a) {
        var t = a.detail.value.search_value;
        this.setData({
            search_value: t,
            up: 0
        }), "" != t && this.buy();
    },
    str: function(a) {
        this.setData({
            str: a
        });
    },
    onShareAppMessage: function(a) {
        "button" === a.from && console.log(a.target);
    },
    buy: function() {
        var t = this;
        wx.showLoading({
            title: "数据加载中"
        }), a.util.request({
            url: "entry/wxapp/buy",
            data: {
                m: "make_fangchan",
                quyu: t.data.quyu,
                money: t.data.money,
                huxing: t.data.huxing,
                pingfa: t.data.pingfa,
                leixing: t.data.leixingcolor,
                leibie: t.data.leibie,
                page: t.data.page,
                search_value: t.data.search_value
            },
            cachetime: 30,
            success: function(a) {
                if (wx.hideLoading(), null !== a.data.data) if (t.data.page > 1) {
                    var e = (e = t.data.buys).concat(a.data.data);
                    wx.setStorageSync("str", e), t.setData({
                        strType: 3,
                        buys: e
                    });
                } else wx.setStorageSync("str", a.data.data), t.setData({
                    strType: 3,
                    buys: a.data.data
                }); else 1 == t.data.up ? wx.showToast({
                    title: "最底部了哟！",
                    icon: "success",
                    duration: 2e3
                }) : t.setData({
                    buys: []
                });
                t.setData({
                    search_value: ""
                });
            },
            fail: function() {
                t.setData({
                    search_value: ""
                }), failGo("请检查连接地址");
            }
        });
    },
    maps: function(t) {
        var e = this;
        wx.showLoading({
            title: "数据加载中"
        }), a.util.request({
            url: "entry/wxapp/maphomes",
            data: {
                m: "make_fangchan",
                markerId: t,
                page: e.data.mappage,
                rental: 1
            },
            cachetime: 30,
            success: function(a) {
                if (wx.hideLoading(), "" != a.data.data) if (e.data.mappage > 1) {
                    var t = (t = e.data.buys).concat(a.data.data);
                    wx.setStorageSync("str", t), e.setData({
                        strType: 1,
                        buys: t
                    });
                } else wx.setStorageSync("str", a.data.data), e.setData({
                    strType: 1,
                    quyu: a.data.data[0].district,
                    buys: a.data.data
                }); else 1 == e.data.up ? wx.showToast({
                    title: "最底部了哟！",
                    icon: "success",
                    duration: 2e3
                }) : e.setData({
                    buys: []
                });
            },
            fail: function() {
                failGo("请检查连接地址"), wx.removeStorageSync("markerId");
            }
        });
    },
    area: function() {
        var t = this;
        wx.showLoading({
            title: "数据加载中"
        }), a.util.request({
            url: "entry/wxapp/area",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(a) {
                wx.hideLoading(), t.setData({
                    area: a.data.data
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    onReachBottom: function() {
        if (this.setData({
            up: 1
        }), 0 != this.data.map) {
            var a = (a = this.data.mappage) + 1;
            this.setData({
                mappage: a
            }), this.maps(this.data.map);
        } else {
            var t = (t = this.data.page) + 1;
            this.setData({
                page: t
            }), this.buy();
        }
    },
    onLoad: function() {
        wx.setNavigationBarColor({
            frontColor: a.globalData.font_color,
            backgroundColor: a.globalData.ba_color
        }), this.area();
    },
    onReady: function() {},
    onShow: function() {
        var a = this, t = a.data.str;
        if (console.log("str=" + t), 0 == t && a.setData({
            value: 0,
            quyu: "区域",
            huxing: "户型",
            jiage: "价格",
            leixingcolor: 1,
            mianjicolor: 1,
            money: "",
            pingfa: "",
            leixing: "",
            page: 1,
            mappage: 1
        }), 0 == t) {
            var e = wx.getStorageSync("markerId");
            "" !== e && (a.setData({
                map: e
            }), a.maps(e)), "" == wx.getStorageSync("markerId") ? (a.setData({
                map: 0
            }), a.buy()) : (wx.removeStorageSync("markerId"), a.setData({
                strType: 1
            }));
        } else 1 == t ? a.setData({
            buys: wx.getStorageSync("str"),
            strType: 1
        }) : a.setData({
            buys: wx.getStorageSync("str"),
            strType: 3
        });
    },
    onHide: function() {
        this.setData({
            str: 0
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    tap_caac7aaf: function(a) {
        var t = this, e = a.currentTarget.dataset.buy_id;
        wx.navigateTo({
            url: "../buydetails/buydetails?id=" + e + "&str=" + t.data.strType
        });
    },
    bigBox: function() {
        this.setData({
            value: 0
        });
    },
    quyu: function(a) {
        this.setData({
            up: 0
        }), 1 == this.data.value ? this.setData({
            value: 0
        }) : this.setData({
            value: 1
        });
    },
    jiage: function(a) {
        this.setData({
            up: 0
        }), 2 == this.data.value ? this.setData({
            value: 0
        }) : this.setData({
            value: 2
        });
    },
    huxing: function(a) {
        this.setData({
            up: 0
        }), 3 == this.data.value ? this.setData({
            value: 0
        }) : this.setData({
            value: 3
        });
    },
    gengduo: function(a) {
        this.setData({
            up: 0
        }), 4 == this.data.value ? this.setData({
            value: 0
        }) : this.setData({
            value: 4
        });
    },
    aa1: function(a) {
        var t = a.currentTarget.dataset.xuanqu;
        this.setData({
            page: 1,
            value: 0,
            quyu: t
        }), void 0 !== t && this.setData({
            quyu: t
        }), this.buy();
    },
    aa2: function(a) {
        var t = a.currentTarget.dataset.jiage;
        this.setData({
            page: 1,
            value: 0,
            money: t
        }), void 0 !== t && (1 == t ? this.setData({
            jiage: "50以下"
        }) : 2 == t ? this.setData({
            jiage: "50-80"
        }) : 3 == t ? this.setData({
            jiage: "80-100"
        }) : 4 == t ? this.setData({
            jiage: "100-200"
        }) : 5 == t ? this.setData({
            jiage: "200-300"
        }) : 6 == t ? this.setData({
            jiage: "300-400"
        }) : 7 == t ? this.setData({
            jiage: "400-500"
        }) : 8 == t ? this.setData({
            jiage: "500-600"
        }) : 9 == t ? this.setData({
            jiage: "600以上"
        }) : 0 == t && this.setData({
            jiage: "不限"
        })), this.buy();
    },
    aa3: function(a) {
        var t = a.currentTarget.dataset.huxing;
        this.setData({
            page: 1,
            value: 0,
            huxing: t
        }), void 0 !== t && this.setData({
            huxing: t.substring(0, 4)
        }), this.buy();
    },
    aa4: function(a) {
        var t = a.currentTarget.dataset.mianji, e = a.currentTarget.dataset.mianjicolor;
        this.setData({
            page: 1,
            value: 0,
            pingfa: e
        }), void 0 !== t && this.setData({
            mianji: t,
            mianjicolor: e
        }), this.buy();
    },
    aa5: function(a) {
        var t = a.currentTarget.dataset.guige, e = a.currentTarget.dataset.leixingcolor;
        this.setData({
            page: 1,
            value: 0,
            leixing: e
        }), void 0 !== t && this.setData({
            leixing: t,
            leixingcolor: e
        }), this.buy();
    },
    aa6: function(a) {
        var t = a.currentTarget.dataset.guige, e = a.currentTarget.dataset.leibiecolor;
        this.setData({
            page: 1,
            value: 0,
            leibie: e
        }), void 0 !== t && this.setData({
            leibie: t,
            leibiecolor: e
        }), this.buy();
    }
});