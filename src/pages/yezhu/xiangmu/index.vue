<!---业主-项目管理----->
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
                <el-button type="primary" @click="addProject()" class="add-btn"
                    >新增</el-button
                >
                <el-button
                    type="primary"
                    class="ml10"
                    style="background: #28adca"
                    >导出数据</el-button
                >
            </div>
        </div>

        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%" max-height="700">
            <el-table-column
                prop="projectName"
                label="项目名称"
            ></el-table-column>

            <el-table-column
                prop="projectLeader"
                width="120px"
                label="项目负责人"
            ></el-table-column>

            <el-table-column
                prop="mobilePhone"
                width="120px"
                label="联系方式"
            ></el-table-column>

            <el-table-column
                prop="contractor"
                label="项目施工方"
            ></el-table-column>

            <el-table-column
                prop="sewageStationCount"
                width="100px"
                label="污水站数量"
            ></el-table-column>

            <el-table-column
                prop="deviceCount"
                width="100px"
                label="设备数量"
            ></el-table-column>

            <el-table-column
                prop="creationTime"
                width="150px"
                label="创建时间"
            ></el-table-column>

            <el-table-column width="120px" label="附件" class="files">
                <template slot-scope="scope">
                    <div @click="Files(scope.row)">
                        <i class="el-icon-paperclip base-font"></i
                        >{{ scope.row.attachmentsList.length || 0 }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="remark" label="备注"></el-table-column>

            <el-table-column width="180px" label="操作">
                <template slot-scope="scope">
                    <span class="base-font" @click="editProject(scope.row)"
                        >编辑</span
                    >
                    <span
                        class="ml10 danger-font"
                        @click="delProject(scope.row)"
                        >删除</span
                    >
                </template>
            </el-table-column>
        </el-table>

        <!-- 弹框内容 -->
        <el-dialog
            :close-on-click-modal="false"
            :title="openType == 'add' ? '创建项目' : '编辑项目'"
            :visible.sync="addItem"
            width="40%"
        >
            <add-project
                v-if="addItem"
                :addItem="addItem"
                :formData="formData"
                :openType="openType"
                @closeDialog="closeDialog"
            ></add-project>
        </el-dialog>

        <!-- 上传附件 -->
        <el-dialog
            :close-on-click-modal="false"
            title="附件列表"
            :visible.sync="showFiles"
            width="40%"
            @close="closeDialog"
        >
            <upload-file
                v-if="showFiles"
                :projectId="projectId"
                :projectName="projectName"
                :uploadList="uploadList"
                @closeDialog="closeDialog"
            ></upload-file>
        </el-dialog>

        <!-- 分页 -->
        <div class="block">
            <el-pagination
                @current-change="handleCurrentChange"
                :page-size="params.MaxResultCount"
                layout="prev, pager, next, jumper"
                :total="totalCount"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
const timestamp = require("time-stamp");

import areaType from "~/components/areaType";
import addProject from "./add";
import uploadFile from "~/components/uploadFile";
import {
    ProjectList,
    AddProject,
    EditProject,
    DelProject,
} from "~/config/api.js";

export default {
    data() {
        return {
            totalCount: 0,
            tableData: [],
            addItem: false, //打开弹框
            openType: "", //弹框打开方式

            projectId: "",
            projectName: "",
            showFiles: false, //上传附件

            params: {
                KeyWord: "",
                Sorting: "",
                SkipCount: 0, //跨过几条
                MaxResultCount: 10, //每页显示10条
            },

            formData: {
                id: "", //项目id
                projectName: "", //项目名称
                projectLeader: "", //项目负责人
                mobilePhone: "", //联系方式
                contractor: "", //施工方名称
                remark: "", //备注
                ownerId: "", //业主企业id
            },
            uploadList: [], //项目列表
        };
    },
    components: { areaType, addProject, uploadFile },
    created() {
        this.getProjectList();
    },
    computed: {
        userId() {
            return this.$store.state.userInfo.userId;
        },
    },
    methods: {
        // 查询
        search() {
            this.params.SkipCount = 0;
            this.getProjectList();
        },

        // 获取项目列表
        getProjectList() {
            let obj = Object.assign({}, this.params, { UserId: this.userId });

            ProjectList(obj).then((res) => {
                if (res && res.data) {
                    this.totalCount = res.data.totalCount;

                    res.data.items.forEach((item) => {
                        item.creationTime = timestamp(
                            "YYYY-MM-DD HH:mm:ss",
                            new Date(item.creationTime)
                        );
                    });
                    this.tableData = res.data.items;
                }
            });
        },

        // 新增项目
        addProject() {
            this.openType = "add";
            this.addItem = true;
        },

        // 修改项目
        editProject(row) {
            this.openType = "edit";

            this.formData = {
                id: row.id,
                ownerId: row.ownerId,
                projectName: row.projectName, //项目名称
                projectLeader: row.projectLeader, //项目负责人
                mobilePhone: row.mobilePhone, //联系方式
                contractor: row.contractor, //施工方名称
                remark: row.remark, //备注
            };

            this.addItem = true;
        },

        // 删除项目
        delProject(row) {
            this.$confirm("是否确定删除此项目?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    DelProject({ Id: row.id }).then((res) => {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        this.getProjectList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },

        // 关闭弹框
        closeDialog(e) {
            this.addItem = false;
            this.showFiles = false;
            this.getProjectList();
        },

        // 切换页
        handleCurrentChange(val) {
            this.params.SkipCount = parseInt(
                (val - 1) * this.params.MaxResultCount
            );
            this.getProjectList();
        },

        // 上传附件
        Files(row) {
            this.projectId = row.id;
            this.projectName = row.projectName;
            this.uploadList = row.attachmentsList;
            this.showFiles = true;
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

.ml10 {
    margin-left: 10px;
}
.el-icon-paperclip {
    font-size: 16px;
}

.files {
    cursor: pointer;
}

.el-input {
    width: 400px;
}
</style>