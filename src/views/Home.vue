<template>
    <el-container class="home_container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <el-button :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold' " @click="collapseMenu" style="margin-right: 15px; background-color: #373d41;border: none; width: 10px;font-size: 25px;"></el-button>
                <!-- 可以添加一个logo图片 -->
                <!-- <img src="" alt=""> -->
                班级管理系统
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 主体区域 -->
        <el-container style="height: 500px">
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '0px' : '200px'">
                <!-- 主菜单 -->
                <el-menu
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :default-active="activePath"
                    router
                    :collapse="isCollapse"
                    :collapse-transition="true"
                >
                    <el-menu-item index="/welcome" @click="saveNavState('/welcome')">
                        <i class="el-icon-s-home"></i>
                        <span>首页</span>
                    </el-menu-item>
                    <!-- 一级菜单 -->
                    <el-submenu v-for="item in menulist" :key="item.id" :index="'/'+item.path">
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="item.icon"></i>
                            <!-- 文本 -->
                            <span>{{item.authname}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item
                            v-for="subitem in item.children"
                            :key="subitem.id"
                            :index="'/'+subitem.path"
                            @click="saveNavState('/'+subitem.path)"
                        >
                            <i :class="subitem.icon"></i>
                            <span>{{subitem.authname}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <!-- 右侧内容主体 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            // // （开发临时用）管理员用户 侧边栏功能列表
            tmpmenulist1: [
                {
                    authname: "班级作业",
                    icon: "el-icon-s-order",
                    id: 1,
                    path: "tasks",
                    children: [
                        {
                            authname: "我的发布",
                            icon: "el-icon-circle-plus",
                            id: 11,
                            path: "mytasks",
                        },
                        {
                            authname: "已完成",
                            icon: "el-icon-check",
                            id: 13,
                            path: "taskfinished",
                        },
                        {
                            authname: "未完成",
                            icon: "el-icon-close",
                            id: 14,
                            path: "taskunfinished",
                        },
                    ],
                },
                {
                    authname: "信息管理",
                    icon: "el-icon-user-solid",
                    id: 2,
                    path: "info",
                    children: [
                        {
                            authname: "查看个人信息",
                            icon: "el-icon-info",
                            id: 20,
                            path: "lookinfo",
                        },
                        {
                            authname: "班委更换",
                            icon: "el-icon-coordinate",
                            id: 21,
                            path: "managers",
                        }
                    ],
                },
            ],
            // // （开发临时用）普通用户 权限列表
            // tmpmenulist2: [
            //     {
            //         authname: "班级作业",
            //         icon: "el-icon-s-order",
            //         id: 1,
            //         path: "tasks",
            //         children: [
            //             {
            //                 authname: "已完成",
            //                 icon: "el-icon-check",
            //                 id: 13,
            //                 path: "taskfinished",
            //             },
            //             {
            //                 authname: "未完成",
            //                 icon: "el-icon-close",
            //                 id: 14,
            //                 path: "taskunfinished",
            //             },
            //         ],
            //     },
            //     {
            //         authname: "个人信息",
            //         icon: "el-icon-user-solid",
            //         id: 2,
            //         path: "info",
            //         children: [
            //             {
            //                 authname: "查看个人信息",
            //                 icon: "el-icon-info",
            //                 id: 20,
            //                 path: "lookinfo",
            //             },
            //         ],
            //     },
            // ],
            // 菜单列表
            menulist: [
                 {
                    authname: "",
                    icon: "",
                    id: 1,
                    path: "",
                    children: []
                },
            ],
            // 激活态的左侧按钮
            activePath: "",
            // 菜单栏是否折叠
            isCollapse: false,
        };
    },
    created() {
        this.getMenuList();
        this.activePath = window.sessionStorage.getItem("activePath") || "/welcome";
    },
    methods: {
        // 登出
        logout() {
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        // 获取所有菜单
        async getMenuList() {
            const res = await this.$http.get("/menu");
            // console.log(res);
            if (res.data.code !== 200)
                return this.$message.error('获取信息出错');
            this.menulist = res.data.data.operation;
        },
        // 保持连接激活状态
        saveNavState(activePath) {
            window.sessionStorage.setItem("activePath", activePath);
        },
        // 折叠菜单
        collapseMenu() {
            this.isCollapse = !this.isCollapse;
            console.log(this.isCollapse);
        }
    },
};
</script>

<style lang="less" scoped>
.home_container {
    height: 100%;
}

.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 23px;
    letter-spacing: 15px;
    padding-left: 0px;
    > div {
        display: flex;
        align-items: center;
        span {
            margin-left: 10px;
        }
    }
}

.el-aside {
    background-color: #333744;
    .el-menu {
        border: none;
        transition: 0.2s;
        transition: ease-in-out;
    }
}

.el-main {
    background-color: #eaedf1;
}
.menu_basic {

}
</style>