<template>
    <div class="main full">
        <map-box
            :positionList="positionList"
            @clickPoint="clickPoint"
        ></map-box>

        <div
            class="con animate__animated"
            :class="
                showPointCon
                    ? 'animate__fadeInRightBig'
                    : 'animate__fadeOutRightBig'
            "
        >
            <!-- 污水站 -->
            <div class="today-statis box">
                <title-box
                    :color="'#FE511A'"
                    :title="sewageInfo.sewageStationName"
                ></title-box>
                <ul class="statis">
                    <li>
                        <div class="top">
                            <b>138</b><span>当前处理水量 m³</span>
                        </div>
                    </li>
                    <li>
                        <div class="top">
                            <b>4332</b><span>当前能耗 kw.h/m³</span>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 概况总览 -->
            <div class="all-statis box">
                <title-box :color="'#30D8FF'" :title="'概况总览'"></title-box>

                <ul class="statis">
                    <li>
                        <div class="top">
                            <b>138</b><span>日处理量 m³/天</span>
                        </div>
                    </li>
                    <li>
                        <div class="top">
                            <b>7544</b><span>总处理量 m³</span>
                        </div>
                    </li>
                    <li>
                        <div class="top"><b>95%</b><span>水质达标</span></div>
                    </li>
                </ul>

                <div class="base-info">
                    <title-box
                        class="title"
                        :color="'#EF39B0'"
                        :title="'基础信息'"
                    ></title-box>
                    <p>
                        所属业主：{{ sewageInfo.ownerName }}[{{
                            sewageInfo.ownerType == 0 ? "企业" : "政府"
                        }}]
                    </p>
                    <p>所属项目：{{ sewageInfo.projectName }}</p>
                    <p>运维单位：{{ sewageInfo.operationName }}</p>
                </div>
            </div>

            <!-- 设备信息 -->
            <div class="machine box">
                <title-box :color="'#1CD9CD'" :title="'设备信息'"></title-box>

                <div class="info">
                    <div class="fl">
                        <p>
                            <b>87</b>
                            <i>健康评价</i>
                        </p>
                    </div>
                    <div class="fr">
                        <p>设备类型<i class="el-icon-d-arrow-right"></i></p>
                        <span>{{ sewageInfo.designProcess }}</span>
                    </div>
                </div>
            </div>

            <!-- 预警通知 -->
            <notice class="notice"></notice>
        </div>
    </div>
</template>

<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    position: relative;
    color: #fff;
    .con {
        width: 360px;
        position: absolute;
        top: 0;
        right: 2px;
        z-index: 10;
        .box {
            background: rgba(48, 58, 88, 0.85);
            padding: 10px;
            margin-bottom: 10px;
        }

        ul.statis {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-center;
            align-items: center;
            justify-content: space-around;
            li {
                width: 32%;
                text-align: center;
                .top {
                    b {
                        font-size: 40px;
                        height: 52px;
                        line-height: 52px;
                        font-weight: 400;
                        display: block;
                    }
                    span {
                        font-size: 12px;
                        line-height: 16px;
                        color: #b2b4c1;
                    }
                }
            }
        }

        .today-statis {
            li {
                width: 50%;
            }
        }

        .all-statis {
            font-size: 12px;
            .base-info {
                margin-top: 25px;
                .title {
                    margin-bottom: 10px;
                }
                p {
                    height: 26px;
                    line-height: 26px;
                    color: #b2b4c1;
                    padding-left: 20px;
                }
            }
        }

        .machine {
            overflow: hidden;
            .info {
                margin-top: 10px;
                .fl {
                    width: 60%;
                    p {
                        width: 125px;
                        height: 125px;
                        background: url(../assets/img/icons1.png) no-repeat;
                        background-position: 0 -116px;
                        text-align: center;
                        margin-left: 40px;
                        overflow: hidden;
                        b {
                            font-size: 32px;
                            display: block;
                            margin-top: 40px;
                            margin-bottom: 10px;
                        }
                        i {
                            font-style: normal;
                            font-size: 10px;
                            color: #b2b4c1;
                        }
                    }
                }
                .fr {
                    width: 40%;
                    line-height: 30px;
                    font-size: 14px;
                    p {
                        i {
                            color: #2fd4f8;
                            margin-left: 20px;
                        }
                    }
                    span {
                        display: block;
                        color: #b2b4c1;
                    }
                }
            }
        }

        .notice {
            height: auto;
            margin: auto;
        }
    }
}
</style>

<script>
import mapBox from "~/components/map";
import titleBox from "~/components/title";
import notice from "~/components/notice";

export default {
    data() {
        return {
            positionList: [],
            showPointCon: false, //是否显示弹框信息

            sewageIndex: 0,
            sewageInfo: {
                area: "",
                currentStatus: "",
                designProcess: "",
                deviceCount: "",
                durationTime: "",
                id: "",
                ownerName: "",
                sewageStationName: "",
                singleWaterEnergyConsumption: 0,
                totalEnergyConsumption: 0,
                treatmentWater: 0,
            },

            statusImgs: [
                {
                    name: "在线",
                    imgUrl: "../src/assets/img/btn_zaixian.png",
                },
                {
                    name: "故障",
                    imgUrl: "../src/assets/img/btn_guzhang.png",
                },
                {
                    name: "异常",
                    imgUrl: "../src/assets/img/btn_yichang.png",
                },
                {
                    name: "离线",
                    imgUrl: "../src/assets/img/btn_lixian.png",
                },
            ],
        };
    },
    props: ["tableData"],
    components: { mapBox, titleBox, notice },
    created() {
        this.tableData.forEach((item) => {
            this.positionList.push({
                id: item.id,
                lng: item.longitude,
                lat: item.latitude,
                name: item.sewageStationName,
                status: item.currentStatus,
                imgUrl: item.currentStatus
                    ? this.statusImgs[item.currentStatus].imgUrl
                    : "../src/assets/img/btn_zaixian.png",
            });
        });
    },
    methods: {
        clickPoint(e) {
            this.showPointCon = true;

            if (e.id) {
                this.sewageInfo = this.tableData.filter((_) => _.id == e.id)[0];
            }
        },
    },
};
</script>