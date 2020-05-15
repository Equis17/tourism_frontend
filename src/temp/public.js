import request from '@/utils/request'

export function getUserName() {
  return request({
    url: '/api/public/getUserName',
    method: 'get',
  })
}

export function getPublicKey() {
  return request({
    url: '/api/public/getPublicKey',
    method: 'get',
  })
}

export function login(data) {
  return request({
    url: '/api/public/login',
    method: 'post',
    data,
  })
}

export function register(data) {
  return request({
    url: '/api/public/register',
    method: 'post',
    data,
  })
}

export function getArticleList() {
  return request({
    url: '/api/public/getArticleList',
    method: 'get',
  })
}

export function getHotList() {
  return request({
    url: '/api/public/getHotList',
    method: 'get',
  })
}

export function getDestinationArticle() {
  return request({
    url: '/api/public/getDestinationArticle',
    method: 'get',
  })
}

export function getHotQuestionRecommend() {
  return request({
    url: '/api/public/getHotQuestionRecommend',
    method: 'get',
  })
}

export function getHotArticleRecommend() {
  return request({
    url: '/api/public/getHotArticleRecommend',
    method: 'get',
  })
}

export function getQuestionList() {
  return request({
    url: '/api/public/getQuestionList',
    method: 'get',
  })
}

export function getQuestionDetail(id) {
  return request({
    url: `/api/public/getQuestionDetail?id=${id}`,
    method: 'get',
  })
}

export function getArticleDetail(id) {
  return request({
    url: `/api/public/getArticleDetail?id=${id}`,
    method: 'get',
  })
}

export function getDestinationList() {
  return request({
    url: '/api/public/getDestinationList',
    method: 'get',
  })

}

export function getQuestionByUserId(id) {
  return request({
    url: `/api/public/getQuestionByUserId?id=${id}`,
    method: 'get',
  })

}

export function searchArticle(search) {
  return request({
    url: `/api/public/searchArticle?search=${search}`,
    method: 'get',
  })

}

export function searchQuestion(search) {
  return request({
    url: `/api/public/searchQuestion?search=${search}`,
    method: 'get',
  })
}

export function forget(data) {
  return request({
    url: '/api/public/forget',
    method: 'post',
    data,
  })
}

export function checkForgetValidate(data) {
  return request({
    url: '/api/public/checkForgetValidate',
    method: 'post',
    data,
  })
}

export function resetPassword(data) {
  return request({
    url: '/api/public/resetPassword',
    method: 'post',
    data,
  })
}
