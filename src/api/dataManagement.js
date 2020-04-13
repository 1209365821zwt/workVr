import fetch from '@/utils/fetch';

//医生基本信息表-------模糊查询医生信息
export function enterpriseHcpHcPNameList(data) {
    return fetch({
        url: '/enterpriseHcp/HcPNameList',
        method: 'post',
        data
    })
}
//代表-医生-产品关系表-------新增和更新,新增不带Id,更新带Id
export function enterpriseSaleRepProductHcpaddOrUpdate(data) {
    return fetch({
        url: '/enterpriseSaleRepProductHcp/addOrUpdate',
        method: 'post',
        data
    })
}
//代表-医生-产品关系表-------逻辑删除
export function enterpriseSaleRepProductHcpdelect(data) {
    return fetch({
        url: `/enterpriseSaleRepProductHcp/delect/${data.id}`,
        method: 'post',
        data
    })
}
// 代表-医生-产品关系表-------分页列表
export function enterpriseSaleRepProductHcppageList(data) {
    return fetch({
        url: `/enterpriseSaleRepProductHcp/pageList`,
        method: 'post',
        data
    })
}


//医生参与内部会议 -------分页列表
export function meetingtTendancepageList(data) {
    return fetch({
        url: '/meetingtTendance/pageList',
        method: 'post',
        data
    })
}


//  模糊查询医院信息
export function enterpriseHcpHciNameList(data) {
    return fetch({
        url: '/enterpriseHci/HciNameList',
        method: 'post',
        data
    })
}

/**
 * 用户接口(代表)
 */

//模糊查询代表姓名列表

export function salerepSaleNameList(data) {
    return fetch({
        url: '/sale/rep/SaleNameList',
        method: 'post',
        data
    })
}
//分页
export function salereppageList(data) {
    return fetch({
        url: '/sale/rep/pageList',
        method: 'post',
        data
    })
}
//保存信息
export function salerepsave(data) {
    return fetch({
        url: '/sale/rep/save',
        method: 'post',
        data
    })
}

// 删除
export function salerepdel(data) {
    return fetch({
        url: `/sale/rep/del/${data.id}`,
        method: 'get',
    })
}
// 上级列表
export function salerepprelist(data) {
    return fetch({
        url: `/sale/rep/pre/list/{roleId}/${data.projectId}`,
        method: 'get',
    })
}
// 修改状态
export function salerepupdatestatus(data) {
    return fetch({
        url: `/sale/rep/update/status/${data.id}/${data.status}`,
        method: 'get',
    })
}
// 详情查询
export function salerep(data) {
    return fetch({
        url: `/sale/rep/${data.id}`,
        method: 'get',
    })
}

//获取所有列表
export function projectManagementList() {
    return fetch({
        url: `/projectManagement/list`,
        method: 'get',
    })
}
//销量数据的导入
export function dataSalesExcelImport(data) {
    return fetch({
        url: '/excelImport/dataSalesExcelImport',
        method: 'post',
        data
    })
}
//代表关系数据导入
export function repRelationshipExcelImport(data) {
    return fetch({
        url: '/excelImport/repRelationshipExcelImport',
        method: 'post',
        data
    })
}
//post 销量数据
export function enterpriseDataSales(data) {
    return fetch({
        url: '/enterpriseDataSales/pageList',
        method: 'post',
        data
    })
}
//代表关系数据导出 post
export function repRelationshipExcelDownLoad(data) {
    return fetch({
        url: '/excelDownload/repRelationshipExcelDownLoad',
        method: 'post',
        data
    })
}
//post 内部会议数据列表
export function mettingData(data) {
    return fetch({
        url: '/enterpriseMeeting/pageList',
        method: 'post',
        data
    })
}
//post 会议列表导入
export function meetingExcelImport(data) {
    return fetch({
        url: '/excelImport/meetingExcelImport',
        method: 'post',
        data
    })
}
//post 参会数据列表
export function meetingExcelAttendanceImport(data) {
    return fetch({
        url: '/excelImport/meetingExcelAttendanceImport',
        method: 'post',
        data
    })
}
//post 参与会议数据分页列表

export function meetingtTendance(data) {
    return fetch({
        url: '/meetingtTendance/pageList',
        method: 'post',
        data
    })
}

