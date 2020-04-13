export default [

    {
        path: '/infomationManagement',
        name: 'infomationManagement',
        component: resolve => require(['@/views/main/systemManagement/infomationManagement'], resolve)
    },
    {
        path: '/roleManagement',
        name: 'roleManagement',
        component: resolve => require(['@/views/main/systemManagement/roleManagement'], resolve)
    }
]