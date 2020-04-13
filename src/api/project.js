import fetch from '@/utils/fetch';
//获取所有的列表
export function list() {
    return fetch({
        url: '/projectManagement/list',
        method: 'get',
    })
}
// post 获取peoject查询数据
export function listBypage(data) {
    return fetch({
        url: '/projectManagement/listBypage',
        method: 'post',
        data
    })
}
//新添数据
export function inster(data) {
    return fetch({
        url: '/projectManagement/inster',
        method: 'post',
        data
    })
}
//编辑
export function update(data) {
    return fetch({
        url: '/projectManagement/update',
        method: 'post',
        data
    })
}
//
// post id获取关键字
export function getKeyword(data) {
    return fetch({
        url: `/projectKeyword/getKeyword/${data}`,
        method: 'get',

    })
}

// 获取关联VR项目列表
export function getVrproject(){
    return fetch({
        url:'/getVrproject',
        method: 'get'
    })
}
