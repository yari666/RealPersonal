  <template>
    <div class="overflow mainCon">
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
                <el-button type="primary" @click="getData">同步</el-button>
                <el-button type="primary" @click="exportData">导出</el-button>
            </div>
        </div>

        <el-table
            :data="tableData"
            style="width: 100%"
            height="72vh"
            v-loading="loading"
        >
            <el-table-column prop="workNumber" label="工号"> </el-table-column>
            <el-table-column prop="employeeName" label="姓名">
            </el-table-column>
            <el-table-column prop="idNumber" label="证件号码">
            </el-table-column>
            <el-table-column label="性别">
                <template slot-scope="scope">
                    <span>{{ scope.row.gender == 0 ? "女" : "男" }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="phoneNumber" label="联系电话">
            </el-table-column>
            <el-table-column prop="name" label="苏康码状态">
                绿码</el-table-column
            >
            <el-table-column prop="projectName" label="所属项目">
            </el-table-column>
            <el-table-column prop="companyName" label="所属企业">
            </el-table-column>
            <el-table-column prop="teamName" label="所属班组">
            </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        plain
                        @click="goDetail(scope.row.id)"
                        >查看</el-button
                    >
                    <el-button type="primary" size="small" @click="addClass()"
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
    </div>
</template>

<script>
import { get, del } from "~/config/fetch.js";
import { exportData } from "~/utils/index";

export default {
    data() {
        return {
            showAdd: false,
            loading: false,
            totalCount: 0,
            tableData: [],
            KeyWord: "",
            pagination: {
                SkipCount: 0, //跳过的记录数
                MaxResultCount: 10, //展示数量
            },
        };
    },
    created() {
        this.getData();
    },
    computed: {
        getAddress() {
            return (item) => {
                if (item.city || item.township || item.villagesAndTowns) {
                    return (
                        item.city +
                        "-" +
                        item.township +
                        "-" +
                        item.villagesAndTowns
                    );
                } else {
                    return "";
                }
            };
        },
    },
    methods: {
        addClass() {
            this.showAdd = true;
        },
        getData() {
            this.loading = true;
            get(
                "/api/realname/employee/manager-list",
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
            console.log(newPage);
            this.pagination.SkipCount =
                (newPage - 1) * this.pagination.MaxResultCount;
            this.getData();
        },

        // 导出
        exportData() {
            exportData(
                `/api/realname/employee/export-projects`,
                this.KeyWord,
                "管理人员",
                0
            );
        },
        delData(id) {
            this.$confirm("确认要删除？")
                .then((_) => {
                    del(`/api/realname/employee/${id}`).then((res) => {
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

        goDetail(id) {
            this.$router.push({ path: `/user/manager/${id}` });
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