<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    methods: {},
};
</script>

<style lang="less">
@import "./assets/css/element.less";

#app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #031d4d;
}
.fl {
    float: left;
}
.fr {
    float: right;
}
.el-table {
    font-size: 12px;
    td,
    th {
        padding: 10px 0;
    }
}

.el-pager li {
    background: transparent !important;
}
.el-pagination .btn-next,
.el-pagination .btn-prev {
    background: transparent !important;
}

.search-box {
    position: relative;
    background: #fff;
    padding: 15px 10px;
    margin-bottom: 10px;
    height: 40px;
    border-radius: 8px;
    box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.04);
}
</style>
