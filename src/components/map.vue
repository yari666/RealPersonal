<template>
    <div id="allmap"></div>
</template>

<script>
export default {
    data() {
        return {
            map: null,
            mapPoint: [],
            mapZoom: 10,
            nowPoint: null,
            filterData: [
                {
                    lng: 108.895378,
                    lat: 32.357704,
                    name: "在线",
                    imgUrl: "../src/assets/img/btn_zaixian.png",
                },
                {
                    lng: 108.975378,
                    lat: 32.627704,
                    name: "故障",
                    imgUrl: "../src/assets/img/btn_guzhang.png",
                },
                {
                    lng: 109.200102,
                    lat: 32.65005,
                    name: "异常",
                    imgUrl: "../src/assets/img/btn_yichang.png",
                },
                {
                    lng: 109.300102,
                    lat: 32.45005,
                    name: "离线",
                    imgUrl: "../src/assets/img/btn_lixian.png",
                },
            ],
        };
    },
    props: ["positionList"],
    created() {
        this.filterData = JSON.parse(JSON.stringify(this.positionList));
        console.log(this.filterData);

        this.$nextTick(() => {
            this.mapInit();
        });
    },
    methods: {
        mapInit() {
            let _this = this;
            //百度地图API功能
            this.map = new BMap.Map("allmap");
            let map = this.map;
            var point = new BMap.Point(108.995378, 32.657704);
            map.centerAndZoom(point, 10);

            // 地图皮肤
            map.setMapStyleV2({
                styleId: "ddfec3bbaf89664b74e29f88dbd9b8b6",
            });

            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

            // 向地图添加标注
            this.filterData.forEach((item) => {
                var point = new BMap.Point(item.lng, item.lat);
                this.mapPoint.push(point);

                // 创建图标
                var myIcon = new BMap.Icon(item.imgUrl, new BMap.Size(29, 48));

                // 创建标注
                var marker = new BMap.Marker(point, {
                    icon: myIcon,
                    title: item.id,
                });
                marker.setIcon(myIcon);

                // 将标注添加到地图中
                map.addOverlay(marker);

                marker.addEventListener("click", function (e) {
                    _this.$emit("clickPoint", {
                        id: e.domEvent.srcElement.title,
                    });
                    _this.map.centerAndZoom(
                        new BMap.Point(e.point.lng, e.point.lat),
                        10
                    );

                    // 标注动画
                    if (_this.nowPoint != null) {
                        _this.nowPoint.setAnimation(null);
                    }
                    _this.nowPoint = marker;
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                });
            });

            // 自动设置地图中心点和视野级别
            var v = map.getViewport(this.mapPoint);
            this.mapZoom = v.zoom;
            map.centerAndZoom(v.center, v.zoom);
        },

        clickEvent(e) {
            let index = 0;
            let subindex = 0;
            let lng = "";
            let lat = "";

            var id = e.srcElement._config.title;

            this.data.forEach((item, i) => {
                item.seweageData.forEach((subitem, subi) => {
                    if (subitem.id == id) {
                        index = i;
                        subindex = subi;
                        lng = subitem.lng;
                        lat = subitem.lat;
                    }
                });
            });

            this.goCenter(id, lng, lat);
        },
        goCenter(id, lng, lat) {
            if (!id) return;

            if (!lng || !lat) {
                this.data.forEach((item, i) => {
                    item.seweageData.forEach((subitem, subi) => {
                        if (subitem.id == id) {
                            lng = subitem.lng;
                            lat = subitem.lat;
                        }
                    });
                });
            }

            this.map.centerAndZoom(new BMap.Point(lng, lat), 10);
        },
    },
};
</script>

<style lang="less" scoped>
#allmap {
    height: 100%;
}
#l-map {
    height: 100%;
    width: 78%;
    float: left;
    border-right: 2px solid #bcbcbc;
}
#r-result {
    height: 100%;
    width: 20%;
    float: left;
}

.maptip {
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    margin: 100px;
    background-color: red;
    border-radius: 100px 100px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
}
</style>