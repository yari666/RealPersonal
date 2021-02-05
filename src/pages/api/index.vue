  <template>
    <div class="mainCon">
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline fl">
                <el-form-item label="关键词">
                    <el-input placeholder="关键词" v-model="KeyWord"></el-input>
                </el-form-item>
                <el-form-item label="来源">
                    <el-select placeholder="来源" v-model="from">
                        <el-option label="群耀" value="shanghai"></el-option>
                        <el-option label="富友" value="beijing"></el-option>
                        <el-option label="新合盛" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>

            <div class="fr">
                <el-button type="primary" @click="addClass('add')"
                    >添加</el-button
                >
                <el-button type="primary">导出</el-button>
            </div>
        </div>

        <el-table
            :data="tableData"
            style="width: 100%"
            height="72vh"
            v-loading="loading"
        >
            <el-table-column prop="date" label="序号"> </el-table-column>
            <el-table-column prop="date" label="名称"> </el-table-column>
            <el-table-column prop="name" label="Api地址"> </el-table-column>
            <el-table-column prop="date" label="类别"> </el-table-column>
            <el-table-column prop="name" label="来源"> </el-table-column>
            <el-table-column prop="name" label="所属企业"> </el-table-column>
            <el-table-column prop="name" label="负责人/联系方式">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        @click="addClass('edit')"
                        >编辑</el-button
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
            title="添加API"
            :visible.sync="showAdd"
            v-if="showAdd"
        >
            <add></add>
        </el-dialog>
    </div>
</template>

<script>
import add from "./add";
import { get } from "~/config/fetch.js";

export default {
    data() {
        return {
            openType: "add",
            showAdd: false,
            loading: false,
            tableData: [],
            totalCount: 0,
            KeyWord: "",
            from: "",
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
    methods: {
        addClass(type) {
            this.openType = type;
            this.showAdd = true;
        },
        getData() {
            this.loading = true;
            get(
                "/api/realname/api",
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
                FileName: "D:\\bya\\raaaaaa.xlsx",
            }).then((res) => {
                if (res.isSuccess) {
                    console.log(res);
                }
            });
        },

        delData(id) {
            this.$confirm("确认要删除？")
                .then((_) => {
                    del(`/api/realname/api/${id}`).then((res) => {
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