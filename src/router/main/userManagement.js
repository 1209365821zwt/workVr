export default [
    {
        path: '/userList',
        name: 'userList',
        component: resolve => require(['@/views/main/userManagement/userList'], resolve)
    },
]