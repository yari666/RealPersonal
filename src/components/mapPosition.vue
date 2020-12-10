<template>
    <div id="mapbox" style="width: 100%; height: 60vh"></div>
</template>

<script>
export default {
    data() {
        return {
            map: null,
            areaStr: "",
        };
    },
    props: ["areaObj", "areaName"],
    mounted() {
        this.areaStr =
            this.areaObj.province + this.areaObj.city + this.areaObj.district;
        this.mapInit();
    },
    watch: {
        areaObj: {
            handler(n, o) {
                this.areaStr = n.province + n.city + n.district;
                this.addOver();
            },
            deep: true,
        },
    },
    methods: {
        mapInit() {
            let _this = this;

            //百度地图API功能
            this.map = new BMap.Map("mapbox");
            let map = this.map;
            var point = new BMap.Point(116.404, 39.915);
            map.centerAndZoom(point, 10);
            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

            this.addOver();

            //单击获取点击的经纬度
            var geoc = new BMap.Geocoder();
            map.addEventListener("click", function (e) {
                // 逆地址解析
                var pt = e.point;
                try {
                    geoc.getLocation(pt, function (rs) {
                        var addComp = rs.addressComponents;

                        let name = "";
                        if (
                            // 只传省
                            _this.areaObj.province &&
                            !_this.areaObj.city &&
                            !_this.areaObj.district
                        ) {
                            name = addComp.province;
                        } else if (
                            _this.areaObj.province &&
                            _this.areaObj.city &&
                            !_this.areaObj.district
                        ) {
                            // 传省+市
                            name = addComp.province + addComp.city;
                        } else if (
                            _this.areaObj.province &&
                            _this.areaObj.city &&
                            _this.areaObj.district
                        ) {
                            // 传省+市+区
                            name =
                                addComp.province +
                                addComp.city +
                                addComp.district;
                        }

                        if (_this.areaStr && name != _this.areaStr) {
                            _this.$message.error(
                                "您的定位地址不在所选的区域范围内"
                            );
                        } else {
                            _this.$emit("addComp", {
                                lng: e.point.lng.toFixed(6),
                                lat: e.point.lat.toFixed(6),
                                province: addComp.province,
                                city: addComp.city,
                                district: addComp.district,
                                street: addComp.street,
                                streetNumber: addComp.streetNumber,
                            });
                        }
                    });
                } catch (error) {
                    _this.$message.error("您的定位地址不在所选的区域范围内");
                }
            });
        },

        // 添加行政区划分
        addOver() {
            let _this = this;
            let map = _this.map;
            var point = new BMap.Point(116.404, 39.915);
            map.centerAndZoom(point, 10);

            function getBoundary() {
                var bdary = new BMap.Boundary();

                try {
                    bdary.get(_this.areaStr, function (rs) {
                        if (_this.areaStr) {
                            //获取行政区域
                            map.clearOverlays(); //清除地图覆盖物
                            var count = rs.boundaries.length; //行政区域的点有多少个
                            if (count === 0) {
                                alert("未能获取当前选择行政区域");
                                return;
                            }

                            var ENWS = "";
                            for (var i = 0; i < count; i++) {
                                ENWS += rs.boundaries[i] + ";";
                            }
                            ENWS += rs.boundaries[0] + ";"; //形成闭环

                            //遮罩所有
                            var E_JW = "170.672126, 39.623555;"; //东
                            var EN_JW = "170.672126, 81.291804;"; //东北角
                            var N_JW = "105.913641, 81.291804;"; //北
                            var NW_JW = "-169.604276,  81.291804;"; //西北角
                            var W_JW = "-169.604276, 38.244136;"; //西
                            var WS_JW = "-169.604276, -68.045308;"; //西南角
                            var S_JW = "114.15563, -68.045308;"; //南
                            var SE_JW = "170.672126, -68.045308 ;"; //东南角

                            var ply1 = new BMap.Polygon(
                                ENWS +
                                    E_JW +
                                    SE_JW +
                                    S_JW +
                                    WS_JW +
                                    W_JW +
                                    NW_JW +
                                    N_JW +
                                    EN_JW +
                                    E_JW +
                                    rs.boundaries[0],

                                {
                                    strokeColor: "none",
                                    fillColor: "rgb(246,246,246)",
                                    fillOpacity: 0.8,
                                    strokeOpacity: 0.5,
                                }
                            );
                            map.addOverlay(ply1);

                            // 添加区域覆盖物
                            var pointArray = [];
                            for (var i = 0; i < count; i++) {
                                var ply = new BMap.Polygon(rs.boundaries[i], {
                                    strokeWeight: 2,
                                    fillColor: "",
                                    strokeColor: "#ff0000",
                                }); //建立多边形覆盖物
                                map.addOverlay(ply);
                                pointArray = pointArray.concat(ply.getPath());
                            }

                            //调整视野
                            map.setViewport(pointArray);
                        }
                    });
                } catch (error) {
                    _this.$message.error("获取地址失败");
                }
            }

            setTimeout(function () {
                getBoundary();
            }, 1000);
        },
    },
};
</script>
