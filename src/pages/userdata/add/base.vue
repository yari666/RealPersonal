<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
            <el-input v-model="currentItem.personName" readonly></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
            <el-input v-model="currentItem.idNumber" readonly></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-input
                :value="currentItem.gender == 0 ? '男' : '女'"
                readonly
            ></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
            <el-input v-model="currentItem.phoneNumber" readonly></el-input>
        </el-form-item>
        <el-form-item label="民族">
            <el-input v-model="currentItem.national" readonly></el-input>
        </el-form-item>
        <el-form-item label="住址">
            <el-input v-model="currentItem.currentAddress" readonly></el-input>
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
    props: ["currentItem"],
    methods: {
        onSubmit() {
            console.log("submit!");
        },
    },
};
</script>