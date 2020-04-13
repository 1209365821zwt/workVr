import fetch from '@/utils/fetch';

// post 获取peoject查询数据
export function pageList(data) {
    return fetch({
        url: '/keyword/pageList',
        method: 'post',
        data
    })
}
//新添数据
export function keywordadd(data) {
    return fetch({
        url: '/keyword/save',
        method: 'post',
        data
    })
}
//删除
export function Keydel(data) {
    return fetch({
        url: `/keyword/del/${data}`,
        method: 'get',

    })
}
//导入关键字
export function importkeyword(createUser,projectId) {
    return fetch({
        url: `/excelImport/keywordExcelImport/?createUser=${createUser}&projectId=${projectId}`,
        method: 'post',
    })
}
//post 关键词导出
export function inquiryKeywordTimeTrendExcelDownload(data) {
    return fetch({
        url: `/excelDownload/inquiryKeywordTimeTrendExcelDownload`,
        method: 'post',
        data
    })
}
