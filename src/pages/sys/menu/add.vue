<template>
    <el-form
        ref="form"
        :model="form"
        label-width="100px"
        :rules="rules"
        @keyup.enter.native="onSubmit('form')"
        @click.native.prevent
    >
        <el-form-item label="菜单编号" prop="menuCode">
            <el-input v-model="form.menuCode"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="form.menuName"></el-input>
        </el-form-item>
        <el-form-item label="菜单URL" prop="menuUrl">
            <el-input v-model="form.menuUrl"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标">
            <el-input v-model="form.menuIcon"></el-input>
        </el-form-item>
        <el-form-item label="菜单序号">
            <el-input v-model="form.sortNumb"></el-input
            ><span>菜单序号代表菜单项的显示顺序，从小到大排列。</span>
        </el-form-item>
        <el-form-item label="父级菜单">
            <el-select
                placeholder="选择父级菜单"
                v-model="form.menuParentId"
                style="width: 100%"
            >
                <el-option
                    v-for="item in menuList"
                    :key="item.id"
                    :label="item.menuName"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否激活">
            <el-switch
                v-model="form.isActive"
                active-color="#13ce66"
                inactive-color="#aaa"
            >
            </el-switch>
        </el-form-item>
        <el-form-item>
            <el-button
                type="primary"
                @click="onSubmit('form')"
                :loading="loading"
                >确定</el-button
            >
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { get, post, put } from "~/config/fetch.js";

export default {
    data() {
        return {
            loading: false,
            form: {
                menuCode: "",
                menuName: "",
                menuParentId: "",
                menuUrl: "",
                menuIcon: "",
                sortNumb: 0,
                isActive: true,
            },
            menuList: [],
            rules: {
                menuCode: [
                    {
                        required: true,
                        message: "请输入菜单编号",
                        trigger: "blur",
                    },
                ],
                menuName: [
                    {
                        required: true,
                        message: "请输入菜单名称",
                        trigger: "blur",
                    },
                ],
                menuUrl: [
                    {
                        required: true,
                        message: "请输入菜单链接",
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
                this.currentItem = newName;

                this.form = newName;
            },
            immediate: true,
            deep: true,
        },
    },
    created() {
        this.getMenu();
        this.form = Object.assign(this.form, this.currentItem);
    },
    methods: {
        getMenu() {
            get(`/api/realname/menu/parent-menu`).then((res) => {
                if (res.isSuccess) {
                    this.menuList = res.data;
                }
            });
        },
        onSubmit(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    if (_this.openType == "add") {
                        // 新增
                        post(`/api/realname/menu`, _this.form)
                            .then((res) => {
                                if (res.isSuccess) {
                                    _this.$message({
                                        message: "新增成功！",
                                        type: "success",
                                    });
                                    this.$emit("ok");
                                }
                            })
                            .catch((err) => {
                                this.loading = false;
                            });
                    } else {
                        // 编辑
                        put(
                            `/api/realname/menu/${_this.currentItem.id}`,
                            _this.form
                        )
                            .then((res) => {
                                if (res.isSuccess) {
                                    _this.$message({
                                        message: "修改成功！",
                                        type: "success",
                                    });
                                    this.$emit("ok");
                                }
                            })
                            .catch((err) => {
                                this.loading = false;
                            });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        cancel() {
            this.$emit("cancel");
        },
    },
};
</script>

<style lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>