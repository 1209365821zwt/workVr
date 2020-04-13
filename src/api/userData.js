import fetch from '@/utils/fetch';

// post 获取查询数据
export function pageList(data) {
    return fetch({
        url: '/sale/rep/pageList',
        method: 'post',
        data
    })
}
//新添数据
export function useradd(data) {
    return fetch({
        url: '/sale/rep/save',
        method: 'post',
        data
    })
}
//上级列表
export function prelist(data,params) {
    return fetch({
        url: `/sale/rep/pre/list/${data}/${params}`,
        method: 'get',
    })
}
//删除接口
export function dellist(data) {
    return fetch({
        url: `/sale/rep/del/${data}`,
        method: 'get',
    })
}
//修改状态
export function changestatus(data) {
    return fetch({
        url: `/sale/rep/update/status/${data.id}/${data.status}`,
        method: 'get',
    })
}
//导入

export function importData(data) {
    return fetch({
        url: '/excelImport/usersExcelImport',
        method: 'post',
        data
    })
}
//导出
export function usersListExcelDownLoad(data) {
    return fetch({
        url: '/excelDownload/usersListExcelDownLoad',
        method: 'post',
        data
    })
}
