<template>
    <div class="mainCon">
        <el-page-header @back="goBack" content="人员详情"> </el-page-header>

        <el-tabs class="tabs" v-model="activeName">
            <el-tab-pane label="人员信息" name="first">
                <user-info></user-info>
            </el-tab-pane>
            <el-tab-pane label="人员证书" name="second">
                <user-cert></user-cert>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { get } from "~/config/fetch.js";
import userInfo from "./info";
import userCert from "./cert";

export default {
    data() {
        return {
            activeName: "first",
            employeeId: "",
            readOnly: false,
            userInfo: {
                address: "",
                birthday: "",
                cardExpiryDate: "",
                cardValidityDate: "",
                city: "",
                companyId: "",
                employeeName: "",
                employeeType: 0,
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
            },
        };
    },

    components: { userInfo, userCert },
    created() {
        // this.readOnly = this.$route.query.readOnly;
        // this.getData();
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        getData() {
            get(`/api/realname/employee/${this.employeeId}`).then((res) => {
                if (res.isSuccess) {
                    this.userInfo = res.data;
                    this.$nextTick(() => {});
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

                                this.userInfo.birthday = data.born;
                                this.userInfo.employeeName = data.name;
                                this.userInfo.national = data.nation;
                                this.userInfo.secondGenerCertiPhoto =
                                    data.photobase64;
                                this.userInfo.idNumber = data.cardno;
                                this.userInfo.licenseIssuingAuthority =
                                    data.police;
                                this.userInfo.gender = data.sex == "男" ? 1 : 0;
                                this.userInfo.address = data.address;
                                this.userInfo.cardValidityDate = data.userlifeb;
                                this.userInfo.cardExpiryDate = data.userlifee;
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
    },
};
</script>

<style lang="less" scoped>
.mainCon {
    margin: 20px;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 8px;
    .tabs {
        margin-top: 20px;
    }
}
</style>
