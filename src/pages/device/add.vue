<template>
    <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="设备名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="设备序列号">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="进出标识">
            <el-select placeholder="进出标识" style="width: 100%">
                <el-option label="出场" value="shanghai"></el-option>
                <el-option label="进场" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属项目">
            <el-select placeholder="所属项目" style="width: 100%">
                <el-option label="出场" value="shanghai"></el-option>
                <el-option label="进场" value="beijing"></el-option>
            </el-select>
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