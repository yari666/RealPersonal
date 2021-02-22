<!---主框架----->
<template>
    <el-container>
        <!---侧栏----->
        <el-aside :width="isCollapse ? '64px' : '200px'">
            <div class="logo" :class="isCollapse ? 'cover' : ''"></div>

            <!-- 导航 -->
            <el-menu
                :default-active="path"
                background-color="#031d4d"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
                unique-opened
                :collapse="isCollapse"
                :collapse-transition="false"
                class="el-menu-vertical-demo"
            >
                <template v-for="item in menuList">
                    <el-submenu
                        :index="item.menuUrl"
                        :key="item.menuCode"
                        v-if="item.menuList && item.menuList.length"
                    >
                        <template slot="title">
                            <i :class="'el-icon-' + item.menuIcon"></i>
                            <span>{{ item.menuName }}</span>
                        </template>

                        <el-menu-item
                            :index="subItem.menuUrl"
                            v-for="subItem in item.menuList"
                            :key="subItem.menuUrl"
                        >
                            <template slot="title">
                                <i :class="'el-icon-' + subItem.menuIcon"></i>
                                <span>{{ subItem.menuName }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                    <el-menu-item
                        v-else
                        :key="item.menuCode"
                        :index="item.menuUrl"
                    >
                        <i :class="'el-icon-' + item.menuIcon"></i>
                        <span slot="title">{{ item.menuName }}</span>
                    </el-menu-item>
                </template>

                <!-- <el-menu-item index="/home">
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

                <el-submenu index="/user">
                    <template slot="title">
                        <i class="el-icon-user"></i>
                        <span>人员管理</span>
                    </template>
                    <el-menu-item index="/user/manager">管理人员</el-menu-item>
                    <el-menu-item index="/user/worker">普通人员</el-menu-item>
                </el-submenu>

                <el-submenu index="/guest">
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

                <el-submenu index="/workcheck">
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
                    <el-menu-item index="/sys/worktype"
                        >工种/证书字典</el-menu-item
                    >
                </el-submenu> -->
            </el-menu>
        </el-aside>

        <el-container>
            <!---顶部----->

            <el-header>
                <i
                    class="el-icon-s-fold collapse"
                    v-show="!isCollapse"
                    @click="collapseEvent"
                ></i>
                <i
                    class="el-icon-s-unfold collapse"
                    @click="collapseEvent"
                    v-show="isCollapse"
                ></i>
                <div class="fr">
                    <!-- <div class="weather fl">
                        <i class="el-icon-sunny"></i>晴 24℃
                    </div> -->
                    <div class="user fl">
                        <el-avatar
                            :size="24"
                            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                        ></el-avatar>
                        {{ this.$store.state.userName }}
                    </div>

                    <el-divider direction="vertical"></el-divider>
                    <span> {{ nowDate }}</span>

                    <!-- <div class="email fl"><i class="icons"></i></div> -->

                    <!-- 退出 -->
                    <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            <i class="el-icon-setting setting"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <!-- <el-dropdown-item command="revisepass"
                                >修改密码</el-dropdown-item
                            > -->
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
                        <router-view :key="this.$route.fullPath"></router-view>
                    </keep-alive>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>


<script>
import revisePassword from "~/components/revisePassword";
import { get } from "~/config/fetch.js";
const timestamp = require("time-stamp");

export default {
    data() {
        return {
            showRevisePassword: false,
            menuList: [],
            isCollapse: false,
            nowDate: "",
        };
    },
    components: { revisePassword },
    computed: {
        userId() {
            return this.$store.state.userId;
        },
        path() {
            let route = this.$route;
            let path = route.path;

            if (route.name == "UserDetail") {
                let arr = path.split("/");
                path = "/" + arr[1] + "/" + arr[2];
            }

            return path;
        },
    },
    created() {
        this.nowDate = timestamp("YYYY-MM-DD HH:mm:ss", new Date());
        this.getMenu();
    },
    methods: {
        // 退出登录+修改密码
        handleCommand(command) {
            if (command == "exit") {
                this.$router.push({ path: "/login" });
            }
            if (command == "revisepass") {
                this.showRevisePassword = !this.showRevisePassword;
            }
        },

        collapseEvent() {
            this.isCollapse = !this.isCollapse;
        },

        // 修改密码
        revisePass() {
            this.showRevisePassword = !this.showRevisePassword;
        },

        // 获取菜单
        getMenu() {
            get("/api/realname/menu/menu-list", { UserId: this.userId }).then(
                (res) => {
                    if (res.isSuccess) {
                        this.menuList = res.data;
                    }
                }
            );
        },
    },
};
</script>


<style lang="less" >
.el-container {
    height: 100vh;
    width: 100%;
}

.el-dialog__body {
    word-break: inherit !important;
}

.icons {
    background: url(../assets/img/icons.png) no-repeat;
}

.el-menu {
    border: none;
}

.el-aside {
    cursor: pointer;
    background: #031d4d;
    .logo {
        background: url(../assets/img/logo.svg) no-repeat;
        background-size: contain;
        height: 48px;
        margin: 16px 10%;
        &.cover {
            background-size: cover;
        }
    }
}

.el-cascader .el-input__inner {
    border: none;
    text-align: right;
}

.el-header {
    color: #535353;
    text-align: right;
    font-size: 16px;
    background: #ffffff;
    box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.08);
    z-index: 1;
    line-height: 60px;
    .collapse {
        float: left;
        margin-top: 20px;
        font-size: 18px;
    }

    .user {
        font-size: 18px;
        margin-top: 1px;
        font-weight: 100;
        .el-avatar {
            margin-right: 10px;
            margin-top: 17px;
            float: left;
        }
    }
    .setting {
        font-size: 20px;
        padding-left: 13px;
        margin-top: 20px;
    }
}

.el-main {
    background: #f6f6f6;
    padding: 0;
    height: calc(~"100vh - 68px");
}
</style>

