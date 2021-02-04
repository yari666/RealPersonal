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
                <el-button type="primary" @click="addClass">添加</el-button>
                <!-- <el-button type="primary">导出</el-button> -->
            </div>
        </div>

        <el-table
            :data="tableData"
            style="width: 100%"
            height="72vh"
            v-loading="loading"
        >
            <el-table-column prop="deviceName" label="设备名称">
            </el-table-column>
            <el-table-column prop="deviceSerialNumber" label="设备序列号">
            </el-table-column>
            <el-table-column prop="projectName" label="所属项目">
            </el-table-column>
            <el-table-column label="进出标识">
                <template slot-scope="scope">
                    <span>{{ scope.row.deviceStatus == 1 ? "进" : "出" }}</span>
                </template>
            </el-table-column>
            <el-table-column label="来源">
                <template slot-scope="scope">
                    <span>{{
                        scope.row.deviceSource == 1 ? "api接口同步" : "系统创建"
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" width="260">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        @click="editClass(scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="warning"
                        size="small"
                        @click="openSet(scope.row)"
                        >设备配置</el-button
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
            title="新增设备"
            :visible.sync="showAdd"
            @closed="closeCancel"
        >
            <add
                :currentItem="currentItem"
                :openType="openType"
                v-if="showAdd"
                @cancel="closeCancel"
                @ok="closeOk"
            ></add>
        </el-dialog>

        <!-- 设备设置 -->
        <el-dialog
            :close-on-click-modal="false"
            title="设备配置"
            :visible.sync="showSet"
            @closed="closeCancel"
        >
            <setting
                :currentItem="currentItem"
                v-if="showSet"
                @cancel="closeCancel"
                @ok="closeOk"
            ></setting>
        </el-dialog>
    </div>
</template>

<script>
import add from "./add";
import setting from "./setting";
import { get, del } from "~/config/fetch.js";

export default {
    data() {
        return {
            openType: "add",
            showAdd: false,
            showSet: false,
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
                deviceName: "",
                deviceSerialNumber: "",
                deviceStatus: -1,
                deviceSource: -1,
                projectId: "",
                deviceMacAddress: "",
            },
        };
    },
    components: { add, setting },
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
        openSet(item) {
            this.currentItem = item;
            this.showSet = true;
        },
        closeOk() {
            this.showAdd = false;
            this.showSet = false;
            this.getData();
        },
        closeCancel() {
            this.showAdd = false;
            this.showSet = false;
        },
        getData() {
            this.loading = true;
            get(
                "/api/realname/device",
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
                    del(`/api/realname/device/${id}`).then((res) => {
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