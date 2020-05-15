import request from '@/utils/request'

export function getRouterList(data) {
  return request({
    url: '/api/admin/getRouterList',
    method: 'get',
    data,
  })
}

export function addRouter(data) {
  return request({
    url: '/api/admin/addRouter',
    method: 'post',
    data,
  })
}

export function deleteRouter(data) {
  return request({
    url: '/api/admin/deleteRouter',
    method: 'post',
    data,
  })
}

export function updateRouter(data) {
  return request({
    url: '/api/admin/updateRouter',
    method: 'post',
    data,
  })
}

export function getAdminList() {
  return request({
    url: '/api/admin/getAdminList',
    method: 'get',
  })
}

export function addAdmin(data) {
  return request({
    url: '/api/admin/addAdmin',
    method: 'post',
    data,
  })
}

export function deleteAdmin(data) {
  return request({
    url: '/api/admin/deleteAdmin',
    method: 'post',
    data,
  })
}

export function updateAdmin(data) {
  return request({
    url: '/api/admin/updateAdmin',
    method: 'post',
    data,
  })
}

export function getAnswerList() {
  return request({
    url: '/api/admin/getAnswerList',
    method: 'get',
  })
}

export function deleteAnswer(data) {
  return request({
    url: '/api/admin/deleteAnswer',
    method: 'post',
    data,
  })
}

export function getArticleList() {
  return request({
    url: '/api/admin/getArticleList',
    method: 'get',
  })
}

export function deleteArticle(data) {
  return request({
    url: '/api/admin/deleteArticle',
    method: 'post',
    data,
  })
}

export function getCommentInfoList() {
  return request({
    url: '/api/admin/getCommentInfoList',
    method: 'get',
  })
}

export function deleteCommentInfo(data) {
  return request({
    url: '/api/admin/deleteCommentInfo',
    method: 'post',
    data,
  })
}

export function getLikeArticleList() {
  return request({
    url: '/api/admin/getLikeArticleList',
    method: 'get',
  })
}

export function getLikeCommentInfoList() {
  return request({
    url: '/api/admin/getLikeCommentInfoList',
    method: 'get',
  })
}

export function getLikeQuestionList() {
  return request({
    url: '/api/admin/getLikeQuestionList',
    method: 'get',
  })
}

export function getLikeAnswerList() {
  return request({
    url: '/api/admin/getLikeAnswerList',
    method: 'get',
  })
}

export function getQuestionList() {
  return request({
    url: '/api/admin/getQuestionList',
    method: 'get',
  })
}

export function deleteQuestion(data) {
  return request({
    url: '/api/admin/deleteQuestion',
    method: 'post',
    data,
  })
}

export function getUserList() {
  return request({
    url: '/api/admin/getUserList',
    method: 'get',
  })
}

export function deleteUser(data) {
  return request({
    url: '/api/admin/deleteUser',
    method: 'post',
    data,
  })
}
