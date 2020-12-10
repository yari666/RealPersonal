<!---业主-添加/编辑项目----->

<template>
    <div class="map">
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="100px"
            class="form-box"
        >
            <el-form-item label="污水站名称" prop="sewageStationName">
                <el-input v-model="form.sewageStationName"></el-input>
            </el-form-item>

            <el-form-item label="所属项目" prop="projectName">
                <el-select
                    v-model="form.projectName"
                    placeholder="请选择"
                    @change="changeProject"
                    style="width: 100%"
                >
                    <el-option
                        v-for="item in projectList"
                        :key="item.id"
                        :label="item.projectName"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="所属区域" prop="area">
                <el-cascader
                    v-model="form.area"
                    :options="areaData"
                    :props="{
                        label: 'Value',
                        children: 'Children',
                        value: 'Value',
                    }"
                    @change="changeArea"
                ></el-cascader>
            </el-form-item>

            <el-form-item label="详细地址" prop="address">
                <el-input v-model="form.address"></el-input>
            </el-form-item>

            <el-form-item label="定位信息">
                <el-button icon="el-icon-position" @click="chooseArea()">{{
                    form.position ? form.position : "一键获取定位信息"
                }}</el-button>
            </el-form-item>

            <el-form-item label="经度" prop="longitude">
                <el-input v-model="form.longitude" style="width: 60%"
                    >请输入经度</el-input
                >
            </el-form-item>
            <el-form-item label="纬度" prop="latitude">
                <el-input v-model="form.latitude" style="width: 60%"
                    >请输入纬度</el-input
                >
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">{{
                    openType == "add" ? "立即创建" : "提交"
                }}</el-button>
                <el-button @click="close('form')">取消</el-button>
            </el-form-item>
        </el-form>

        <!-- 定位弹框 -->
        <el-dialog
            :close-on-click-modal="false"
            title="选择定位地址"
            :visible.sync="openMap"
            width="60%"
            append-to-body
        >
            <map-position
                v-if="openMap"
                :areaObj="areaObj"
                @addComp="addComp"
            ></map-position>
        </el-dialog>
    </div>
</template>


<script>
import {
    ProjectByUserId,
    AreaList,
    AddSewageStation,
    EditSewageStation,
} from "~/config/api.js";
import mapPosition from "~/components/mapPosition";

export default {
    data() {
        return {
            form: {
                sewageStationName: "", //污水站名称
                projectName: "",
                projectId: "", //所属项目
                area: [], //所属区域
                address: "", //具体地址
                longitude: "",
                latitude: "",
            },
            rules: {
                sewageStationName: [
                    {
                        required: true,
                        message: "请输入污水站名称",
                        trigger: "blur",
                    },
                ],
                projectName: [
                    {
                        required: true,
                        message: "请选择所属项目",
                        trigger: "change",
                    },
                ],
                area: [
                    {
                        required: true,
                        message: "请选择所属区域",
                        trigger: "change",
                    },
                ],
                longitude: [
                    {
                        required: true,
                        message: "请输入经度",
                        trigger: "blur",
                    },
                ],
                latitude: [
                    {
                        required: true,
                        message: "请输入纬度",
                        trigger: "blur",
                    },
                ],
            },
            openMap: false,
            areaObj: {
                province: "", //省
                city: "", //市
                district: "", //区
            },

            lng: "", //经纬度
            lat: "",
            province: "", //省
            city: "", //市
            district: "", //区
            street: "", //街道
            streetNumber: "", //街道号

            projectList: [],

            areaData: [],
        };
    },
    components: { mapPosition },
    props: {
        open: Boolean,
        openType: String,
        formData: {
            type: Object,
            default: function () {
                return {
                    id: "",
                    sewageStationName: "", //污水站名称
                    projectId: "", //所属项目
                    projectName: "",
                    area: [], //所属区域
                    address: "", //具体地址
                    longitude: "",
                    latitude: "",
                };
            },
        },
    },
    computed: {
        userId() {
            return this.$store.state.userInfo.userId;
        },
    },
    created() {
        if (this.openType == "edit") {
            this.form = this.formData;
        }
        this.getProjectList();
        this.getAreaList();
    },
    methods: {
        // 创建污水站
        onSubmit(formName) {
            // 表单验证
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 验证通过
                    let params = {
                        sewageStationName: this.form.sewageStationName,
                        area: this.form.area,
                        address: this.form.address,
                        longitude: this.form.longitude,
                        latitude: this.form.latitude,
                        projectId: this.form.projectId,
                    };

                    if (this.openType == "add") {
                        AddSewageStation(params).then((res) => {
                            this.$emit("closeDialog", { refresh: true });
                        });
                    } else if (this.openType == "edit") {
                        let obj = Object.assign({}, params, {
                            id: this.formData.id,
                        });
                        EditSewageStation(obj).then((res) => {
                            this.$emit("closeDialog", { refresh: true });
                        });
                    }
                } else {
                    return false;
                }
            });
        },

        close() {
            this.$emit("closeDialog", { refresh: false });
        },

        // 获取所属项目
        getProjectList() {
            ProjectByUserId({ guid: this.userId }).then((res) => {
                if (res && res.data) {
                    this.projectList = res.data;
                }
            });
        },
        changeProject(e) {
            this.form.projectId = e;
        },

        //获取区域信息
        getAreaList() {
            AreaList().then((res) => {
                if (res && res.data) {
                    this.areaData = JSON.parse(JSON.stringify(res.data));
                }
            });
        },
        // 选择区域
        changeArea(value) {
            this.areaObj.province = value[0] || "";
            this.areaObj.city = value[1] || "";
            this.areaObj.district = value[2] || "";
        },

        // 打开定位
        chooseArea() {
            this.openMap = true;
        },
        // 获取定位信息
        addComp(e) {
            this.form.area = JSON.parse(
                JSON.stringify([e.province, e.city, e.district])
            );
            this.form.address = e.street + e.streetNumber;
            this.form.longitude = e.lng;
            this.form.latitude = e.lat;
            this.openMap = false;
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
    .el-select {
        width: 100%;
    }
}
</style>