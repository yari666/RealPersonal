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
                <!-- 
                <el-form-item label="所属项目">
                    <el-select
                        placeholder="请选择所属项目"
                        v-model="projectId"
                        style="width: 100%"
                    >
                        <el-option
                            v-for="item in projectData"
                            :key="item.id"
                            :label="item.projectName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item> -->

                <el-form-item label="考勤年月">
                    <el-date-picker
                        v-model="SearchDate"
                        type="month"
                        placeholder="选择月"
                        format="yyyy-MM"
                        value-format="yyyy-MM"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">查询</el-button>
                </el-form-item>
            </el-form>

            <div class="fr">
                <el-button type="primary">导出</el-button>
            </div>
        </div>

        <el-table
            :data="tableData"
            style="width: 100%"
            height="72vh"
            v-loading="loading"
        >
            <el-table-column prop="projectName" label="所属项目">
            </el-table-column>
            <el-table-column
                prop="employeeCount"
                align="center"
                label="总人数(人)"
            >
            </el-table-column>
            <el-table-column
                prop="totalDuration"
                align="center"
                label="时长总计(小时)"
            >
            </el-table-column>
            <el-table-column
                prop="totalDay"
                align="center"
                label="天数总计(天)"
            >
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        plain
                        @click="go(scope.row.projectId)"
                        >查看</el-button
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
                "/api/realname/attendance-clock/project-duration",
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