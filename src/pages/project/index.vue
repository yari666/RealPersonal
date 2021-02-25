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
                <el-button
                    type="primary"
                    @click="addClass"
                    v-if="isAdd == 'true'"
                    >添加</el-button
                >
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
                    <span>{{ scope.row.city ? scope.row.city : "" }}</span>
                    <span>{{
                        scope.row.township ? scope.row.township : ""
                    }}</span>
                    <span>{{
                        scope.row.villagesAndTowns
                            ? scope.row.villagesAndTowns
                            : ""
                    }}</span>
                    <span>{{
                        scope.row.address ? scope.row.address : ""
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="fingerPrint" label="项目指纹">
            </el-table-column>

            <el-table-column
                prop="coveredArea"
                align="center"
                label="建筑面积（平方米）"
            >
            </el-table-column>
            <el-table-column
                prop="projectCost"
                align="center"
                label="工程造价（万元）"
            >
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
            <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        @click="look(scope.row)"
                        plain
                        >查看</el-button
                    >

                    <el-button
                        size="small"
                        type="warning"
                        @click="addKey(scope.row.id, scope.row.fingerPrint)"
                        >指纹绑定</el-button
                    >
                    <el-button
                        type="danger"
                        size="small"
                        @click="delData(scope.row.id)"
                        >删掉</el-button
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

        <!-- 弹框 -->
        <el-dialog
            :close-on-click-modal="false"
            :title="readOnly ? '项目详情' : '添加项目'"
            :visible.sync="showAdd"
        >
            <add
                v-if="showAdd"
                :currentId="currentId"
                :currentItem="currentItem"
                :readOnly="readOnly"
                @cancel="closeCancel"
                @ok="closeOk"
            ></add>
        </el-dialog>

        <!-- 指纹绑定 -->
        <el-dialog
            :close-on-click-modal="false"
            title="指纹绑定"
            :visible.sync="showKey"
        >
            <key-bind
                v-if="showKey"
                :currentId="currentId"
                :fingerPrint="currentFingerprint"
                @ok="closeOk"
            ></key-bind>
        </el-dialog>
    </div>
</template>

<script>
import { get, del } from "~/config/fetch.js";
import keyBind from "./keybind";
import add from "./add";
import { exportData } from "~/utils/index";

export default {
    data() {
        return {
            showAdd: false,
            totalCount: 0,
            tableData: [],
            loading: false,
            currentId: "",
            currentFingerprint: "",
            KeyWord: "",
            showKey: false,
            pagination: {
                SkipCount: 0, //跳过的记录数
                MaxResultCount: 10, //展示数量
            },

            areaData: [],
            area: "",
            readOnly: false,
            currentItem: {
                id: "",
                projectCode: "",
                projectName: "",
                contractRecordNumber: "",
                city: "",
                township: "",
                villagesAndTowns: "",
                address: "",
                coveredArea: 0,
                projectCost: 0,
                constructionUnitName: "",
                constructionUnitSocialCreditCode: "",
                constructionUnitContact: "",
                constructionUnitContactPhone: "",
            },
        };
    },
    components: { add, keyBind },
    created() {
        this.getData();
        this.getArea();
    },
    computed: {
        isAdd() {
            return this.$store.state.isAdd;
        },
    },
    methods: {
        getArea() {
            get(`/api/realname/project/project-citys`).then((res) => {
                if (res.isSuccess) {
                    this.areaData = res.data;
                }
            });
        },
        addClass() {
            this.readOnly = false;
            this.showAdd = true;
        },
        look(item) {
            this.currentItem = item;
            this.readOnly = true;
            this.showAdd = true;
        },

        addKey(id, finger) {
            this.showKey = true;
            this.currentId = id;
            this.currentFingerprint = finger;
        },
        closeOk() {
            this.showKey = false;
            this.readOnly = true;
            this.showAdd = false;
            this.getData();
        },

        closeCancel() {
            this.showKey = false;
            this.readOnly = true;
            this.showAdd = false;
        },

        getData() {
            this.loading = true;
            get(
                "/api/realname/project",
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
        delData(id) {
            this.$confirm("确认要删除？")
                .then((_) => {
                    del(`/api/realname/project/${id}`).then((res) => {
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
            this.pagination.SkipCount =
                (newPage - 1) * this.pagination.MaxResultCount;
            this.getData();
        },

        // 导出
        exportData() {
            exportData(
                `/api/realname/project/export-projects`,
                this.KeyWord,
                "项目管理"
            );
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