<template>
    <div class="title"><i :style="{ background: color }"></i>{{ title }}</div>
</template>

<style lang="less" scoped>
.title {
    font-size: 10px;
    color: #b2b4c1;
    line-height: 14px;
    i {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        display: inline-block;
        margin-right: 10px;
    }
}
</style>

<script>
export default {
    props: ["title", "color"],
};
</script>