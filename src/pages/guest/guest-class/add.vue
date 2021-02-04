<template>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="班组编号" prop="visitorTeamCode">
            <el-input
                v-model="form.visitorTeamCode"
                @keyup.enter.native="onSubmit('form')"
            ></el-input>
        </el-form-item>
        <el-form-item label="班组名称" prop="visitorTeamName">
            <el-input
                v-model="form.visitorTeamName"
                @keyup.enter.native="onSubmit('form')"
            ></el-input>
        </el-form-item>
        <el-form-item label="所属企业" prop="companyId">
            <el-select
                v-model="form.companyId"
                placeholder="请选择所属企业"
                style="width: 100%"
                @keyup.enter.native="onSubmit('form')"
            >
                <el-option
                    v-for="item in companyList"
                    :key="item.id"
                    :label="item.companyName"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button
                type="primary"
                @click="onSubmit('form')"
                @keyup.enter.native="submitForm('form')"
                >确定</el-button
            >
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { post, put, get } from "~/config/fetch.js";

export default {
    data() {
        return {
            form: {
                visitorTeamCode: "",
                visitorTeamName: "",
                companyId: "",
                projectId: "",
            },
            projectList: [],
            companyList: [],
            rules: {
                visitorTeamCode: [
                    {
                        required: true,
                        message: "请输入班组编号",
                        trigger: "blur",
                    },
                ],
                visitorTeamName: [
                    {
                        required: true,
                        message: "请输入班组名称",
                        trigger: "blur",
                    },
                ],
                companyId: [
                    {
                        required: true,
                        message: "请选择所属企业",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    props: ["openType", "currentTeam"],
    created() {
        if (this.openType == "edit") {
            this.form = {
                visitorTeamCode: this.currentTeam.visitorTeamCode,
                visitorTeamName: this.currentTeam.visitorTeamName,
                companyId: this.currentTeam.companyId,
            };
        }
        this.getCompany();
    },
    methods: {
        // 获取所属企业
        getCompany() {
            get(`/api/realname/company/company-dictionary`).then((res) => {
                console.log(res);
                if (res.isSuccess) {
                    this.companyList = res.data;
                }
            });
        },

        close() {
            this.$emit("cancel");
        },

        // 提交
        onSubmit(form) {
            let _this = this;
            this.$refs[form].validate((valid) => {
                if (valid) {
                    if (this.openType == "add") {
                        // 新增
                        post(`/api/realname/visitor-team`, _this.form).then(
                            (res) => {
                                if (res.isSuccess) {
                                    this.$message({
                                        message: "新增成功！",
                                        type: "success",
                                    });
                                    _this.$emit("ok");
                                }
                            }
                        );
                    } else if (this.openType == "edit") {
                        // 修改
                        put(
                            `/api/realname/visitor-team/${this.currentTeam.id}`,
                            _this.form
                        ).then((res) => {
                            if (res.isSuccess) {
                                this.$message({
                                    message: "修改成功！",
                                    type: "success",
                                });
                                _this.$emit("ok");
                            }
                        });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        cancel() {
            this.$emit("cancel");
        },
    },
};
</script>