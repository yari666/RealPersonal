<!---业主-字典管理----->
<template>
    <div class="main">
        <!-- 筛选项 -->
        <div class="search-box">
            <el-input
                placeholder="请输入内容"
                v-model="queryInfo.Keyword"
                clearable
            >
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="getDictionaryList"
                ></el-button>
            </el-input>
            <el-button type="primary" class="fr" @click="add">添加</el-button>
        </div>

        <!-- 表格 -->
        <el-table
            :data="dictionaryList"
            border
            style="width: 100%"
            max-height="700"
            v-loading="isLoad"
        >
            <el-table-column type="index"></el-table-column>
            <el-table-column label="字典编号" prop="dicCode"></el-table-column>
            <el-table-column label="字典名称" prop="dicName"></el-table-column>
            <el-table-column
                label="字典组名"
                prop="groupName"
            ></el-table-column>
            <el-table-column label="是否激活" prop="isActive">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.isActive"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column width="180px" label="操作">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="mini"
                        @click="editDialog(scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="removeDictionaryById(scope.row.id)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
            <pagedshow
                :total="total"
                :queryInfo="queryInfo"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
            ></pagedshow>
        </div>

        <!-- 弹框内容 -->
        <el-dialog
            :title="openType == 'edit' ? '编辑字典' : '创建字典'"
            :visible.sync="showDialog"
            width="40%"
        >
            <add-dictionary
                v-if="showDialog"
                :open="showDialog"
                v-on:closedialog="showDialog = $event"
                :refreshList="getDictionaryList"
                :openType="openType"
                :formData="formData"
            ></add-dictionary>
        </el-dialog>
    </div>
</template>

<script>
// import areaType from "~/components/areaType";
import addDictionary from "./adddictionary";
import {
    getPagedDictionarys,
    deleteDictionary,
} from "~/api/sys/dictionary/dictionary";

import pagedshow from "~/components/paged";
import { maxResultCount } from "~/config/env";

export default {
    data() {
        return {
            // 获取字典列表参数
            queryInfo: {
                Keyword: "",
                Sorting: "",
                SkipCount: 0,
                MaxResultCount: maxResultCount,
            },
            // 数据列表
            dictionaryList: [],
            // 是否显示对话框
            showDialog: false,
            // 字典总数据
            total: 0,
            // 是否显示loading效果
            isLoad: false,
            formData: {
                id: "",
                dicCode: "",
                dicName: "",
                groupName: "",
                isActive: true,
                parentDicId: undefined,
            },
            openType: "",
        };
    },
    components: { pagedshow, addDictionary },
    created() {
        this.getDictionaryList();
    },
    methods: {
        // 得到字典列表数据
        async getDictionaryList() {
            this.isLoad = true;
            const { data: result } = await getPagedDictionarys(
                this.$http,
                this.queryInfo
            );

            if (result !== undefined && result.items !== undefined) {
                this.dictionaryList = result.items;
                this.total = result.totalCount;
            } else {
                this.$message.error("获取字典列表失败");
            }
            this.isLoad = false;
        },
        // 监听 pageSize改变的事件
        handleSizeChange(newSize) {
            this.queryInfo.MaxResultCount = newSize;
            this.queryInfo.SkipCount = 0;
            this.getMenuList();
        },
        // 监听 页码值 改变的事件
        handleCurrentChange(newPage) {
            this.queryInfo.SkipCount =
                (newPage - 1) * this.queryInfo.MaxResultCount;
            this.getDictionaryList();
        },
        // 打开新增对话框
        add() {
            this.showDialog = true;
            this.openType = "add";
        },
        // 打开编辑框
        editDialog(row) {
            this.openType = "edit";

            this.formData = {
                id: row.id,
                dicCode: row.dicCode,
                dicName: row.dicName,
                groupName: row.groupName,
                isActive: row.isActive,
                parentDicId: row.parentDicId,
            };
            this.showDialog = true;
        },
        // 删除字典
        async removeDictionaryById(id) {
            // 弹出提示是否删除
            const confirmResult = await this.$confirm(
                "此操作将永久删除该字典, 是否继续?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            ).catch((err) => err);

            // 如果字典确认删除，则返回字符串confirm
            // 如果字典取些删除，则返回字符串cancel
            if (confirmResult !== "confirm") {
                return this.$message.info("已取消删除");
            }

            const { data: result } = await deleteDictionary(this.$http, id);

            if (result === "") {
                this.getDictionaryList();
                this.$message.success("字典删除成功");
            } else {
                this.$message.error("字典删除失败");
            }
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
    margin-bottom: 10px;
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
</style>
