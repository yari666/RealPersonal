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

                <el-form-item label="考勤年月">
                    <el-date-picker
                        v-model="SearchDate"
                        type="date"
                        placeholder="选择月"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table
            :data="tableData"
            style="width: 100%"
            height="72vh"
            v-loading="loading"
        >
            <el-table-column prop="employeeName" label="姓名">
            </el-table-column>
            <el-table-column prop="projectName" label="所属项目">
            </el-table-column>
            <el-table-column prop="idNumber" label="身份证号">
            </el-table-column>
            <el-table-column prop="phoneNumber" label="联系电话">
            </el-table-column>
            <el-table-column prop="companyName" label="所属公司">
            </el-table-column>
            <el-table-column prop="teamName" label="班组名称">
            </el-table-column>
            <el-table-column prop="workType" label="工种"> </el-table-column>
            <el-table-column prop="duration" align="center" label="工时(分钟)">
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
    </div>
</template>

<script>
import { get } from "~/config/fetch.js";
const timestamp = require("time-stamp");

export default {
    data() {
        return {
            openType: "add",
            showAdd: false,
            loading: false,
            SearchDate: new Date(),
            projectData: [],
            projectId: "",
            tableData: [],
            totalCount: 0,
            KeyWord: "",
            pagination: {
                SkipCount: 0, //跳过的记录数
                MaxResultCount: 10, //展示数量
            },
        };
    },
    created() {
        this.SearchDate = new Date(
            this.SearchDate.getTime() - 24 * 60 * 60 * 1000
        );
        this.getData();
    },
    methods: {
        go(id) {
            this.$router.push({
                path:
                    "/workcheck/user/" +
                    id +
                    "?SearchDate=" +
                    timestamp("YYYY-MM", new Date(this.SearchDate)),
            });
        },
        getData() {
            this.loading = true;
            get(
                "/api/realname/attendance-clock/employee-day-duration",
                Object.assign(
                    {
                        KeyWord: this.KeyWord,
                        Sorting: "",
                        SearchDate: this.SearchDate,
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