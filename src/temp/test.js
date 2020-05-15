import request from '@/utils/request'
export function decrypt() {
          return request({
            url:'/api/test/decrypt',
            method:'post'
          })
        }