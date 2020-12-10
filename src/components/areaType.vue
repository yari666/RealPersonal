<!--市级区域组件--->
<template>
    <!-- <div class="areaType">
        <div @click="dialogFormVisible = true">
            <span>市级</span>
            陕西省安康市
            <i class="el-icon-arrow-down el-icon--right"></i>
        </div>

        
    </div>-->
    <div class="areaType">
        <span class="demonstration">省级</span>
        <el-cascader
            placeholder="陕西省"
            :options="options"
            change-on-select
        ></el-cascader>
    </div>
</template>

<style lang="less" scoped>
.areaType {
    float: left;
    overflow: hidden;
    .el-cascader {
        margin-right: 15px;
    }

    span {
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        background: #333;
        color: #fff;
        display: block;
        float: left;
        font-size: 14px;
        margin-right: -2px;
        z-index: 10;
        position: relative;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        overflow: hidden;
    }
}

// .areaType {
//     -webkit-appearance: none;
//     background-color: #fff;
//     background-image: none;
//     border-radius: 4px;
//     border: 1px solid #dcdfe6;
//     box-sizing: border-box;
//     color: #606266;
//     font-size: 14px;
//     height: 40px;
//     line-height: 40px;
//     outline: 0;
//     transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
//     overflow: hidden;
//     padding-right: 15px;
//     float: left;
//     margin-right: 15px;
//     cursor: pointer;
//     span {
//         height: 38px;
//         line-height: 38px;
//         padding: 0 10px;
//         background: #333;
//         color: #fff;
//         display: block;
//         float: left;
//         margin-right: 15px;
//     }
// }
</style>


<script>
export default {
    data() {
        return {
            options: [],
        };
    },
};
</script>