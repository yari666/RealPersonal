<template>
    <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="API名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="API地址">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类别">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="所属企业">
            <el-select placeholder="所属企业">
                <el-option label="出场" value="shanghai"></el-option>
                <el-option label="进场" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="负责人">
            <el-input
                v-model="form.name"
                placeholder="姓名"
                style="width: 45%"
            ></el-input>
            <el-input
                v-model="form.name"
                placeholder="联系方式"
                style="width: 45%"
            ></el-input>
        </el-form-item>
        <el-form-item label="参数描述">
            <el-input v-model="form.name" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="返回值描述">
            <el-input v-model="form.name" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="form.name" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">立即创建</el-button>
            <el-button>取消</el-button>
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