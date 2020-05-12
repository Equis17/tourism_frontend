import request from '@/utils/request'

export function createAnswer(data) {
  return request({
    url: '/api/answer/createAnswer',
    method: 'post',
    data,
  })
}

export function setAnswer(data) {
  return request({
    url: '/api/answer/setAnswer',
    method: 'post',
    data,
  })
}

export function likeAnswer(data) {
  return request({
    url: '/api/answer/likeAnswer',
    method: 'post',
    data,
  })
}
