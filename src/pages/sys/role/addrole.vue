<!----平台 添加/编辑项目----->

<template>
    <div>
        <el-form
            ref="formRef"
            :model="form"
            :rules="formRules"
            label-width="90px"
        >
            <el-tabs type="border-card">
                <el-tab-pane label="角色">
                    <el-form-item label="角色编码" prop="roleCode">
                        <el-input v-model="form.roleCode"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="form.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="是否可用" prop="isActive">
                        <el-switch
                            v-model="form.isActive"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                        >
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form.remark"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="权限">
                    <el-tree
                        :data="menuTreeList"
                        show-checkbox
                        node-key="id"
                        :props="defaultMenuProps"
                        check-strictly
                        ref="tree"
                        default-expand-all
                        :default-checked-keys="deaultCheck"
                    >
                    </el-tree>
                </el-tab-pane>
            </el-tabs>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('closedialog', false)">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>
    </div>
</template>

<script>
import { createRole, updateRole, getRoleDropdown } from "~/api/sys/role/role";
import getMenuList from "~/api/sys/menu/menu";

export default {
    data() {
        return {
            menuTreeList: [],
            defaultMenuProps: {
                children: "menuList",
                label: "menuName",
            },
            form: {
                id: "",
                roleCode: "",
                roleName: "",
                remark: "",
                isActive: true,
                selectedMenu: [],
            },
            formRules: {
                roleName: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur",
                    },
                ],
            },
            deaultCheck: [],
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
                    roleCode: "",
                    roleName: "",
                    remark: "",
                    isActive: true,
                    selectedMenu: [],
                };
            },
        },
    },
    created() {
        if (this.openType == "edit") {
            this.form = this.formData;
            this.deaultCheck = this.formData.selectedMenu;
        } else {
            this.form.id = "";
            this.form.roleCode = "";
            this.form.roleName = "";
            this.form.remark = "";
            this.form.isActive = true;
            this.form.selectedMenu = [];
        }

        this.getMenuTreeList();
    },
    computed: {
        userId() {
            return this.$store.state.userInfo.userId;
        },
    },
    methods: {
        // 得到菜单列表信息
        async getMenuTreeList() {
            // 后期这个guid是从登录用户缓存中获取
            const { data: result } = await getMenuList(this.$http, this.userId);

            if (result !== undefined) {
                this.menuTreeList = result;
            }
        },
        onSubmit() {
            this.$refs.formRef.validate(async (valid) => {
                if (!valid) {
                    return;
                }

                if (this.openType != "edit") {
                    var arrMenu = this.$refs.tree.getCheckedNodes();
                    arrMenu.forEach((element) => {
                        this.form.selectedMenu.push(element.id);
                    });

                    if (this.form.selectedMenu.length <= 0) {
                        this.$message.error("请选择权限菜单！");
                        return;
                    }

                    const { data: result } = await createRole(
                        this.$http,
                        this.form
                    );

                    if (result !== undefined && result.id !== "") {
                        this.$message.success("添加角色成功");
                        this.getMenuTreeList();
                        this.$emit("closedialog", false);
                        if (this.refreshList) {
                            this.refreshList();
                        }
                    } else {
                        this.$message.success("添加角色失败");
                    }
                } else {
                    var arrMenu = this.$refs.tree.getCheckedNodes();
                    arrMenu.forEach((element) => {
                        this.form.selectedMenu.push(element.id);
                    });

                    if (this.form.selectedMenu.length <= 0) {
                        this.$message.error("请选择权限菜单！");
                        return;
                    }

                    const { data: result } = await updateRole(
                        this.$http,
                        this.form
                    );

                    if (result !== undefined && result.id !== "") {
                        this.$message.success("修改角色成功");
                        this.getMenuTreeList();
                        this.$emit("closedialog", false);
                        if (this.refreshList) {
                            this.refreshList();
                        }
                    } else {
                        this.$message.success("修改角色失败");
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
