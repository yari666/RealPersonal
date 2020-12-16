<template>
    <el-form ref="form" :model="form" label-width="160px" :inline="true">
        <el-form-item label="合同备案号">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="项目所在区县">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="项目属地">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="项目地址">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="建筑面积（平方米）">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="工程造价（万元）">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="建设单位名称">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="建设单位社会信用代码">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="建设单位联系人">
            <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="建设单位联系电话">
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