<template>
    <div>
        <el-tree
            :data="menuIdList"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            :default-checked-keys="checkData"
            ref="trees"
        >
        </el-tree>
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
            menuIdList: [
                {
                    id: 1,
                    label: "一级 1",
                    children: [
                        {
                            id: 4,
                            label: "二级 1-1",
                            children: [
                                {
                                    id: 9,
                                    label: "三级 1-1-1",
                                },
                                {
                                    id: 10,
                                    label: "三级 1-1-2",
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 2,
                    label: "一级 2",
                    children: [
                        {
                            id: 5,
                            label: "二级 2-1",
                        },
                        {
                            id: 6,
                            label: "二级 2-2",
                        },
                    ],
                },
                {
                    id: 3,
                    label: "一级 3",
                    children: [
                        {
                            id: 7,
                            label: "二级 3-1",
                        },
                        {
                            id: 8,
                            label: "二级 3-2",
                        },
                    ],
                },
            ],
            defaultProps: {
                children: "menuList",
                label: "menuName",
            },
            checkData: [],
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
        this.getChecked();
        this.checkEvent();
    },
    computed: {
        userId() {
            return this.$store.state.userId;
        },
    },
    methods: {
        getData() {
            get("/api/realname/menu/menu-list", {
                UserId: this.userId,
            }).then((res) => {
                if (res.isSuccess) {
                    this.menuIdList = res.data;
                }
            });
        },

        getChecked() {
            get("/api/realname/menu/role-menu-tree", {
                roleid: this.currentItem.id,
            }).then((res) => {
                if (res.isSuccess) {
                    this.checkData = res.data;
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
            // console.log(this.$refs.trees.getCheckedKeys());
            // console.log(this.$refs.trees.getHalfCheckedKeys());
            let checkKey = Object.assign(
                this.checkData,
                this.$refs.trees.getCheckedKeys(),
                this.$refs.trees.getHalfCheckedKeys()
            );
            let param = {
                roleCode: this.currentItem.roleCode,
                roleName: this.currentItem.roleName,
                isActive: this.currentItem.isActive,
                remark: this.currentItem.remark,
                selectedMenu: checkKey,
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

<style lang="less" scoped>
.button {
    margin-top: 30px;
    margin-left: 24px;
}
</style>