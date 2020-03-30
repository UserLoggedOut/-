var a = getApp();

Page({
    name: "rent",
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
        rents: [],
        area: [],
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
        }), "" != t && this.rent();
    },
    onShareAppMessage: function(a) {
        "button" === a.from && console.log(a.target);
    },
    str: function(a) {
        this.setData({
            str: a
        });
    },
    rent: function() {
        var t = this;
        wx.showLoading({
            title: "数据加载中"
        }), a.util.request({
            url: "entry/wxapp/rent",
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
                if (wx.hideLoading(), null != a.data.data) if (t.data.page > 1) {
                    var e = (e = t.data.rents).concat(a.data.data);
                    wx.setStorageSync("str", e), t.setData({
                        strType: 3,
                        rents: e
                    });
                } else wx.setStorageSync("str", a.data.data), t.setData({
                    strType: 3,
                    rents: a.data.data
                }); else 1 == t.data.up ? wx.showToast({
                    title: "最底部了哟！",
                    icon: "success",
                    duration: 2e3
                }) : t.setData({
                    rents: []
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
                rental: 0
            },
            cachetime: 30,
            success: function(a) {
                if (wx.hideLoading(), "" != a.data.data) if (e.data.mappage > 1) {
                    var t = (t = e.data.rents).concat(a.data.data);
                    wx.setStorageSync("str", t), e.setData({
                        strType: 1,
                        rents: t
                    });
                } else wx.setStorageSync("str", a.data.data), e.setData({
                    strType: 1,
                    quyu: a.data.data[0].district,
                    rents: a.data.data
                }); else 1 == e.data.up ? wx.showToast({
                    title: "最底部了哟！",
                    icon: "success",
                    duration: 2e3
                }) : e.setData({
                    rents: []
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
            }), this.rent();
        }
    },
    onLoad: function(t) {
        wx.setNavigationBarColor({
            frontColor: a.globalData.font_color,
            backgroundColor: a.globalData.ba_color
        }), this.area();
    },
    onReady: function() {},
    onShow: function() {
        var a = this, t = a.data.str;
        if (0 == t && a.setData({
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
            }), a.rent()) : (wx.removeStorageSync("markerId"), a.setData({
                strType: 1
            }));
        } else 1 == t ? a.setData({
            rents: wx.getStorageSync("str"),
            strType: 1
        }) : a.setData({
            rents: wx.getStorageSync("str"),
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
    tap_a42eae22: function(a) {
        var t = this, e = a.currentTarget.dataset.rent_id;
        wx.navigateTo({
            url: "../rentdetails/rentdetails?id=" + e + "&str=" + t.data.strType
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
        }), this.rent();
    },
    aa2: function(a) {
        var t = a.currentTarget.dataset.jiage;
        this.setData({
            page: 1,
            value: 0,
            money: t
        }), void 0 !== t && (1 == t ? this.setData({
            jiage: "300以下"
        }) : 2 == t ? this.setData({
            jiage: "300-500"
        }) : 3 == t ? this.setData({
            jiage: "500-800"
        }) : 4 == t ? this.setData({
            jiage: "800-1300"
        }) : 5 == t ? this.setData({
            jiage: "1300-1500"
        }) : 6 == t ? this.setData({
            jiage: "1500-1800"
        }) : 7 == t ? this.setData({
            jiage: "1800-2000"
        }) : 8 == t ? this.setData({
            jiage: "2000-2500"
        }) : 9 == t ? this.setData({
            jiage: "2500以上"
        }) : 0 == t && this.setData({
            jiage: "不限"
        })), this.rent();
    },
    aa3: function(a) {
        var t = a.currentTarget.dataset.huxing;
        this.setData({
            page: 1,
            value: 0,
            huxing: t
        }), void 0 !== t && this.setData({
            huxing: t.substring(0, 4)
        }), this.rent();
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
        }), this.rent();
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
        }), this.rent();
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
        }), this.rent();
    }
});