<template>
    <div class="cert">
        <el-button
            type="primary"
            @click="getCard"
            v-if="!readOnly"
            class="readCard"
            >读取身份证</el-button
        >
        <el-form
            ref="form"
            :model="userInfo"
            label-width="140px"
            :inline="true"
            :rules="rules"
            class="userDetail"
        >
            <el-form-item label="姓名" prop="employeeName">
                <el-input
                    v-model="userInfo.employeeName"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>
            <el-form-item label="工号">
                <el-input
                    v-model="userInfo.workNumber"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>

            <el-form-item label="民族">
                <el-input
                    v-model="userInfo.national"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input
                    :value="userInfo.gender == 0 ? '女' : '男'"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idNumber">
                <el-input
                    v-model="userInfo.idNumber"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>
            <el-form-item label="住址">
                <el-input
                    v-model="userInfo.address"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>
            <el-form-item label="出生年月">
                <el-input
                    :value="userInfo.birthday.substr(0, 10)"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>

            <el-form-item label="身份证有效起日期">
                <el-input
                    v-model="userInfo.cardValidityDate"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>
            <el-form-item label="身份证发证机关">
                <el-input
                    v-model="userInfo.licenseIssuingAuthority"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>
            <el-form-item label="身份证有效止日期">
                <el-input
                    v-model="userInfo.cardExpiryDate"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>

            <el-form-item label="所属省">
                <el-input
                    v-model="userInfo.province"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>
            <el-form-item label="所属城市">
                <el-input
                    v-model="userInfo.city"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>
            <el-form-item label="所属区县">
                <el-input
                    v-model="userInfo.township"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phoneNumber">
                <el-input
                    v-model="userInfo.phoneNumber"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>

            <el-form-item label="苏安码状态">
                <el-select
                    v-model="value"
                    placeholder="请选择"
                    :disabled="readOnly"
                >
                    <el-option label="绿码" value="0"> </el-option>
                    <el-option label="黄码" value="1"> </el-option>
                    <el-option label="红码" value="2"> </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="项目名称">
                <el-select
                    v-model="userInfo.projectId"
                    placeholder="请选择"
                    :disabled="readOnly"
                >
                    <el-option
                        v-for="item in projectData"
                        :key="item.id"
                        :label="item.projectName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="企业名称">
                <el-input
                    v-model="userInfo.companyName"
                    :readonly="readOnly"
                    @keyup.enter.native="onSubmit('form')"
                ></el-input>
            </el-form-item>

            <el-form-item label="班组名称">
                <el-select
                    v-model="userInfo.teamName"
                    placeholder="请选择"
                    :disabled="readOnly"
                >
                    <el-option label="班组1" value="班组1"> </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="计划用工开始时间">
                <el-date-picker
                    v-model="userInfo.scheduleStartDate"
                    type="date"
                    placeholder="选择日期"
                    :readonly="readOnly"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="工种">
                <el-select
                    v-model="userInfo.workTypeCategory"
                    placeholder="请选择"
                    :disabled="readOnly"
                >
                    <el-option
                        v-for="item in workTypeData"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="计划用工结束时间">
                <el-date-picker
                    v-model="userInfo.scheduleEndDate"
                    type="date"
                    placeholder="选择日期"
                    :readonly="readOnly"
                >
                </el-date-picker>
            </el-form-item>

            <el-form-item label="人员类型">
                <el-select
                    :value="userInfo.employeeType + ''"
                    placeholder="请选择"
                    :disabled="readOnly"
                >
                    <el-option label="管理人员" value="0" disabled> </el-option>
                    <el-option label="普通人员" value="1" disabled> </el-option>
                    <el-option label="访客" value="2"> </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="身份证照片">
                <el-image
                    style="width: 120px; height: 160px"
                    :src="
                        'data:img/jpg;base64,' + userInfo.secondGenerCertiPhoto
                    "
                    ><div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i></div
                ></el-image>
            </el-form-item>

            <el-form-item label="现场照片">
                <el-image
                    style="width: 120px; height: 160px"
                    class="fl"
                    :src="userInfo.secondGenerCertiPhoto"
                    ><div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i></div
                ></el-image>

                <div class="fl getcama" v-if="!readOnly">
                    <el-button size="small" type="primary" @click="getCaram"
                        >调取摄像头</el-button
                    >

                    <el-button
                        size="small"
                        type="primary"
                        @click="getUpload"
                        plain
                        >手动上传图片</el-button
                    >
                    <div>当拍照功能出现问题时，采用手动上传图片</div>
                </div>
            </el-form-item>
        </el-form>

        <div class="btns" v-show="!readOnly">
            <el-button
                type="primary"
                @click="onSubmit('form')"
                @keyup.enter.native="onSubmit('form')"
                >确定</el-button
            >
            <el-button @click="cancel">取消</el-button>
        </div>

        <!-- 弹框内容 -->
        <el-dialog
            :close-on-click-modal="false"
            title="实时拍照"
            :visible.sync="showCarm"
            append-to-body
        >
            <caram v-if="showCarm" @getImg="getImg"></caram>
        </el-dialog>

        <el-dialog
            :close-on-click-modal="false"
            title="图片上传"
            :visible.sync="showUpload"
            append-to-body
        >
            <upload-file v-if="showUpload"></upload-file>
        </el-dialog>
    </div>
</template>

<script>
import { get, post, put, crossGet } from "~/config/fetch.js";
import caram from "./caram";
import uploadFile from "./upload";
const timestamp = require("time-stamp");

export default {
    data() {
        let checkPending;
        let checkPhone = (rule, value, callback) => {
            clearTimeout(checkPending);
            if (!value) {
                return callback(new Error("请输入手机号"));
            }
            checkPending = setTimeout(() => {
                let reg = /^1[3456789]\d{9}$/;
                if (!reg.test(value)) {
                    callback(new Error("请输入正确的手机号"));
                } else {
                    callback();
                }
            }, 0);
        };
        return {
            value: "0",
            readOnly: true, //只读
            showCarm: false,
            showUpload: false,
            employeeId: "",
            projectData: [],
            workTypeData: [],

            userInfo: {
                address: "",
                birthday: "",
                cardExpiryDate: "",
                cardValidityDate: "",
                city: "",
                // companyId: "",
                employeeName: "",
                employeeType: 2,
                gender: 0,
                id: "",
                idNumber: "",
                licenseIssuingAuthority: "",
                national: "",
                phoneNumber: "",
                projectId: "",
                province: "",
                scheduleEndDate: "",
                scheduleStartDate: "",
                secondGenerCertiPhoto: "",
                township: "",
                workNumber: "",
                workTypeCategory: "",
                workType: "",
            },
            rules: {
                employeeName: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur",
                    },
                ],
                idNumber: [
                    {
                        required: true,
                        message: "请输入身份证号",
                        trigger: "blur",
                    },
                ],
                phoneNumber: [
                    { required: true, validator: checkPhone, trigger: "blur" },
                ],
                projectId: [
                    {
                        required: true,
                        message: "请选择所属项目",
                        trigger: "change",
                    },
                ],
            },
        };
    },

    components: { caram, uploadFile },
    props: ["openType", "currentItem"],
    created() {
        this.readOnly = !!this.$route.query.readOnly;
        this.employeeId = this.$route.params.employeeId;

        console.log(this.employeeId);
        if (this.employeeId) {
            this.getData();
        }

        this.getProject();
        this.getWorkType();
    },

    methods: {
        // 调取摄像头
        getCaram() {
            this.showCarm = true;
        },

        getUpload() {
            this.showUpload = true;
        },

        urlBase64ToUint8Array(base64String) {
            const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
            const base64 = (base64String + padding)
                .replace(/\-/g, "+")
                .replace(/_/g, "/");

            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);

            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        },
        onSubmit(formName) {
            let _this = this;
            // _this.userInfo.secondGenerCertiPhoto = _this.urlBase64ToUint8Array(
            //     _this.userInfo.secondGenerCertiPhoto
            // );

            _this.userInfo.scheduleStartDate = timestamp(
                "YYYY-MM-DD HH:mm:ss",
                new Date(_this.userInfo.scheduleStartDate)
            );

            _this.userInfo.scheduleEndDate = timestamp(
                "YYYY-MM-DD HH:mm:ss",
                new Date(_this.userInfo.scheduleEndDate)
            );

            _this.userInfo.birthday = timestamp(
                "YYYY-MM-DD HH:mm:ss",
                new Date(_this.userInfo.birthday)
            );

            _this.userInfo.cardExpiryDate = timestamp(
                "YYYY-MM-DD HH:mm:ss",
                new Date(_this.userInfo.cardExpiryDate)
            );

            _this.userInfo.cardValidityDate = timestamp(
                "YYYY-MM-DD HH:mm:ss",
                new Date(_this.userInfo.cardValidityDate)
            );

            console.log(_this.userInfo.secondGenerCertiPhoto);

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (_this.openType == "add") {
                        post(`/api/realname/employee`, _this.userInfo).then(
                            (res) => {
                                if (res.isSuccess) {
                                    if (res.isSuccess) {
                                        this.$message({
                                            message: "新增成功！",
                                            type: "success",
                                        });

                                        _this.$emit("ok");
                                    }
                                }
                            }
                        );
                    } else {
                        put(
                            `/api/realname/employee/${_this.currentItem.id}`,
                            _this.userInfo
                        ).then((res) => {
                            if (res.isSuccess) {
                                if (res.isSuccess) {
                                    this.$message({
                                        message: "修改成功！",
                                        type: "success",
                                    });

                                    _this.$emit("ok");
                                }
                            }
                        });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        getData() {
            get(`/api/realname/employee/${this.employeeId}`).then((res) => {
                if (res.isSuccess) {
                    this.userInfo = res.data;
                    this.$nextTick(() => {});
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

        // 项目人员类型
        getWorkType() {
            get(`/api/realname/employee/employee-type`).then((res) => {
                if (res.isSuccess) {
                    this.workTypeData = res.data;
                }
            });
        },
        getCard() {
            this.$confirm("请将身份证放置在二代身份证阅读器上...", "提示", {
                confirmButtonText: "开始读取",
                cancelButtonText: "取消",
            })
                .then((_) => {
                    crossGet(`/api/ReadMsg`).then((res) => {
                        console.log(res);
                        if (res.isSuccess) {
                            let data = res.data;
                            if (data.cardno) {
                                this.$message({
                                    message: "读居民身份证成功",
                                    type: "success",
                                });

                                this.userInfo.birthday = `${data.born.substring(
                                    0,
                                    4
                                )}-${data.born.substring(
                                    4,
                                    6
                                )}-${data.born.substring(6, 8)}`;
                                this.userInfo.employeeName = data.name;
                                this.userInfo.national = data.nation;
                                this.userInfo.secondGenerCertiPhoto =
                                    data.photobase64;
                                this.userInfo.idNumber = data.cardno;
                                this.userInfo.licenseIssuingAuthority =
                                    data.police;
                                this.userInfo.gender = data.gender;
                                this.userInfo.address = data.address;
                                this.userInfo.cardValidityDate = `${data.userlifeb.substring(
                                    0,
                                    4
                                )}-${data.userlifeb.substring(
                                    4,
                                    6
                                )}-${data.userlifeb.substring(6, 8)}`;
                                this.userInfo.cardExpiryDate = `${data.userlifee.substring(
                                    0,
                                    4
                                )}-${data.userlifee.substring(
                                    4,
                                    6
                                )}-${data.userlifee.substring(6, 8)}`;
                            } else {
                                this.$message({
                                    message: "读居民身份证操作失败!",
                                    type: "error",
                                });
                            }
                        }
                    });
                })
                .catch((_) => {
                    console.log(_);
                });
        },
        getImg(e) {
            this.userInfo.secondGenerCertiPhoto = e.imgSrc;
        },

        cancel() {
            this.$emit("cancel");
        },
    },
};
</script>

<style lang="less">
.cert {
    .el-form-item {
        width: 48%;
    }
    .el-form-item__content {
        width: calc(~"100% - 160px");
    }
    .el-input__inner,
    .el-date-editor,
    .el-select {
        width: 100%;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .getcama {
        margin-left: 20px;
        margin-bottom: 20px;
    }

    .upload-demo {
        margin-top: 20px;
    }

    .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #f5f7fa;
        color: #909399;
        font-size: 30px;
    }

    .readCard {
        margin-bottom: 20px;
        margin-left: 140px;
    }

    .btns {
        text-align: center;
        margin-top: 30px;
    }
}
</style>