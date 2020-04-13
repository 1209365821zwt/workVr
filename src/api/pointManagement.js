import fetch from '@/utils/fetch';

// post 获取礼品查询数据
export function getPresent(data) {
    return fetch({
        url: '/getBackGiftPageByProjectAndGiftNameAndCreateTime',
        method: 'post',
        data
    })
}
//post 添加礼品
export function addPresent(data) {
    return fetch({
        url: '/addBackGift',
        method: 'post',
        data
    })
}


//post 删除礼品
export function delPresent(data) {
    return fetch({
        url: `/delBackGift/?id=${data}`,
        method: 'post',
    })
}


// post 更新礼品
export function updataPresent(data) {
    return fetch({
        url: '/updateBackGift',
        method: 'post',
        data
    })
}

//post 礼品兑换列表

export function changePresent(data) {
    return fetch({
        url: '/getBackGiftExchangePageByRepAndProjectAndStateAndTime',
        method: 'post',
        data
    })
}
//post 礼品兑换详情
export function detailPresent(data) {
    return fetch({
        url: `/getGiftExchangeById/?id=${data}`,
        method: 'post',
    })
}
// post 跟新状态
export function changestate(data) {
    return fetch({
        url: `/updateExchangeState/?id=${data}`,
        method: 'post'
    })
}
//post 积分管理-兑换数据导入
export function importchange(data) {
    return fetch({
        url: '/excelImport/exchangeExcelImport',
        method: 'post',
        data
    })
}
//post 积分管理-兑换数据导出
export function getBackGiftExchangeExcelDownLoad(data) {
    return fetch({
        url: '/excelDownload/getBackGiftExchangeExcelDownLoad',
        method: 'post',
        data
    })
}