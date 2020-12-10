<!---业主-角色管理----->
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
                    @click="getRoleList"
                ></el-button>
            </el-input>
            <el-button type="primary" class="fr" @click="add">添加</el-button>
        </div>

        <!-- 表格 -->
        <el-table
            :data="roleList"
            border
            style="width: 100%"
            max-height="700"
            v-loading="isLoad"
        >
            <el-table-column type="index"></el-table-column>
            <el-table-column label="角色编号" prop="roleCode"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
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
            <el-table-column label="备注" prop="remark"></el-table-column>
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
                        @click="removeRoleById(scope.row.id)"
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
            :title="openType == 'edit' ? '编辑角色' : '创建角色'"
            :visible.sync="showDialog"
            width="40%"
        >
            <add-role
                v-if="showDialog"
                :open="showDialog"
                v-on:closedialog="showDialog = $event"
                :refreshList="getRoleList"
                :openType="openType"
                :formData="formData"
            ></add-role>
        </el-dialog>
    </div>
</template>

<script>
// import areaType from "~/components/areaType";
import addRole from "./addrole";
import { getPagedRoles, deleteRole } from "~/api/sys/role/role";

import pagedshow from "~/components/paged";
import { maxResultCount } from "~/config/env";

export default {
    data() {
        return {
            // 获取角色列表参数
            queryInfo: {
                Keyword: "",
                Sorting: "",
                SkipCount: 0,
                MaxResultCount: maxResultCount,
            },
            // 数据列表
            roleList: [],
            // 是否显示对话框
            showDialog: false,
            // 角色总数据
            total: 0,
            // 是否显示loading效果
            isLoad: false,
            formData: {
                id: "",
                roleCode: "",
                roleName: "",
                remark: "",
                isActive: true,
                selectedMenu: [],
            },
            openType: "",
        };
    },
    created() {
        this.getRoleList();
    },
    components: { pagedshow, addRole },
    methods: {
        // 得到角色列表数据
        async getRoleList() {
            this.isLoad = true;
            const { data: result } = await getPagedRoles(
                this.$http,
                this.queryInfo
            );

            if (result !== undefined && result.items !== undefined) {
                this.roleList = result.items;
                this.total = result.totalCount;
            } else {
                this.$message.error("获取角色列表失败");
            }
            this.isLoad = false;
        },
        // 监听 pageSize改变的事件
        handleSizeChange(newSize) {
            this.queryInfo.MaxResultCount = newSize;
            this.queryInfo.SkipCount = 0;
            this.getRoleList();
        },
        // 监听 页码值 改变的事件
        handleCurrentChange(newPage) {
            this.queryInfo.SkipCount =
                (newPage - 1) * this.queryInfo.MaxResultCount;
            this.getRoleList();
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
                roleCode: row.roleCode,
                roleName: row.roleName,
                remark: row.remark,
                isActive: row.isActive,
                selectedMenu: row.menuIdList,
            };
            this.showDialog = true;
        },
        // 删除角色
        async removeRoleById(id) {
            // 弹出提示是否删除
            const confirmResult = await this.$confirm(
                "此操作将永久删除该角色, 是否继续?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            ).catch((err) => err);

            // 如果角色确认删除，则返回字符串confirm
            // 如果角色取些删除，则返回字符串cancel
            if (confirmResult !== "confirm") {
                return this.$message.info("已取消删除");
            }

            const { data: result } = await deleteRole(this.$http, id);

            if (result === "") {
                this.getRoleList();
                this.$message.success("角色删除成功");
            } else {
                this.$message.error("角色删除失败");
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

