<template>
    <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="账号/手机号">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色">
            <el-select placeholder="角色" style="width: 100%">
                <el-option label="出场" value="shanghai"></el-option>
                <el-option label="进场" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="开通时间">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="到期时间">
            <el-input v-model="form.name"></el-input>
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