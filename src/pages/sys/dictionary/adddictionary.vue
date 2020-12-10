<!----平台 添加/编辑项目----->

<template>
    <div>
        <el-form
            ref="formRef"
            :model="form"
            :rules="formRules"
            label-width="90px"
        >
            <el-form-item label="字典编号" prop="dicCode">
                <el-input v-model="form.dicCode"></el-input>
            </el-form-item>
            <el-form-item label="字典名称" prop="dicName">
                <el-input v-model="form.dicName"></el-input>
            </el-form-item>
            <el-form-item label="字典组名" prop="groupName">
                <el-input v-model="form.groupName"></el-input>
            </el-form-item>
            <el-form-item label="父级字典" prop="parentDicId">
                <el-select v-model="form.parentDicId" placeholder="请选择">
                    <el-option
                        v-for="item in parentDictionaryList"
                        :key="item.id"
                        :label="item.dicName"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
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
import {
    createDictionary,
    getDictionaryDropdown,
    updateDictionary,
} from "~/api/sys/dictionary/dictionary";

export default {
    data() {
        return {
            parentDictionaryList: [],
            form: {
                id: "",
                dicCode: "",
                dicName: "",
                groupName: "",
                isActive: true,
                parentDicId: undefined,
            },
            formRules: {
                dicCode: [
                    {
                        required: true,
                        message: "请输入字典编号",
                        trigger: "blur",
                    },
                ],
                dicName: [
                    {
                        required: true,
                        message: "请输入字典名称",
                        trigger: "blur",
                    },
                ],
                groupName: [
                    {
                        required: true,
                        message: "请输入字典组名",
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
                    dicCode: "",
                    dicName: "",
                    groupName: "",
                    isActive: true,
                    parentDicId: undefined,
                };
            },
        },
    },
    created() {
        if (this.openType == "edit") {
            this.form = this.formData;
        } else {
            this.form.dicCode = "";
            this.form.dicName = "";
            this.form.groupName = "";
            this.form.isActive = true;
            this.form.parentDicId = undefined;
        }
        this.getParentDictionary();
    },
    methods: {
        // 得到所有的父级字典
        async getParentDictionary() {
            const { data: result } = await getDictionaryDropdown(this.$http);

            if (result !== undefined) {
                this.parentDictionaryList = result;
            }
        },
        onSubmit() {
            this.$refs.formRef.validate(async (valid) => {
                if (!valid) {
                    return;
                }

                if (this.openType != "edit") {
                    const { data: result } = await createDictionary(
                        this.$http,
                        this.form
                    );

                    if (result !== undefined && result.id !== "") {
                        this.$message.success("添加字典成功");
                        this.getParentDictionary();
                        this.$emit("closedialog", false);
                        if (this.refreshList) {
                            this.refreshList();
                        }
                    } else {
                        this.$message.success("添加字典失败");
                    }
                } else {
                    const { data: result } = await updateDictionary(
                        this.$http,
                        this.form
                    );
                    if (result !== undefined && result.id !== "") {
                        this.$message.success("修改字典成功");
                        this.getParentDictionary();
                        this.$emit("closedialog", false);
                        if (this.refreshList) {
                            this.refreshList();
                        }
                    } else {
                        this.$message.success("修改字典失败");
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
