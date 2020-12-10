<!---业主-菜单管理----->
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
                    @click="getMenuList"
                ></el-button>
            </el-input>
            <el-button type="primary" class="fr" @click="add">添加</el-button>
        </div>

        <!-- 表格 -->
        <el-table
            :data="menuList"
            border
            style="width: 100%"
            max-height="700"
            v-loading="isLoad"
        >
            <el-table-column type="index"></el-table-column>
            <el-table-column label="菜单编号" prop="menuCode"></el-table-column>
            <el-table-column label="菜单名称" prop="menuName"></el-table-column>
            <el-table-column label="菜单url" prop="menuUrl"></el-table-column>
            <el-table-column label="菜单图标" prop="menuIcon"></el-table-column>
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
                        @click="removeMenuById(scope.row.id)"
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
            :title="openType == 'edit' ? '编辑菜单' : '创建菜单'"
            :visible.sync="showDialog"
            width="40%"
        >
            <add-menu
                v-if="showDialog"
                :open="showDialog"
                v-on:closedialog="showDialog = $event"
                :refreshList="getMenuList"
                :openType="openType"
                :formData="formData"
            ></add-menu>
        </el-dialog>
    </div>
</template>

<script>
// import areaType from "~/components/areaType";
import addMenu from "./addmenu";
import { getPagedMenus, deleteMenu } from "~/api/sys/menu/menu";

import pagedshow from "~/components/paged";
import { maxResultCount } from "~/config/env";

export default {
    data() {
        return {
            // 获取菜单列表参数
            queryInfo: {
                Keyword: "",
                Sorting: "",
                SkipCount: 0,
                MaxResultCount: maxResultCount,
            },
            // 数据列表
            menuList: [],
            // 是否显示对话框
            showDialog: false,
            // 菜单总数据
            total: 0,
            // 是否显示loading效果
            isLoad: false,
            formData: {
                id: "",
                menuCode: "",
                menuName: "",
                menuUrl: "",
                menuIcon: "",
                isActive: true,
                menuParentId: undefined,
            },
            openType: "",
        };
    },
    created() {
        this.getMenuList();
    },
    components: { pagedshow, addMenu },
    methods: {
        // 得到菜单列表数据
        async getMenuList() {
            this.isLoad = true;
            const { data: result } = await getPagedMenus(
                this.$http,
                this.queryInfo
            );

            if (result !== undefined && result.items !== undefined) {
                this.menuList = result.items;
                this.total = result.totalCount;
            } else {
                this.$message.error("获取菜单列表失败");
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
            this.getMenuList();
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
                menuCode: row.menuCode,
                menuName: row.menuName,
                menuUrl: row.menuUrl,
                menuIcon: row.menuIcon,
                isActive: row.isActive,
                menuParentId: row.menuParentId,
            };
            this.showDialog = true;
        },
        // 删除菜单
        async removeMenuById(id) {
            // 弹出提示是否删除
            const confirmResult = await this.$confirm(
                "此操作将永久删除该菜单, 是否继续?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            ).catch((err) => err);

            // 如果菜单确认删除，则返回字符串confirm
            // 如果菜单取些删除，则返回字符串cancel
            if (confirmResult !== "confirm") {
                return this.$message.info("已取消删除");
            }

            const { data: result } = await deleteMenu(this.$http, id);

            if (result === "") {
                this.getMenuList();
                this.$message.success("菜单删除成功");
            } else {
                this.$message.error("菜单删除失败");
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
