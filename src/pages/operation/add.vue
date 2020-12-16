<template>
    <el-form ref="form" :model="form" label-width="160px" :inline="true">
        <el-form-item label="企业名称">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="合同备案编号">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="参建类型">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="企业联系人">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="企业联系电话">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属项目">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
            },
        };
    },
    methods: {
        onSubmit() {
            console.log("submit!");
        },
    },
};
</script>