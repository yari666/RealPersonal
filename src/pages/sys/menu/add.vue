<template>
    <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="菜单编号">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单URL">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标">
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