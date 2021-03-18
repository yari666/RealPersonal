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
                <el-button type="primary" @click="addClass('add')"
                    >添加</el-button
                >
                <el-button type="warning" @click="addDeviceUser"
                    >一键下发</el-button
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
            <el-table-column prop="national" label="民族" align="center">
            </el-table-column>
            <el-table-column label="性别" align="center">
                <template slot-scope="scope">
                    <span>{{
                        scope.row.gender == 1
                            ? "男"
                            : scope.row.gender == 0
                            ? "女"
                            : "男"
                    }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="teamName" label="班组"> </el-table-column>
            <el-table-column prop="workType" label="工种"> </el-table-column>

            <el-table-column prop="phoneNumber" label="联系电话">
            </el-table-column>
            <el-table-column prop="name" label="苏康码状态" align="center"
                >绿码
            </el-table-column>
            <el-table-column prop="projectName" label="所属项目">
            </el-table-column>
            <el-table-column label="操作" width="420px">
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
                        @click="editClass(scope.row.id)"
                        >编辑</el-button
                    >

                    <el-button
                        type="warning"
                        size="small"
                        @click="deviceBind(scope.row)"
                        v-if="scope.row.FRect"
                        >联接设备</el-button
                    >

                    <el-button
                        v-if="!scope.row.fRect"
                        type="warning"
                        size="small"
                        @click="create(scope.row)"
                        >获取特征码</el-button
                    >

                    <el-button
                        type="warning"
                        size="small"
                        @click="deviceUserBind(scope.row)"
                        >人员下发</el-button
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
            width="70%"
        >
            <add
                :currentId="currentId"
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
import { get, del, post } from "~/config/fetch.js";
import { exportData } from "~/utils/index";

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
            areaData: [],
            area: "",
            form: {
                val: "",
            },
            currentItem: {
                address: "",
                birthday: "",
                cardExpiryDate: "",
                cardValidityDate: "",
                city: "",
                employeeName: "",
                employeeType: 2,
                gender: 0,
                id: "",
                idNumber: "",
                licenseIssuingAuthority: "",
                national: "",
                phoneNumber: "",
                projectId: "",
                province: "",
                scheduleEndDate: "",
                scheduleStartDate: "",
                secondGenerCertiPhoto: "",
                secondGenerCertiPhoto64: "",
                currentPhoto: "",
                currentPhoto64: "", //现场照片
                township: "",
                workNumber: "",
                workTypeCategory: "",
                workType: "",
                teamName: "",
                FRect: "",
            },
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
        openFeature(item) {
            this.currentItem = item;
        },
        create(item) {
            get(`/api/realname/employee/employees-face-detect`, {
                projectId: item.projectId,
                employeeId: item.id,
            }).then((res) => {
                this.$message({
                    message: res.data.msg,
                    type: res.data.resultStatus ? "success" : "error",
                });

                this.getData();
            });
        },
        addClass() {
            this.openType = "add";
            this.showAdd = true;
            this.currentId = "";
        },
        editClass(id) {
            this.openType = "edit";
            this.showAdd = true;
            this.currentId = id;
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
            this.$router.push({
                path: `/guest/guestuser/${id}?readOnly=true`,
            });
        },
        deviceBind(item) {
            get(`/api/realname/employee/employees-face-detect`, {
                projectId: item.projectId,
                employeeId: item.id,
            }).then((res) => {
                if (res.isSuccess) {
                    this.$message({
                        message: "联接成功！",
                        type: "success",
                    });
                }
            });
        },
        addDeviceUser() {
            post(`/api/realname/employee/deivce-users`).then((res) => {
                if (res.isSuccess) {
                    this.$message({
                        message: "下发成功！",
                        type: "success",
                    });
                }
            });
        },
        deviceUserBind(item) {
            post(
                `/api/realname/employee/deivce-users-asnyc/${item.projectId}`
            ).then((res) => {
                if (res.isSuccess) {
                    this.$message({
                        message: "下发成功！",
                        type: "success",
                    });
                }
            });
        },
        getData() {
            this.loading = true;
            get(
                "/api/realname/employee",
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
            this.pagination.SkipCount =
                (newPage - 1) * this.pagination.MaxResultCount;
            this.getData();
        },

        // 导出
        exportData() {
            exportData(
                `/api/realname/employee/export-projects`,
                this.KeyWord,
                "访客人员",
                2
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