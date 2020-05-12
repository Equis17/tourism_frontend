import request from '@/utils/request'

export function createComment(data) {
  return request({
    url: '/api/commentInfo/createComment',
    method: 'post',
    data,
  })
}

export function likeComment(data) {
  return request({
    url: '/api/commentInfo/likeComment',
    method: 'post',
    data,
  })
}
