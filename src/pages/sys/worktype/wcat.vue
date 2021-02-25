  <template>
    <div>
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
                <el-button type="primary" @click="addClass">添加</el-button>
                <!-- <el-button type="primary">导出</el-button> -->
            </div>
        </div>

        <el-table
            :data="tableData"
            style="width: 100%"
            height="70vh"
            v-loading="loading"
        >
            <el-table-column prop="dicCode" label="证书编号"> </el-table-column>
            <el-table-column prop="dicName" label="证书名称"> </el-table-column>
            <el-table-column prop="groupName" label="类型"> </el-table-column>
            <el-table-column prop="dicName" label="是否激活" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.isActive ? "是" : "否" }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        @click="editClass(scope.row)"
                        >编辑</el-button
                    ><el-button
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
            title="证书详情"
            :visible.sync="showAdd"
        >
            <add
                :openType="openType"
                :currentItem="currentItem"
                :groupName="groupName"
                @cancel="closeCancel"
                @ok="closeOk"
                v-if="showAdd"
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
            openType: "add",
            showAdd: false,
            loading: false,
            tableData: [],
            totalCount: 0,
            KeyWord: "",
            pagination: {
                SkipCount: 0, //跳过的记录数
                MaxResultCount: 10, //展示数量
            },
            groupName: "证书类型",
            currentItem: {
                dicCode: "",
                dicName: "",
                groupName: "",
                parentDicId: "",
                isActive: true,
                id: "",
            },
        };
    },
    components: { add },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.loading = true;
            get(
                `/api/realname/dictionary`,
                Object.assign(
                    {
                        KeyWord: this.KeyWord,
                        Sorting: "dicCode",
                        groupName: this.groupName,
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
        closeOk() {
            this.getData();
            this.showAdd = false;
        },
        closeCancel() {
            this.showAdd = false;
        },
        addClass() {
            this.openType = "add";
            this.showAdd = true;
        },
        editClass(item) {
            this.openType = "edit";
            this.currentItem = item;
            this.showAdd = true;
        },
        delData(id) {
            this.$confirm("确认要删除？")
                .then((_) => {
                    del(`/api/realname/dictionary/${id}`).then((res) => {
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