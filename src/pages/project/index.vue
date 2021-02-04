  <template>
    <div class="mainCon">
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline fl">
                <el-form-item label="关键词">
                    <el-input
                        placeholder="请输入搜索关键词"
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
            <el-table-column prop="projectName" label="项目名称">
            </el-table-column>
            <el-table-column prop="projectCode" label="项目编号">
            </el-table-column>
            <el-table-column label="项目地址">
                <template slot-scope="scope">
                    <span>{{ getAddress(scope.row) }}</span>
                    <span>{{ scope.row.address }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="coveredArea" label="建筑面积（平方米）">
            </el-table-column>
            <el-table-column prop="projectCost" label="工程造价（万元）">
            </el-table-column>
            <el-table-column prop="constructionUnitName" label="建设单位">
            </el-table-column>
            <el-table-column prop="coveredArea" label="建设方联系人">
                <template slot-scope="scope">
                    <span>{{ scope.row.constructionUnitContact }}</span
                    ><br />
                    <span>{{ scope.row.constructionUnitContactPhone }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" style="width: 320px">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        @click="addClass(scope.row.id)"
                        plain
                        >查看</el-button
                    >
                    <el-button size="small" plain>指纹绑定</el-button>
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

        <!-- 弹框 -->
        <!-- 弹框内容 -->
        <el-dialog
            :close-on-click-modal="false"
            title="项目详情"
            :visible.sync="showAdd"
        >
            <add v-if="showAdd" :currentId="currentId"></add>
        </el-dialog>
    </div>
</template>

<script>
import add from "./add";
import { get } from "~/config/fetch.js";

export default {
    data() {
        return {
            showAdd: false,
            totalCount: 0,
            tableData: [],
            currentId: "",
            KeyWord: "",
            pagination: {
                SkipCount: 0, //跳过的记录数
                MaxResultCount: 10, //展示数量
            },
        };
    },
    components: { add },
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
        addClass(id) {
            console.log(id);
            this.currentId = id;
            this.showAdd = true;
        },

        getData() {
            this.loading = true;
            get(
                "/api/realname/project",
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
            get(`/api/realname/project/export-projects`, {
                KeyWord: this.KeyWord,
                responseType: "blob",
            }).then((res) => {
                var content = res.data;
                var blob = new Blob([content]);
                var fileName = "项目管理.xlsx"; //要保存的文件名称
                if ("download" in document.createElement("a")) {
                    // 非IE下载
                    var elink = document.createElement("a");
                    elink.download = fileName;
                    elink.style.display = "none";
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href); // 释放URL 对象
                    document.body.removeChild(elink);
                } else {
                    // IE10+下载
                    navigator.msSaveBlob(blob, fileName);
                }
                console.log(res);
            });
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