<!--基本信息-->
<template>
    <div class="baseInfo">
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

        <div class="machine-list" v-if="dlist.length">
            <div class="title">设备列表</div>
            <div class="table-box" :class="dlist.length > 3 ? 'scrollY' : ''">
                <table cellspadding="0" cellspacing="0" border="0">
                    <tr v-for="(item, index) in dlist" :key="index">
                        <td>{{ item.name }}</td>
                        <td>工艺：{{ item.designProcess }}</td>
                        <td class="online-font">{{ item.status || "在线" }}</td>
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
                    <td class="title">所属区域</td>
                    <td>{{ baseInfo.area }}</td>
                </tr>
                <tr>
                    <td class="title">详细地址</td>
                    <td>{{ baseInfo.address }}</td>
                    <td class="title">运维单位</td>
                    <td>{{ baseInfo.oprCompany }}</td>
                </tr>
                <tr>
                    <td class="title">所属业主</td>
                    <td colspan="3">{{ baseInfo.ownerName }}</td>
                </tr>
                <tr>
                    <td class="title">所属项目</td>
                    <td>{{ baseInfo.projectName }}</td>
                    <td class="title">项目施工方</td>
                    <td>{{ baseInfo.contractor }}</td>
                </tr>
                <tr>
                    <td class="title btline">负责人</td>
                    <td colspan="3" class="btline">
                        {{ baseInfo.projectLeader }}
                    </td>
                </tr>
                <tr>
                    <td class="title">联系方式</td>
                    <td>{{ baseInfo.mobilePhone }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sewageId: "",
            baseInfo: {
                treatmentWater: 0,
                totalEnergyConsumption: 0,
                singleWaterEnergyConsumption: 0,
                status: "",
                sewageStationName: "",
                area: "",
                address: "",
                oprCompany: "",
                ownerName: "",
                projectName: "",
                contractor: "",
                projectLeader: "",
                mobilePhone: "",
            },
            dlist: [],
        };
    },
    props: ["deviceLists", "sewageBaseInfo"],
    watch: {
        sewageBaseInfo() {
            this.baseInfo = this.sewageBaseInfo;
        },
        deviceLists() {
            this.dlist = this.deviceLists;
        },
    },
    created() {
        this.baseInfo = this.sewageBaseInfo;
        this.dlist = this.deviceLists;
    },
};
</script>

<style lang="less" scoped>
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
    .table-box {
        max-height: 174px;
    }
    table {
        background: #ffffff;
        box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
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
        background: #ffffff;
        box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        width: 100%;
        padding: 20px 15px;
        td {
            padding: 5px 10px;
            &.title {
                color: #aaaaaa;
                text-align: right;
            }
            &.btline {
                border-top: 1px solid #dcdfe6;
                padding-top: 10px;
            }
        }
    }
}
</style>