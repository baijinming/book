import axios from 'axios'
import { Notification } from 'element-ui'
import router from '../router'

const baseURL = '/api'

const instance = axios.create({
  baseURL,
  timeout:10000
})

const xhr = {
  get (url, data, config) {
    return new Promise((resolve,reject) => {
      instance.get(url, {params: data}, config).then(res=>{
        if(res.data.code == 401) {
          Notification.error('用户信息已失效，请重新登录')
          setTimeout(() => {
            router.push('/login')
          },1000)
        }
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  post (url, data, config, method = 'post') {
    return new Promise((resolve,reject) => {
      instance[method](url, data, config).then(res=>{
        if(res.data.code == 401) {
          Notification.error('用户信息已失效，请重新登录')
          setTimeout(() => {
            router.push('/login')
          },1000)
        }
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  put (url, data, config) {
    return this.post(url,data,config,'put')
  },
  delete (url, data, config) {
    return this.post(url, data, config, 'delete')
  }
}

export const $axios = xhr;
