  <template>
    <div>
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline fl">
                <el-form-item label="企业名称">
                    <el-input placeholder="企业名称"></el-input>
                </el-form-item>
                <el-form-item label="所属项目">
                    <el-select placeholder="所属项目">
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
                <el-button type="primary">同步</el-button>
                <el-button type="primary">导出</el-button>
            </div>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="企业名称"> </el-table-column>
            <el-table-column prop="name" label="统一社会信用代码">
            </el-table-column>
            <el-table-column prop="name" label="合同备案编号">
            </el-table-column>
            <el-table-column prop="date" label="参建类型"> </el-table-column>
            <el-table-column prop="address" label="联系人/电话">
            </el-table-column>
            <el-table-column prop="name" label="所属项目"> </el-table-column>
            <el-table-column prop="name" label="时间"> </el-table-column>
            <el-table-column prop="address" label="操作" width="220">
                <template>
                    <el-button
                        type="primary"
                        size="small"
                        @click="addClass('edit')"
                        plain
                        >查看</el-button
                    >
                    <el-button type="primary" size="small">编辑</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template></el-table-column
            >
        </el-table>

        <!-- 弹框内容 -->
        <el-dialog
            :close-on-click-modal="false"
            title="企业详情"
            :visible.sync="showAdd"
            v-if="showAdd"
            class="dialog"
        >
            <add></add>
        </el-dialog>
    </div>
</template>

<script>
import add from "./add/index";

export default {
    data() {
        return {
            openType: "add",
            showAdd: false,
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄",
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄",
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄",
                },
            ],
        };
    },
    components: { add },
    methods: {
        addClass(type) {
            this.openType = type;
            this.showAdd = true;
        },
    },
};
</script>