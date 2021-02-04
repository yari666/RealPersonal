<template>
    <el-form
        :model="revisePasswordForm"
        :rules="rules"
        ref="revisePasswordForm"
        label-width="80px"
        class="demo-ruleForm"
    >
        <el-form-item label="原密码" prop="oldpass">
            <el-input
                type="password"
                v-model="revisePasswordForm.oldpass"
                auto-complete="off"
            ></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="pass">
            <el-input
                type="password"
                v-model="revisePasswordForm.pass"
                auto-complete="off"
            ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
            <el-input
                type="password"
                v-model="revisePasswordForm.checkPass"
                auto-complete="off"
            ></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('revisePasswordForm')"
                >确定</el-button
            >
            <el-button @click="cancel('revisePasswordForm')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.revisePasswordForm.checkPass !== "") {
                    this.$refs.revisePasswordForm.validateField("checkPass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.revisePasswordForm.pass) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            revisePasswordForm: {
                oldpass: "",
                pass: "",
                checkPass: "",
            },
            rules: {
                oldpass: [{ validator: validatePass, trigger: "blur" }],
                pass: [{ validator: validatePass, trigger: "blur" }],
                checkPass: [{ validator: validatePass2, trigger: "blur" }],
            },
        };
    },
    props: ["showRevisePassword"],
    computed: {
        userId() {
            return this.$store.state.userInfo.userId;
        },
    },
    methods: {
        submitForm(formName) {
            let _this = this;

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 调取修改密码接口
                    UserPwd({
                        id: _this.userId,
                        oldPwd: _this.revisePasswordForm.oldpass,
                        newPwd: _this.revisePasswordForm.pass,
                    }).then((res) => {
                        res = res.data;
                        if (res && res.resultCode) {
                            this.$message({
                                message: "修改成功",
                                type: "success",
                            });

                            this.$emit("revisePass");
                        } else {
                            this.$message.error("修改失败，请稍后再试。");
                        }
                    });
                }
            });
        },
        cancel(formName) {
            this.$refs[formName].resetFields();
            this.$emit("revisePass");
        },
    },
};
</script>