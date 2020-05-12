import request from '@/utils/request'

export function getArticle() {
  return request({
    url: '/api/user/getArticle',
    method: 'get',
  })
}
