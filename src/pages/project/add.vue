<template>
    <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="合同备案号">
            <el-input v-model="form.contractRecordNumber" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
            <el-input v-model="form.projectName" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目所在区县">
            <el-input v-model="area" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目属地">
            <el-input v-model="form.villagesAndTowns" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目地址">
            <el-input v-model="form.address" readonly></el-input>
        </el-form-item>
        <el-form-item label="建筑面积（平方米）">
            <el-input v-model="form.coveredArea" readonly></el-input>
        </el-form-item>
        <el-form-item label="工程造价（万元）">
            <el-input v-model="form.projectCost" readonly></el-input>
        </el-form-item>
        <el-form-item label="建设单位名称">
            <el-input v-model="form.constructionUnitName" readonly></el-input>
        </el-form-item>
        <el-form-item label="建设单位社会信用代码">
            <el-input
                v-model="form.constructionUnitSocialCreditCode"
                readonly
            ></el-input>
        </el-form-item>
        <el-form-item label="建设单位联系人">
            <el-input
                v-model="form.constructionUnitContact"
                readonly
            ></el-input>
        </el-form-item>
        <el-form-item label="建设单位联系电话">
            <el-input
                v-model="form.constructionUnitContactPhone"
                readonly
            ></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
import { get } from "~/config/fetch.js";

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
                contractRecordNumber: "320903202011090578",
                coveredArea: 66400,
                id: "3fcb853d-de3c-4d6a-9403-f3997846c30f",
                projectCode: "a281018da5a84604b77775c4fd714d99",
                projectCost: 29972.758,
                projectName: "盐城市第三人民医院南院二期工程",
                township: null,
                villagesAndTowns: null,
            },
        };
    },
    computed: {
        area() {
            if (this.form.city || this.form.township) {
                return this.form.city + "-" + this.form.township;
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
            get(`/api/realname/project/${this.currentId}`).then((res) => {
                if (res.isSuccess) {
                    this.form = res.data;
                }
            });
        },
    },
};
</script>