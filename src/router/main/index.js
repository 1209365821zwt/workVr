import home from './home';
import userManagement from './userManagement';
import functionManagement from './functionManagement';
import systemManagement from './systemManagement';
import dataManagement from './dataManagement';
import integralManagement from './integralManagement';
import projectManagement from './projectManagement';

export default [{
    path: '/home',
    redirect: '/home',
    component: resolve => require(['@/views/main'], resolve),
    children: [
        ...home,
        ...userManagement,
        ...functionManagement,
        ...systemManagement,
        ...integralManagement,
        ...dataManagement,
        ...projectManagement
    ]
}]