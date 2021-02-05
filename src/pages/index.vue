<!---首页----->

<template>
    <div class="main">
        <table border="0" cellspacing="20" cellspadding="0">
            <tr>
                <td rowspan="2" class="con1">
                    <div class="title">统计数据</div>

                    <ul class="static">
                        <li>
                            <b>{{ project }}</b
                            ><span>项目数量</span>
                        </li>
                        <li>
                            <b>{{ device }}</b
                            ><span>设备总数</span>
                        </li>
                        <li>
                            <b>{{ deviceOn }}</b
                            ><span>在线设备</span>
                        </li>
                        <li>
                            <b>{{ deviceOff }}</b
                            ><span>离线设备</span>
                        </li>
                    </ul>

                    <p class="line">PERSONNEL DATA</p>

                    <ul class="personal">
                        <li>
                            <span>人员总数</span><b>{{ employee }}</b
                            ><i class="el-icon-user"></i>
                        </li>
                        <li>
                            <span>进场人员</span><b>{{ employeeIn }}</b
                            ><i class="el-icon-user"></i>
                        </li>
                        <li>
                            <span>出场人员</span><b>{{ employeeOut }}</b
                            ><i class="el-icon-user"></i>
                        </li>
                        <li>
                            <span>在场人员</span><b>{{ employeeing }}</b
                            ><i class="el-icon-user"></i>
                        </li>
                    </ul>

                    <div class="rc">
                        <div class="title">今日进场人员统计</div>
                        <div id="rcEchart" class="rcEchart"></div>
                    </div>
                </td>

                <td colspan="2" class="con2">
                    <div class="title">员工考勤统计</div>

                    <ul class="tab1">
                        <li
                            :class="dateTabIndex == index ? 'active' : ''"
                            v-for="(item, index) in dateTab"
                            :key="index"
                            @click="changeTab(index)"
                        >
                            {{ item }}
                        </li>
                    </ul>

                    <div class="statis_box">
                        <div id="checkEchart" class="checkEchart"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="con3">
                    <div class="title">年龄分布图</div>
                    <div id="ageEchart" class="ageEchart"></div>
                </td>

                <td class="con4">
                    <div class="title">进出场人员</div>

                    <ul class="tab1">
                        <li
                            :class="inoutIndex == index ? 'active' : ''"
                            v-for="(item, index) in inoutTab"
                            :key="index"
                            @click="changeInoutTab(index)"
                        >
                            {{ item }}
                        </li>
                    </ul>

                    <el-table
                        :data="inoutData"
                        class="table"
                        v-loading="loading"
                    >
                        <el-table-column prop="employeeName" label="姓名">
                        </el-table-column>
                        <el-table-column prop="workType" label="工种">
                        </el-table-column>
                        <el-table-column label="进/出场">
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.inOutStatus == 0 ? "出场" : "进场"
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="打卡时间" width="160">
                            <template slot-scope="scope">
                                <span
                                    >{{ scope.row.attendanceDate }}
                                    {{ scope.row.attendanceTime }}</span
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </td>
            </tr>
        </table>
    </div>
</template>



<script>
var echarts = require("echarts");
import { get } from "~/config/fetch.js";

export default {
    data() {
        return {
            device: 0,
            deviceOff: 0,
            deviceOn: 0,
            employee: 0,
            employeeIn: 0,
            employeeOut: 0,
            employeeing: 0,
            project: 0,
            dateTab: ["近一月", "近一年"],
            dateTabIndex: 0,
            kqX: [],
            kqY: [],
            kqYAll: [],

            rcX: [],
            rcY: [],

            ageData: [],

            inoutX: [],
            inoutY: [],
            inoutTab: ["全部", "出场", "进场"],
            inoutIndex: 0,
            outInStatus: "",
            inoutData: [],

            tabIndex: 0,
            loading: false,
            echartWidth: (window.innerWidth * 55.2) / 100 + 25,

            mychart1: {},
            mychart2: {},
            mychart3: {},
        };
    },

    created() {
        this.getData();
        this.getAttendMonth();
        this.workType();
        this.outIn();
        this.age();
    },
    mounted() {
        this.$nextTick(() => {
            this.rcEchart();
            this.checkEchart();
            this.ageEchart();
        });

        let _this = this;
        window.addEventListener("resize", function () {
            _this.mychart1.resize();
            _this.mychart2.resize();
            _this.mychart3.resize();
        });
    },
    methods: {
        // 获取统计数量
        getData() {
            get(`/api/realname/home/home-count`).then((res) => {
                if (res.isSuccess) {
                    this.device = res.data.device;
                    this.deviceOff = res.data.deviceOff;
                    this.deviceOn = res.data.deviceOn;
                    this.employee = res.data.employee;
                    this.employeeIn = res.data.employeeIn;
                    this.employeeOut = res.data.employeeOut;
                    this.employeeing = res.data.employeeing;
                    this.project = res.data.project;
                }
            });
        },

        // 员工考勤统计-月
        getAttendMonth() {
            get(`/api/realname/home/attend-month`).then((res) => {
                if (res.isSuccess) {
                    let arrX = [],
                        arrAll = [],
                        arrY = [];
                    res.data.forEach((item) => {
                        arrX.push(item.day + "号");
                        arrY.push(item.count);
                        arrAll.push(item.employeeCount);
                    });
                    this.kqX = arrX;
                    this.kqY = arrY;
                    this.kqYAll = arrAll;

                    this.$nextTick(() => {
                        this.checkEchart();
                    });
                }
            });
        },

        // 员工考勤统计-年
        getAttendYear() {
            get(`/api/realname/home/attend-year`).then((res) => {
                if (res.isSuccess) {
                    let arrX = [],
                        arrAll = [],
                        arrY = [];
                    res.data.forEach((item) => {
                        arrX.push(item.month + "月");
                        arrY.push(item.count);
                        arrAll.push(item.employeeCount);
                    });
                    this.kqX = arrX;
                    this.kqY = arrY;
                    this.kqYAll = arrAll;

                    this.$nextTick(() => {
                        this.checkEchart();
                    });
                }
            });
        },
        changeTab(index) {
            this.dateTabIndex = index;
            if (index == 0) {
                this.getAttendMonth();
            } else {
                this.getAttendYear();
            }
        },

        // 工种 统计
        workType() {
            get(`/api/realname/home/work-type-ins`).then((res) => {
                if (res.isSuccess) {
                    let arrX = [],
                        arrY = [];
                    res.data.forEach((item) => {
                        arrX.push(item.workTypeName);
                        arrY.push(item.count);
                    });

                    this.rcX = arrX;
                    this.rcY = arrY;

                    this.$nextTick(() => {
                        this.rcEchart();
                    });
                }
            });
        },

        // 年龄统计
        age() {
            get(`/api/realname/home/age-count`).then((res) => {
                if (res.isSuccess) {
                    let arr = [];
                    res.data.forEach((item) => {
                        arr.push({
                            value: item.count,
                            name: item.age,
                        });
                    });

                    this.ageData = arr;

                    this.$nextTick(() => {
                        this.ageEchart();
                    });
                }
            });
        },

        // 进出场人员统计
        changeInoutTab(index) {
            this.inoutIndex = index;
            this.outInStatus = index == 0 ? "" : index - 1 + "";
            this.outIn();
        },
        outIn() {
            this.loading = true;
            get(`/api/realname/home/employee-in-outs`, {
                status: this.outInStatus,
                size: 5,
            })
                .then((res) => {
                    if (res.isSuccess) {
                        this.inoutData = res.data;
                        this.loading = false;
                    }
                })
                .catch((err) => {
                    this.loading = false;
                });
        },

        // 入场人员统计
        rcEchart() {
            this.mychart1 = echarts.init(document.getElementById("rcEchart"));

            let typeData = this.rcX;
            let colors = [
                "#0057bf",
                "#076ce5",
                "#3692ff",
                "#80baff",
                "#afd4ff",
            ];
            let data = this.rcY;

            let arr = [];
            data.forEach((el, i) => {
                arr.push({
                    value: el,
                    itemStyle: {
                        color: colors[i % 5],
                    },
                });
            });

            // 指定图表的配置项和数据
            var option = {
                grid: {
                    left: 80,
                    top: 10,
                    right: 10,
                    bottom: 10,
                },
                toolbox: {
                    show: true,
                },
                calculable: true,
                xAxis: [
                    {
                        type: "value",
                        show: false,
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "category",
                        nameTextStyle: {
                            color: "#aaa",
                        },
                        data: typeData,
                        //设置轴线的属性
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                    },
                ],
                series: [
                    {
                        type: "bar",
                        barWidth: "40%",
                        data: arr,
                        /* 显示柱子数据 */
                        label: {
                            normal: {
                                show: true,
                                // 数据在柱子头部显示
                                position: "right",
                                textStyle: {
                                    color: "#707070",
                                    fontSize: 13,
                                },
                            },
                        },
                    },
                ],
            };

            // 绘制图表
            this.mychart1.setOption(option);
        },

        // 考勤统计
        checkEchart() {
            this.mychart2 = echarts.init(
                document.getElementById("checkEchart")
            );

            let option = {
                color: ["#FFC831", "#0057BF"],
                grid: {
                    left: 60,
                    top: 20,
                    right: 10,
                    bottom: 70,
                },
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["总人数", "打卡人数"],
                    bottom: 0,
                    icon: "circle",
                    textStyle: {},
                },
                xAxis: {
                    type: "category",
                    data: this.kqX,
                    axisLabel: {
                        color: "#0057bf",
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#82b6e2",
                        },
                    },
                },
                yAxis: {
                    type: "value",
                    axisLabel: {
                        color: "#0057bf",
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#82b6e2",
                        },
                    },
                },
                series: [
                    {
                        name: "总人数",
                        type: "line",
                        data: this.kqYAll,
                        smooth: true,
                    },
                    {
                        name: "打卡人数",
                        type: "line",
                        data: this.kqY,
                        smooth: true,
                    },
                ],
            };

            this.mychart2.setOption(option);
        },

        // 年龄分布图
        ageEchart() {
            this.mychart3 = echarts.init(document.getElementById("ageEchart"));

            let option = {
                color: ["#0057bf", "#076ce5", "#3692ff", "#80baff", "#afd4ff"],

                tooltip: {
                    trigger: "item",
                },
                legend: {
                    orient: "vertical",
                    left: "right",
                },
                series: [
                    {
                        type: "pie",
                        radius: "80%",
                        center: ["40%", "50%"],
                        data: this.ageData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            };

            this.mychart3.setOption(option);
        },
    },
};
</script>


<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 20px;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    table {
        width: 100%;
        background: #f6f6f6;
        td {
            width: 28.33333333%;
            background: #ffffff;
            box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.04);
            border-radius: 8px;
            vertical-align: top;

            &.con1 {
                padding: 20px;
                min-width: 350px;
                ul.static {
                    display: flex;
                    flex-wrap: wrap;
                    align-content: flex-center;
                    align-items: center;
                    justify-content: space-around;
                    li {
                        width: 23%;
                        height: 94px;
                        text-align: center;
                        background: #0057bf;
                        border-radius: 6px;
                        color: #fff;
                        b {
                            font-size: 40px;
                            font-family: Bahnschrift;
                            font-weight: bold;
                            line-height: 66px;
                            display: block;
                        }
                        span {
                            font-size: 12px;
                            line-height: 16px;
                        }
                    }
                }
                p.line {
                    color: #a5a5a5;
                    height: 38px;
                    line-height: 38px;
                    text-align: center;
                    font-size: 14px;
                }
                ul.personal {
                    display: flex;
                    flex-wrap: wrap;
                    align-content: flex-center;
                    align-items: center;
                    justify-content: space-around;
                    height: 92px;
                    background: #f4f4f4;
                    border: 1px solid #c9c9c9;
                    border-radius: 6px;
                    li {
                        width: 23%;
                        height: 94px;
                        padding: 20px 0;
                        box-sizing: border-box;
                        text-align: center;
                        border-radius: 6px;
                        color: #fff;
                        position: relative;
                        span {
                            font-size: 12px;
                            line-height: 16px;
                            color: #707070;
                            margin-bottom: 10px;
                            display: block;
                            &::after {
                                content: "";
                                width: 1px;
                                height: 14px;
                                float: right;
                                transform: rotate(45deg);
                                display: block;
                                background: #ccc;
                            }
                        }
                        b {
                            font-size: 26px;
                            font-family: Bahnschrift;
                            font-weight: 400;
                            display: inline-block;
                            color: #0057bf;
                            text-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
                        }
                        i {
                            color: #666;
                            margin-left: 8px;
                            font-size: 18px;
                            border: 1px dashed #999;
                        }
                        &:last-child {
                            span {
                                &::after {
                                    display: none;
                                }
                            }
                        }
                    }
                }

                .rc {
                    margin-top: 50px;
                    .rcEchart {
                        width: 100%;
                        height: calc(~"100vh - 500px");
                    }
                }
            }

            .tab1 {
                position: absolute;
                right: 0;
                top: 20px;
                li {
                    float: left;
                    width: 80px;
                    height: 30px;
                    line-height: 30px;
                    background: #ffffff;
                    border: 1px solid #bcbcbc;
                    text-align: center;
                    cursor: pointer;
                    color: #bcbcbc;
                    margin-right: 20px;
                    &.active {
                        background: #0057bf;
                        border: 1px solid #0057bf;
                        color: #fff;
                    }
                }
            }

            &.con2 {
                padding: 20px;
                min-width: 350px;
                height: 40vh;
                box-sizing: border-box;
                position: relative;

                .statis_box {
                    margin-top: 15px;
                    .checkEchart {
                        width: 100%;
                        height: 40vh;
                    }
                }
            }

            &.con3 {
                position: relative;
                padding: 20px;
                box-sizing: border-box;
                .ageEchart {
                    width: 100%;
                    height: 30vh;
                }
            }

            &.con4 {
                position: relative;
                padding: 20px;
                box-sizing: border-box;
                .table {
                    margin-top: 15px;
                }
            }
        }
    }
    .title {
        height: 20px;
        font-size: 16px;
        line-height: 20px;
        color: #0750a7;
        margin-bottom: 16px;
        &::before {
            content: "";
            width: 4px;
            height: 4px;
            display: inline-block;
            background: #0750a7;
            vertical-align: 4px;
            margin-right: 5px;
        }
    }

    .echartbox {
        width: 100%;
        height: 220px;
        position: absolute;
        bottom: 0;
    }
}
</style>