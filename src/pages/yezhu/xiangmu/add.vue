<!---业主-添加/编辑项目----->

<template>
    <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
    >
        <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="ruleForm.projectName"></el-input>
        </el-form-item>

        <el-form-item label="项目负责人" prop="projectLeader">
            <el-input v-model="ruleForm.projectLeader"></el-input>
        </el-form-item>

        <el-form-item label="联系方式">
            <el-input
                v-model="ruleForm.mobilePhone"
                @blur="phoneVer"
                :class="showErr ? 'iserror' : ''"
            ></el-input>
            <div class="el-form-item__error" v-show="showErr">
                请输入正确的手机或座机号(如：010-88888888)
            </div>
        </el-form-item>

        <el-form-item label="项目施工方" prop="contractor">
            <el-input v-model="ruleForm.contractor"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')">{{
                openType == "add" ? "立即创建" : "提交"
            }}</el-button>
            <el-button @click="close('ruleForm')">取消</el-button>
        </el-form-item>
    </el-form>
</template>


<script>
import { AddProject, EditProject } from "~/config/api.js";

export default {
    data() {
        return {
            ruleForm: {
                projectName: "", //项目名称
                projectLeader: "", //项目负责人
                mobilePhone: "", //联系方式
                contractor: "", //施工方名称
                remark: "", //备注
                ownerId: "", //业主企业id
            },
            rules: {
                projectName: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur",
                    },
                ],
            },
            showErr: false,
        };
    },
    props: {
        addItem: Boolean,
        openType: String,
        formData: {
            type: Object,
            default: function () {
                return {
                    id: "",
                    projectName: "",
                    projectLeader: "",
                    mobilePhone: "",
                    contractor: "",
                    remark: "",
                    ownerId: "",
                };
            },
        },
    },
    computed: {
        userId() {
            return this.$store.state.userInfo.userId;
        },
    },
    created() {
        if (this.openType == "edit") {
            this.ruleForm = this.formData;
        }
    },
    methods: {
        phoneVer() {
            if (this.ruleForm.mobilePhone) {
                // 联系方式验证
                let reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
                if (!reg.test(this.ruleForm.mobilePhone)) {
                    this.showErr = true;
                    return;
                } else {
                    this.showErr = false;
                }
            }
        },
        onSubmit(formName) {
            // 表单验证
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.ruleForm.mobilePhone) {
                        // 联系方式验证
                        let reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
                        if (!reg.test(this.ruleForm.mobilePhone)) {
                            this.showErr = true;
                            return;
                        } else {
                            this.showErr = false;
                        }
                    }

                    // 验证通过
                    if (this.openType == "add") {
                        // 新增
                        let params = Object.assign(this.ruleForm, {
                            userId: this.userId,
                        });
                        AddProject(params).then((res) => {
                            if (res) {
                                this.$emit("closeDialog", { refresh: true });
                            }
                        });
                    } else if (this.openType == "edit") {
                        // 编辑
                        let params = Object.assign(this.ruleForm);

                        EditProject(params).then((res) => {
                            if (res) {
                                this.$emit("closeDialog", { refresh: true });
                            }
                        });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },

        close(formName) {
            this.$refs[formName].resetFields();
            this.$emit("closeDialog", { refresh: false });
        },
    },
};
</script>

<style lang="less" scoped>
.box {
    .el-form-item {
        float: left;
        width: 50%;
    }
}
</style>