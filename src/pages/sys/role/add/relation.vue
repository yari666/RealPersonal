<template>
    <div>
        <el-transfer
            v-model="checkedIndex"
            :titles="['待关联项目', '已关联项目']"
            :props="{
                key: 'id',
                label: 'projectName',
            }"
            :data="data"
        >
        </el-transfer>
        <div class="button">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </div>
    </div>
</template>



<script>
import { get } from "~/config/fetch.js";
export default {
    data() {
        return {
            data: [],
            checkedIndex: [],
            checkedData: [],
        };
    },
    props: ["currentItem"],
    watch: {
        currentItem: {
            handler(newName) {
                this.currentItem = newName;
                this.checkEvent();
            },
            immediate: true,
            deep: true,
        },
    },
    created() {
        this.getData();
        this.checkEvent();
    },
    methods: {
        getData() {
            get(`/api/realname/project/project-dictionary`).then((res) => {
                if (res.isSuccess) {
                    this.data = res.data;
                }
            });
        },
        checkEvent() {
            let arr = [];
            this.currentItem.projectIdList.forEach((i) => {
                arr.push(i.id);
            });
            this.checkedIndex = arr;
        },
        onSubmit() {
            let param = {
                roleCode: this.currentItem.roleCode,
                roleName: this.currentItem.roleName,
                isActive: this.currentItem.isActive,
                remark: this.currentItem.remark,
                selectedMenu: this.currentItem.menuIdList.map((i) => i.id),
                projectids: this.checkedIndex,
            };
            this.$emit("editData", param);
        },
        cancel() {
            this.$emit("cancel");
        },
    },
};
</script>

<style lang="less">
.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
}
.el-transfer-panel {
    width: 30% !important;
}
.button {
    margin-top: 30px;
}
</style>