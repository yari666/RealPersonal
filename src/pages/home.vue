<!---主框架----->
<template>
    <el-container>
        <!---侧栏----->
        <el-aside style="width: 224px">
            <div class="logo"></div>

            <!-- 导航 -->
            <el-menu
                :default-active="$route.path"
                @select="handleSelect"
                background-color="transparent"
                text-color="#fff"
                active-text-color="#ffd04b"
                router="true"
            >
                <el-menu-item index="1">
                    <i class="el-icon-house"></i>
                    <span slot="title">首页</span>
                </el-menu-item>

                <el-menu-item index="/project">
                    <i class="el-icon-set-up"></i>
                    <span slot="title">项目管理</span>
                </el-menu-item>

                <el-menu-item index="/company">
                    <i class="el-icon-office-building"></i>
                    <span slot="title">企业管理</span>
                </el-menu-item>

                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-user"></i>
                        <span>人员管理</span>
                    </template>
                    <el-menu-item index="/user/manager">管理人员</el-menu-item>
                    <el-menu-item index="/user/worker">普通人员</el-menu-item>
                </el-submenu>

                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-phone-outline"></i>
                        <span>访客管理</span>
                    </template>

                    <el-menu-item index="/guest/guestuser"
                        >访客列表</el-menu-item
                    >
                    <el-menu-item index="/guest/guestclass"
                        >班组管理</el-menu-item
                    >
                </el-submenu>

                <el-submenu index="6">
                    <template slot="title">
                        <i class="el-icon-bell"></i>
                        <span>考勤管理</span>
                    </template>

                    <el-menu-item index="/workcheck/clockin"
                        >打卡记录</el-menu-item
                    >
                    <el-menu-item index="/workcheck/user"
                        >人员考勤</el-menu-item
                    >
                    <el-menu-item index="/workcheck/reportform"
                        >考勤日报表</el-menu-item
                    >
                </el-submenu>

                <el-menu-item index="/device">
                    <i class="el-icon-video-camera"></i>
                    <span slot="title">设备管理</span>
                </el-menu-item>

                <el-menu-item index="/api">
                    <i class="el-icon-paperclip"></i>
                    <span slot="title">API管理</span>
                </el-menu-item>

                <el-menu-item index="/userdata">
                    <i class="el-icon-user"></i>
                    <span slot="title">人员库</span>
                </el-menu-item>

                <el-menu-item index="/operation">
                    <i class="el-icon-setting"></i>
                    <span slot="title">操作日志</span>
                </el-menu-item>

                <el-submenu index="11">
                    <template slot="title">
                        <i class="el-icon-user"></i>
                        <span>账户管理</span>
                    </template>

                    <el-menu-item index="/sys/account">账号管理</el-menu-item>
                    <el-menu-item index="/sys/role">角色管理</el-menu-item>
                    <el-menu-item index="/sys/menu">菜单管理</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <!---顶部----->
            <el-header style="height: 68px">
                <div class="fr">
                    <div class="weather fl">
                        <i class="el-icon-sunny"></i>晴 24℃
                    </div>
                    <div class="user fl">
                        <el-avatar
                            :size="24"
                            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                        ></el-avatar>
                        {{ this.$store.state.userInfo.userName }}
                    </div>

                    <div class="email fl"><i class="icons"></i></div>
                    <div class="ksh fl" @click="goKsh">
                        <i class="icons"></i>
                    </div>

                    <!-- 退出 -->
                    <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            <i class="el-icon-setting setting"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="revisepass"
                                >修改密码</el-dropdown-item
                            >
                            <el-dropdown-item command="exit"
                                >退出登录</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>

            <!-- 弹框内容 -->
            <el-dialog
                :close-on-click-modal="false"
                title="修改密码"
                :visible.sync="showRevisePassword"
                width="30%"
            >
                <revise-password
                    v-if="showRevisePassword"
                    :showRevisePassword="showRevisePassword"
                    @revisePass="revisePass"
                ></revise-password>
            </el-dialog>

            <!---主内容----->
            <el-main>
                <div class="main">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>


<script>
import { Menu, AreaList } from "~/config/api.js";
import revisePassword from "~/components/revisePassword";

export default {
    data() {
        return {
            activeIndex: "5-1",
            showRevisePassword: false,
            menuList: [],

            areaData: [],

            areaVal: [],
            options: [
                {
                    value: "zhinan",
                    label: "陕西省",
                    children: [
                        {
                            value: "shejiyuanze",
                            label: "设计原则",
                            children: [
                                {
                                    value: "yizhi",
                                    label: "一致",
                                },
                            ],
                        },
                        {
                            value: "daohang",
                            label: "安康市",
                            children: [
                                {
                                    value: "cexiangdaohang",
                                    label: "侧向导航",
                                },
                                {
                                    value: "dingbudaohang",
                                    label: "石泉县",
                                },
                            ],
                        },
                    ],
                },
                {
                    value: "zujian",
                    label: "组件",
                    children: [
                        {
                            value: "basic",
                            label: "Basic",
                            children: [
                                {
                                    value: "layout",
                                    label: "Layout 布局",
                                },
                                {
                                    value: "color",
                                    label: "Color 色彩",
                                },
                            ],
                        },
                    ],
                },
                {
                    value: "ziyuan",
                    label: "资源",
                    children: [
                        {
                            value: "axure",
                            label: "Axure Components",
                        },
                        {
                            value: "sketch",
                            label: "Sketch Templates",
                        },
                        {
                            value: "jiaohu",
                            label: "组件交互文档",
                        },
                    ],
                },
            ],
        };
    },
    components: { revisePassword },
    computed: {
        userType() {
            return this.$store.state.userInfo.userType;
        },
        userId() {
            return this.$store.state.userInfo.userId;
        },
    },
    created() {
        this.getMenu();
        this.getAreaList();
    },
    methods: {
        //获取区域信息
        getAreaList() {
            AreaList().then((res) => {
                if (res && res.data) {
                    this.areaData = JSON.parse(JSON.stringify(res.data));
                }
            });
        },

        // 退出登录+修改密码
        handleCommand(command) {
            if (command == "exit") {
                this.$store.commit("setUserInfo", {});
                this.$router.push({ path: "/login" });
            }
            if (command == "revisepass") {
                this.showRevisePassword = !this.showRevisePassword;
            }
        },

        // 修改密码
        revisePass() {
            this.showRevisePassword = !this.showRevisePassword;
        },

        // 获取菜单
        getMenu() {
            Menu({
                UserId: this.userId,
            }).then((res) => {
                if (res && res.data) {
                    this.menuList = res.data;
                }
            });
        },

        // 选择区域
        changeArea(value) {
            this.areaVal = value;
        },

        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },

        goKsh() {
            window.open("http://water.xhs-sz.com/");
        },
    },
};
</script>


<style lang="less" scope>
.el-container {
    height: 100vh;
    width: 100%;
    overflow: hidden;
}

.icons {
    background: url(../assets/img/icons.png) no-repeat;
}

.el-cascader .el-input__inner {
    border: none;
    text-align: right;
}

.el-header {
    color: #535353;
    line-height: 68px;
    text-align: right;
    font-size: 14px;
    background: #ffffff;
    box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.08);
    z-index: 1;
    .fl {
        font-size: 16px;
    }
    .block {
        margin-top: -10px;
    }
    .company,
    .weather,
    .user,
    .email,
    .ksh {
        padding: 0 13px;
        height: 18px;
        line-height: 18px;
        margin-top: 25px;
        border-right: 1px solid #dfdfdf;
        cursor: pointer;
    }
    .weather {
        i {
            font-size: 20px;
            color: #ffa200;
            vertical-align: -2px;
            margin-right: 10px;
        }
    }
    .user {
        .el-avatar {
            margin-right: 10px;
            margin-top: -3px;
            float: left;
        }
    }
    .email {
        i {
            width: 16px;
            height: 10px;
            display: block;
            margin-top: 4px;
        }
    }
    .ksh {
        i {
            width: 21px;
            height: 17px;
            display: block;
            background-position: -55px 0;
        }
    }
    .setting {
        font-size: 20px;
        padding-left: 13px;
    }
}

.el-menu {
    border: none;
}

.logo {
    background: url(../assets/img/logo.svg) no-repeat;
    background-size: contain;
    width: 170px;
    height: 48px;
    margin: 16px 25px;
}

.el-main {
    background: #f6f6f6;
}
.main {
    background: #fff;
    padding: 20px 24px 24px;
    overflow: hidden;
}
.p20 {
    padding: 20px;
}
</style>

