export default [
    // {
    //     path: '/setting',
    //     name: 'Setting',
    //     // redirect: '/setting-a',
    //     component: resolve => require(['@/components/main/Setting'], resolve)
    // },
    {
        path: '/account-mng',
        name: 'AccountMng',
        component: resolve => require(['@/components/main/Setting/AccountMng'], resolve)
    },
    {
        path: '/role-mng',
        name: 'RoleMng',
        component: resolve => require(['@/components/main/Setting/RoleMng'], resolve)
    },
    {
        path: '/vx-mng',
        name: 'VxMng',
        component: resolve => require(['@/components/main/Setting/VxMng'], resolve)
    },
    {
        path: '/sys-logs',
        name: 'SysLogs',
        component: resolve => require(['@/components/main/Setting/SysLogs'], resolve)
    }
]