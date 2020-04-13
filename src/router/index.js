import Vue from 'vue'
import Router from 'vue-router'
import login from './login';
import main from './main';
import notFound from './notFound';
import second from './second'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        ...login,
        ...main,
        ...notFound,
        ...second
    ]
})
