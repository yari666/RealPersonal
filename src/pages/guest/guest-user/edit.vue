<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="班组编号">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="班组名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属项目">
            <el-select
                v-model="form.region"
                placeholder="请选择活动区域"
                style="width: 100%"
            >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属企业">
            <el-select
                v-model="form.region"
                placeholder="请选择活动区域"
                style="width: 100%"
            >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
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