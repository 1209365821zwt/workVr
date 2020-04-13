<template>
    <div class="v-menu">
        <!-- 导航菜单 -->
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="(item,i) in menu">
                <el-menu-item v-if="item.index=='/home'" :index="item.index" :key="i">
                    <template>
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </template>
                </el-menu-item>
                <!-- 下拉菜单 -->
                <template v-else-if="item.subs">
                    <el-submenu :index="item.index" :key="i">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.title}}</span>
                        </template>
                        <!-- <el-menu-item-group> -->
                        <!-- <span slot="title">分组一</span> -->
                        <el-menu-item v-for="(sub,j) in item.subs" :index="sub.index" :key="j">{{sub.title}}
                        </el-menu-item>
                        <!-- </el-menu-item-group> -->
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="i">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
    props: {
        menuList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            menu: [],
        };
    },
    computed: {
        defaultActive() {
            return this.$route.path || '/';
        }
    },
    created() {
        this.menu = this.menuList
    },
    methods: {
        getSideTitle() {
            let titleList = [
                {
                    icon: 'el-icon-s-home',
                    index: '/home',
                    title: '首页',
                    display: true
                },
                {
                    icon: 'el-icon-s-management',
                    index: '/projectManagement',
                    title: '项目管理',
                    display: true,
                    subs: [
                        {
                            index: '/projectConfig',
                            title: '· 项目配置',
                            display: true
                        }
                    ]
                },
                {
                    icon: 'el-icon-office-building',
                    index: '/dataManagement',
                    title: '数据管理',
                    display: true,
                    subs: [
                        {
                            index: '/magnumRelation',
                            title: '· 代表关系',
                            display: true
                        }, {
                            index: '/mettingData',
                            title: '· 会议数据',
                            display: true
                        }, {
                            index: '/salesData',
                            title: '· 销售数据',
                            display: true
                        }
                    ]
                },
                {
                    icon: 'el-icon-search',
                    index: '/functionManagement',
                    title: '功能管理',
                    display: true,
                    subs: [
                        {
                            index: '/functionConfig',
                            title: '· 功能配置',
                            display: true
                        },
                        {
                            index: '/labelManagement',
                            title: '· 标签管理',
                            display: true
                        }
                    ]
                },
                {
                    icon: 'el-icon-reading',
                    index: '/systemManagement',
                    title: '角色管理',
                    display: true,
                    subs: [
                        {
                            index: '/infomationManagement',
                            title: '· 信息管理',
                            display: true
                        }, {
                            index: '/roleManagement',
                            title: '· 角色管理',
                            display: true
                        }
                    ]
                },
                {
                    icon: 'el-icon-s-promotion',
                    index: '/userManagement',
                    title: '用户管理',
                    display: true,
                    subs: [
                        {
                            index: '/userList',
                            title: '· 用户列表',
                            display: true
                        }
                    ]
                },
                {
                    icon: 'el-icon-tickets',
                    index: '/integralManagement',
                    title: '积分管理',
                    display: true,
                    subs: [
                        {
                            index: '/exchange',
                            title: '· 兑换管理',
                            display: true
                        },
                        {
                            index: '/present',
                            title: '· 礼品管理',
                            display: true
                        }
                    ]
                },
            ];
            if (this.menuList.indexOf('/home') == -1) {
                this.menuList.push('/home')
            }
            // this.menuList.push('/insuranceList')
            // this.menuList.push('/videoBack')
            let arr = titleList.map((item) => {
                let index = item.index;
                let itemObj;
                if (this.menuList.indexOf(index) != -1) {
                    itemObj = new Object;
                    itemObj = {
                        icon: item.icon,
                        index: item.index,
                        title: item.title,
                        display: item.display,
                        subs: []
                    };
                    if (item.subs && item.subs.length) {
                        item.subs.forEach(i => {
                            if (this.menuList.indexOf(i.index) != -1) {
                                itemObj.subs.push(i)
                            }
                        })
                    }
                }
                if (itemObj)
                    return itemObj
            });
            arr = arr.filter(item => {
                if (item)
                    return item
            });
            this.menu = arr;
        }
    }
}
</script>

<style lang="stylus">
    .v-menu
        height: 100%;
        user-select: none;

        .el-menu-vertical-demo:not(.el-menu--collapse)
            width: 200px;
            height: 100%;

        .el-menu-item
            &.is-active
                background: #ecf5ff
</style>
