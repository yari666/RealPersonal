
<template>
    <div class="main">
        <ul class="list" v-if="uploadList.length">
            <li v-for="(item, index) in uploadList" :key="index">
                <div class="img">
                    <img :src="'data:img/jpg;base64,' + item.bytes" />
                </div>

                <div class="con">
                    <p>{{ item.fileName }}</p>
                </div>
            </li>
        </ul>

        <div class="empty" v-else>暂无数据</div>
    </div>
</template>

<script>
import { get, del } from "~/config/fetch.js";

export default {
    data() {
        return {
            loading: false,
            newCert: false,
            showPlus: true,
            fileList: [],
            employeeId: "",
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
        this.employeeId = this.$route.params.employeeId;

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
                id: this.employeeId,
            }).then((res) => {
                if (res.isSuccess) {
                    this.uploadList = res.data;
                }
            });
        },

        // 上传文件
        handleBeforeUpload(file) {
            const uploadLimit = 100; //文件大小
            const uploadTypes = ["jpg", "png"];
            const filetype = file.name.replace(/.+\./, "");
            const isRightSize = (file.size || 0) / 1024 < uploadLimit;
            console.log(uploadLimit);
            if (!isRightSize) {
                this.$message.error("文件大小超过了 " + uploadLimit + "KB");
                return false;
            }

            if (uploadTypes.indexOf(filetype.toLowerCase()) === -1) {
                this.$message.warning({
                    message: "请上传后缀名为jpg、png的附件",
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

                this.getData();
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
    },
};
</script>

<style lang="less" scoped>
.empty {
    height: 200px;
    line-height: 150px;
    color: #999;
    text-align: center;
    font-size: 14px;
}
.el-upload__tip {
    font-size: 14px;
    margin: 10px 0 20px 0;
}

.list {
    width: 100%;
    overflow: hidden;

    li {
        width: calc(~"20% - 30px");
        box-sizing: border-box;
        padding: 15px;
        margin: 15px;
        float: left;
        box-sizing: border-box;
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
            height: 0;
            padding-bottom: 100%;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                position: absolute;
            }
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