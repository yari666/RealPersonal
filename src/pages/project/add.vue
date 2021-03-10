<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <el-form-item label="项目名称" prop="projectName">
            <el-input
                v-model="form.projectName"
                :readonly="readOnly"
            ></el-input>
        </el-form-item>
        <el-form-item label="合同备案号">
            <el-input
                v-model="form.contractRecordNumber"
                :readonly="readOnly"
            ></el-input>
        </el-form-item>
        <el-form-item label="项目所在区/县">
            <el-input
                v-model="form.city"
                :readonly="readOnly"
                placeholder="市"
                style="width: 30%; float: left"
            ></el-input
            >&nbsp;&nbsp;市&nbsp;&nbsp;
            <el-input
                v-model="form.township"
                :readonly="readOnly"
                placeholder="区/县"
                style="width: 30%"
            ></el-input
            >&nbsp;&nbsp;区/县
        </el-form-item>
        <el-form-item label="项目属地">
            <el-input
                v-model="form.villagesAndTowns"
                :readonly="readOnly"
            ></el-input>
        </el-form-item>
        <el-form-item label="项目地址">
            <el-input v-model="form.address" :readonly="readOnly"></el-input>
        </el-form-item>
        <el-form-item label="建筑面积（平方米）">
            <el-input
                v-model="form.coveredArea"
                :readonly="readOnly"
            ></el-input>
        </el-form-item>
        <el-form-item label="工程造价（万元）">
            <el-input
                v-model="form.projectCost"
                :readonly="readOnly"
            ></el-input>
        </el-form-item>
        <el-form-item label="建设单位名称">
            <el-input
                v-model="form.constructionUnitName"
                :readonly="readOnly"
            ></el-input>
        </el-form-item>
        <el-form-item label="建设单位社会信用代码">
            <el-input
                v-model="form.constructionUnitSocialCreditCode"
                :readonly="readOnly"
            ></el-input>
        </el-form-item>
        <el-form-item label="建设单位联系人">
            <el-input
                v-model="form.constructionUnitContact"
                :readonly="readOnly"
            ></el-input>
        </el-form-item>
        <el-form-item label="建设单位联系电话">
            <el-input
                v-model="form.constructionUnitContactPhone"
                :readonly="readOnly"
            ></el-input>
        </el-form-item>
        <el-form-item v-if="!readOnly">
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

export default {
    data() {
        return {
            form: {
                address: null,
                city: null,
                constructionUnitContact: "",
                constructionUnitContactPhone: "",
                constructionUnitName: "",
                constructionUnitSocialCreditCode: null,
                contractRecordNumber: "",
                coveredArea: 0,
                id: "",
                projectCode: "",
                projectCost: null,
                projectName: "",
                township: null,
                villagesAndTowns: null,
            },
            rules: {
                projectName: [
                    {
                        required: true,
                        message: "请输入项目名称",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    computed: {
        area() {
            let address = "";
            if (this.form.city) address = this.form.city;
            if (this.form.township) address += "-" + this.form.township;
            return address;
        },
    },
    props: ["currentItem", "readOnly", "openType"],
    created() {
        this.getData();
    },
    watch: {
        currentItem(to, old) {
            this.currentItem = to;
            this.getData();
        },
    },
    methods: {
        getData() {
            get(`/api/realname/project/${this.currentItem.id}`).then((res) => {
                if (res.isSuccess) {
                    this.form = res.data;
                }
            });
        },
        onSubmit(formName) {
            let _this = this;

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.openType == "add") {
                        // 新增
                        post(`/api/realname/project/project`, {
                            projectName: _this.form.projectName,
                        }).then((res) => {
                            if (res.isSuccess) {
                                this.$message({
                                    message: "新增成功！",
                                    type: "success",
                                });
                                this.$emit("ok");
                            }
                        });
                    } else {
                        // 编辑
                        put(
                            `/api/realname/project/${this.currentItem.id}`,
                            this.form
                        ).then((res) => {
                            if (res.isSuccess) {
                                this.$message({
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