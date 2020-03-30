var a = getApp();

Page({
    name: "seekbuy",
    data: {
        value: 0,
        gou: [],
        area: []
    },
    onShareAppMessage: function(a) {
        "button" === a.from && console.log(a.target);
    },
    gou: function() {
        var t = this;
        wx.showLoading({
            title: "数据提交中"
        }), a.util.request({
            url: "entry/wxapp/gou",
            data: {
                m: "make_fangchan",
                district: t.data.gou.district,
                zhuangxui: t.data.gou.zhuangxui,
                leibie: t.data.gou.leibie,
                huxing: t.data.gou.huxing,
                floor: t.data.gou.floor,
                tel: t.data.gou.tel,
                describe: t.data.gou.describe
            },
            cachetime: 30,
            success: function(a) {
                wx.hideLoading(), "success" == a.data.data.asd && (wx.showToast({
                    title: "提交成功",
                    icon: "loading",
                    duration: 1500
                }), t.duanxin(), wx.switchTab({
                    url: "../index/index"
                }));
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    duanxin: function() {
        a.util.request({
            url: "entry/wxapp/duanxin",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(a) {
                console.log(a);
            },
            fail: function(a) {}
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
    onLoad: function() {
        wx.setNavigationBarColor({
            frontColor: a.globalData.font_color,
            backgroundColor: a.globalData.ba_color
        }), this.area();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    quyu: function(a) {
        this.setData({
            value: a.currentTarget.dataset.selects
        });
    },
    bigBox: function() {
        this.setData({
            value: 0
        });
    },
    xuanqu: function(a) {
        this.setData({
            value: 0,
            xuanqu: a.currentTarget.dataset.xuanqu
        });
    },
    yongtu: function(a) {
        this.setData({
            value: 0,
            yongtu: a.currentTarget.dataset.yongtu
        });
    },
    zhuangxiu: function(a) {
        this.setData({
            value: 0,
            zhuangxiu: a.currentTarget.dataset.zhuangxiu
        });
    },
    huxing: function(a) {
        this.setData({
            value: 0,
            huxing: a.currentTarget.dataset.huxing
        });
    },
    formSubmit: function(a) {
        var t = "", e = !0;
        if ("" == a.detail.value.district) t = "请选择区域"; else if ("" == a.detail.value.zhuangxui) t = "请选择装修类型"; else if ("" == a.detail.value.leibie) t = "请选择用途"; else if ("" == a.detail.value.huxing) t = "请选择户型"; else if ("" == a.detail.value.floor) t = "请输入楼层"; else if ("" == a.detail.value.tel) t = "请填写您的手机号！"; else if (/^1(3|4|5|7|8)\d{9}$/.test(a.detail.value.tel)) if ("" == a.detail.value.describe) t = "请输入其它描述"; else {
            e = !1;
            var i = a.detail.value;
            this.setData({
                gou: i
            }), this.gou();
        } else t = "手机号格式不正确";
        1 == e && wx.showToast({
            title: t,
            icon: "none",
            image: "",
            duration: 2e3
        });
    }
});