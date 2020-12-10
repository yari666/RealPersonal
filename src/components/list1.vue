 <!---普通列表--> 

  <template>
    <div class="list">
        <ul>
            <!-- 预警通知 -->
            <template v-if="type==1">
                <li v-for="(item,index) in tableData" :key="index">
                    <p>{{item.address}}</p>
                    <template>
                        <el-tag size="small" v-if="item.status=='在线'" type="success">在线</el-tag>
                        <el-tag size="small" v-if="item.status=='离线'" type="info">离线</el-tag>
                        <el-tag size="small" v-if="item.status=='异常'" type="warning">异常</el-tag>
                        <el-tag size="small" v-if="item.status=='故障'" type="danger">故障</el-tag>
                    </template>
                    <span class="date fr">{{item.date}}</span>
                </li>
            </template>

            <!-- 维修记录 -->
            <template v-if="type==2">
                <li v-for="(item,index) in tableData" :key="index">
                    <p>
                        {{item.name}}
                        <span class="inhert">提交了</span>维修工单
                    </p>
                    <span class="date fr">{{item.date}}</span>
                </li>
            </template>

            <!-- 巡检记录 -->
            <template v-if="type==3">
                <li v-for="(item,index) in tableData" :key="index">
                    <p>
                        {{item.name}}
                        <span class="inhert">提交了</span>巡检工单
                    </p>
                    <span class="date fr">{{item.date}}</span>
                </li>
            </template>

            <!-- 监察记录 -->
            <template v-if="type==4">
                <li v-for="(item,index) in tableData" :key="index">
                    <p>
                        {{item.name}}
                        <span class="inhert">提交了</span>巡查报告 /
                        <span class="qualified" v-if="item.isunqualified">合格</span>
                        <span class="unqualified" v-else>不合格</span>
                    </p>
                    <span class="date fr">{{item.date}}</span>
                </li>
            </template>
        </ul>
    </div>
</template>

  <script>
export default {
    data() {
        return {
            tableData: [
                {
                    date: "2016-05-01",
                    status: "在线",
                    address: "松坝社区污水站",
                    name: "刘波",
                    isunqualified: false, //是否合格
                },
                {
                    date: "2016-05-01",
                    status: "在线",
                    address: "松坝社区污水站",
                    name: "林由于",
                    isunqualified: true,
                },
                {
                    date: "2016-05-01",
                    status: "在线",
                    address: "松坝社区污水站",
                    name: "王一博",
                    isunqualified: false,
                },
                {
                    date: "2016-05-01",
                    status: "在线",
                    address: "松坝社区污水站",
                    name: "刘达明",
                    isunqualified: true,
                },
                {
                    date: "2016-05-02",
                    status: "故障",
                    address: "松坝社区污水站",
                    name: "大海",
                    isunqualified: true,
                },
                {
                    date: "2016-05-04",
                    status: "异常",
                    address: "松坝社区污水站",
                    name: "刘波",
                    isunqualified: true,
                },
                {
                    date: "2016-05-01",
                    status: "在线",
                    address: "松坝社区污水站",
                    name: "李昭",
                    isunqualified: true,
                },
                {
                    date: "2016-05-03",
                    status: "离线",
                    address: "松坝社区污水站",
                    name: "王灿",
                    isunqualified: true,
                },
            ],
        };
    },
    props: ["type"],
};
</script>

<style lang="less" scoped>
.list {
    width: 100%;
    li {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ebeef5;
        p {
            float: left;
        }
        .el-tag {
            float: left;
            margin-left: 5px;
            margin-top: 8px;
        }
        .fr {
            float: right;
        }
        span.date {
            color: #999;
        }
        span.inhert {
            color: #3264c7;
        }
        span.qualified {
            color: #4cb;
        }
        span.unqualified {
            color: red;
        }
        span.warn {
            color: #f90;
        }
    }
}
</style>