<!--运维-添加业主-企业-->

<template>
    <el-form ref="form" :model="form" label-width="100px">
        <div class="box">
            <el-form-item label="企业名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="企业法人">
                <el-input v-model="form.boss"></el-input>
            </el-form-item>
        </div>

        <div class="box">
            <el-form-item label="联系方式">
                <el-input v-model="form.telphone"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
        </div>

        <div class="box">
            <el-form-item label="企业联系人">
                <el-input v-model="form.linkman"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
        </div>

        <div class="box">
            <el-form-item label="企业logo">
                <img-box></img-box>
            </el-form-item>
            <el-form-item label="营业执照上传">
                <img-box></img-box>
            </el-form-item>
        </div>

        <el-form-item label="注册资金">
            <el-input v-model="form.money"></el-input>
        </el-form-item>

        <el-form-item label="业务范围">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import imgBox from "~/components/imgBox";

export default {
    data() {
        return {
            form: {
                name: "",
                boss: "",
                telphone: "",
                address: "",
                linkman: "",
                phone: "",
                logo: "",
                photo: "",
                money: "",
                desc: "",
            },
        };
    },
    components: { imgBox },
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