
<template>
    <div class="main">
        <el-upload
            ref="elupload"
            :action="uploadUrl"
            :file-list="fileList"
            :before-upload="handleBeforeUpload"
            :on-success="successUpload"
            :show-file-list="false"
        >
            <el-button type="primary">点击上传</el-button>

            <div slot="tip" class="el-upload__tip">
                只能上传jpg/png/word/excel/pdf/zip/rar文件，且不超过20M。
            </div>
        </el-upload>
    </div>
</template>

<script>
const Env = require("~/config/env.js");

export default {
    data() {
        return {
            loading: false,
            fileList: [],
            uploadUrl: "",
            baseUrl: "",
            params: {
                guid: "", //企业id或项目id
                fileType: 0, //文件类型 0图片 1文件
                category: 0, //业主类型 0企业 1项目
                categoryName: "", //企业或项目名称
                remark: "",
            },
        };
    },
    props: ["projectId", "projectName", "uploadList"],
    created() {
        this.baseUrl = Env.baseUrl;

        this.uploadUrl =
            this.baseUrl +
            `attachment/uploadAttachment?guid=${this.projectId}&fileType=1&category=1&categoryName=${this.projectName}`;

        if (this.uploadList && this.uploadList.length) {
            this.uploadList.forEach((item) => {
                this.fileList.push({
                    name: item.fileName,
                    id: item.id,
                });
            });
        }
    },
    methods: {
        // 上传文件
        handleBeforeUpload(file) {
            const uploadLimit = 20; //文件大小
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
            const isRightSize = (file.size || 0) / 1024 / 1024 < uploadLimit;
            if (!isRightSize) {
                this.$message.error("文件大小超过 " + uploadLimit + "MB");
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
            if (response && response.id && response.fileName) {
                this.$message.success({
                    message: "上传成功",
                });

                this.uploadList.push({
                    id: response.id,
                    fileName: response.fileName,
                });
                this.loading = false;
            }
        },

        // // 上传失败
        // errorUpload(err, file, fileList) {
        //     let error = JSON.parse(err.message);
        //     this.$message.warning({
        //         message: error.error.message,
        //     });
        // },

        DelFile(Id, index) {
            DelFile({ Id }).then((res) => {
                if (res) {
                    this.uploadList.splice(index, 1);
                }
            });
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
    li {
        box-sizing: border-box;
        padding: 0 20px;
        height: 48px;
        line-height: 48px;
        margin-bottom: 2px !important;
        border-radius: 4px;
        background: #fff;
        cursor: pointer;
        &:hover {
            background: #f5f9fa;
        }
        .fl {
            i {
                margin-right: 10px;
                color: #00bfd9;
            }
        }
        .fr {
            a {
                color: #28adca;
                text-decoration: none;
                margin-right: 20px;
            }
            .del {
                color: red;
            }
        }
    }
}
</style>