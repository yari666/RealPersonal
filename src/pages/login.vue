<template>
    <div class="login">
        <div class="main">
            <p class="logo"></p>

            <div class="formbox">
                <ul class="tab">
                    <li class="active"><span>账户登录</span></li>
                    <!-- <li><span>短信登录</span></li> -->
                </ul>

                <div class="label focus">
                    <input
                        type="text"
                        placeholder="账号"
                        class="name"
                        v-model="userName"
                        @focus="inputFocus"
                    />
                </div>
                <div class="label">
                    <input
                        type="password"
                        placeholder="密码"
                        class="password"
                        @focus="inputFocus"
                        v-model="password"
                        @keyup.enter="submit"
                    />
                </div>

                <div class="vbox">
                    <div class="label vcode fl">
                        <input
                            type="text"
                            placeholder="输入验证码"
                            v-model="verificationCode"
                            @keyup.enter="submit"
                            :focus="inputFocus"
                        />
                    </div>
                    <img
                        title="点击刷新"
                        @click="getNum"
                        class="vcodeImg"
                        :src="baseUrl + 'verificationCode/code?v=' + num"
                    />
                </div>

                <div class="error" v-show="showError">
                    {{ errmsg }}
                </div>

                <button class="button" @click="submit">登 录</button>
                <div class="forget">忘记密码?</div>
            </div>
        </div>

        <div class="copyright">Copyright ©2020 沪ICP备133311451号-6</div>
    </div>
</template>

<script>
import { Login, Vcode } from "~/config/api.js";

import { baseUrl } from "~/config/env.js";

export default {
    data() {
        return {
            userName: "",
            password: "",
            verificationCode: "",
            showError: false,
            num: 0,
            errmsg: "用户密码错误，请重新输入",
            baseUrl: "",
        };
    },
    created() {
        this.baseUrl = baseUrl;
    },
    methods: {
        getNum() {
            this.num = Math.random();
        },
        submit() {
            if (!this.userName) {
                this.showError = true;
                this.errmsg = "请输入账号";
                return;
            }

            if (!this.password) {
                this.showError = true;
                this.errmsg = "请输入密码";
                return;
            }

            // if (!this.verificationCode) {
            //     this.showError = true;
            //     this.errmsg = "请输入验证码";
            //     return;
            // }

            Login({
                userName: this.userName,
                password: this.password,
                verificationCode: this.verificationCode,
            })
                .then((res) => {
                    this.getNum();
                    res = res.data;
                    if (res && res.data) {
                        let data = res.data;
                        this.$store.commit("setUserInfo", data);

                        this.$router.push({
                            path: `/?userType=${data.userType}`,
                        });
                    } else {
                        this.showError = true;
                        this.verificationCode = "";
                        this.errmsg = res.msg;
                        return;
                    }
                })
                .catch((err) => {
                    console.log("请求失败：" + err);
                });
        },

        inputFocus() {
            this.showError = false;
        },
    },
};
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    position: relative;
    background: url(../assets/img/bg.jpg) no-repeat;
    background-size: 100% 100%;

    .main {
        width: 75%;
        height: 512px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        p {
            float: left;
            width: calc(~"100% - 490px");
            height: 100%;
            background: url(../assets/img/logo1.png) center no-repeat;
            background-size: contain;
        }

        .formbox {
            float: right;
            width: 340px;
            padding: 42px 38px;
            position: relative;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
            ul {
                height: 40px;
                li {
                    float: left;
                    font-size: 24px;
                    cursor: pointer;
                    &.active {
                        span {
                            padding-bottom: 8px;
                            color: #28adca;
                            border-bottom: 2px solid #28adca;
                        }
                    }
                    // &:first-child {
                    //     &::after {
                    //         content: "";
                    //         display: inline-block;
                    //         width: 1px;
                    //         height: 20px;
                    //         background: #dcdfe6;
                    //         margin: 0 18px;
                    //     }
                    // }
                }
            }
            .vbox {
                overflow: hidden;
            }
            .label {
                width: 340px;
                height: 48px;
                margin-top: 30px;
                &.vcode {
                    width: 200px;
                }

                input {
                    width: 100%;
                    height: 100%;
                    border: 1px solid #28adca;
                    font-size: 16px;
                    color: #28adca;
                    padding: 0 10px;
                    box-sizing: border-box;
                    background: #fff;
                    outline: none;
                    box-shadow: 0px 0px 6px rgba(32, 153, 179, 0.5);
                    &:focus {
                        box-shadow: 0px 0px 6px rgba(255, 182, 54, 0.5);
                        border: 1px solid #f8b332;
                    }
                }
            }
            img.vcodeImg {
                float: right;
                height: 48px;
                margin-top: 30px;
            }

            .error {
                width: 100%;
                height: 44px;
                line-height: 44px;
                margin-top: 11px;
                color: red;
                font-size: 15px;
                background: linear-gradient(
                    to right,
                    rgba(255, 255, 255, 0),
                    rgba(217, 195, 249, 0.35),
                    rgba(255, 255, 255, 0)
                );
            }
            .button {
                width: 340px;
                height: 48px;
                line-height: 48px;
                background: #28adca;
                box-shadow: 12px 0px 51px rgba(5, 103, 124, 0.57);
                color: #daf8ff;
                cursor: pointer;
                margin-top: 48px;
                border: none;
                font-size: 16px;
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