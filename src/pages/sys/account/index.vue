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
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="userName" label="用户名"> </el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column prop="roleName" label="角色"> </el-table-column>
            <el-table-column prop="phoneNumber" label="联系方式" width="120px">
            </el-table-column>
            <el-table-column prop="email" label="电子邮箱"> </el-table-column>
            <el-table-column label="开通时间" width="180px">
                <template slot-scope="scope">
                    <span>{{ timeFormat(scope.row.turnonDate) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="到期时间" width="180px">
                <template slot-scope="scope">
                    <span>{{ timeFormat(scope.row.expirationDate) }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="address" label="操作" width="340px">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="small"
                        @click="editClass(scope.row)"
                        >编辑</el-button
                    >
                    <!-- <el-button type="warning" size="small">分配项目</el-button> -->

                    <el-button
                        type="primary"
                        size="small"
                        @click="resetPassword(scope.row.id)"
                        >密码重置</el-button
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
            title="添加账号"
            :visible.sync="showAdd"
            v-if="showAdd"
        >
            <add
                :openType="openType"
                :currentItem="currentItem"
                @cancel="closeCancel"
                @ok="closeOk"
            ></add>
        </el-dialog>
    </div>
</template>

<script>
import { get, del, put } from "~/config/fetch.js";
import add from "./add";
const timestamp = require("time-stamp");

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
            currentItem: {
                email: "",
                expirationDate: "",
                id: "",
                name: "",
                phoneNumber: "",
                roleId: "",
                roleName: "",
                turnonDate: "",
                userName: "",
            },
        };
    },
    components: { add },
    computed: {
        timeFormat() {
            return function (time) {
                return timestamp("YYYY-MM-DD HH:mm:ss", new Date(time));
            };
        },
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.loading = true;
            get(
                `/api/realname/user`,
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
        closeOk() {
            this.getData();
            this.showAdd = false;
            this.showRelation = false;
        },
        closeCancel() {
            this.showAdd = false;
            this.showRelation = false;
        },
        addClass() {
            this.openType = "add";
            this.currentItem = {
                email: "",
                expirationDate: "",
                id: "",
                name: "",
                phoneNumber: "",
                roleId: "",
                roleName: "",
                turnonDate: "",
                userName: "",
            };
            this.showAdd = true;
        },
        editClass(item) {
            this.openType = "edit";
            this.currentItem = item;
            this.showAdd = true;
        },
        resetPassword(id) {
            this.$confirm("确认要重置密码？")
                .then((_) => {
                    put(`/api/realname/user/restore-user-password/${id}`).then(
                        (res) => {
                            console.log(res);
                            if (res.data.resultStatus) {
                                this.$message({
                                    message:
                                        "重置密码成功！新密码为该用户的手机号码",
                                    type: "success",
                                });
                            } else {
                                this.$message({
                                    message: "重置密码失败！",
                                    type: "error",
                                });
                            }
                        }
                    );
                })
                .catch((_) => {
                    console.log(_);
                });
        },
        delData(id) {
            this.$confirm("确认要删除？")
                .then((_) => {
                    del(`/api/realname/user/${id}`).then((res) => {
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