import store from '@/store'
import { getAdminToken, getToken } from '@/utils/auth'
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  timeout: 5000,
})

service.interceptors.request.use(
  config => {
    if (store.getters.token || store.getters.adminToken) {
      if (store.getters.adminToken) {
        config.headers['Authorization'] = `Bearer ${getAdminToken()}`
      } else {
        config.headers['Authorization'] = `Bearer ${getToken()}`
      }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      const message = res.message
      if (message) {
        Message({
          message,
          type: 'success',
          duration: 5 * 1000,
        })
      }
      return res
    }
  },
  error => {
    if (error.response.status === 401) {
      if (/^\/api\/admin/.test(error.config.url)) {
        window.location.href = '/admin/login'
        store.dispatch('user/resetToken').then(() => {
          store.dispatch('admin/resetToken').then(() => {
            window.location.href = '/admin/login'
          })
        })
      } else {
        window.location.href = '/login'
        store.dispatch('user/resetToken').then(() => {
          store.dispatch('admin/resetToken').then(() => {
            window.location.href = '/login'
          })
        })
      }
    } else {
      Message({
        message: typeof error.message === 'object' ? '系统异常,请联系管理员' : error.message,
        type: 'error',
        duration: 5 * 1000,
      })
    }
    return Promise.reject(error)
  },
)
export default service
