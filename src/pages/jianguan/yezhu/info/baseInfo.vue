<!--业主基本信息-->
<template>
    <div class="baseInfo">
        <table cellspadding="0" cellspacing="0" border="0">
            <tr>
                <td class="title">业主类型</td>
                <td class="w50">{{ info.ownerType == 0 ? "企业" : "政府" }}</td>
                <td class="title">营业执照</td>
                <td rowspan="6" class="imgbox">
                    <img-box></img-box>
                </td>
            </tr>
            <tr>
                <td class="title">企业名称</td>
                <td colspan="3">{{ info.companyName }}</td>
            </tr>
            <tr>
                <td class="title">企业法人</td>
                <td colspan="3">{{ info.companyLegalPerson }}</td>
            </tr>
            <tr>
                <td class="title">注册资金</td>
                <td colspan="3">{{ info.companyRegisteredCapital }}</td>
            </tr>
            <tr>
                <td class="title">所属区域</td>
                <td colspan="3">
                    {{ info.province }}/{{ info.city }}/{{ info.township }}
                </td>
            </tr>
            <tr>
                <td class="title">联系方式</td>
                <td colspan="3">{{ info.companyMobilePhone }}</td>
            </tr>
            <tr>
                <td class="title">开通时间</td>
                <td colspan="3">2020-01-01</td>
            </tr>
            <tr>
                <td class="title">业务范围</td>
                <td colspan="3">{{ info.companyBusinessScope }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import imgBox from "~/components/imgBox";

export default {
    data() {
        return {
            info: {
                address: "",
                businessLicenseAttach: null,
                city: "",
                companyBusinessScope: "",
                companyLegalPerson: "",
                companyMobilePhone: "",
                companyName: "",
                companyRegisteredCapital: 0,
                companyShortenedForm: "",
                logoAttach: {
                    id: "",
                    fileName: "",
                    url: "",
                },
                fileName: "",
                id: "",
                url: "",
                ownerType: 0,
                province: "",
                township: "",
            },
        };
    },
    components: { imgBox },
    props: ["infoData"],
    created() {
        this.info = this.infoData;
    },
    watch: {
        infoData() {
            this.info = this.infoData;
        },
    },
};
</script>

<style lang="less" scoped>
table {
    width: 100%;

    td {
        padding: 10px;
        color: #6b6b6b;
        &.title {
            color: #333;
            width: 80px;
        }
        &.w50 {
            width: 50%;
        }
        &.imgbox {
            vertical-align: top;
        }
    }
}
</style>