import request from '@/utils/request'

export function getArticle() {
  return request({
    url: '/api/user/getArticle',
    method: 'get',
  })
}

//TODO article question info 还有删除文章和问题 问题设置答案 增加loading 效果
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
