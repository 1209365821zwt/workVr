export default [{
    path: '/',
    // name: 'Login',
    component: resolve => require(['@/views/login'], resolve)
}, {
    path: '/login',
    name: 'Login',
    component: resolve => require(['@/views/login'], resolve)
}]