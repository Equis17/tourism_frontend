import request from '@/utils/request'

export function uploadImage(data) {
  return request({
    headers: { contentType: 'multipart/form' },
    url: '/api/upload/uploadImage',
    method: 'post',
    data,
  })
}

export function uploadCover(data) {
  return request({
    url: '/api/upload/uploadCover',
    method: 'post',
    data,
  })
}

export function uploadAvatar(data) {
  return request({
    url: '/api/upload/uploadAvatar',
    method: 'post',
    data,
  })
}
