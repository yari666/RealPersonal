<template>
    <el-form
        :model="form"
        :rules="rules"
        :inline="true"
        ref="form"
        label-width="100px"
        class="keybind"
        @keyup.enter.native="onSubmit('form')"
        @click.native.prevent
    >
        <el-form-item label="指纹密钥" prop="key">
            <el-input v-model="form.key" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<style lang="less">
.keybind {
    .el-form-item {
        width: 25%;
    }
    .is-required {
        width: 70%;
        .el-form-item__content {
            width: calc(~"100% - 100px");
        }
    }
}
</style>

<script>
import { put } from "~/config/fetch.js";

export default {
    data() {
        return {
            loading: false,
            form: {
                key: "",
            },
            rules: {
                key: [
                    {
                        required: true,
                        message: "请输入指纹密钥",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    props: ["currentId", "fingerPrint"],
    created() {},
    watch: {
        currentId(to, old) {
            this.currentId = to;
        },
        fingerPrint(to, old) {
            this.fingerPrint = to;
            this.form.key = to;
        },
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    put(`/api/realname/project/project-finger-print`, {
                        projectid: this.currentId,
                        fingerprint: this.form.key,
                    })
                        .then((res) => {
                            if (res.isSuccess) {
                                this.$message({
                                    message: "提交成功！",
                                    type: "success",
                                });
                                this.$emit("ok");
                            }
                        })
                        .catch((err) => {
                            this.loading = false;
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
};
</script>