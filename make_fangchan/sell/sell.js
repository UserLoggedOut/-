var a, t = getApp(), e = require("../../libs/qqmap-wx-jssdk.js");

Page({
    data: {
        value: 0,
        chushou: [],
        imgs: [],
        video: "",
        videos: "",
        imgurl: [],
        imgtime: 0,
        area: [],
        agents: [],
        labels: [],
        first: "",
        release: "",
        top: "",
        agent: "",
        agent_id: "",
        mima: "",
        pas: "",
        xuanqu: "",
        settop: "",
        position: 0,
        xiaoqus: [],
        year: 0,
        days: [ "1天", "2天", "3天", "4天", "5天", "6天", "7天" ],
        switch_panorama: 0,
        waite: !1,
        jishi: 0
    },
    onLoad: function() {
        t.util.getUserInfo(function(a) {
            console.log(a.sessionid);
        }), wx.setNavigationBarColor({
            frontColor: t.globalData.font_color,
            backgroundColor: t.globalData.ba_color
        });
        var i = t.globalData.setup.qq_key;
        console.log(i), a = new e({
            key: i
        }), this.area(), this.agents(), this.labels(), this.setup();
    },
    xiaoqu_close: function() {
        this.setData({
            values: 0
        });
    },
    switch_panorama: function(a) {
        1 == a.detail.value ? this.setData({
            switch_panorama: 1
        }) : this.setData({
            switch_panorama: 0
        });
    },
    searchAddress: function(e) {
        var i = this, s = t.globalData.setup;
        if ("" == s.district) if ("" == s.city) if ("" == s.province) n = ""; else n = s.province; else n = s.city; else var n = s.district;
        console.log("city=" + n);
        var o = e.detail.value;
        a.getSuggestion({
            keyword: o,
            region: n,
            region_fix: 1,
            policy: 1,
            success: function(a) {
                console.log(a.data), i.setData({
                    address: a.data,
                    values: 9
                });
            },
            fail: function(a) {
                console.log(a);
            },
            complete: function(a) {}
        });
    },
    xiaoqu: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.xiaoqu, e = this.data.address[t].title;
        this.setData({
            values: 0,
            xiaoqu_name: e,
            xiaoqu_info: this.data.address[t]
        });
    },
    onShareAppMessage: function(a) {
        "button" === a.from && console.log(a.target);
    },
    switch1Change: function(a) {
        var t = this;
        a.detail.value && t.setData({
            position: 2
        }), this.setData({
            top: a.detail.value
        });
    },
    switch2Change: function(a) {
        this.setData({
            agent: a.detail.value
        });
    },
    chushou: function() {
        var a = this, e = a.data.imgurl.join(",");
        if (wx.showLoading({
            title: "数据提交中"
        }), console.log("panorama=" + a.data.chushou.panorama), void 0 == a.data.chushou.panorama) i = ""; else var i = a.data.chushou.panorama;
        var s = a.data.xiaoqu_info;
        if (void 0 != a.data.xiaoqu_info.title) var n = s.location.lat, o = s.location.lng; else var n = "", o = "";
        t.util.request({
            url: "entry/wxapp/chushou",
            data: {
                m: "make_fangchan",
                agent: a.data.agent,
                district: a.data.chushou.district,
                xiaoqu_name: a.data.chushou.xiaoqu,
                leixing: a.data.chushou.leixing,
                leibie: a.data.chushou.leibie,
                label_id: a.data.chushou.label_id,
                agent_name: a.data.chushou.agent_name,
                fang_name: a.data.chushou.fang_name,
                total: a.data.chushou.total,
                office: a.data.chushou.office,
                huxing: a.data.chushou.huxing,
                guard: a.data.chushou.guard,
                years: a.data.chushou.years,
                size: a.data.chushou.size,
                floor: a.data.chushou.floor,
                tel: a.data.chushou.tel,
                times: a.data.chushou.times,
                year: parseInt(a.data.chushou.year),
                position: a.data.position,
                describe: a.data.chushou.describe,
                icon: a.data.imgurl[0],
                imgurl: e,
                video: a.data.videos,
                panorama: i,
                lng: o,
                lat: n
            },
            cachetime: 30,
            success: function(t) {
                wx.hideLoading(), a.setData({
                    imgurl: [],
                    imgtime: 0,
                    waite: !1,
                    jishi: 0
                }), wx.showToast({
                    title: "提交成功",
                    icon: "loading",
                    duration: 1500
                }), a.duanxin(), wx.switchTab({
                    url: "../index/index"
                });
            },
            fail: function() {
                a.setData({
                    waite: !1,
                    jishi: 0
                }), wx.showToast({
                    title: "提交失败",
                    icon: "loading",
                    duration: 1500
                });
            }
        });
    },
    duanxin: function() {
        t.util.request({
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
        var a = this;
        wx.showLoading({
            title: "数据加载中"
        }), t.util.request({
            url: "entry/wxapp/area",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(t) {
                wx.hideLoading(), a.setData({
                    area: t.data.data
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    agents: function() {
        var a = this;
        wx.showLoading({
            title: "数据加载中"
        }), t.util.request({
            url: "entry/wxapp/agents",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(t) {
                wx.hideLoading(), console.log(t), a.setData({
                    agents: t.data.data
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    agena: function() {
        var a = this;
        wx.showLoading({
            title: "数据加载中"
        }), t.util.request({
            url: "entry/wxapp/agena",
            data: {
                m: "make_fangchan",
                agent_id: a.data.agent_id
            },
            cachetime: 30,
            success: function(t) {
                wx.hideLoading(), console.log(t), a.setData({
                    mima: t.data.data.release
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    district: function() {
        var a = this;
        wx.showLoading({
            title: "数据加载中"
        }), t.util.request({
            url: "entry/wxapp/district",
            data: {
                m: "make_fangchan",
                district: a.data.xuanqu
            },
            cachetime: 30,
            success: function(t) {
                wx.hideLoading(), console.log(t), a.setData({
                    xiaoqus: t.data.data
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    labels: function() {
        var a = this;
        wx.showLoading({
            title: "数据加载中"
        }), t.util.request({
            url: "entry/wxapp/label",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(t) {
                wx.hideLoading(), console.log(t), a.setData({
                    labels: t.data.data
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
    },
    setup: function() {
        var a = this;
        wx.showLoading({
            title: "数据加载中"
        }), t.util.request({
            url: "entry/wxapp/setup",
            data: {
                m: "make_fangchan"
            },
            cachetime: 30,
            success: function(t) {
                wx.hideLoading(), a.setData({
                    first: t.data.data.first,
                    release: t.data.data.release,
                    settop: t.data.data.settop
                });
            },
            fail: function() {
                failGo("请检查连接地址");
            }
        });
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
        }), this.district();
    },
    label: function(a) {
        this.setData({
            value: 0,
            label: a.currentTarget.dataset.label,
            label_id: a.currentTarget.dataset.label_id
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
    office: function(a) {
        this.setData({
            value: 0,
            office: a.currentTarget.dataset.office
        });
    },
    agent: function(a) {
        var t = a.currentTarget.dataset.agentid;
        this.setData({
            value: 0,
            agent_name: a.currentTarget.dataset.xuanqu,
            agent_id: t
        }), this.agena(), console.log(t);
    },
    huxing: function(a) {
        this.setData({
            value: 0,
            huxing: a.currentTarget.dataset.huxing
        });
    },
    guard: function(a) {
        this.setData({
            value: 0,
            guard: a.currentTarget.dataset.guard
        });
    },
    del_img: function(a) {
        this.data.imgs.splice(a.target.id, 1), this.setData({
            imgs: this.data.imgs
        });
    },
    imgTap: function() {
        var a = this;
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var e = t.tempFilePaths, i = a.data.imgs.concat(e);
                i.length > 9 ? wx.showToast({
                    title: "最大9张",
                    icon: "loading",
                    duration: 2e3
                }) : a.setData({
                    imgs: i
                });
            }
        });
    },
    videoTap: function(a) {
        var t = this;
        wx.chooseVideo({
            sourceType: [ "album", "camera" ],
            maxDuration: 60,
            camera: "back",
            success: function(a) {
                t.setData({
                    video: a.tempFilePath
                });
            }
        });
    },
    del_video: function() {
        this.setData({
            video: ""
        });
    },
    selectYear: function(a) {
        this.setData({
            year: a.detail.value
        });
    },
    preImg: function(a) {
        wx.previewImage({
            current: a.currentTarget.dataset.imgs,
            urls: this.data.imgs
        });
    },
    formSubmit: function(a) {
        var t = this, e = "", i = !0;
        if ("" == a.detail.value.district) e = "请选择区域"; else if ("" == a.detail.value.xiaoqu) e = "请选择小区"; else if ("" == a.detail.value.leixing) e = "请选择装修类型"; else if ("" == a.detail.value.leibie) e = "请选择用途"; else if ("" == a.detail.value.label) e = "请选择标签"; else if ("" == a.detail.value.fang_name) e = "请输入房屋名称"; else if ("" == a.detail.value.total) e = "请输入售价"; else if ("" == a.detail.value.type) e = "请输入押金类型"; else if ("" == a.detail.value.office) e = "请选择厅"; else if ("" == a.detail.value.huxing) e = "请选择户型"; else if ("" == a.detail.value.guard) e = "请选择户型"; else if ("" == a.detail.value.years) e = "请输入年代"; else if ("" == a.detail.value.size) e = "请输入房屋面积"; else if ("" == a.detail.value.floor) e = "请输入楼层"; else if ("" == a.detail.value.tel) e = "请输入房东电话！"; else if (/^1(3|4|5|7|8)\d{9}$/.test(a.detail.value.tel)) if ("" == a.detail.value.times) e = "请输入发布天数"; else if ("" == a.detail.value.describe) e = "请输入房屋描述"; else if ("" == a.detail.value.imgs) e = "请添加房屋图片"; else {
            i = !1;
            var s = a.detail.value;
            s.label_id = t.data.label_id, s.agent_name = t.data.agent_id, this.setData({
                chushou: s,
                pas: s.release,
                times: s.times
            }), console.log("form发生了submit事件，携带数据为：", a.detail.value), 0 == t.data.release ? t.ivform() : t.data.agent ? t.data.pas == t.data.mima ? t.ivform() : wx.showToast({
                title: "发布密码错误",
                icon: "loading",
                duration: 2e3
            }) : t.pay();
        } else e = "号码格式不正确";
        1 == i && wx.showToast({
            title: e,
            icon: "loading",
            image: "",
            duration: 1e3
        });
    },
    uploadimg: function(a) {
        var t = this, e = a.i ? a.i : 0, i = a.success ? a.success : 0, s = a.fail ? a.fail : 0;
        wx.uploadFile({
            url: a.url,
            filePath: a.path[e],
            header: {
                "Content-Type": "multipart/form-data"
            },
            name: "file",
            formData: {
                user: "test"
            },
            success: function(a) {
                t.setData({
                    imgurl: t.data.imgurl.concat(a.data),
                    imgtime: t.data.imgtime + 1
                });
            },
            fail: function(a) {
                s++;
            },
            complete: function() {
                ++e == a.path.length || (a.i = e, a.success = i, a.fail = s, t.uploadimg(a));
            }
        });
    },
    uploadvideo: function(a) {
        var t = this;
        wx.uploadFile({
            url: a.url,
            filePath: a.path,
            name: "file",
            formData: {
                user: "test"
            },
            success: function(a) {
                var e = a.data;
                t.setData({
                    videos: e
                });
            }
        });
    },
    settime: function() {
        var a = this;
        a.setData({
            jishi: a.data.jishi + 1
        }), setTimeout(function() {
            "" != a.data.video ? "" != a.data.videos ? a.imgform() : a.settime() : a.imgform();
        }, 1e3);
    },
    imgform: function() {
        var a = this;
        a.data.imgs.length == a.data.imgtime ? a.chushou() : a.data.jishi > 120 ? (wx.showToast({
            title: "请求超时",
            icon: "loading",
            duration: 2e3
        }), a.setData({
            jishi: 0
        })) : a.settime();
    },
    pay: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/pay_fabu",
            data: {
                m: "make_fangchan",
                times: e.data.times,
                year: parseInt(e.data.year)
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
                        e.ivform();
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
    ivform: function() {
        var a = this;
        if (this.setData({
            waite: !0
        }), a.data.imgs.length > 0) {
            var e = t.util.url("entry/wxapp/imags", {
                m: "make_fangchan"
            });
            this.uploadimg({
                url: e,
                path: a.data.imgs
            });
        }
        if (a.data.video.length > 0) {
            var i = t.util.url("entry/wxapp/video", {
                m: "make_fangchan"
            });
            a.uploadvideo({
                url: i,
                path: a.data.video
            });
        }
        a.settime();
    }
});