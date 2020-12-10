<!--运维-添加业主-->

<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="企业" name="company">
            <add-company-form></add-company-form>
        </el-tab-pane>
        <el-tab-pane label="政府" name="government">
            <add-government-form></add-government-form>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import addCompanyForm from "./addCompanyForm";
import addGovernmentForm from "./addGovernmentForm";

export default {
    data() {
        return {
            activeName: "company",
        };
    },
    components: { addCompanyForm, addGovernmentForm },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
    },
};
</script>