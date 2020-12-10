<template>
    <div class="choicewsz">
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            height="350"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column
                label="名称"
                prop="sewageStationName"
            ></el-table-column>

            <el-table-column
                label="区域"
                prop="area"
                width="200px"
            ></el-table-column>

            <el-table-column label="远程控制" width="100px">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.isRemoteControl"
                        active-color="#13ce66"
                    >
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column prop="deviceCount" label="设备数量">
            </el-table-column>

            <el-table-column prop="designProcess" label="类型">
            </el-table-column>

            <el-table-column label="状态"></el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="cancelSelect">取消选择</el-button>
            <el-button @click="close">取消</el-button>
        </div>
    </div>
</template>

<script>
import { SewageStationSelect, AddThirdOperationSewage } from "~/config/api.js";

export default {
    data() {
        return {
            KeyWord: "",
            totalCount: 0,
            tableData: [],
            multipleSelection: [],

            params: {
                relationId: "",
                listOperationSewage: [
                    {
                        sewageStationId: "",
                        isRemoteControl: false, //是否支持远程控制
                    },
                ],
            },
        };
    },
    computed: {
        userId() {
            return this.$store.state.userInfo.userId;
        },
    },
    props: ["operationId", "relativeSewage"],
    created() {
        this.getSewageList();
    },
    methods: {
        // 新增运维污水站
        onSubmit() {
            let arr = [];
            this.multipleSelection.forEach((item) => {
                arr.push({
                    sewageStationId: item.id,
                    isRemoteControl: item.isRemoteControl, //是否支持远程控制
                });
            });

            this.params = {
                relationId: this.operationId,
                listOperationSewage: arr,
            };

            AddThirdOperationSewage(
                JSON.parse(JSON.stringify(this.params))
            ).then((res) => {
                if (res) {
                    this.$emit("closeChoiceWsz");
                }
            });
        },

        // 取消选择
        cancelSelect() {
            this.$refs.multipleTable.clearSelection();
        },
        handleSelectionChange(val) {
            this.multipleSelection = JSON.parse(JSON.stringify(val));
        },

        // 污水站列表
        getSewageList() {
            SewageStationSelect({ guid: this.userId }).then((res) => {
                if (res && res.data && res.dYata.length) {
                    res.data.forEach((item) => {
                        item.isRemoteControl = false;
                    });

                    this.tableData = res.data;
                    this.totalCount = res.data.length;

                    // 勾选比较
                    this.$nextTick(() => {
                        if (this.relativeSewage.length) {
                            this.tableData.forEach((_) => {
                                if (_.isInserted) {
                                    this.$refs.multipleTable.toggleRowSelection(
                                        _
                                    );
                                }
                            });
                        }
                    });
                }
            });
        },
        close() {
            this.$emit("closeChoiceWsz");
        },
    },
};
</script>