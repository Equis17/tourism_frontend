import JWTDecode from 'jwt-decode'

export function getToken() {
  const token = localStorage.getItem('token')
  if (token) {
    console.log(JWTDecode(token))
  }
  return localStorage.getItem('token')
}

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function removeToken() {
  localStorage.removeItem('token')
}

export function getAdminToken() {
  const adminToken = localStorage.getItem('adminToken')
  if (adminToken) {
    console.log(JWTDecode(adminToken))
  }
  return localStorage.getItem('adminToken')
}

export function setAdminToken(adminToken) {
  localStorage.setItem('adminToken', adminToken)
}

export function removeAdminToken() {
  localStorage.removeItem('adminToken')
}
