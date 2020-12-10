<!--项目列表-->
<template>
    <div class="itemlist">
        <div class="listbox">
            <div class="title">项目列表</div>
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

        <div class="baseInfo">
            <div class="sewage-table">
                <div class="title">项目详情</div>
                <table cellspadding="0" cellspacing="0" border="0">
                    <tr>
                        <td class="title">项目日期</td>
                        <td>{{ itemInfo.projectDate }}</td>
                    </tr>
                    <tr>
                        <td class="title">所属业主</td>
                        <td>
                            {{ itemInfo.ownerName }}[{{
                                itemInfo.ownerType == 0 ? "企业" : "政府"
                            }}]
                        </td>
                    </tr>
                    <tr>
                        <td class="title">项目施工方</td>
                        <td>{{ itemInfo.contractor }}</td>
                    </tr>
                    <tr>
                        <td class="title">项目设备</td>
                        <td>{{ itemInfo.projectDevice }}</td>
                    </tr>
                    <tr>
                        <td class="title">项目负责人</td>
                        <td>
                            {{ itemInfo.projectLeader }}
                            {{ itemInfo.mobilePhone }}
                        </td>
                    </tr>
                </table>
            </div>

            <div
                class="machine-list"
                v-if="itemInfo.sewageStationList.length"
                v-loading="loading"
            >
                <div class="title">项目污水站</div>
                <div
                    class="table-box"
                    :class="
                        itemInfo.sewageStationList.length > 4 ? 'scrollY' : ''
                    "
                >
                    <table cellspadding="0" cellspacing="0" border="0">
                        <tr
                            v-for="(item, index) in itemInfo.sewageStationList"
                            :key="index"
                        >
                            <td>{{ item.name }}</td>
                            <td>工艺：{{ item.designProcess }}</td>
                            <td class="online-font">{{ item.status }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ProjectDetails } from "~/config/api.js";

export default {
    data() {
        return {
            itemList: [],
            itemIndex: 0,
            loading: false,
            itemInfo: {
                contractor: "",
                mobilePhone: "",
                ownerName: "",
                ownerType: 0,
                projectDate: "",
                projectDevice: "",
                projectLeader: "",
                sewageStationList: [],
            },
        };
    },
    props: ["projectList"],
    created() {
        if (this.projectList.length) {
            this.itemList = this.projectList;
            this.clickItem(0, this.itemList[0].id);
        }
    },
    watch: {
        projectList() {
            this.itemList = this.projectList;
        },
    },
    methods: {
        clickItem(index, id) {
            this.itemIndex = index;
            this.loading = true;
            ProjectDetails({ Id: id }).then((res) => {
                this.loading = false;
                if (res && res.data) {
                    this.loading = false;
                    this.itemInfo = res.data;
                } else {
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
        height: 450px;
        background: #ffffff;
        box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        padding: 14px;
        box-sizing: border-box;
        ul {
            margin-top: 10px;
            height: 400px;
        }
        li {
            line-height: 20px;
            border-bottom: 1px solid #dfdfdf;
            padding: 10px;
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
        height: 450px;
        background: #ffffff;
        box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        padding: 14px;
        box-sizing: border-box;
        .title {
            color: #6b6b6b;
            margin-bottom: 6px;
        }

        .machine-list {
            margin-top: 20px;
            .table-box {
                max-height: 160px;
            }
            table {
                width: 100%;
                padding: 0 15px;
                td {
                    height: 38px;
                    padding: 0 10px;
                }
            }
        }

        .sewage-table {
            border-bottom: 1px solid #dfdfdf;
            table {
                width: 100%;
                padding: 20px 15px;
                td {
                    padding: 5px 10px;
                    color: #6b6b6b;
                    &.title {
                        color: #333;
                        text-align: right;
                        width: 100px;
                    }
                }
            }
        }
    }
}
</style>