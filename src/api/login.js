import fetch from '@/utils/fetch';

// post 登录接口
export function login(data) {
    return fetch({
        url: '/login',
        method: 'post',
        data
    })
}
//验证码
export function getVerifyCode() {
    return fetch({
        url: '/getVerifyCode',
        method: 'get',
    })
}
// post 退出
export function logout() {
    return fetch({
        url: `/logout`,
        method: 'get',
        // data
    })
}
// post 获取用户信息
export function getInfo(data) {
    return fetch({
        url: '/login/getInfo',
        method: 'post',
        data
    })
}

/// 获取会话唯一标识(sessionId)
export function getSessionId() {
    return fetch({
        url: '/getSessionId',
        method: 'get',
    })
}