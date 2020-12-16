  <template>
    <div>
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline fl">
                <el-form-item label="关键词">
                    <el-input placeholder="关键词"></el-input>
                </el-form-item>
                <el-form-item label="进出标识">
                    <el-select placeholder="进出标识">
                        <el-option label="出场" value="shanghai"></el-option>
                        <el-option label="进场" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select placeholder="状态">
                        <el-option label="出场" value="shanghai"></el-option>
                        <el-option label="进场" value="beijing"></el-option>
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

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="设备名称"> </el-table-column>
            <el-table-column prop="name" label="设备序列号"> </el-table-column>
            <el-table-column prop="name" label="进出标识"> </el-table-column>
            <el-table-column prop="date" label="所属项目"> </el-table-column>
            <el-table-column prop="address" label="设备状态"> </el-table-column>
            <el-table-column prop="name" label="来源"> </el-table-column>
            <el-table-column prop="address" label="操作" width="350">
                <el-button type="primary" size="small" @click="addClass('edit')"
                    >编辑</el-button
                >
                <el-button type="warning" size="small">设备授权</el-button>
                <el-button type="warning" size="small">设备配置</el-button>
                <el-button type="danger" size="small">删除</el-button>
            </el-table-column>
        </el-table>

        <!-- 弹框内容 -->
        <el-dialog
            :close-on-click-modal="false"
            title="新增设备"
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