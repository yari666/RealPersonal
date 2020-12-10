<!--添加运维方-->
<template>
    <div class="itemlist">
        <!-- 筛选项 -->
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline fl">
                <el-form-item label="关键词">
                    <el-input
                        placeholder="请输入关键词"
                        v-model="KeyWord"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button
                        type="primary"
                        style="background: #28adca"
                        @click="getOperationCompanyList()"
                        >查询</el-button
                    >
                </el-form-item>
            </el-form>
        </div>

        <div class="w100">
            <div
                class="listbox"
                :class="operationCompanyList.length > 7 ? 'scrollY' : ''"
            >
                <el-radio
                    v-for="(item, index) in operationCompanyList"
                    :key="index"
                    :label="item.id"
                    :disabled="item.isInserted"
                    :value="item.isInserted ? item.id : id"
                    @change="changeCompany(index)"
                    >{{ item.companyName
                    }}<span>{{ item.area }}</span></el-radio
                >
            </div>

            <div class="baseInfo">
                <div class="sewage-table">
                    <div class="title">
                        {{ companyInfo.companyName }}基本信息
                    </div>
                    <table cellspadding="0" cellspacing="0" border="0">
                        <tr>
                            <td class="title">名称</td>
                            <td>{{ companyInfo.companyName }}</td>
                        </tr>
                        <tr>
                            <td class="title">地区</td>
                            <td>{{ companyInfo.area }}</td>
                        </tr>
                        <tr>
                            <td class="title">地址</td>
                            <td>{{ companyInfo.address }}</td>
                        </tr>
                        <tr>
                            <td class="title">注册资金</td>
                            <td>{{ companyInfo.companyRegisteredCapital }}</td>
                        </tr>
                        <tr>
                            <td class="title">法人</td>
                            <td>{{ companyInfo.companyPerson }}</td>
                        </tr>
                        <tr>
                            <td class="title">营业执照</td>
                            <td>
                                {{ companyInfo.companyBusinessLicenseImgName }}
                            </td>
                        </tr>
                        <tr>
                            <td class="title">联系人</td>
                            <td>{{ companyInfo.companyPerson }}</td>
                        </tr>
                        <tr>
                            <td class="title">联系方式</td>
                            <td>{{ companyInfo.companyMobilePhone }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div class="fr">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="close">取消</el-button>
        </div>
    </div>
</template>

<script>
import { ThirdOperationCompany, AddThirdOperation } from "~/config/api.js";

export default {
    data() {
        return {
            companyIndex: -1,
            id: "",
            KeyWord: "",
            operationCompanyList: [], //运维公司
            companyInfo: {
                id: "",
                companyName: "",
                area: "",
                address: "",
            },
        };
    },
    created() {
        this.getOperationCompanyList();
    },
    computed: {
        companyId() {
            return this.$store.state.userInfo.companyId;
        },
    },
    methods: {
        // 获取运维企业列表
        getOperationCompanyList() {
            ThirdOperationCompany({ KeyWord: this.KeyWord }).then((res) => {
                if (res && res.data) {
                    this.operationCompanyList = res.data;
                }
            });
        },

        changeCompany(index) {
            this.companyInfo = this.operationCompanyList[index];
            this.id = this.companyInfo.id;
        },

        // 添加运维
        onSubmit(row) {
            if (!this.id) {
                this.$message({
                    type: "warning",
                    message: "请选择运维公司!",
                });
            } else {
                AddThirdOperation({
                    ownerEnterpriseId: this.companyId, //业主企业id
                    operationalEnterpriseId: this.id, //运维企业id
                }).then((res) => {
                    if (res && res.status == 200) {
                        this.$emit("closeOperation");
                    }
                });
            }
        },

        close() {
            this.$emit("closeOperation");
        },
    },
};
</script>

<style lang="less" scoped>
.itemlist {
    color: #6b6b6b;
    position: relative;

    .w100 {
        width: 100%;
        overflow: hidden;
    }
    .fr {
        text-align: center;
        margin-top: 20px;
    }

    .listbox {
        float: left;
        width: 30%;
        height: 100%;
        height: 350px;
        background: #ffffff;
        box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        padding: 14px;
        box-sizing: border-box;
        font-size: 12px;
        .el-radio {
            margin-top: 10px;
            width: 100%;
            border-bottom: 1px solid #dfdfdf;
            padding: 5px 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 90%;
            height: 50px;
            line-height: 20px;
            box-sizing: border-box;
            span {
                display: block;
                color: #aaaaaa;
                margin-left: 24px;
            }
        }
    }

    .baseInfo {
        float: right;
        width: 68%;
        height: 350px;
        background: #ffffff;
        box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        padding: 14px;
        box-sizing: border-box;
        .title {
            color: #6b6b6b;
            margin-bottom: 6px;
        }

        .sewage-table {
            table {
                width: 100%;
                padding: 20px 15px;
                td {
                    padding: 5px 10px;
                    color: #6b6b6b;
                    &.title {
                        color: #333;
                        text-align: right;
                        width: 100px;
                    }
                }
            }
        }
    }
}
</style>