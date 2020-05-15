import request from '@/utils/request'

export function getArticle() {
  return request({
    url: '/api/user/getArticle',
    method: 'get',
  })
}

export function getUserInfoById(id) {
  return request({
    url: `/api/public/getUserInfoById?id=${id}`,
    method: 'get',
  })
}

export function updateComment(data) {
  return request({
    url: '/api/user/updateComment',
    method: 'post',
    data,
  })
}

export function getComment() {
  return request({
    url: '/api/user/getComment',
    method: 'get',
  })
}

export function deleteArticle(id) {
  return request({
    url: `/api/article/deleteArticle?id=${id}`,
    method: 'get',
  })
}

export function getUserInfo() {
  return request({
    url: '/api/user/getUserInfo',
    method: 'get',
  })
}

export function setUserInfo(data) {
  return request({
    url: '/api/user/setUserInfo',
    method: 'post',
    data,
  })

}
