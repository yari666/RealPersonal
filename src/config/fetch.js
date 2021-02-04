import request from './axios'
import { baseUrl } from './env'

/**
 * 封装跨域请求
 * @param url  接口地址
 * @param params 参数
 * @returns {Promise}
 */
export function crossGet(url, params = {}) {
    request.defaults.baseURL = '/api'
    return request({
        url: url,
        method: 'get',
        params
    })
}


/**
 * 封装put请求
 * @param {*} url  接口地址
 * @param {*} params 参数
 * @returns {Promise}
 */
export function put(url, params = {}) {
    request.defaults.baseURL = baseUrl
    return request({
        url: url,
        method: 'put',
        data: params
    })
}

/**
 * 封装post请求
 * @param url  接口地址
 * @param params 参数
 * @returns {Promise}
 */
export function post(url, params = {}) {
    request.defaults.baseURL = baseUrl
    return request({
        url: url,
        method: 'post',
        data: params
    })
}

/**
 * 封装delete请求
 * @param url  接口地址
 * @param params 参数
 * @returns {Promise}
 */
export function del(url, params = {}) {
    request.defaults.baseURL = baseUrl
    return request({
        url: url,
        method: 'delete',
        params
    })
}

/**
 * 封装get请求
 * @param url  接口地址
 * @param params 参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
    request.defaults.baseURL = baseUrl
    return request({
        url: url,
        method: 'get',
        params
    })
}
