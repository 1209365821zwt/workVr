export default [

    {
        path: '/functionConfig',
        name: 'FunctionConfig',
        component: resolve => require(['@/views/main/functionManagement/functionConfig'], resolve)
    },
    {
        path: '/labelManagement',
        name: 'LabelManagement',
        component: resolve => require(['@/views/main/functionManagement/labelManagement'], resolve)
    }
]