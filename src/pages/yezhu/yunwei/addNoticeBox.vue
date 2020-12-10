<template>
    <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
    >
        <el-form-item label="标题" prop="name" style="width: 60%">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="运维方" prop="type">
            <el-checkbox-group v-model="ruleForm.type" @change="handleChecked">
                <el-checkbox
                    v-for="(item, index) in operationCompanyList"
                    :key="index"
                    :label="item.id"
                    name="type"
                    >{{ item.companyName }}</el-checkbox
                >
            </el-checkbox-group>
        </el-form-item>

        <el-form-item label="内容">
            <editor
                ref="editor"
                :content="ruleForm.content"
                @editorFocus="editorFocus"
                @submitForm="submitForm"
            ></editor>
            <div v-show="showErr" class="el-form-item__error">
                请填写通知内容
            </div>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm()">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { ThirdOperationCompany, AddNotice } from "~/config/api.js";
import editor from "~/components/editor";

export default {
    data() {
        return {
            ruleForm: {
                name: "",
                type: [],
                content: "",
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请填写通知标题",
                        trigger: "blur",
                    },
                ],
                type: [
                    {
                        type: "array",
                        required: true,
                        message: "请至少选择一个运维公司",
                        trigger: "change",
                    },
                ],
            },
            operationCompanyList: [], //运维公司
            showErr: false,
        };
    },
    components: { editor },
    created() {
        this.getOperationCompanyList();
    },
    computed: {
        companyId() {
            return this.$store.state.userInfo.companyId;
        },
    },
    methods: {
        handleChecked(value) {},
        editorFocus() {
            this.showErr = false;
        },
        // 获取运维企业列表
        getOperationCompanyList() {
            ThirdOperationCompany({ KeyWord: this.KeyWord }).then((res) => {
                if (res && res.data) {
                    this.operationCompanyList = res.data;
                }
            });
        },
        submitForm(e) {
            if (e) this.ruleForm.content = e.editorContent;

            if (!this.ruleForm.content) {
                this.showErr = true;
                return;
            } else {
                this.showErr = false;
            }
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    let params = {
                        noticeTitle: this.ruleForm.name,
                        noticeContent: this.ruleForm.content,
                        companyId: this.ruleForm.type[0], //运维企业id
                        ownerId: this.companyId, //业主企业id
                    };

                    AddNotice(params).then((res) => {
                        this.$message({
                            message: "新增成功",
                            type: "success",
                        });
                        this.$emit("closeDialog");
                    });
                } else {
                    this.$message.error("新增失败");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};
</script>