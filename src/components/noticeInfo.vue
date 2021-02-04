<template>
    <div class="main">
        <h4>{{ content.noticeTitle }}</h4>
        <div class="date">{{ content.publishDate }}</div>

        <div class="content" v-html="content.noticeContent"></div>
    </div>
</template>

<script>
const timestamp = require("time-stamp");

export default {
    data() {
        return {
            content: {
                noticeTitle: "",
                noticeContent: "",
                publishDate: "",
            },
        };
    },
    props: ["infoContent"],
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            GetNoticeInfo({ id: this.infoContent.id }).then((res) => {
                if (res && res.data) {
                    res = res.data;
                    this.content.noticeTitle = res.noticeTitle;
                    this.content.publishDate = timestamp(
                        "YYYY-MM-DD HH:mm:ss",
                        new Date(res.publishDate)
                    );
                    this.content.noticeContent = res.noticeContent;
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.main {
    color: #535353;
    h4 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
        margin-top: 10px;
    }
    .date {
        font-size: 12px;
        font-weight: 300;
        margin-bottom: 20px;
    }
}
</style>