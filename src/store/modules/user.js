import { getToken, removeToken, setToken } from '@/utils/auth'
import service from '@/utils/request'

const state = {
  token: getToken(),
  roles: [],

}

const mutations = {
  SET_TOKEN: (state, token) => {
    setToken(token)
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}

const actions = {
  login() {
    return service.get('/api/public/getPublicKey')
  },
  getInfo({ commit }) {
    return new Promise((res) => {
      const roles = state.token === 'admin' ? [ 'admin' ] : [ 'user' ]
      commit('SET_ROLES', roles)
      res({ roles })
    })
  },
  resetToken({ commit }) {
    return new Promise((res) => {
      commit('SET_ROLES', [])
      commit('SET_TOKEN', '')
      removeToken()
      res()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
