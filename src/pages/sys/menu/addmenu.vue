<!---业主-添加/编辑项目----->

<template>
    <div>
        <el-form
            ref="formRef"
            :model="form"
            :rules="formRules"
            label-width="90px"
        >
            <el-form-item label="菜单编号" prop="menuCode">
                <el-input v-model="form.menuCode"></el-input>
            </el-form-item>
            <el-form-item label="菜单名称" prop="menuName">
                <el-input v-model="form.menuName"></el-input>
            </el-form-item>
            <el-form-item label="父级菜单" prop="menuParentId">
                <el-select v-model="form.menuParentId" placeholder="请选择">
                    <el-option
                        v-for="item in parentMenuList"
                        :key="item.id"
                        :label="item.menuName"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单url" prop="menuUrl">
                <el-input v-model="form.menuUrl"></el-input>
            </el-form-item>
            <el-form-item label="菜单图标" prop="menuIcon">
                <el-input v-model="form.menuIcon"></el-input>
            </el-form-item>
            <el-form-item label="是否激活" prop="isActive">
                <el-switch
                    v-model="form.isActive"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                >
                </el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('closedialog', false)">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
    </div>
</template>

<script>
import { createMenu, getMenuDropdown, updateMenu } from "~/api/sys/menu/menu";

export default {
    data() {
        return {
            parentMenuList: [],
            form: {
                id: "",
                menuCode: "",
                menuName: "",
                menuUrl: "",
                menuIcon: "",
                isActive: true,
                menuParentId: undefined,
            },
            formRules: {
                menuCode: [
                    {
                        required: true,
                        message: "请输入菜单名称",
                        trigger: "blur",
                    },
                ],
                menuName: [
                    { required: true, message: "请输入密码", trigger: "blur" },
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
                    menuCode: "",
                    menuName: "",
                    menuUrl: "",
                    menuIcon: "",
                    isActive: true,
                    menuParentId: undefined,
                };
            },
        },
    },
    created() {
        if (this.openType == "edit") {
            this.form = this.formData;
        } else {
            this.form.id = "";
            this.form.menuCode = "";
            this.form.menuName = "";
            this.form.menuUrl = "";
            this.form.menuIcon = "";
            this.form.isActive = true;
            this.form.menuParentId = undefined;
        }

        this.getParentMenu();
    },
    activated() {},
    methods: {
        // 得到所有的父级菜单
        async getParentMenu() {
            const { data: result } = await getMenuDropdown(this.$http);

            if (result !== undefined) {
                this.parentMenuList = result;
            }
        },
        onSubmit() {
            this.$refs.formRef.validate(async (valid) => {
                if (!valid) {
                    return;
                }

                if (this.openType != "edit") {
                    const { data: result } = await createMenu(
                        this.$http,
                        this.form
                    );

                    if (result !== undefined && result.id !== "") {
                        this.$message.success("添加菜单成功");
                        this.$emit("closedialog", false);
                        if (this.refreshList) {
                            this.refreshList();
                        }
                    } else {
                        this.$message.success("添加菜单失败");
                    }
                } else {
                    const { data: result } = await updateMenu(
                        this.$http,
                        this.form
                    );

                    if (result !== undefined && result.id !== "") {
                        this.$message.success("修改菜单成功");
                        this.$emit("closedialog", false);
                        if (this.refreshList) {
                            this.refreshList();
                        }
                    } else {
                        this.$message.success("修改菜单失败");
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
        width: 50%;
    }
}
.el-select {
    width: 100%;
}
</style>
