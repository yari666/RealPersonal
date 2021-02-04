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
                <el-button type="primary" @click="addClass('add')"
                    >添加</el-button
                >
                <el-button type="primary" @click="exportData">导出</el-button>
            </div>
        </div>

        <el-table
            :data="tableData"
            style="width: 100%"
            height="72vh"
            v-loading="loading"
        >
            <el-table-column prop="workNumber" label="工号" width="60px">
            </el-table-column>
            <el-table-column prop="employeeName" label="姓名" width="100px">
            </el-table-column>
            <el-table-column prop="idNumber" label="证件号码">
            </el-table-column>
            <el-table-column prop="national" label="民族"> </el-table-column>
            <el-table-column label="性别">
                <template slot-scope="scope">
                    <span>{{ scope.row.gender == 1 ? "男" : "女" }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="teamName" label="工种"> </el-table-column>
            <el-table-column prop="phoneNumber" label="联系电话">
            </el-table-column>
            <el-table-column prop="name" label="苏康码状态"
                >绿码
            </el-table-column>
            <el-table-column prop="projectName" label="所属项目">
            </el-table-column>
            <el-table-column label="操作" width="220px">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        plain
                        @click="lookDetail(scope.row.id)"
                        >查看</el-button
                    >
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
            :title="openType == 'add' ? '新增访客' : '编辑访客'"
            :visible.sync="showAdd"
            v-if="showAdd"
            width="70%"
        >
            <add
                :currentItem="currentItem"
                :openType="openType"
                v-if="showAdd"
                @cancel="closeCancel"
                @ok="closeOk"
            ></add>
        </el-dialog>
    </div>
</template>

<script>
import add from "~/pages/userdetail/info";
import { get, del } from "~/config/fetch.js";

export default {
    data() {
        return {
            openType: "add",
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
            currentItem: {
                workNumber: "",
                employeeName: "",
                idNumber: "",
                phoneNumber: "",
                scheduleStartDate: "",
                scheduleEndDate: "",
                managerialPosition: "",
                workType: "",
                teamName: "",
                companyId: "",
                projectId: "",
                id: "",
            },
        };
    },
    components: { add },
    created() {
        this.getData();
    },
    methods: {
        addClass() {
            this.openType = "add";
            this.showAdd = true;
        },
        editClass(item) {
            this.openType = "edit";
            this.showAdd = true;
            this.currentItem = item;
        },
        closeOk() {
            this.showAdd = false;
            this.getData();
        },
        closeCancel() {
            this.showAdd = false;
        },
        lookDetail(id) {
            this.currentId = id;
            this.showEdit = true;
        },
        getData() {
            this.loading = true;
            get(
                "/api/realname/employee",
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
            get(`/api/realname/employee/export-projects`, {
                KeyWord: this.KeyWord,
                EmployeeType: 0,
                responseType: "blob",
            }).then((res) => {
                var content = res.data;
                var blob = new Blob([content]);
                var fileName = "访客人员.xlsx"; //要保存的文件名称
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