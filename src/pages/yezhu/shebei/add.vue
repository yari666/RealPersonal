<!---业主-添加/编辑项目----->

<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="设备名称" prop="deviceName">
            <el-input v-model="form.deviceName"></el-input>
        </el-form-item>

        <el-form-item label="设备工艺" prop="designProcess">
            <el-select
                v-model="form.designProcess"
                placeholder="请选择设备工艺"
                style="width: 100%"
                @change="changeDeviceDesign"
            >
                <el-option
                    v-for="item in deviceDesignData"
                    :key="item.id"
                    :label="item.dicName"
                    :value="item.id"
                >
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="所属污水站" prop="sewageStationName">
            <el-select
                v-model="form.sewageStationName"
                placeholder="请选择所属污水站"
                style="width: 100%"
                @change="changeSewage"
            >
                <el-option
                    v-for="item in sewageList"
                    :key="item.id"
                    :label="item.sewageStationName"
                    :value="item.id"
                >
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="设计出水量m³">
            <el-input
                v-model.number="form.designedOutletWater"
                :class="showErr ? 'iserror' : ''"
            ></el-input>
            <div class="el-form-item__error" v-show="showErr">
                设计出水量必须为数字值
            </div>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">{{
                openType == "edit" ? "确定" : "立即创建"
            }}</el-button>
            <el-button @click="close('form')">取消</el-button>
        </el-form-item>
    </el-form>
</template>


<script>
import {
    AddDevice,
    EditDevice,
    DeviceDesign,
    SewageStationByUserId,
} from "~/config/api.js";

export default {
    data() {
        return {
            form: {
                deviceName: "",
                designedOutletWater: "",
                designProcessId: "",
                sewageStationId: "",
                designProcess: "",
                sewageStationName: "",
            },
            deviceDesignData: [], //设备工艺列表
            sewageList: [], //污水站列表
            rules: {
                deviceName: [
                    {
                        required: true,
                        message: "请输入设备名称",
                        trigger: "blur",
                    },
                ],
                designProcess: [
                    {
                        required: true,
                        message: "请选择设备工艺",
                        trigger: "change",
                    },
                ],

                sewageStationName: [
                    {
                        required: true,
                        message: "请选择所属污水站",
                        trigger: "change",
                    },
                ],
                designedOutletWater: [
                    {
                        required: false,
                        type: "number",
                        message: "设计出水量必须为数字值",
                        trigger: "blur",
                    },
                ],
            },
            showErr: false,
        };
    },
    props: ["open", "openType", "formData"],
    computed: {
        userId() {
            return this.$store.state.userInfo.userId;
        },
    },
    created() {
        this.getSewageList();
        this.getDeviceProcess();

        if (this.openType == "edit") {
            this.form = this.formData;
        }
    },
    methods: {
        onSubmit(formName) {
            let outw = this.form.designedOutletWater;
            if (outw) {
                if (/^[0-9]*$/.test(outw)) {
                    this.showErr = false;
                    this.form.designedOutletWater = parseInt(outw);
                } else {
                    this.showErr = true;
                    return false;
                }
            }

            // 表单验证
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 验证通过
                    if (this.openType == "add") {
                        AddDevice(this.form).then((res) => {
                            this.$emit("closeDialog");
                        });
                    } else if (this.openType == "edit") {
                        let params = Object.assign(
                            {},
                            this.formData,
                            this.form
                        );
                        EditDevice(params).then((res) => {
                            this.$emit("closeDialog");
                        });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },

        // 获取设备工艺
        getDeviceProcess() {
            DeviceDesign().then((res) => {
                if (res && res.data && res.data.length) {
                    this.deviceDesignData = res.data;
                }
            });
        },
        changeDeviceDesign(e) {
            this.form.designProcessId = e;
        },

        // 根据userId获取污水站列表
        getSewageList() {
            SewageStationByUserId({ guid: this.userId }).then((res) => {
                if (res && res.data && res.data.length) {
                    this.sewageList = res.data;
                }
            });
        },
        changeSewage(e) {
            this.form.sewageStationId = e;
        },

        close(formName) {
            this.$refs[formName].resetFields();
            this.$emit("closeDialog", { refresh: false });
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