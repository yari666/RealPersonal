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
#app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
.fl {
    float: left;
}
.fr {
    float: right;
}
.overflow {
    overflow: hidden;
}
.pagination {
    float: right;
    margin-top: 10px;
}
</style>
