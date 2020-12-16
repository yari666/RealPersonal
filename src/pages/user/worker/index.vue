  <template>
    <div class="overflow">
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline fl">
                <el-form-item label="关键词">
                    <el-input placeholder="关键词"></el-input>
                </el-form-item>
                <el-form-item label="所属项目">
                    <el-select placeholder="项目名称">
                        <el-option label="项目1" value="shanghai"></el-option>
                        <el-option label="项目2" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="苏安码状态">
                    <el-select placeholder="苏安码状态">
                        <el-option label="绿码" value="shanghai"></el-option>
                        <el-option label="红码" value="beijing"></el-option>
                        <el-option label="黄码" value="beijing"></el-option>
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
            <el-table-column prop="date" label="工号"> </el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column prop="date" label="证件号码"> </el-table-column>
            <el-table-column prop="name" label="性别"> </el-table-column>
            <el-table-column prop="date" label="联系电话"> </el-table-column>
            <el-table-column prop="name" label="苏康码状态"> </el-table-column>
            <el-table-column prop="date" label="所属项目"> </el-table-column>
            <el-table-column prop="name" label="所属企业"> </el-table-column>
            <el-table-column prop="address" label="所属班组"> </el-table-column>
            <el-table-column prop="address" label="工种"> </el-table-column>
            <el-table-column prop="address" label="操作" width="220">
                <template>
                    <el-button type="primary" size="small" plain
                        >查看</el-button
                    >
                    <el-button
                        type="primary"
                        size="small"
                        @click="addClass('edit')"
                        >编辑</el-button
                    >
                    <el-button type="danger" size="small">删除</el-button>
                </template></el-table-column
            >
        </el-table>
        <div class="pagination">
            <el-pagination layout="prev, pager, next" :total="50">
            </el-pagination>
        </div>
    </div>
</template>

<script>
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
    methods: {
        addClass(type) {
            this.openType = type;
            this.showAdd = true;
        },
    },
};
</script>