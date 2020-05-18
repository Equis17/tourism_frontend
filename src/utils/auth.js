export function getToken() {
  return localStorage.getItem('token')
}

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function removeToken() {
  localStorage.removeItem('token')
}

export function getAdminToken() {
  return localStorage.getItem('adminToken')
}

export function setAdminToken(adminToken) {
  localStorage.setItem('adminToken', adminToken)
}

export function removeAdminToken() {
  localStorage.removeItem('adminToken')
}
