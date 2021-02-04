<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="userName">
            <el-input
                v-model="form.userName"
                @keyup.enter.native="onSubmit('form')"
            ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
            <el-input
                v-model="form.name"
                @keyup.enter.native="onSubmit('form')"
            ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phoneNumber">
            <el-input
                v-model="form.phoneNumber"
                @keyup.enter.native="onSubmit('form')"
            ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input
                v-model="form.email"
                @keyup.enter.native="onSubmit('form')"
            ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
            <el-select
                placeholder="角色"
                v-model="form.roleId"
                style="width: 100%"
            >
                <el-option
                    v-for="item in roleList"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="开通时间" required>
            <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.date1"
                        style="width: 100%"
                    ></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-form-item prop="time1">
                    <el-time-picker
                        placeholder="选择时间"
                        v-model="form.time1"
                        style="width: 100%"
                    ></el-time-picker>
                </el-form-item>
            </el-col>
        </el-form-item>

        <el-form-item label="到期时间" required>
            <el-col :span="11">
                <el-form-item prop="date2">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.date2"
                        style="width: 100%"
                    ></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-form-item prop="time2">
                    <el-time-picker
                        placeholder="选择时间"
                        v-model="form.time2"
                        style="width: 100%"
                    ></el-time-picker>
                </el-form-item>
            </el-col>
        </el-form-item>

        <el-form-item>
            <el-button
                type="primary"
                @click="onSubmit('form')"
                @keyup.enter.native="onSubmit('form')"
                >确定</el-button
            >
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>


<script>
import { get, post, put } from "~/config/fetch.js";
const timestamp = require("time-stamp");

export default {
    data() {
        return {
            form: {
                email: "",
                expirationDate: "",
                id: "",
                name: "",
                phoneNumber: "",
                roleId: "",
                roleName: "",
                turnonDate: "",
                userName: "",
                date1: "",
                date2: "",
                time1: "",
                time2: "",
            },
            roleList: [],
            rules: {
                userName: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                ],
                name: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur",
                    },
                ],
                phoneNumber: [
                    {
                        required: true,
                        message: "请输入联系方式",
                        trigger: "blur",
                    },
                ],
                email: [
                    {
                        type: "email",
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur",
                    },
                ],
                roleId: [
                    {
                        required: true,
                        message: "请选择角色",
                        trigger: "change",
                    },
                ],
                date1: [
                    {
                        type: "date",
                        required: true,
                        message: "请选择开通日期",
                        trigger: "change",
                    },
                ],
                date2: [
                    {
                        type: "date",
                        required: true,
                        message: "请选择到期日期",
                        trigger: "change",
                    },
                ],
                time1: [
                    {
                        type: "date",
                        required: true,
                        message: "请选择开通时间",
                        trigger: "change",
                    },
                ],
                time2: [
                    {
                        type: "date",
                        required: true,
                        message: "请选择到期时间",
                        trigger: "change",
                    },
                ],
            },
        };
    },
    props: ["openType", "currentItem"],
    watch: {
        currentItem: {
            handler(newName, oldName) {
                this.currentItem = newName;

                this.form = Object.assign(this.form, newName);
                if (newName.turnonDate) {
                    this.form.date1 = this.form.time1 = new Date(
                        newName.turnonDate
                    );
                }
                if (newName.expirationDate) {
                    this.form.date2 = this.form.time2 = new Date(
                        newName.expirationDate
                    );
                }
            },
            immediate: true,
            deep: true,
        },
    },
    created() {
        this.getRole();
        this.form = Object.assign(this.form, this.currentItem);
    },
    methods: {
        getRole() {
            get(`/api/realname/role/role`).then((res) => {
                if (res.isSuccess) {
                    this.roleList = res.data;
                }
            });
        },
        onSubmit(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {
                        email: _this.form.email,
                        userName: _this.form.userName,
                        name: _this.form.name,
                        phoneNumber: _this.form.phoneNumber,
                        roleId: _this.form.roleId,
                        roleName: _this.form.roleName,
                        turnonDate:
                            timestamp(
                                "YYYY-MM-DD",
                                new Date(_this.form.date1)
                            ) +
                            " " +
                            timestamp("HH:mm:ss", new Date(_this.form.time1)),
                        expirationDate:
                            timestamp(
                                "YYYY-MM-DD",
                                new Date(_this.form.date1)
                            ) +
                            " " +
                            timestamp("HH:mm:ss", new Date(_this.form.time2)),
                    };
                    if (_this.openType == "add") {
                        // 新增
                        post(`/api/realname/user`, param).then((res) => {
                            if (res.isSuccess) {
                                _this.$message({
                                    message: "新增成功！",
                                    type: "success",
                                });
                                this.$emit("ok");
                            }
                        });
                    } else {
                        // 编辑
                        put(
                            `/api/realname/user/${_this.currentItem.id}`,
                            param
                        ).then((res) => {
                            if (res.isSuccess) {
                                _this.$message({
                                    message: "修改成功！",
                                    type: "success",
                                });
                                this.$emit("ok");
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

<style lang="less" scoped>
.line {
    text-align: center;
}
</style>