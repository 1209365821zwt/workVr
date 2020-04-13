export default [
    {
        path: '/exchange',
        name: 'exchange',
        component: resolve => require(['@/views/main/integralManagement/exchange'], resolve)
    },
    {
        path: '/present',
        name: 'present',
        component: resolve => require(['@/views/main/integralManagement/present'], resolve)
    }
]