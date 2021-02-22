<template>
    <el-form ref="form" label-width="140px">
        <el-form-item label="设备名称">
            <el-input v-model="name" style="width: 80%"></el-input>
        </el-form-item>

        <el-form-item label="所属项目">
            <el-input v-model="company" style="width: 80%"></el-input>
        </el-form-item>

        <el-form-item label="控制模式">
            <el-radio-group v-model="control_mode">
                <el-radio label="relay">继电器（默认）</el-radio>
                <el-radio label="wiegand_26">韦根 26</el-radio>
                <el-radio label="wiegand_34">韦根 34</el-radio>
                <el-radio label="RS232">RS232</el-radio>
                <el-radio label="RS485">RS485</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="口罩模式">
            <el-switch
                v-model="facemask_model"
                active-text="开"
                inactive-text="关"
            >
            </el-switch>
            <span class="info"
                ><i class="el-icon-info"></i>检测是否佩戴口罩</span
            >
        </el-form-item>

        <el-form-item label="识别距离（米）">
            <el-radio-group v-model="recognition_distance">
                <el-radio label="0.5">0.5米以内</el-radio>
                <el-radio label="1">1米以内</el-radio>
                <el-radio label="1.5">1.5米以内（默认）</el-radio>
                <el-radio label="2">2米以内</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="相似度阈值">
            <el-slider
                v-model="similarity_threshold"
                :max="100"
                :min="0"
                style="width: 80%"
                :marks="thresholdMarks"
            >
            </el-slider>
            <span class="info"
                ><i class="el-icon-info"></i
                >识别记录阈值默认80，强烈建议最低不能小于75</span
            >
        </el-form-item>

        <el-form-item label="体温模式">
            <el-radio-group v-model="temperature_mode">
                <el-radio label="Celsius">摄氏度（℃）（默认）</el-radio>
                <el-radio label="Fahrenheit">华氏度（℉）</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="体温补偿">
            <el-input
                v-model="temperature_compensation"
                style="width: 80%"
            ></el-input>
        </el-form-item>

        <el-form-item label="体温阈值">
            <el-input
                v-model="temperature_threshold"
                style="width: 80%"
            ></el-input>
        </el-form-item>

        <el-form-item label="声音播报">
            <el-switch
                v-model="voice_broadcast"
                active-text="开"
                inactive-text="关"
            >
            </el-switch>
        </el-form-item>

        <el-form-item label="补光灯">
            <el-switch v-model="fill_light" active-text="开" inactive-text="关">
            </el-switch>
            <span class="info"><i class="el-icon-info"></i>打开补光灯</span>
        </el-form-item>

        <el-form-item label="音量">
            <el-slider
                v-model="volume"
                :max="100"
                :min="0"
                :marks="volumeMarks"
                style="width: 80%"
            >
            </el-slider>
        </el-form-item>

        <el-form-item label="特征模式">
            <el-radio-group v-model="feature_mode">
                <el-radio label="0">特征模式（默认）</el-radio>
                <el-radio label="1">图片注册</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit()">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<style lang="less" scoped>
.info {
    margin-left: 10px;
    color: #999;
    font-size: 13px;
    i {
        margin-right: 5px;
    }
}
</style>

<script>
import { get, post } from "~/config/fetch.js";

export default {
    data() {
        return {
            company: "",
            name: "",
            control_mode: "relay",
            facemask_model: true,
            recognition_distance: "1.5",
            similarity_threshold: 80,
            temperature_mode: "Celsius",
            temperature_compensation: 0,
            temperature_threshold: 37.5,
            voice_broadcast: true,
            fill_light: false,
            volume: 70,
            feature_mode: "0",

            volumeMarks: {
                0: "0",
                70: "70（默认）",
                100: "100",
            },

            thresholdMarks: {
                0: "0",
                80: "80（默认）",
                100: "100",
            },

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
                deviceSource: [
                    {
                        required: true,
                        message: "请选择设备来源",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    props: ["currentItem"],
    created() {
        this.getOutIn();
        this.getResource();
        this.getProject();
        this.name = this.currentItem.deviceName;
        this.company = this.currentItem.projectName;
    },
    methods: {
        onSubmit() {
            let param = {
                company: this.company,
                name: this.name,
                control_mode: this.control_mode,
                facemask_model: this.facemask_model,
                recognition_distance: this.recognition_distance,
                similarity_threshold: this.similarity_threshold,
                temperature_mode: this.temperature_mode,
                temperature_compensation: this.temperature_compensation,
                temperature_threshold: this.temperature_threshold,
                voice_broadcast: this.voice_broadcast,
                fill_light: this.fill_light,
                volume: this.volume,
                feature_mode: this.feature_mode,
                mac_address: "",
            };
            post(
                `/api/realname/device/deivce-config/${this.currentItem.id}`,
                param
            ).then((res) => {
                if (res.isSuccess) {
                    this.$message({
                        message: "新增成功！",
                        type: "success",
                    });
                    this.$emit("ok");
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
            get(`/api/realname/project/project-dictionary`).then((res) => {
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