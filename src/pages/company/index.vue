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

                <el-form-item label="所属区域">
                    <el-select v-model="area" placeholder="请选择">
                        <el-option label="全部" value=""> </el-option>
                        <el-option
                            v-for="(item, index) in areaData"
                            :key="index"
                            :label="item"
                            :value="item"
                        >
                        </el-option>
                    </el-select>
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
            <el-table-column prop="companyName" label="企业名称">
            </el-table-column>
            <el-table-column
                prop="unifiedSocialCreditCode"
                label="统一社会信用代码"
            >
            </el-table-column>
            <el-table-column prop="cooperatedBuilingType" label="参建类型">
            </el-table-column>
            <el-table-column prop="companyontact" label="联系人">
            </el-table-column>
            <el-table-column prop="companyContactPhone" label="电话">
            </el-table-column>

            <el-table-column prop="projectName" label="所属项目">
            </el-table-column>

            <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        @click="addClass(scope.row.id)"
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
            title="企业详情"
            :visible.sync="showAdd"
        >
            <add :currentId="currentId" v-if="showAdd"></add>
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
            loading: false,
            totalCount: 0,
            tableData: [],
            currentId: "",
            KeyWord: "",
            pagination: {
                SkipCount: 0, //跳过的记录数
                MaxResultCount: 10, //展示数量
            },

            areaData: [],
            area: "",
        };
    },
    components: { add },
    created() {
        this.getData();
        this.getArea();
    },
    methods: {
        getArea() {
            get(`/api/realname/project/project-citys`).then((res) => {
                if (res.isSuccess) {
                    this.areaData = res.data;
                }
            });
        },
        addClass(id) {
            this.currentId = id;
            this.showAdd = true;
        },
        getData() {
            this.loading = true;
            get(
                "/api/realname/company",
                Object.assign(
                    {
                        KeyWord: this.KeyWord,
                        Sorting: "",
                        City: this.area,
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
            get(`/api/realname/company/export-companys`, {
                KeyWord: this.KeyWord,
                responseType: "blob",
            }).then((res) => {
                var content = res.data;
                var blob = new Blob([content]);
                var fileName = "企业管理.xlsx"; //要保存的文件名称
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