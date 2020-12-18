<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="工种" name="first">
            <wtype></wtype>
        </el-tab-pane>
        <el-tab-pane label="证书种类" name="second">
            <wcat></wcat>
        </el-tab-pane>
    </el-tabs>
</template>


<script>
import wtype from "./wtype";
import wcat from "./wcat";

export default {
    data() {
        return {
            activeName: "first",
        };
    },
    components: { wtype, wcat },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
    },
};
</script>

<style lang="less" >
.dialog {
    .el-dialog__body {
        padding: 10px 20px 30px;
    }
}
</style>