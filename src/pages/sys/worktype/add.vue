<template>
    <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="编号">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">确定</el-button>
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