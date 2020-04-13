import fetch from '@/utils/fetch';

// post 获取查询数据
export function getRole(data) {
    return fetch({
        url: '/getRolePageByRoleName',
        method: 'post',
        data
    })
}
//post 添加角色
export function addRole(data) {
    return fetch({
        url: '/addRoleById',
        method: 'post',
        data
    })
}
//post 根据id删除角色
export function delRole(roleId) {
    return fetch({
        url: `/delRoleById/?roleId=${roleId}`,
        method: 'post',
        
    })
}
//post 根据id更新角色
export function updataRole(data) {
    return fetch({
        url: '/updateRoleById',
        method: 'post',
        data
    })
}

//post  查询后台功能权限

export function AuthorityRole(roleId) {
    return fetch({
        url: `/getBackgroundAuthority/?roleId=${roleId}`,
        method: 'post',
    })
}


//post 保存后台功能权限

export function saveAuthorityRole(authorityIdList,roleId) {
    return fetch({
        url: `/saveBackgroundAuthority/?authorityIdList=${authorityIdList}&roleId=${roleId}`,
        method: 'post',
        
    })
}

//post 添加账号
export function addAccount(data) {
    return fetch({
        url: '/addAccount',
        method: 'post',
        data
    })
}
//post 账号编辑
export function updataAccount(data) {
    return fetch({
        url: '/updateAccount',
        method: 'post',
        data
    })
}
//post  账号列表
export function Accountlist(data) {
    return fetch({
        url: '/getAdminUserPageByNameAndAccountAndProject',
        method: 'post',
        data
    })
}

//post 获取所有的角色
export function roleList() {
    return fetch({
        url: '/roleList',
        method: 'post'
    })
}
//post 重置密码
export function resetPassword(data) {
    return fetch({
        url: `/resetPassword/${data}`,
        method: 'post'
    })
}

// 更新账号状态
export function updateAccountStatus(status,id){
    return fetch({
        url: `/updateAccountStatus?id=${id}&status=${status}`,
        method: 'post'
    })
}