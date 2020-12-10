<!---业主-污水站管理----->
<template>
    <div class="main p20">
        <!-- 筛选项 -->
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline fl">
                <el-form-item label="关键词">
                    <el-input
                        placeholder="请输入关键词"
                        v-model="params.KeyWord"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button
                        type="primary"
                        style="background: #28adca"
                        @click="search()"
                        >查询</el-button
                    >
                </el-form-item>
            </el-form>

            <div class="fr">
                <el-button class="add-btn" @click="add">新增</el-button>
                <el-button type="primary" class="ml10">导出数据</el-button>
            </div>
        </div>

        <!-- 表格 -->
        <el-table :data="tableData" show-summary border max-height="700">
            <el-table-column label="污水站名称/区域"
                ><template slot-scope="scope">
                    <b>{{ scope.row.sewageStationName }}</b>
                    <p>{{ scope.row.areaLocation }}</p>
                </template></el-table-column
            >

            <el-table-column
                prop="projectName"
                label="所属项目"
            ></el-table-column>

            <el-table-column
                prop="treatmentWater"
                width="100px"
                label="处理水量m³/d"
            ></el-table-column>

            <el-table-column
                prop="totalEnergyConsumption"
                width="100px"
                label="总能耗KW.h"
            ></el-table-column>

            <el-table-column
                prop="singleWaterEnergyConsumption"
                label="单水能耗KW.h/m³"
                width="120px"
            ></el-table-column>

            <el-table-column
                prop="currentStatus"
                label="当前状态/时间"
                width="100px"
            ></el-table-column>

            <el-table-column width="320px" label="健康评价">
                <template slot-scope="scope">
                    <el-button size="mini">综合评分：86</el-button>
                    <el-button size="mini">评分等级：良</el-button>
                    <span class="base-font ml10" @click="detail(scope.row, 3)"
                        >查看</span
                    >
                </template>
            </el-table-column>

            <el-table-column
                prop="deviceCount"
                label="设备数量/工艺"
                width="100px"
            ></el-table-column>

            <el-table-column prop="operations" label="运维方"></el-table-column>

            <el-table-column label="操作" width="320px" class="tools">
                <template slot-scope="scope">
                    <span class="primary-font" @click="detail(scope.row, 0)"
                        >查看</span
                    >
                    <span class="primary-font" @click="edit(scope.row)"
                        >编辑</span
                    >
                    <span class="danger-font" @click="del(scope.row)"
                        >删除</span
                    >
                    <span class="primary-font">发起工单</span>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
            <el-pagination
                @current-change="handleCurrentChange"
                :page-size="params.MaxResultCount"
                layout="prev, pager, next, jumper"
                :total="totalCount"
            ></el-pagination>
        </div>

        <!-- 弹框内容 -->
        <div class="theme">
            <el-dialog
                :close-on-click-modal="false"
                :title="openType == 'edit' ? '编辑污水站' : '创建污水站'"
                :visible.sync="open"
                width="40%"
            >
                <add-sewage
                    v-if="open"
                    :open="open"
                    :openType="openType"
                    :formData="formData"
                    @add="add"
                    @closeDialog="closeDialog"
                ></add-sewage>
            </el-dialog>

            <!-- 污水站详情 -->
            <el-dialog
                :close-on-click-modal="false"
                :title="sewageStationName"
                :visible.sync="showSewageInfo"
            >
                <sewage-info
                    v-if="showSewageInfo"
                    :id="sewageId"
                    :tabIndex="tabIndex"
                    @changeTabIndex="changeTabIndex"
                ></sewage-info>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import areaType from "~/components/areaType";
import addSewage from "./add";
import sewageInfo from "./info/index";

import { SewageStation, DelSewageStation } from "~/config/api.js";

export default {
    data() {
        const item = {
            tab1: "污水站A/",
            tab2: "项目A",
            tab3: 500,
            tab4: 34423,
            tab5: 6654,
            tab6: "离线 1小时",
            tab7: "白亚如",
            tab8: "2 AOO/MBR",
            tab9: "XXXXXXX公司【第三方】",
        };
        return {
            tabIndex: "0",
            showSewageInfo: false,

            params: {
                KeyWord: "",
                Sorting: "",
                SkipCount: 0, //第几页
                MaxResultCount: 10, //每页显示10条
            },
            tableData: [],
            totalCount: 0,
            open: false,
            openType: "",
            formData: {
                id: "", //项目id
                sewageStationName: "", //污水站名称
                projectId: "", //所属项目
                projectName: "",
                area: [], //所属区域
                address: "", //具体地址
                longitude: "",
                latitude: "",
            },
            sewageId: "",
            sewageStationName: "",
        };
    },
    components: { areaType, addSewage, sewageInfo },
    watch: {
        showSewageInfo(to) {
            if (!to) {
                this.tabIndex = "0";
            }
        },
    },
    computed: {
        userId() {
            return this.$store.state.userInfo.userId;
        },
    },
    created() {
        this.getSewageStation();
    },
    methods: {
        search() {
            this.params.SkipCount = 0;
            this.getSewageStation();
        },

        // 切换页
        handleCurrentChange(val) {
            this.params.SkipCount = parseInt(
                (val - 1) * this.params.MaxResultCount
            );
            this.getSewageStation();
        },

        //获取列表
        getSewageStation() {
            let obj = Object.assign({}, this.params, { UserId: this.userId });

            SewageStation(obj).then((res) => {
                if (res.data && res.data.totalCount) {
                    this.tableData = res.data.items;
                    this.totalCount = res.data.totalCount;
                }
            });
        },

        // 新增,编辑
        add() {
            this.open = true;
            this.openType = "add";
        },

        // 新增,编辑
        edit(row) {
            this.open = true;
            this.formData = {
                id: row.id,
                sewageStationName: row.sewageStationName, //污水站名称
                projectId: row.projectId, //所属项目
                projectName: row.projectName,
                area: row.areaLocation.split("/"), //所属区域
                address: row.address, //具体地址
                longitude: row.longitude,
                latitude: row.latitude,
            };
            this.openType = "edit";
        },

        // 关闭弹框
        closeDialog(e) {
            this.open = false;
            this.getSewageStation();
        },

        changeTabIndex(e) {
            this.tabIndex = e.tabIndex;
        },

        detail(row, index) {
            this.sewageId = row.id;
            this.sewageStationName = row.sewageStationName;
            this.showSewageInfo = true;
            this.tabIndex = index.toString();
        },

        // 删除污水站
        del(row) {
            this.$confirm("是否确定删除此污水站?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    DelSewageStation({ Id: row.id }).then((res) => {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        this.getSewageStation();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
    },
};
</script>

<style lang="less" scoped>
.block {
    text-align: center;
    margin: 15px auto 0;
}
.w100 {
    width: 120px;
}
.tab-type {
    position: absolute;
    top: 0;
    right: 0;
}
.search-box {
    position: relative;
}
.el-select {
    width: 120px;
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
.el-input {
    width: 400px;
}
.primary-font,
.danger-font {
    margin-right: 20px;
}
</style>