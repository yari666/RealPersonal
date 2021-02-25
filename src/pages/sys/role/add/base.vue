<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="角色编号">
            <el-input
                v-model="form.roleCode"
                @keyup.enter.native="onSubmit('form')"
            ></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
            <el-input
                v-model="form.roleName"
                @keyup.enter.native="onSubmit('form')"
            ></el-input>
        </el-form-item>
        <el-form-item label="是否激活">
            <el-switch
                v-model="form.isActive"
                active-color="#13ce66"
                inactive-color="#ff4949"
            >
            </el-switch>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea"></el-input>
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
import { post, put } from "~/config/fetch.js";
export default {
    data() {
        return {
            form: {
                isActive: true,
                remark: "",
                roleCode: "",
                roleName: "",
                selectedMenu: [],
                projectids: [],
            },
            rules: {
                roleName: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    props: ["openType", "currentItem"],
    watch: {
        currentItem: {
            handler(newName, oldName) {
                this.form = {
                    isActive: newName.isActive,
                    remark: newName.remark,
                    roleCode: newName.roleCode,
                    roleName: newName.roleName,
                    selectedMenu: newName.menuIdList.map((i) => i.id),
                    projectids: newName.projectIdList.map((i) => i.id),
                };
                this.currentItem = newName;
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        onSubmit(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (_this.openType == "add") {
                        // 新增
                        post(`/api/realname/role`, _this.form).then((res) => {
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
                            `/api/realname/role/${_this.currentItem.id}`,
                            _this.form
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