import request from '@/utils/request'

export function createQuestion(data) {
  return request({
    url: '/api/question/createQuestion',
    method: 'post',
    data,
  })
}

export function deleteQuestion(data) {
  return request({
    url: '/api/question/deleteQuestion',
    method: 'post',
    data,
  })
}

export function likeQuestion(data) {
  return request({
    url: '/api/question/likeQuestion',
    method: 'post',
    data,
  })
}

export function getUserQuestion() {
  return request({
    url: '/api/question/getUserQuestion',
    method: 'get',
  })
}
