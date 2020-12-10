<template>
    <div class="addwsz">
        <table
            cellspadding="0"
            cellspacing="0"
            border="0"
            v-if="relativeSewage.length"
        >
            <tr v-for="(item, index) in relativeSewage" :key="index">
                <td>{{ item.sewageStationName }}</td>
                <td>{{ item.area }}</td>
                <td class="title">{{ item.deviceCount || "0台设备" }}</td>
                <td>{{ item.designProcess || "设备工艺" }}</td>
                <td class="online-font">{{ item.status || "在线" }}</td>
                <td class="danger-font" @click="del(item.id)">
                    <span>删除</span>
                </td>
            </tr>
        </table>

        <div class="search-box">
            <el-button type="primary" @click="choice">添加</el-button>
        </div>

        <el-dialog
            :close-on-click-modal="false"
            title="选择污水站"
            :visible.sync="showChoiceWsz"
            append-to-body
        >
            <choice-wsz
                v-if="showChoiceWsz"
                :operationId="operationId"
                :relativeSewage="relativeSewage"
                @closeChoiceWsz="closeChoiceWsz"
            ></choice-wsz>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            outerVisible: false,
            innerVisible: false,
        };
    },
};
</script>

<script>
import choiceWsz from "./choiceWsz";
import {
    RelativeOperationSewage,
    DelThirdOperationSewage,
} from "~/config/api.js";

export default {
    data() {
        return {
            showChoiceWsz: false,
            relativeSewage: [], //已关联污水站
        };
    },
    components: { choiceWsz },
    props: ["operationId"],
    created() {
        this.getSewage();
    },
    methods: {
        choice() {
            this.showChoiceWsz = true;
        },

        // 已关联污水站
        getSewage() {
            RelativeOperationSewage({ Id: this.operationId }).then((res) => {
                if (res && res.data) {
                    this.relativeSewage = res.data;
                }
            });
        },

        // 删除关联污水站
        del(Id) {
            DelThirdOperationSewage({
                Id,
            }).then((res) => {
                if (res) {
                    this.getSewage();
                }
            });
        },

        close() {
            this.$emit("closeSewage");
        },

        closeChoiceWsz() {
            this.showChoiceWsz = false;
            this.getSewage();
        },
    },
};
</script>

<style lang="less" scoped>
.addwsz {
    .search-box {
        background: transparent;
        .el-select {
            width: 120px;
        }
    }

    table {
        width: 100%;
        td {
            height: 48px;
            background: #ffffff;
            border-radius: 4px;
            border-bottom: 10px solid #f9f9f9;
            padding: 5px 20px;
            span {
                border-left: 1px solid #dcdfe6;
                display: block;
                height: 40px;
                line-height: 40px;
                width: 100%;
                padding-left: 30px;
            }
        }
    }
}
</style>