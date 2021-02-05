
<template>
    <div class="main">
        <el-upload
            action=""
            :on-change="getFile"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            list-type="picture"
            :auto-upload="false"
        >
            <el-button size="small" type="primary"
                >选择图片上传,最多上传一张图片</el-button
            >
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
        };
    },
    created() {},
    methods: {
        beforeAvatarUpload(file) {
            console.log(file.size);
            const isLt2M = file.size / 1024 < 100;

            if (!isLt2M) {
                this.$message.error("上传图片大小不能超过 100KB!");
            }
            return isLt2M;
        },
        getFile(file, fileList) {
            let _this = this;
            this.getBase64(file.raw).then((res) => {
                _this.$emit("getImg", { imgSrc: res });
            });
        },
        getBase64(file) {
            return new Promise(function (resolve, reject) {
                let reader = new FileReader();
                let imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = function () {
                    imgResult = reader.result;
                };
                reader.onerror = function (error) {
                    reject(error);
                };
                reader.onloadend = function () {
                    resolve(imgResult);
                };
            });
        },
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