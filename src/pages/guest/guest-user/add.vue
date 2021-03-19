<template>
    <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        @keyup.enter.native="onSubmit('form')"
        @click.native.prevent
    >
        <el-form-item label="工号">
            <el-input v-model="form.workNumber"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="form.employeeName"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
            <el-input v-model="form.idNumber"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
            <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="管理人员岗位">
            <el-input v-model="form.managerialPosition"></el-input>
        </el-form-item>
        <el-form-item label="工种">
            <el-select
                v-model="form.workType"
                placeholder="请选择工种"
                style="width: 100%"
            >
                <el-option
                    v-for="item in workTypeData"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="计划用工时间">
            <el-date-picker
                v-model="form.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeDate"
            >
            </el-date-picker>
        </el-form-item>

        <el-form-item label="所属项目">
            <el-select
                v-model="form.projectId"
                placeholder="请选择活动区域"
                style="width: 100%"
            >
                <el-option
                    v-for="item in projectData"
                    :key="item.id"
                    :label="item.projectName"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属班组">
            <el-input v-model="form.teamName"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button
                type="primary"
                @click="onSubmit('form')"
                :loading="loading"
                >确定</el-button
            >
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { get, post, put } from "~/config/fetch.js";
const timestamp = require("time-stamp");

export default {
    data() {
        return {
            loading: false,
            form: {
                workNumber: "",
                employeeName: "",
                idNumber: "",
                phoneNumber: "",
                scheduleStartDate: "",
                scheduleEndDate: "",
                managerialPosition: "",
                workType: "",
                teamName: "",
                companyId: "",
                projectId: "",
            },
            date: "",
            projectData: [],
            teamData: [],
            workTypeData: [],

            rules: {
                employeeName: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    props: ["openType", "currentItem"],
    created() {
        this.getProject();
        this.getWorkType();
    },
    methods: {
        changeDate(val) {
            console.log(val);
        },
        onSubmit(formName) {
            let _this = this;

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    let param = {
                        workNumber: _this.currentItem.workNumber,
                        employeeName: _this.currentItem.employeeName,
                        idNumber: _this.currentItem.idNumber,
                        phoneNumber: _this.currentItem.phoneNumber,
                        scheduleStartDate: timestamp(
                            "YYYY-MM-DD",
                            new Date(_this.form.date[0])
                        ),
                        scheduleEndDate: timestamp(
                            "YYYY-MM-DD",
                            new Date(_this.form.date[1])
                        ),
                        managerialPosition:
                            _this.currentItem.managerialPosition,
                        workType: _this.currentItem.workType,
                        teamName: _this.currentItem.teamName,
                        companyId: _this.currentItem.companyId,
                        projectId: _this.currentItem.projectId,
                    };

                    // 新增
                    if (this.openType == "add") {
                        post(`/api/realname/employee`, param)
                            .then((res) => {
                                if (res.isSuccess) {
                                    this.$message({
                                        message: "新增成功！",
                                        type: "success",
                                    });
                                    this.$emit("ok");
                                }
                            })
                            .catch((err) => {
                                this.loading = false;
                            });
                    } else if (this.openType == "edit") {
                        // 修改
                        put(
                            `/api/realname/employee/${_this.currentItem.id}`,
                            param
                        )
                            .then((res) => {
                                if (res.isSuccess) {
                                    this.$message({
                                        message: "修改成功！",
                                        type: "success",
                                    });
                                    this.$emit("ok");
                                }
                            })
                            .catch((err) => {
                                this.loading = false;
                            });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 项目下拉
        getProject() {
            get(`/api/realname/project/project-dictionary`).then((res) => {
                if (res.isSuccess) {
                    this.projectData = res.data;
                }
            });
        },

        // 项目人员类型
        getWorkType() {
            get(`/api/realname/employee/employee-type`).then((res) => {
                if (res.isSuccess) {
                    this.workTypeData = res.data;
                }
            });
        },
    },
};
</script>