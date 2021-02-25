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
            </div>
        </div>

        <el-table
            :data="tableData"
            style="width: 100%"
            height="72vh"
            v-loading="loading"
        >
            <el-table-column prop="visitorTeamCode" label="班组编号">
            </el-table-column>
            <el-table-column prop="visitorTeamName" label="班组名称">
            </el-table-column>

            <!-- <el-table-column prop="companyName" label="所属企业">
            </el-table-column> -->
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        @click="editClass(scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="danger"
                        size="small"
                        @click="delData(scope.row.id)"
                        >删除</el-button
                    >
                </template></el-table-column
            >
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
            :title="openType == 'add' ? '添加班组' : '编辑班组'"
            :visible.sync="showAdd"
            @closed="closeCancel"
        >
            <add
                :openType="openType"
                :currentTeam="currentTeam"
                v-if="showAdd"
                @cancel="closeCancel"
                @ok="closeOk"
            ></add>
        </el-dialog>
    </div>
</template>

<script>
import add from "./add";
import { get, del } from "~/config/fetch.js";

export default {
    data() {
        return {
            showAdd: false,
            loading: false,
            openType: "add",
            totalCount: 0,
            tableData: [],
            KeyWord: "",
            pagination: {
                SkipCount: 0, //跳过的记录数
                MaxResultCount: 10, //展示数量
            },
            currentTeam: {
                companyId: "",
                companyName: "",
                id: "",
                visitorTeamCode: "",
                visitorTeamName: "",
            },
        };
    },
    components: { add },
    created() {
        this.getData();
    },
    methods: {
        addClass() {
            this.showAdd = true;
            this.openType = "add";
        },
        editClass(item) {
            this.currentTeam = item;
            this.showAdd = true;
            this.openType = "edit";
        },
        closeOk() {
            this.showAdd = false;
            this.getData();
        },
        closeCancel() {
            this.showAdd = false;
        },

        delData(id) {
            this.$confirm("确认要删除？")
                .then((_) => {
                    del(`/api/realname/visitor-team/${id}`).then((res) => {
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
        getData() {
            this.loading = true;
            get(
                "/api/realname/visitor-team",
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