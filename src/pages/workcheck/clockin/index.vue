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

                <!-- <el-form-item label="打卡时间">
                    <el-time-picker
                        is-range
                        v-model="value4"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                    >
                    </el-time-picker>
                </el-form-item> -->
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
            <el-table-column prop="deviceSerialNumber" label="设备序列号">
            </el-table-column>
            <el-table-column prop="employeeName" label="姓名">
            </el-table-column>
            <el-table-column prop="workNumber" label="工号" width="80px">
            </el-table-column>
            <el-table-column prop="idNumber" label="身份证号">
            </el-table-column>
            <el-table-column prop="phoneNumber" label="手机号">
            </el-table-column>
            <el-table-column prop="companyName" label="所属企业">
            </el-table-column>
            <el-table-column prop="projectName" label="所属项目">
            </el-table-column>
            <el-table-column prop="teamName" label="所属班组">
            </el-table-column>

            <el-table-column label="进出标识" width="80px">
                <template slot-scope="scope">
                    <span>{{
                        scope.row.inOutStatus == 1 ? "进场" : "出场"
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="打卡时间" width="160px">
                <template slot-scope="scope">
                    <span
                        >{{ scope.row.attendanceDate }}
                        {{ scope.row.attendanceTime }}</span
                    >
                </template>
            </el-table-column>
            <el-table-column label="现场照片">
                <template slot-scope="scope">
                    <el-image
                        style="width: 90px; height: 120px"
                        :src="'data:img/jpg;base64,' + scope.row.scenePhoto"
                    ></el-image>
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

export default {
    data() {
        return {
            openType: "add",
            showAdd: false,
            loading: false,
            value4: [
                new Date(2016, 9, 10, 8, 40),
                new Date(2016, 9, 10, 9, 40),
            ],
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
        addClass(type) {
            this.openType = type;
            this.showAdd = true;
        },
        getData() {
            this.loading = true;
            get(
                "/api/realname/attendance-clock",
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