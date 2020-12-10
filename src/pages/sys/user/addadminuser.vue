<!----平台 添加/编辑项目----->

<template>
    <div>
        <el-form
            ref="formRef"
            :model="form"
            :rules="formRules"
            label-width="100px"
        >
            <el-form-item label="账号/手机号" prop="mobilePhone">
                <el-input v-model="form.mobilePhone"></el-input>
            </el-form-item>
            <el-form-item label="真实名称" prop="realName">
                <el-input v-model="form.realName"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="roleId">
                <el-select v-model="form.roleId" placeholder="请选择">
                    <el-option
                        v-for="item in roleIdList"
                        :key="item.id"
                        :label="item.roleName"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开通时间" prop="turnonDate">
                <el-date-picker
                    v-model="form.turnonDate"
                    type="date"
                    placeholder="选择日期"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="到期时间" prop="expirationDate">
                <el-date-picker
                    v-model="form.expirationDate"
                    type="date"
                    placeholder="选择日期"
                >
                </el-date-picker>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('closeadmindialog', false)"
                >取 消</el-button
            >
            <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
    </div>
</template>

<script>
import { createUser, updateUser } from "~/api/sys/user/user";

import { getRoleDropdown } from "~/api/sys/role/role";

export default {
    data() {
        return {
            form: {
                id: "",
                realName: "",
                mobilePhone: "",
                turnonDate: "",
                expirationDate: "",
                // 写死，表示平台账号
                userType: 4,
                roleId: undefined,
            },
            roleIdList: [],
            formRules: {
                mobilePhone: [
                    {
                        required: true,
                        message: "请输入账号/手机号",
                        trigger: "blur",
                    },
                ],
                realName: [
                    {
                        required: true,
                        message: "请输入真实名称",
                        trigger: "blur",
                    },
                ],
                roleId: [
                    { required: true, message: "请选择角色", trigger: "blur" },
                ],
                turnonDate: [
                    {
                        required: true,
                        message: "请选择开通时间",
                        trigger: "blur",
                    },
                ],
                expirationDate: [
                    {
                        required: true,
                        message: "请选择到期时间",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    props: {
        refreshList: {
            type: Function,
            default: null,
        },
        openType: String,
        formData: {
            type: Object,
            default: function () {
                return {
                    id: "",
                    realName: "",
                    mobilePhone: "",
                    turnonDate: "",
                    expirationDate: "",
                    // 写死，表示平台账号
                    userType: 4,
                    roleId: undefined,
                };
            },
        },
    },
    created() {
        if (this.openType == "edit") {
            this.form = this.formData;
        } else {
            this.form.id = "";
            this.form.realName = "";
            this.form.mobilePhone = "";
            this.form.turnonDate = "";
            this.form.expirationDate = "";
            this.form.userType = 4;
            this.form.roleId = undefined;
        }

        this.getRoleList();
    },
    methods: {
        // 得到角色下拉列表
        async getRoleList() {
            const { data: result } = await getRoleDropdown(this.$http);

            if (result !== undefined) {
                this.roleIdList = result;
            }
        },
        onSubmit() {
            this.$refs.formRef.validate(async (valid) => {
                if (!valid) {
                    return;
                }

                if (this.openType != "edit") {
                    const { data: result } = await createUser(
                        this.$http,
                        this.form
                    );

                    if (result !== undefined && result.id !== "") {
                        this.$message.success("添加平台账号成功");

                        this.$emit("closeadmindialog", false);
                        if (this.refreshList) {
                            this.refreshList();
                        }
                    } else {
                        this.$message.success("添加平台账号失败");
                    }
                } else {
                    const { data: result } = await updateUser(
                        this.$http,
                        this.form
                    );

                    if (result !== undefined && result.id !== "") {
                        this.$message.success("修改平台账号成功");

                        this.$emit("closeadmindialog", false);
                        if (this.refreshList) {
                            this.refreshList();
                        }
                    } else {
                        this.$message.success("修改平台账号失败");
                    }
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.box {
    .el-form-item {
        float: left;
        width: 40%;
    }
}
.el-select {
    width: 100%;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 100%;
}
</style>
