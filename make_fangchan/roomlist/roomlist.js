var a = getApp();

Page({
    name: "roomlist",
    data: {
        agent_id: "",
        rooms: [],
        agent: [],
        zumai: ""
    },
    onShareAppMessage: function(a) {
        "button" === a.from && console.log(a.target);
    },
    roomlist: function() {
        var t = this;
        wx.showLoading({
            title: "数据加载中"
        }), a.util.request({
            url: "entry/wxapp/roomlist",
            data: {
                m: "make_fangchan",
                agent_id: t.data.agent_id
            },
            cachetime: 30,
            success: function(a) {
                wx.hideLoading(), t.setData({
                    rooms: a.data.data,
                    agent: a.data.message
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    onLoad: function(t) {
        var o = t.id;
        console.log(o), this.setData({
            agent_id: o
        }), wx.setNavigationBarColor({
            frontColor: a.globalData.font_color,
            backgroundColor: a.globalData.ba_color
        }), this.roomlist();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    call: function(a) {
        var t = a.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    tap_8606ebdd: function(a) {
        wx.navigateTo({
            url: "../jinglist/jinglist"
        });
    },
    tap_8f63d3aa: function(a) {
        var t = a.currentTarget.dataset.rent_id;
        wx.navigateTo({
            url: "../rentdetails/rentdetails?id=" + t
        });
    },
    tap_8f63d3ss: function(a) {
        var t = a.currentTarget.dataset.buy_id;
        console.log(t), wx.navigateTo({
            url: "../buydetails/buydetails?id=" + t
        });
    }
});