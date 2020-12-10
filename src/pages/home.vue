<!---主框架----->
<template>
    <el-container>
        <!---侧栏----->
        <el-aside style="width: 224px">
            <div class="logo"></div>

            <!-- 导航 -->
            <el-menu
                color="#6F80A7"
                :default-active="$route.path"
                @select="handleSelect"
            >
                <el-menu-item index="/">
                    <span slot="title"
                        ><router-link to="/">控制台</router-link></span
                    >
                </el-menu-item>

                <!-- 业主 -->
                <template v-if="userType == 1">
                    <el-menu-item index="/yezhu/xiangmu">
                        <span slot="title"
                            ><router-link to="/yezhu/xiangmu"
                                >项目管理</router-link
                            ></span
                        >
                    </el-menu-item>
                    <el-menu-item index="/yezhu/wushuizhan">
                        <span slot="title"
                            ><router-link to="/yezhu/wushuizhan"
                                >污水站管理</router-link
                            ></span
                        >
                    </el-menu-item>
                    <el-menu-item index="/yezhu/shebei">
                        <span slot="title"
                            ><router-link to="/yezhu/shebei"
                                >设备管理</router-link
                            ></span
                        >
                    </el-menu-item>
                    <el-submenu index="/yezhu/yunwei/third">
                        <span class="title" slot="title">运维管理</span>
                        <el-menu-item-group>
                            <el-menu-item index="/yezhu/yunwei/third">
                                <span slot="title"
                                    ><router-link to="/yezhu/yunwei/third"
                                        >第三方运维</router-link
                                    ></span
                                ></el-menu-item
                            >
                        </el-menu-item-group>
                    </el-submenu>
                </template>

                <!-- 运维 -->
                <template v-else-if="userType == 2">
                    <el-menu-item index="/yunwei/yezhu"
                        ><span slot="title"
                            ><router-link to="/yunwei/yezhu"
                                >业主管理</router-link
                            ></span
                        >
                    </el-menu-item>
                    <el-menu-item index="/yunwei/wushuizhan"
                        ><span slot="title"
                            ><router-link to="/yunwei/wushuizhan"
                                >污水站管理</router-link
                            ></span
                        >
                    </el-menu-item>
                    <el-menu-item index="/yunwei/shebei"
                        ><span slot="title"
                            ><router-link to="/yunwei/shebei"
                                >设备管理</router-link
                            ></span
                        >
                    </el-menu-item>
                </template>

                <!-- 监管 -->
                <template v-else-if="userType == 3">
                    <el-menu-item index="/jianguan/wushuizhan">
                        <span slot="title"
                            ><router-link to="/jianguan/wushuizhan"
                                >污水站管理</router-link
                            ></span
                        >
                    </el-menu-item>
                    <el-menu-item index="/jianguan/yezhu">
                        <span slot="title"
                            ><router-link to="/jianguan/yezhu"
                                >业主管理</router-link
                            ></span
                        >
                    </el-menu-item>
                </template>

                <!-- 平台 -->
                <template v-else-if="userType == 4">
                    <el-menu-item index="/sys/user/user">
                        <span slot="title"
                            ><router-link to="/sys/user/user"
                                >账户管理</router-link
                            ></span
                        >
                    </el-menu-item>
                    <el-menu-item index="/sys/role/role">
                        <span slot="title"
                            ><router-link to="/sys/role/role"
                                >角色管理</router-link
                            ></span
                        >
                    </el-menu-item>
                    <el-menu-item index="/sys/menu/menu">
                        <span slot="title"
                            ><router-link to="/sys/menu/menu"
                                >菜单管理</router-link
                            ></span
                        >
                    </el-menu-item>
                    <el-menu-item index="/sys/dictionary/dictionary">
                        <span slot="title"
                            ><router-link to="/sys/dictionary/dictionary"
                                >字典管理</router-link
                            ></span
                        >
                    </el-menu-item>
                </template>
            </el-menu>
        </el-aside>

        <el-container>
            <!---顶部----->
            <el-header style="height: 68px">
                <div class="fl">
                    {{
                        userType == 1
                            ? "业主方"
                            : userType == 2
                            ? "运维方"
                            : userType == 3
                            ? "监管方"
                            : userType == 4
                            ? "平台"
                            : ""
                    }}
                </div>

                <div class="fr">
                    <div class="company fl">
                        <div class="block">
                            <el-cascader
                                placeholder="请选择区域"
                                :options="areaData"
                                :props="{
                                    label: 'Value',
                                    children: 'Children',
                                    value: 'Value',
                                    checkStrictly: true,
                                }"
                                @change="changeArea"
                            ></el-cascader>
                        </div>
                    </div>
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
                <router-view></router-view>
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

.el-aside {
    background: linear-gradient(153deg, #23283c 0%, #2a355a 100%);
    box-shadow: 3px 3px 14px rgba(0, 0, 0, 0.16);
    font-size: 14px;
}
.logo {
    background: url(../assets/img/logo.png) no-repeat;
    background-size: contain;
    width: 170px;
    height: 48px;
    margin: 16px 25px;
}

.el-menu-item:focus,
.el-menu-item:hover,
.el-submenu__title:focus,
.el-submenu__title:hover {
    background-color: #48596f;
}

.el-menu {
    background-color: transparent;
    border: none;
    .el-menu-item {
        height: 50px;
        line-height: 50px;
        span.title {
            color: #6f80a7;
            padding-left: 20px;
        }
        a {
            display: block;
            width: 100%;
            height: 100%;
            color: #6f80a7;
            text-decoration: none;
            padding-left: 20px;
        }
        &:hover,
        &:focus,
        &.is-active {
            a {
                color: #fff;
            }

            border-left: 2px solid #10c2de;
            background: linear-gradient(
                91deg,
                rgba(8, 153, 175, 0.27) 0%,
                rgba(0, 55, 64, 0.09) 58%,
                rgba(3, 15, 29, 0) 100%
            );
        }
    }

    .el-submenu {
        height: 50px;
        line-height: 50px;
        span.title {
            color: #6f80a7;
            padding-left: 20px;
        }
        a {
            display: block;
            width: 100%;
            height: 100%;
            color: #6f80a7;
            text-decoration: none;
            padding-left: 20px;
        }
        .el-menu-item {
            &:hover,
            &:focus,
            &.is-active {
                a {
                    color: #fff;
                }

                border-left: 2px solid #10c2de;
                background: linear-gradient(
                    91deg,
                    rgba(8, 153, 175, 0.27) 0%,
                    rgba(0, 55, 64, 0.09) 58%,
                    rgba(3, 15, 29, 0) 100%
                );
            }
        }
    }
}
.el-main {
    background: #f9f9f9;
    padding: 4px;
}
.p20 {
    padding: 20px;
}
</style>

