export default [
    {
        path: '*',
        redirect: '/login',
        component: resolve => require(['@/views/login'], resolve)
    }
]
  
  
  