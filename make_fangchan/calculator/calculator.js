var a = getApp();

Page({
    name: "calculator",
    data: {
        shoufu: 0,
        year: 4,
        rate: 3.2,
        money: 0,
        yuegonger: 0,
        zonglixi: 0,
        daikuan: 0,
        zonger: "",
        type: 1,
        cheng: 5,
        chengs: [ "1成", "2成", "3成", "4成", "5成", "6成", "7成", "8成", "9成" ],
        years: [ "1年", "2年", "3年", "4年", "5年", "6年", "7年", "8年", "9年", "10年", "11年", "12年", "13年", "14年", "15年", "16年", "17年", "18年", "19年", "20年", "21年", "22年", "23年", "24年", "25年", "26年", "27年", "28年", "29年", "30年" ]
    },
    rate: function(a) {
        var t = a.detail.value;
        t > 0 && t <= 100 ? this.setData({
            rate: t
        }) : wx.showToast({
            title: "0-100的数",
            icon: "loading",
            duration: 2e3
        });
    },
    type: function(a) {
        var t = a.currentTarget.dataset.type;
        this.setData({
            type: t
        }), this.jisuan();
    },
    chengs: function(a) {
        console.log(a);
        var t = a.detail.value;
        this.setData({
            cheng: t
        });
        var e = this.data.chengs[t], n = e.substr(0, e.length - 1), o = this.data.money, o = Math.round(100 * o) / 100, s = parseInt(o) * parseInt(n) / 10, r = o - (s = Math.round(100 * s) / 100), r = Math.round(100 * r) / 100;
        this.setData({
            cheng: t,
            daikuan: r,
            shoufu: s
        });
    },
    selectYear: function(a) {
        console.log(a), this.setData({
            year: a.detail.value
        });
    },
    onShareAppMessage: function(a) {
        "button" === a.from && console.log(a.target);
    },
    jisuan: function() {
        var a = this.data.rate / 100, t = this.data.years[this.data.year], e = t.substr(0, t.length - 1), n = a / 12, o = this.data.cheng, s = this.data.chengs[o], r = s.substr(0, s.length - 1), i = this.data.money, u = parseInt(i) * parseInt(r) / 10, h = i - (u = Math.round(100 * u) / 100), h = Math.round(100 * h) / 100;
        if (1 == this.data.type) {
            var d = h * n * Math.pow(1 + n, 12 * e) * 1e4 / (Math.pow(1 + n, 12 * e) - 1), l = 12 * e * (d = Math.round(100 * d) / 100) - 1e4 * h, l = Math.round(100 * l / 1e4) / 100, g = Math.round(100 * (h + l)) / 100;
            this.setData({
                daikuan: h,
                shoufu: u,
                zonger: g,
                yuegonger: d,
                zonglixi: l
            });
        } else {
            var c = 1e4 * h / (12 * e) + (1e4 * h - 0) * n, c = Math.round(100 * c) / 100, f = 1e4 * h / (12 * e) * n, f = Math.round(100 * f) / 100, l = (1e4 * h / (12 * e) + 1e4 * h * n + 1e4 * h / (12 * e) * (1 + n)) / 2 * (12 * e) - 1e4 * h, l = Math.round(100 * l / 1e4) / 100, g = Math.round(100 * (h + l)) / 100;
            console.log(l), this.setData({
                daikuan: h,
                shoufu: u,
                shouyuegonger: c,
                meiyuedijian: f,
                zonglixi: l,
                zonger: g
            });
        }
    },
    onLoad: function(t) {
        var e = t.money;
        this.setData({
            money: e
        }), wx.setNavigationBarColor({
            frontColor: a.globalData.font_color,
            backgroundColor: a.globalData.ba_color
        }), this.jisuan();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {}
});