import Axios from 'axios'
import {configure} from 'axios-hooks'
import React from 'react'
import {Modal} from 'antd'


const axios = Axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'http://192.168.0.22:3000',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': window.cookie
        // 'csrf_token'
    }
})

axios.interceptors.response.use((response) => {
    if (response.status === 200) {
        const r = response.data
        const {code, message} = r
        if (code === 0) {
            return r
        } else {
            // 抛出服务器错误
            const err = {
                type: 'api',
                title: '服务器响应出错了，请截图联系客服',
                body: (
                    <div>
                        <div>errcode: {code}</div>
                        <div>time: {Date.toLocaleString(Date.now())}</div>
                        <div>url: {window.location.href}</div>
                        <div>message: {message}</div>
                    </div>
                ),
                ...r,
            }
            throw err
        }
    }
}, (response) => {
    const err = {
        type: 'http',
        title: 'http请求状态错误，请截图联系客服',
        body: (
            <div>
                <div>err: {response.status}</div>
                <div>time: {Date(Date.now()).toLocaleString()}</div>
                <div>url: {window.location.href}</div>
            </div>
        ),
    }
    Modal.error({
        title: err.title || null,
        content: err.body,
    })
})

configure({axios})

class UserApi {

    static login(data) {
        const path = '/api/login'
        return axios.post(path, data)
    }

    static register(data) {
        const path = '/api/register'
        return axios.post(path, data)
    }
}

class TopicApi {

    static new(data) {
        const path = '/api/topic'
        return axios.post(path, data)
    }

    static all() {
        const path = '/api/topic'
        return axios.get(path)
    }

    static get(id) {
        const path = `/api/topic/${id}`
        return axios.get(path)
    }
}


export default UserApi

export {
    TopicApi,
}