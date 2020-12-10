<template>
    <div>
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
                    @click="getAdminUserList"
                ></el-button>
            </el-input>
            <el-button type="primary" class="fr" @click="add">添加</el-button>
        </div>

        <!-- 表格 -->
        <el-table
            :data="userAdminList"
            border
            style="width: 100%"
            max-height="700"
            v-loading="isLoadAdmin"
        >
            <el-table-column type="index"></el-table-column>
            <el-table-column
                label="账号/手机号"
                prop="mobilePhone"
            ></el-table-column>
            <el-table-column label="真实姓名" prop="realName"></el-table-column>
            <el-table-column label="角色" prop="roleName"></el-table-column>
            <el-table-column label="开通时间" prop="turnonDate">
                <template slot-scope="scope">
                    <span>
                        {{
                            scope.row.turnonDate.substr(
                                0,
                                scope.row.turnonDate.indexOf("T")
                            )
                        }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="到期时间" prop="expirationDate">
                <template slot-scope="scope">
                    <span>
                        {{
                            scope.row.expirationDate.substr(
                                0,
                                scope.row.expirationDate.indexOf("T")
                            )
                        }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createDate">
                <template slot-scope="scope">
                    <span>
                        {{
                            scope.row.createDate.substr(
                                0,
                                scope.row.createDate.indexOf("T")
                            )
                        }}
                    </span>
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
                        @click="removeUserById(scope.row.id)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
            <pagedadminshow
                :totalAdmin="totalAdmin"
                :queryInfo="queryInfo"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
            ></pagedadminshow>
        </div>

        <!-- 弹框内容 -->
        <el-dialog
            :title="openType == 'edit' ? '修改平台账号' : '创建平台账号'"
            :visible.sync="showAdminDialog"
            width="40%"
        >
            <add-admin-user
                v-if="showAdminDialog"
                :open="showAdminDialog"
                v-on:closeadmindialog="showAdminDialog = $event"
                :refreshList="getAdminUserList"
                :openType="openType"
                :formData="formData"
            ></add-admin-user>
        </el-dialog>
    </div>
</template>

<script>
// import areaType from "~/components/areaType";
import addAdminUser from "./addadminuser";
import { getPagedUsers, deleteUser } from "~/api/sys/user/user";

import pagedadminshow from "~/components/paged";
import { maxResultCount } from "~/config/env";

export default {
    data() {
        return {
            // 获取账号列表参数
            queryInfo: {
                Keyword: "",
                Sorting: "",
                SkipCount: 0,
                MaxResultCount: maxResultCount,
            },
            // 数据列表
            userAdminList: [],
            // 是否显示对话框
            showAdminDialog: false,
            // 账号总数据
            totalAdmin: 0,
            // 是否显示loading效果
            isLoadAdmin: false,
            formData: {
                id: "",
                realName: "",
                mobilePhone: "",
                turnonDate: "",
                expirationDate: "",
                // 写死，表示平台账号
                userType: 4,
                roleId: undefined,
            },
            openType: "",
        };
    },
    components: { pagedadminshow, addAdminUser },
    created() {
        this.getAdminUserList();
    },
    methods: {
        // 得到账号列表数据
        async getAdminUserList() {
            this.isLoadAdmin = true;
            const { data: result } = await getPagedUsers(
                this.$http,
                this.queryInfo
            );

            if (result !== undefined && result.items !== undefined) {
                this.userAdminList = result.items;
                this.totalAdmin = result.totalCount;
            } else {
                this.$message.error("获取账号列表失败");
            }
            this.isLoadAdmin = false;
        },
        // 监听 pageSize改变的事件
        handleSizeChange(newSize) {
            this.queryInfo.MaxResultCount = newSize;
            this.queryInfo.SkipCount = 0;
            this.getAdminUserList();
        },
        // 监听 页码值 改变的事件
        handleCurrentChange(newPage) {
            this.queryInfo.SkipCount =
                (newPage - 1) * this.queryInfo.MaxResultCount;
            this.getAdminUserList();
        },
        // 打开新增对话框
        add() {
            this.showAdminDialog = true;
            this.openType = "add";
        },
        // 打开编辑框
        editDialog(row) {
            this.openType = "edit";

            this.formData = {
                id: row.id,
                realName: row.realName,
                mobilePhone: row.mobilePhone,
                turnonDate: row.turnonDate,
                expirationDate: row.expirationDate,
                // 写死，表示平台账号
                userType: 4,
                roleId: row.roleId,
            };
            this.showAdminDialog = true;
        },
        // 删除账号
        async removeUserById(id) {
            // 弹出提示是否删除
            const confirmResult = await this.$confirm(
                "此操作将永久删除该账号, 是否继续?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            ).catch((err) => err);

            // 如果账号确认删除，则返回字符串confirm
            // 如果账号取些删除，则返回字符串cancel
            if (confirmResult !== "confirm") {
                return this.$message.info("已取消删除");
            }

            const { data: result } = await deleteUser(this.$http, id);

            if (result === "") {
                this.getAdminUserList();
                this.$message.success("账号删除成功");
            } else {
                this.$message.error("账号删除失败");
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
