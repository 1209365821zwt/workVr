import fetch from '@/utils/fetch';

// post 获取查询数据
export function getlabel(data) {
    return fetch({
        url: '/getBackLabelPageByProjectAndLabel',
        method: 'post',
        data
    })
}
//post 添加标签
export function addlabel(data) {
    return fetch({
        url: '/addBackLabel',
        method: 'post',
        data
    })

}
// post 删除标签
export function dellabel(data) {
    return fetch({
        url: `/delBackLabel/?id=${data}`,
        method: 'post'
    })
}
//post 更新标签
export function updatalabel(data) {
    return fetch({
        url: '/updateBackLabel',
        method: 'post',
        data
    })
}
//post 通过id删除权限
export function delProjectId(projectId) {
    return fetch({
        url: `/delFunctionRoleByProjectId/?projectId=${projectId}`,
        method: 'post',
    })
}
//post 功能管理树列表
export function ListTree(projectId) {
    return fetch({
        url: `/getBackFunctionListTree/?projectId=${projectId}`,
        method: 'post',
    })
}
//post 统计数量
export function getFunctionList(data) {
    return fetch({
        url: `/getProjectFunctionCountList`,
        method: 'post',
        data
    })
}
//post 功能管理树列表保存
export function getFunctionProjectId(functionList,projectId,createPerson) {
    return fetch({
        url: `/saveFunctionRoleByProjectId/?functionList=${functionList}&projectId=${projectId}&createPerson=${createPerson}`,
        method: 'post',
    })
}