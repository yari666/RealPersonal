  <template>
    <div class="mainCon">
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline fl">
                <el-form-item label="关键词">
                    <el-input
                        placeholder="搜索关键词"
                        v-model="KeyWord"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">查询</el-button>
                </el-form-item>
            </el-form>

            <div class="fr">
                <el-button type="primary" @click="addClass">添加</el-button>
                <el-button type="primary">导出</el-button>
            </div>
        </div>

        <el-table
            :data="tableData"
            style="width: 100%"
            height="72vh"
            v-loading="loading"
        >
            <el-table-column prop="roleCode" label="角色编号">
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称">
            </el-table-column>
            <el-table-column label="是否激活">
                <template slot-scope="scope">
                    {{ scope.row.isActive ? "是" : "否" }}
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注"> </el-table-column>
            <el-table-column label="操作" width="360px">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        @click="editClass(scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="warning"
                        size="small"
                        @click="roleAuthority(scope.row)"
                        >角色权限</el-button
                    >
                    <el-button
                        type="warning"
                        size="small"
                        @click="relationRole(scope.row)"
                        >关联项目</el-button
                    >
                    <el-button
                        type="danger"
                        size="small"
                        @click="delData(scope.row.id)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                :total="totalCount"
            >
            </el-pagination>
        </div>

        <!-- 弹框内容 -->
        <el-dialog
            :close-on-click-modal="false"
            :title="openType == 'add' ? '添加用户' : '编辑用户'"
            :visible.sync="showAdd"
            class="dialog"
            @closed="closeCancel"
        >
            <add
                v-if="showAdd"
                :openType="openType"
                :currentItem="currentItem"
                @cancel="closeCancel"
                @ok="closeOk"
            ></add>
        </el-dialog>

        <el-dialog
            :close-on-click-modal="false"
            title="角色权限"
            :visible.sync="showAut"
            @closed="closeCancel"
        >
            <authority
                :currentItem="currentItem"
                @editData="editData"
                v-if="showAut"
                @cancel="closeCancel"
                @ok="closeOk"
            ></authority>
        </el-dialog>

        <el-dialog
            :close-on-click-modal="false"
            title="关联项目"
            :visible.sync="showRelation"
            @closed="closeCancel"
        >
            <relation
                :currentItem="currentItem"
                @editData="editData"
                v-if="showRelation"
                @cancel="closeCancel"
                @ok="closeOk"
            ></relation>
        </el-dialog>
    </div>
</template>

<script>
import add from "./add/base";
import authority from "./add/authority";
import relation from "./add/relation";
import { get, del, put } from "~/config/fetch.js";

export default {
    data() {
        return {
            openType: "add",
            showAdd: false,
            showRelation: false,
            showAut: false,
            loading: false,
            tableData: [],
            totalCount: 0,
            KeyWord: "",
            pagination: {
                SkipCount: 0, //跳过的记录数
                MaxResultCount: 10, //展示数量
            },
            currentItem: {
                id: "",
                isActive: true,
                menuIdList: [],
                projectIdList: [],
                remark: "",
                roleCode: "",
                roleName: "",
            },
        };
    },
    components: { add, relation, authority },
    created() {
        this.getData();
    },
    methods: {
        closeOk() {
            this.getData();
            this.showAdd = false;
            this.showRelation = false;
            this.showAut = false;
        },
        closeCancel() {
            this.showAdd = false;
            this.showAut = false;
            this.showRelation = false;
        },
        addClass() {
            this.openType = "add";
            this.currentItem = {
                id: "",
                isActive: true,
                menuIdList: [],
                projectIdList: [],
                remark: "",
                roleCode: "",
                roleName: "",
            };
            this.showAdd = true;
        },
        editClass(item) {
            this.openType = "edit";
            this.currentItem = item;
            this.showAdd = true;
        },
        roleAuthority(item) {
            this.showAut = true;
            this.currentItem = item;
        },
        relationRole(item) {
            this.currentItem = item;
            this.showRelation = true;
        },
        getData() {
            this.loading = true;
            get(
                "/api/realname/role",
                Object.assign(
                    {
                        KeyWord: this.KeyWord,
                        Sorting: "",
                    },
                    this.pagination
                )
            )
                .then((res) => {
                    if (res.isSuccess) {
                        this.tableData = res.data.items;
                        this.totalCount = res.data.totalCount;
                        this.loading = false;
                    }
                })
                .catch((err) => {
                    this.loading = false;
                });
        },
        // 监听 pageSize改变的事件
        handleSizeChange(newSize) {
            this.pagination.MaxResultCount = newSize;
            this.pagination.SkipCount = 0;
            this.getData();
        },
        // 监听 页码值
        handleCurrentChange(newPage) {
            this.pagination.SkipCount =
                (newPage - 1) * this.pagination.MaxResultCount;
            this.getData();
        },

        delData(id) {
            this.$confirm("确认要删除？")
                .then((_) => {
                    del(`/api/realname/role/${id}`).then((res) => {
                        if (res.isSuccess) {
                            this.$message({
                                message: "删除成功！",
                                type: "success",
                            });
                            this.getData();
                        }
                    });
                })
                .catch((_) => {
                    console.log(_);
                });
        },

        // 修改角色
        editData(param) {
            put(`/api/realname/role/${this.currentItem.id}`, param).then(
                (res) => {
                    if (res.isSuccess) {
                        this.$message({
                            message: "修改成功！",
                            type: "success",
                        });
                        this.closeOk();
                    }
                }
            );
        },
    },
};
</script>

<style lang="less" scoped>
.mainCon {
    margin: 20px;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    .pagination {
        margin: 20px auto 0;
    }
}
</style>