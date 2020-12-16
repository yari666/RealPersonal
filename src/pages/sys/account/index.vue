  <template>
    <div>
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline fl">
                <el-form-item label="关键词">
                    <el-input placeholder="关键词"></el-input>
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

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="序号"> </el-table-column>
            <el-table-column prop="name" label="账号/电话"> </el-table-column>
            <el-table-column prop="name" label="真实姓名"> </el-table-column>
            <el-table-column prop="date" label="角色"> </el-table-column>
            <el-table-column prop="address" label="开通时间"> </el-table-column>
            <el-table-column prop="name" label="到期时间"> </el-table-column>
            <el-table-column prop="name" label="创建时间"> </el-table-column>
            <el-table-column prop="address" label="操作">
                <el-button type="primary" size="small" @click="addClass('edit')"
                    >编辑</el-button
                >
                <el-button type="danger" size="small"
                    >删除</el-button
                ></el-table-column
            >
        </el-table>

        <!-- 弹框内容 -->
        <el-dialog
            :close-on-click-modal="false"
            title="添加账号"
            :visible.sync="showAdd"
            v-if="showAdd"
        >
            <add></add>
        </el-dialog>
    </div>
</template>

<script>
import add from "./add";

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