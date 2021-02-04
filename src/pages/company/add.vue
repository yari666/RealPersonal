<template>
    <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="企业名称">
            <el-input
                v-model="form.companyName"
                type="textarea"
                readonly
            ></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码">
            <el-input
                v-model="form.unifiedSocialCreditCode"
                readonly
            ></el-input>
        </el-form-item>
        <el-form-item label="参建类型">
            <el-input v-model="form.cooperatedBuilingType" readonly></el-input>
        </el-form-item>
        <el-form-item label="企业联系人">
            <el-input v-model="form.companyontact" readonly></el-input>
        </el-form-item>
        <el-form-item label="企业联系电话">
            <el-input v-model="form.companyContactPhone" readonly></el-input>
        </el-form-item>
        <el-form-item label="企业所属区域">
            <el-input v-model="area" readonly type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="所属项目">
            <el-input v-model="form.projectName" readonly></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
import { get } from "~/config/fetch.js";

export default {
    data() {
        return {
            form: {
                city: "",
                companyContactPhone: "",
                companyName: "",
                companyontact: "",
                cooperatedBuilingType: "",
                id: "",
                projectId: "",
                projectName: "",
                province: "",
                township: "",
                unifiedSocialCreditCode: "",
            },
        };
    },
    computed: {
        area() {
            if (this.form.province || this.form.city || this.form.township) {
                return (
                    this.form.province +
                    "-" +
                    this.form.city +
                    "-" +
                    this.form.township
                );
            } else {
                return "";
            }
        },
    },
    props: ["currentId"],
    created() {
        this.getData();
    },
    watch: {
        currentId(to, old) {
            this.currentId = to;
            this.getData();
        },
    },
    methods: {
        getData() {
            get(`/api/realname/company/${this.currentId}`).then((res) => {
                if (res.isSuccess) {
                    this.form = res.data;
                }
            });
        },
    },
};
</script>