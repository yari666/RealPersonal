<template>
    <div class="box">
        <title-box :color="'#FFD709'" :title="'预警通知'"></title-box>
        <ul class="tab">
            <li
                :class="tabIndex == index ? 'active' : ''"
                v-for="(item, index) in machineList"
                :key="index"
                @click="tabChange(index)"
            >
                {{ item.tabName }}
            </li>
        </ul>
        <ul class="list">
            <li
                v-for="(item, index) in machineList[tabIndex].list"
                :key="index"
            >
                {{ item.title }}
                <span>{{ item.date }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import titleBox from "~/components/title.vue";

export default {
    props: [
        "showSewageInfo",
        "sewageInfo",
        "checkName",
        "statisData",
        "statusData",
        "energyData",
    ],
    components: { titleBox },
    data() {
        return {
            showLeft1: true,
            showLeft2: true,

            tabIndex: 0,
            machineList: [
                {
                    tabName: "故障",
                    list: [
                        {
                            title: "松坝社区污水站【故障】",
                            date: "2020/01/01",
                        },
                        {
                            title: "后沟村污水站【故障】",
                            date: "2020/01/01",
                        },
                        {
                            title: "金思铭生物科技公司污水站【故障】",
                            date: "2020/01/01",
                        },
                        {
                            title: "安康妇幼保健院污水站【故障】",
                            date: "2020/01/01",
                        },
                        {
                            title: "吉河坝污水站【故障】",
                            date: "2020/01/01",
                        },
                    ],
                },
                {
                    tabName: "异常",
                    list: [
                        {
                            title: "陕佘家窑（5组）污水站【异常】",
                            date: "2020/01/01",
                        },
                        {
                            title: "佘家窑（1-4组）污水站【异常】",
                            date: "2020/01/01",
                        },
                        {
                            title: "安康妇幼保健院污水站【异常】",
                            date: "2020/01/01",
                        },
                        {
                            title: "后沟村污水站【异常】",
                            date: "2020/01/01",
                        },
                        {
                            title: "松坝社区污水站【异常】",
                            date: "2020/01/01",
                        },
                    ],
                },
                {
                    tabName: "离线",
                    list: [
                        {
                            title: "后沟村污水站【离线】",
                            date: "2020/01/01",
                        },
                        {
                            title: "吉河坝污水站【离线】",
                            date: "2020/01/01",
                        },
                        {
                            title: "三柳村污水站【离线】",
                            date: "2020/01/01",
                        },
                        {
                            title: "松坝社区污水站【离线】",
                            date: "2020/01/01",
                        },
                        {
                            title: "后沟村污水站【离线】",
                            date: "2020/01/01",
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        tabChange(index) {
            this.tabIndex = index;
        },
        clickRepair(name) {
            this.$emit("showDialog", {
                repairName: name,
                showRepair: true,
                showMachine: false,
                showStatis: false,
            });
        },
        clickMachine(name) {
            this.$emit("showDialog", {
                repairName: name,
                showRepair: false,
                showMachine: true,
                showStatis: false,
            });
        },
    },
};
</script>

<style lang="less" scoped>
.box {
    position: relative;
    .tab {
        position: absolute;
        right: 20px;
        top: 15px;
        li {
            height: 18px;
            line-height: 18px;
            padding: 0 12px;
            float: left;
            cursor: pointer;
            font-size: 10px;
            &.active {
                background: linear-gradient(270deg, #ffd500 0%, #fc5600 100%);
                border-radius: 9px;
                overflow: hidden;
            }
        }
    }
    .list {
        padding: 0 20px;
        margin-top: 20px;
        overflow-y: scroll;
        li {
            line-height: 24px;
            font-weight: 200;
            font-size: 12px;
            span {
                float: right;
            }
        }
    }
}
</style>