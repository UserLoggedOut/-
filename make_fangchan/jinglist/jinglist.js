var o = getApp();

Page({
    name: "jinglist",
    data: {
        agent: ""
    },
    onShareAppMessage: function(o) {
        "button" === o.from && console.log(o.target);
    },
    jinglist: function() {
        var t = this;
        wx.showLoading({
            title: "数据加载中"
        }), o.util.request({
            url: "entry/wxapp/jinglist",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(o) {
                wx.hideLoading(), t.setData({
                    agent: o.data.data.lists
                }), console.log(o);
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    onLoad: function() {
        wx.setNavigationBarColor({
            frontColor: o.globalData.font_color,
            backgroundColor: o.globalData.ba_color
        }), this.jinglist();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    tap_1e109a3c: function(o) {
        var t = o.currentTarget.dataset.agent_id;
        console.log(t), wx.navigateTo({
            url: "../roomlist/roomlist?id=" + t
        });
    },
    call: function(o) {
        var t = o.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: t
        });
    }
});