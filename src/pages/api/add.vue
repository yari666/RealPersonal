<template>
    <el-form ref="form" :model="param" label-width="160px">
        <el-form-item label="所属平台">
            <el-input v-model="param.platform"></el-input>
        </el-form-item>
        <el-form-item label="API地址">
            <el-input v-model="param.apiUrl"></el-input>
        </el-form-item>
        <el-form-item label="API子地址">
            <el-input v-model="param.apiSubUrl"></el-input>
        </el-form-item>
        <el-form-item label="类别">
            <el-input v-model="param.category"></el-input>
        </el-form-item>
        <el-form-item label="参数描述">
            <el-input v-model="param.paramsDesc" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="返回值描述">
            <el-input v-model="param.returnDesc" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="param.remarks" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { get, post, put } from "~/config/fetch.js";

export default {
    data() {
        return {
            param: {
                platform: "", //所属平台
                apiUrl: "", //api地址
                apiSubUrl: "", //api子地址
                category: 0, //类型
                useType: 0, //使用类型
                paramsDesc: "", //参数说明
                returnDesc: "", //返回值描述
                remarks: "", //备注
            },
        };
    },
    props: ["openType", "currentItem"],
    methods: {
        // 获取api类别
        getCategory() {
            get(`/api/realname/api/api-category`).then((res) => {
                if (res.isSuccess) {
                }
            });
        },

        onSubmit() {
            if (this.openType == "add") {
                // 新增
                post(`/api/realname/api`, this.param).then((res) => {
                    if (res.isSuccess) {
                    }
                });
            } else {
                // 编辑
                put(
                    `/api/realname/api/${this.currentItem.id}`,
                    this.param
                ).then((res) => {
                    if (res.isSuccess) {
                    }
                });
            }
        },
    },
};
</script>