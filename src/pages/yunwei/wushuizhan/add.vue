<!---业主-添加/编辑项目----->

<template>
    <el-form ref="form" :model="form" label-width="90px">
        <div class="box">
            <el-form-item label="污水站名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="所属项目">
                <el-input v-model="form.belongItem"></el-input>
            </el-form-item>
        </div>

        <div class="box">
            <el-form-item label="所属区域">
                <el-input v-model="form.area"></el-input>
            </el-form-item>

            <el-form-item label="详细地址">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
        </div>

        <el-form-item label="定位信息">
            <el-input v-model="form.position"></el-input>
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
                belongItem: "",
                area: "",
                address: "",
                position: "",
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

<style lang="less" scoped>
.box {
    .el-form-item {
        float: left;
        width: 50%;
    }
}
</style>