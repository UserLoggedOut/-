var a = getApp();

Page({
    name: "index",
    data: {
        bjt: "",
        display: "none",
        longitude: "",
        latitude: ""
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
            success: function(o) {
                wx.hideLoading(), t.setData({
                    bjt: o.data.data.icon,
                    titles: o.data.data.setup_name,
                    latitude: o.data.data.latitude,
                    longitude: o.data.data.longitude,
                    font_color: o.data.data.font_color,
                    ba_color: o.data.data.ba_color
                }), wx.setNavigationBarColor({
                    frontColor: o.data.data.font_color,
                    backgroundColor: o.data.data.ba_color
                }), wx.setNavigationBarTitle({
                    title: o.data.data.setup_name
                }), a.globalData.font_color = o.data.data.font_color, a.globalData.ba_color = o.data.data.ba_color, 
                a.globalData.setup = o.data.data;
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    onShareAppMessage: function(a) {
        "button" === a.from && console.log(a.target);
    },
    onLoad: function() {
        this.setup();
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            display: "none"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    buymap: function() {
        var a = this;
        wx.navigateTo({
            url: "../searchhome/searchhome?rental=1&latitude=" + a.data.latitude + "&longitude=" + a.data.longitude
        });
    },
    rentmap: function() {
        var a = this;
        wx.navigateTo({
            url: "../searchhome/searchhome?rental=0&latitude=" + a.data.latitude + "&longitude=" + a.data.longitude
        });
    },
    tap_4039869c: function(a) {
        wx.switchTab({
            url: "../buy/buy"
        });
    },
    tap_7979c18c: function(a) {
        wx.navigateTo({
            url: "../zugou/zugou"
        });
    },
    tap_73f1ad69: function(a) {
        wx.switchTab({
            url: "../rent/rent"
        });
    },
    tap_c1618271: function(a) {},
    close: function() {
        this.setData({
            display: "none"
        });
    },
    chushou: function() {
        wx.navigateTo({
            url: "../sell/sell"
        });
    },
    chuzu: function() {
        wx.navigateTo({
            url: "../lease/lease"
        });
    },
    fabu: function() {
        this.setData({
            display: "block"
        });
    }
});