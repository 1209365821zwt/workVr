export default [
    {
        path: '/magnumRelation',
        name: 'magnumRelation',
        component: resolve => require(['@/views/main/dataManagement/magnumRelation'], resolve)
    },
    {
        path: '/mettingData',
        name: 'mettingData',
        component: resolve => require(['@/views/main/dataManagement/mettingData'], resolve)
    },
    {
        path: '/salesData',
        name: 'salesData',
        component: resolve => require(['@/views/main/dataManagement/salesData'], resolve)
    }
]