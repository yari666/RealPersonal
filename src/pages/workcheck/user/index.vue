  <template>
    <div>
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline fl">
                <el-form-item label="姓名">
                    <el-input
                        placeholder="姓名"
                        style="width: 120px"
                    ></el-input>
                </el-form-item>
                <el-form-item label="企业">
                    <el-select placeholder="企业" style="width: 180px">
                        <el-option label="群耀" value="shanghai"></el-option>
                        <el-option label="富友" value="beijing"></el-option>
                        <el-option label="新合盛" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目">
                    <el-select placeholder="项目" style="width: 180px">
                        <el-option label="群耀" value="shanghai"></el-option>
                        <el-option label="富友" value="beijing"></el-option>
                        <el-option label="新合盛" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="考勤日期">
                    <el-date-picker
                        style="width: 180px"
                        v-model="value6"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>

            <div class="fr">
                <el-button type="primary">导出</el-button>
            </div>
        </div>

        <el-table :data="tableData3">
            <el-table-column prop="name" label="姓名" width="71">
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column label="1号" width="48">
                <el-table-column prop="zip" label="星期一" width="48">
                </el-table-column>
            </el-table-column>
            <el-table-column
                label="时长总计"
                prop="zip"
                width="48"
            ></el-table-column>
            <el-table-column
                label="天数总计"
                prop="zip"
                width="48"
            ></el-table-column>
        </el-table>
        <div class="tips">
            提示：- 表示该天无考勤数据，⚪ 标识该天考勤数据异常
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            openType: "add",
            showAdd: false,
            value6: "",
            tableData3: [
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1518 弄",
                    zip: 8,
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1518 弄",
                    zip: 8,
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1518 弄",
                    zip: 8,
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1518 弄",
                    zip: 8,
                },
                {
                    date: "2016-05-08",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1518 弄",
                    zip: 8,
                },
                {
                    date: "2016-05-06",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1518 弄",
                    zip: 8,
                },
                {
                    date: "2016-05-07",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1518 弄",
                    zip: 8,
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

<style lang="less" scoped>
.tips {
    font-size: 12px;
    margin-top: 10px;
    color: #409eff;
}
</style>