  <template>
    <div>
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline fl">
                <el-form-item label="姓名">
                    <el-input placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="班组">
                    <el-select placeholder="所属班组">
                        <el-option label="群耀" value="shanghai"></el-option>
                        <el-option label="富友" value="beijing"></el-option>
                        <el-option label="新合盛" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="打卡时间">
                    <el-time-picker
                        is-range
                        v-model="value4"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                    >
                    </el-time-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>

            <div class="fr">
                <el-button type="primary">导出</el-button>
            </div>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="设备序列号"> </el-table-column>
            <el-table-column prop="date" label="姓名"> </el-table-column>
            <el-table-column prop="name" label="工号"> </el-table-column>
            <el-table-column prop="address" label="身份证号"> </el-table-column>
            <el-table-column prop="name" label="手机号"> </el-table-column>
            <el-table-column prop="date" label="所属企业"> </el-table-column>
            <el-table-column prop="date" label="所属项目"> </el-table-column>
            <el-table-column prop="address" label="所属班组"> </el-table-column>
            <el-table-column prop="name" label="打卡时间"> </el-table-column>
            <el-table-column prop="name" label="现场照片"> </el-table-column>
            <el-table-column prop="name" label="标识"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            openType: "add",
            showAdd: false,
            value4: [
                new Date(2016, 9, 10, 8, 40),
                new Date(2016, 9, 10, 9, 40),
            ],
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