  <template>
    <div class="mainCon">
        <el-page-header
            @back="goBack"
            :content="projectData.projectName + '（共 ' + totalCount + ' 人）'"
        >
        </el-page-header>

        <div class="search-box" style="margin-top: 30px">
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
                        type="month"
                        placeholder="选择月"
                        value-format="yyyy-MM"
                        format="yyyy-MM"
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

        <el-table :data="tableData">
            <el-table-column
                prop="employeeName"
                label="姓名"
                align="center"
                fixed="left"
            >
            </el-table-column>
            <el-table-column
                v-for="(item, index) in tableHead"
                :key="index"
                :label="item"
                align="center"
            >
                <el-table-column label="星期一" align="center">
                    <template slot-scope="scope">
                        <span class="empty" v-if="scope.row.data[index] == ''"
                            >-</span
                        >
                        <span v-else-if="scope.row.data[index] == 0">⚪</span>
                        <span v-else>{{ scope.row.data[index] }}</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="时长总计(小时)"
                align="center"
                fixed="right"
            >
                <template slot-scope="scope">{{
                    getSum(scope.row.data)
                }}</template>
            </el-table-column>
            <el-table-column label="天数总计(天)" align="center" fixed="right">
                <template slot-scope="scope">{{
                    getDay(scope.row.data)
                }}</template>
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

        <div class="tips">
            提示：- 表示该天无考勤数据，⚪ 标识该天考勤数据异常
        </div>
    </div>
</template>

<script>
import { get } from "~/config/fetch.js";

export default {
    data() {
        return {
            SearchDate: new Date(),
            KeyWord: "",
            loading: false,
            tableHead: [],
            tableData: [],
            projectData: {
                projectName: "",
            },
            projectId: "",
            totalCount: 0,
            pagination: {
                SkipCount: 0, //跳过的记录数
                MaxResultCount: 10, //展示数量
            },
        };
    },
    created() {
        this.projectId = this.$route.params.projectId;
        console.log(this.$route.query.SearchDate);
        if (this.$route.query.SearchDate) {
            this.SearchDate = this.$route.query.SearchDate;
        }
        this.getData();
        this.getProject();
    },
    methods: {
        // 项目信息
        getProject() {
            get(`/api/realname/project/${this.projectId}`).then((res) => {
                if (res.isSuccess) {
                    this.projectData = res.data;
                }
            });
        },
        getData() {
            this.loading = true;
            get(
                "/api/realname/attendance-clock/project-employee-duration",
                Object.assign(
                    {
                        KeyWord: this.KeyWord,
                        Sorting: "",
                        SearchDate: this.SearchDate,
                        projectid: this.projectId,
                    },
                    this.pagination
                )
            )
                .then((res) => {
                    if (res.isSuccess) {
                        this.tableHead = res.data.date;
                        this.tableData = res.data.items;
                        this.totalCount = res.data.totalCount;
                        this.loading = false;
                    }
                })
                .catch((err) => {
                    this.loading = false;
                });
        },

        // 求和
        getSum(arr) {
            let sum = 0;
            arr.forEach((_) => {
                sum += Number(_);
            });

            return sum;
        },

        getDay(arr) {
            let sum = 0;
            arr.forEach((_) => {
                if (Number(_)) {
                    sum += 1;
                }
            });

            return sum;
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

        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>

<style lang="less" scoped>
.tips {
    font-size: 12px;
    margin-top: 10px;
    color: #409eff;
}
.empty {
    color: #409eff;
}
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
