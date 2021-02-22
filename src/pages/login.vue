<template>
    <div class="login">
        <div class="main">
            <div class="fl">
                <img class="logo" src="../assets/img/logo.jpg" />
            </div>

            <div class="fr">
                <h2>欢迎登录</h2>

                <el-form
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    class="ruleForm"
                >
                    <el-form-item prop="userName">
                        <el-input
                            class="input"
                            type="text"
                            v-model="ruleForm.userName"
                            placeholder="请输入账号"
                            autocomplete="off"
                            prefix-icon="el-icon-user"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input
                            class="input"
                            type="password"
                            placeholder="请输入密码"
                            v-model="ruleForm.pass"
                            autocomplete="off"
                            prefix-icon="el-icon-lock"
                            @keyup.enter.native="submitForm('ruleForm')"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="loginbtn"
                            type="primary"
                            @keyup.enter.native="submitForm('ruleForm')"
                            @click="submitForm('ruleForm')"
                            :loading="loading"
                            >登&nbsp;&nbsp;&nbsp;录</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="copyright">Copyright ©2020 沪ICP备133311451号-6</div>
    </div>
</template>

<script>
import { post } from "~/config/fetch.js";

export default {
    data() {
        return {
            loading: false,
            ruleForm: {
                userName: "",
                pass: "",
            },
            rules: {
                userName: [
                    {
                        required: true,
                        message: "请输入账号",
                        trigger: "blur",
                    },
                ],
                pass: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    post("/api/realname/authenticate/authrization", {
                        userName: this.ruleForm.userName,
                        password: this.ruleForm.pass,
                    })
                        .then((res) => {
                            if (res.isSuccess) {
                                window.localStorage.setItem(
                                    "token",
                                    res.data.accessToken
                                );
                                window.localStorage.setItem(
                                    "userName",
                                    res.data.userName
                                );
                                window.localStorage.setItem(
                                    "userId",
                                    res.data.userId
                                );

                                window.localStorage.setItem(
                                    "isAdd",
                                    res.data.isAdd
                                );

                                this.$store.commit("setUserInfo", {
                                    token: res.data.accessToken,
                                    userId: res.data.userId,
                                    userName: res.data.userName,
                                    isAdd: res.data.isAdd,
                                });
                                this.loading = false;

                                this.$router.push({ path: "/home" });
                            }
                        })
                        .catch((err) => {
                            this.$message.error("登录失败");
                            this.loading = false;
                        });
                } else {
                    console.log("error submit!!");
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

<style lang="less">
.login {
    width: 100%;
    height: 100%;
    position: relative;
    background: url(../assets/img/bg.jpg) no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    .main {
        width: 58%;
        min-width: 360px;
        height: 56vh;
        background: #eef2f5;
        border-radius: 10px;
        box-shadow: 0px 0px 35px 0px rgba(0, 0, 0, 0.31);
        overflow: hidden;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .fl {
            width: 59%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }

        .logo {
            width: 100%;
            height: 100%;
        }

        .fr {
            width: 41%;
            h2 {
                font-size: 30px;
                color: #808080;
                font-weight: 500;
                text-align: center;
                margin-top: 10%;
                letter-spacing: 5px;
            }

            .ruleForm {
                width: 80%;
                margin-left: 10%;
                margin-top: 15%;
            }

            .el-input {
                width: 100%;
                height: 55px;
                line-height: 55px;
                font-size: 20px;
                background: #f6f7f8;
                border: 1px solid #ababab;
                box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.16);
                overflow: hidden;
            }
            .el-input__inner {
                border: none;
                background: #f6f7f8;
                font-size: 16px;
                color: #808080;
                margin-left: 5px;
            }

            .loginbtn {
                margin-top: 10%;
                width: 100%;
                height: 56px;
                background: #0750a7;
                box-shadow: 0px 7px 13px 0px rgba(0, 0, 0, 0.31);
                border: none;
                font-size: 18px;
            }

            .forget {
                float: right;
                color: #28adca;
                margin-top: 6px;
            }
        }
    }

    .copyright {
        color: #333;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>