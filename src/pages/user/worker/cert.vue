
<template>
    <div class="main">
        <ul class="list">
            <li v-for="(item, index) in uploadList" :key="index">
                <img class="img" :src="'data:img/jpg;base64,' + item.bytes" />
                <div class="con">
                    <p>{{ item.fileName }}</p>
                    <a
                        class="fl"
                        :href="
                            baseUrl + 'attachment/attachmentById?Id=' + item.id
                        "
                        :download="item.fileName"
                        >下载</a
                    >
                    <span class="del" @click="DelFile(item.id)">删除</span>
                </div>
            </li>

            <li v-show="newCert" v-loading="loading">
                <p
                    style="
                        text-align: center;
                        font-size: 16px;
                        margin-bottom: 10px;
                    "
                >
                    新增证件
                </p>
                <el-input v-model="certType" placeholder="证件类型"></el-input>
                <el-upload
                    ref="elupload"
                    :action="uploadUrl"
                    :file-list="fileList"
                    :before-upload="handleBeforeUpload"
                    :on-success="successUpload"
                    :show-file-list="false"
                >
                    <el-button
                        type="primary"
                        style="margin-top: 20px"
                        :disabled="!certType"
                        >点击上传</el-button
                    >

                    <div slot="tip" class="el-upload__tip">
                        只能上传jpg/png/gif文件，且不超过100KB。
                    </div>
                </el-upload>
            </li>

            <li class="plus" @click="plus">
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </li>
        </ul>
    </div>
</template>

<script>
const Env = require("~/config/env.js");
import { get, del } from "~/config/fetch.js";

export default {
    data() {
        return {
            loading: false,
            newCert: false,
            showPlus: true,
            fileList: [],
            uploadList: [],
            uploadUrl: "",
            certType: "",
            baseUrl: "",
            params: {
                guid: "", //企业id或项目id
                fileType: 0, //文件类型 0图片 1文件
                category: 0, //业主类型 0企业 1项目
                categoryName: "", //企业或项目名称
                remark: "",
            },
            form: {},
        };
    },
    props: ["currentId", "currentName"],
    created() {
        this.baseUrl = Env.baseUrl;

        this.uploadUrl =
            this.baseUrl +
            `/api/realname/attachment/uploadAttachment?guid=${this.currentId}&fileType=0&categoryName=${this.currentName}/${this.certType}`;

        this.getData();
    },
    methods: {
        plus() {
            this.showPlus = true;
            this.newCert = true;
        },
        // 获取已上传文件
        getData() {
            get(`/api/realname/attachment/foreignattachments`, {
                id: this.currentId,
            }).then((res) => {
                if (res.isSuccess) {
                    this.uploadList = res.data;
                }
            });
        },

        // 上传文件
        handleBeforeUpload(file) {
            const uploadLimit = 100; //文件大小
            const uploadTypes = [
                "jpg",
                "png",
                "doc",
                "docx",
                "xlsx",
                "zip",
                "rar",
                "pdf",
                "txt",
            ];
            const filetype = file.name.replace(/.+\./, "");
            const isRightSize = (file.size || 0) / 1024 < uploadLimit;
            console.log(uploadLimit);
            if (!isRightSize) {
                this.$message.error("文件大小超过了 " + uploadLimit + "KB");
                return false;
            }

            if (uploadTypes.indexOf(filetype.toLowerCase()) === -1) {
                this.$message.warning({
                    message:
                        "请上传后缀名为jpg、png、txt、pdf、doc、docx、xlsx、zip或rar的附件",
                });
                return false;
            }

            this.loading = true;
            return true;
        },

        // 上传成功
        successUpload(response, file, fileList) {
            console.log(response);
            if (response && response.id && response.fileName) {
                this.newCert = false;
                this.$message.success({
                    message: "上传成功",
                });

                this.getData();
                this.loading = false;
            }
        },

        // 上传失败
        errorUpload(err, file, fileList) {
            let error = JSON.parse(err.message);
            this.$message.error({
                message: "上传失败",
            });
        },

        // 删除文件
        DelFile(Id) {
            del(`/api/realname/attachment/deleteAttachment`, { id: Id }).then(
                (res) => {
                    if (res.isSuccess) {
                        this.$message.success("删除成功");
                        this.getData();
                    }
                }
            );
        },

        // // 删除文件
        // beforeRemove(file, fileList) {
        //     return this.$confirm(`确定删除 ${file.name}？`);
        // },

        // handleRemove(file, fileList) {
        //     DelFile({ Id: file.id }).then((res) => {
        //         console.log(res);
        //     });
        // },

        // // 下载文件
        // downloadFile(file) {
        //     DownloadFile({ Id: file.id }).then((res) => {

        //     });
        // },
    },
};
</script>

<style lang="less" scoped>
.el-upload__tip {
    font-size: 14px;
    margin: 10px 0 20px 0;
}

.list {
    width: 100%;
    overflow: hidden;
    li {
        width: 22.5%;
        float: left;
        box-sizing: border-box;
        padding: 15px;
        margin: 10px;
        box-sizing: border-box;
        height: 220px;
        border-radius: 8px;
        background: #fff;
        border: 1px solid #e1e1e1;
        cursor: pointer;
        overflow: hidden;
        &:hover {
            background: #eee;
        }
        .img {
            width: 100%;
            height: 140px;
        }
        .con {
            line-height: 20px;
            p {
                height: 25px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            a {
                color: #28adca;
                text-decoration: none;
                margin-right: 20px;
            }
            .del {
                color: red;
            }
        }
        &.plus {
            position: relative;
            font-size: 50px;
            color: #ddd;
            i {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
}
</style>