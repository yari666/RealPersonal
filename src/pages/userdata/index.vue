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
                <el-button type="primary" @click="getData">同步</el-button>
                <!-- <el-button type="primary">导出</el-button> -->
            </div>
        </div>

        <el-table
            :data="tableData"
            style="width: 100%"
            height="72vh"
            v-loading="loading"
        >
            <el-table-column prop="personName" label="姓名"> </el-table-column>
            <el-table-column prop="idNumber" label="身份证号">
            </el-table-column>
            <el-table-column label="性别">
                <template slot-scope="scope">
                    {{ scope.row.gender == 1 ? "女" : "男" }}
                </template>
            </el-table-column>
            <el-table-column prop="phoneNumber" label="联系电话">
            </el-table-column>
            <el-table-column prop="currentAddress" label="现居住地址">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        @click="addClass(scope.row)"
                        plain
                        >查看</el-button
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
            title="人员信息"
            :visible.sync="showAdd"
            class="dialog"
        >
            <add v-if="showAdd" :currentItem="currentItem"></add>
        </el-dialog>
    </div>
</template>

<script>
import { get } from "~/config/fetch.js";
import add from "./add/base";

export default {
    data() {
        return {
            openType: "add",
            loading: false,
            showAdd: false,
            tableData: [],
            totalCount: 0,
            KeyWord: "",
            pagination: {
                SkipCount: 0, //跳过的记录数
                MaxResultCount: 10, //展示数量
            },
            currentItem: {
                currentAddress: null,
                gender: 1,
                id: "",
                idNumber: "",
                national: "",
                personName: "",
                phoneNumber: "",
            },
        };
    },
    components: { add },
    created() {
        this.getData();
    },
    methods: {
        addClass(item) {
            this.currentItem = item;
            this.showAdd = true;
        },
        getData() {
            this.loading = true;
            get(
                "/api/realname/personnel",
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