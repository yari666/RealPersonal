<template>
    <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="140px"
        @keyup.enter.native="onSubmit('form')"
        @click.native.prevent
    >
        <el-form-item label="设备名称" prop="deviceName">
            <el-input v-model="form.deviceName"></el-input>
        </el-form-item>
        <el-form-item label="设备MAC地址" prop="deviceMacAddress">
            <el-input v-model="form.deviceMacAddress"></el-input>
        </el-form-item>
        <el-form-item label="进出标识" prop="deviceStatus">
            <el-select
                placeholder="请选择进出标识"
                v-model="form.deviceStatus"
                style="width: 100%"
            >
                <el-option
                    v-for="item in outInData"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属项目">
            <el-select
                placeholder="请选择所属项目"
                v-model="form.projectId"
                style="width: 100%"
            >
                <el-option
                    v-for="item in projectData"
                    :key="item.id"
                    :label="item.projectName"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button
                type="primary"
                @click="onSubmit('form')"
                :loading="loading"
                >确定</el-button
            >
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { get, post, put } from "~/config/fetch.js";

export default {
    data() {
        return {
            loading: false,
            form: {
                deviceName: "",
                deviceMacAddress: "",
                deviceStatus: -1,
                // deviceSource: -1,
                projectId: "",
            },
            outInData: [],
            projectData: [],
            resourceData: [],
            rules: {
                deviceName: [
                    {
                        required: true,
                        message: "请输入设备名称",
                        trigger: "blur",
                    },
                ],
                deviceMacAddress: [
                    {
                        required: true,
                        message: "请输入设备MAC地址",
                        trigger: "blur",
                    },
                ],
                deviceStatus: [
                    {
                        required: true,
                        message: "请选择进出标识",
                        trigger: "blur",
                    },
                ],
                // deviceSource: [
                //     {
                //         required: true,
                //         message: "请选择设备来源",
                //         trigger: "blur",
                //     },
                // ],
            },
        };
    },
    props: ["openType", "currentItem"],
    created() {
        this.getOutIn();
        // this.getResource();
        this.getProject();
        this.form = {
            deviceName: this.currentItem.deviceName,
            deviceMacAddress: this.currentItem.deviceMacAddress,
            deviceStatus: this.currentItem.deviceStatus,
            // deviceSource: this.currentItem.deviceSource,
            projectId: this.currentItem.projectId,
        };
    },
    methods: {
        onSubmit(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    if (this.openType == "add") {
                        // 新增
                        post(`/api/realname/device`, _this.form)
                            .then((res) => {
                                if (res.isSuccess) {
                                    this.$message({
                                        message: "新增成功！",
                                        type: "success",
                                    });
                                    this.$emit("ok");
                                }
                            })
                            .catch((err) => {
                                this.loading = false;
                            });
                    } else if (this.openType == "edit") {
                        // 修改
                        put(
                            `/api/realname/device/${_this.currentItem.id}`,
                            this.form
                        )
                            .then((res) => {
                                if (res.isSuccess) {
                                    this.$message({
                                        message: "修改成功！",
                                        type: "success",
                                    });
                                    this.$emit("ok");
                                }
                            })
                            .catch((err) => {
                                this.loading = false;
                            });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 进出标识下拉
        getOutIn() {
            get(`/api/realname/device/in-out-status`).then((res) => {
                if (res.isSuccess) {
                    this.outInData = res.data;
                }
            });
        },

        // 设备来源下拉
        getResource() {
            get(`/api/realname/device/device-source`).then((res) => {
                if (res.isSuccess) {
                    this.resourceData = res.data;
                }
            });
        },

        // 项目下拉
        getProject() {
            get(`/api/realname/project/project-dictionary`, {
                noMessage: true, //不需要报错弹框
            }).then((res) => {
                if (res.isSuccess) {
                    this.projectData = res.data;
                }
            });
        },

        cancel() {
            this.$emit("cancel");
        },
    },
};
</script>