import fetch from '@/utils/fetch';

// 日志列表
export function reqLogList (data) {
    return fetch({
        url: '/visit/path/log/list',
        method: 'post',
        data
    })
}