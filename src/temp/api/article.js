import request from '@/utils/request'

export function createArticle(data) {
  return request({
    url: '/api/article/createArticle',
    method: 'post',
    data,
  })
}

export function saveArticle(data) {
  return request({
    url: '/api/article/saveArticle',
    method: 'post',
    data,
  })
}

export function publishArticle(id) {
  return request({
    url: `/api/article/publishArticle?id=${id}`,
    method: 'post',
  })
}

export function previewArticle(id) {
  return request({
    url: `/api/article/previewArticle?id=${id}`,
    method: 'get',
  })
}

export function likeArticle(data) {
  return request({
    url: '/api/article/likeArticle',
    method: 'post',
    data,
  })
}
