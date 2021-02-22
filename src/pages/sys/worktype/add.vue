<template>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="编号" prop="dicCode">
            <el-input v-model="form.dicCode"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="dicName">
            <el-input v-model="form.dicName"></el-input>
        </el-form-item>
        <el-form-item label="字典类型">
            <el-input v-model="form.groupName" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="父级字典">
            <el-input v-model="form.parentDicId"></el-input>
        </el-form-item>
        <el-form-item label="是否激活">
            <el-switch v-model="form.isActive"> </el-switch>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">确定</el-button>
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
                dicCode: "",
                dicName: "",
                groupName: "",
                parentDicId: "",
                isActive: true,
                id: "",
            },
            rules: {
                dicCode: [
                    {
                        required: true,
                        message: "请输入编号",
                        trigger: "blur",
                    },
                ],
                dicName: [
                    {
                        required: true,
                        message: "请输入名称",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    props: ["openType", "currentItem", "groupName"],
    watch: {
        currentItem: {
            handler(newName, oldName) {
                this.currentItem = newName;
                this.form = newName;
            },
            immediate: true,
            deep: true,
        },
    },
    created() {
        this.form = this.currentItem;
        this.form.groupName = this.groupName;
    },
    methods: {
        onSubmit(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (_this.openType == "add") {
                        // 新增
                        post(`/api/realname/dictionary`, _this.form).then(
                            (res) => {
                                if (res.isSuccess) {
                                    _this.$message({
                                        message: "新增成功！",
                                        type: "success",
                                    });
                                    this.$emit("ok");
                                }
                            }
                        );
                    } else {
                        // 编辑
                        put(
                            `/api/realname/dictionary/${_this.currentItem.id}`,
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