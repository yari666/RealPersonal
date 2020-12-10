<!--污水站列表-->
<template>
    <div class="itemlist">
        <div class="listbox">
            <div class="title">污水站列表</div>
            <ul :class="itemList.length > 10 ? 'scrollY' : ''">
                <li
                    v-for="(item, index) in itemList"
                    :key="index"
                    :class="{ active: index == itemIndex }"
                    @click="clickItem(index, item.id)"
                >
                    {{ item.name }}
                </li>
            </ul>
        </div>

        <div class="baseInfo" v-loading="loading">
            <div class="title">设备详情</div>
            <div class="statis">
                <ul class="fl">
                    <li>
                        处理水量 <b>{{ baseInfo.treatmentWater }}</b
                        ><span>m³/d</span>
                    </li>
                    <li>
                        总能耗 <b>{{ baseInfo.totalEnergyConsumption }}</b
                        ><span>m³/d</span>
                    </li>
                    <li>
                        单水能耗
                        <b>{{ baseInfo.singleWaterEnergyConsumption }}</b
                        ><span>KW·h/m³</span>
                    </li>
                </ul>
                <div class="fr">{{ baseInfo.status }} 持续2天</div>
            </div>

            <div class="machine-list">
                <div class="title">设备列表</div>
                <div
                    class="table-box"
                    :class="deviceLists.length > 2 ? 'scrollY' : ''"
                >
                    <table cellspadding="0" cellspacing="0" border="0">
                        <tr v-for="(item, index) in deviceLists" :key="index">
                            <td>{{ item.name }}</td>
                            <td>工艺：{{ item.designProcess }}</td>
                            <td class="online-font">
                                {{ item.status ? item.status : "在线" }}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="sewage-table">
                <div class="title">污水站信息</div>
                <table cellspadding="0" cellspacing="0" border="0">
                    <tr>
                        <td class="title">污水站名称</td>
                        <td>{{ baseInfo.sewageStationName }}</td>
                    </tr>
                    <tr>
                        <td class="title">所属区域</td>
                        <td>{{ baseInfo.area }}</td>
                    </tr>
                    <tr>
                        <td class="title">地址定位</td>
                        <td>{{ baseInfo.address }}</td>
                    </tr>
                    <tr>
                        <td class="title">运维单位</td>
                        <td>{{ baseInfo.oprCompany }}</td>
                    </tr>
                    <tr>
                        <td class="title">所属业主</td>
                        <td>
                            {{ baseInfo.ownerName }}［{{
                                baseInfo.ownerType == 0 ? "企业" : "政府"
                            }}］
                        </td>
                    </tr>
                    <tr>
                        <td class="title">负责人</td>
                        <td>{{ baseInfo.projectLeader }}</td>
                    </tr>
                    <tr>
                        <td class="title">联系方式</td>
                        <td>{{ baseInfo.mobilePhone }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { SewageDetail } from "~/config/api.js";

export default {
    data() {
        return {
            itemList: [],
            itemIndex: 0,
            loading: false,
            baseInfo: {
                address: "",
                area: "",
                contractor: "",
                mobilePhone: "",
                onlineTime: 0,
                oprCompany: "",
                ownerName: "",
                projectLeader: "",
                projectName: "",
                sewageStationName: "",
                singleWaterEnergyConsumption: 0,
                status: "",
                totalEnergyConsumption: 0,
                treatmentWater: 0,
            },
            deviceLists: [],
        };
    },
    props: ["sewageList"],
    created() {
        this.itemList = this.sewageList;
        this.clickItem(0, this.itemList[0].id);
    },
    watch: {
        sewageList() {
            this.itemList = this.sewageList;
        },
    },
    methods: {
        clickItem(index, id) {
            this.itemIndex = index;

            SewageDetail({ Id: id }).then((res) => {
                if (res && res.data) {
                    this.baseInfo = res.data.sewageBaseInfo;
                    this.deviceLists = res.data.deviceLists;
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.itemlist {
    color: #6b6b6b;
    .listbox {
        float: left;
        width: 30%;
        height: 530px;
        background: #ffffff;
        box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        padding: 14px;
        box-sizing: border-box;
        ul {
            margin-top: 10px;
            height: 410px;
        }
        li {
            line-height: 20px;
            border-bottom: 1px solid #dfdfdf;
            padding: 10px;
            box-sizing: border-box;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &.active {
                color: #28adca;
                font-weight: bold;
            }
        }
    }
    .baseInfo {
        float: right;
        width: 68%;
        height: 530px;
        background: #ffffff;
        box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        padding: 14px;
        box-sizing: border-box;
        .statis {
            width: 100%;
            overflow: hidden;
            line-height: 52px;

            .fl {
                width: 80%;

                li {
                    width: 30%;
                    height: 52px;
                    float: left;
                    background: #fff;
                    box-sizing: border-box;
                    background: #ffffff;
                    box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.04);
                    border-radius: 4px;
                    text-align: center;
                    margin-right: 3.33333%;
                    b {
                        color: #28adca;
                        font-size: 24px;
                        font-weight: 400;
                        margin: 0 5px;
                    }
                    span {
                        color: #aaaaaa;
                        font-size: 14px;
                    }
                }
            }
            .fr {
                width: 18%;
                height: 52px;
                background: #0a9400;
                box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.04);
                border-radius: 4px;
                color: #fff;
                text-align: center;
            }
        }
        .title {
            color: #6b6b6b;
            margin-bottom: 6px;
        }

        .machine-list {
            margin-top: 20px;
            overflow: hidden;
            .table-box {
                max-height: 116px;
            }
            table {
                width: 100%;
                padding: 0 15px;

                td {
                    border-bottom: 1px solid #dcdfe6;
                    height: 58px;
                    padding: 0 10px;
                }
                tr {
                    &:last-child {
                        td {
                            border-bottom: none;
                        }
                    }
                }
            }
        }

        .sewage-table {
            margin-top: 20px;
            table {
                width: 100%;
                padding: 20px 15px;
                td {
                    padding: 5px 10px;
                    &.title {
                        color: #aaaaaa;
                        text-align: right;
                        width: 100px;
                    }
                }
            }
        }
    }
}
</style>