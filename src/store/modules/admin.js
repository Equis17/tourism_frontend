import { getAdminToken, removeAdminToken, setAdminToken } from '@/utils/auth'
import service from '@/utils/request'

const state = {
  adminToken: getAdminToken(),
}

const mutations = {
  SET_ADMIN_TOKEN: (state, adminToken) => {
    setAdminToken(adminToken)
    state.adminToken = adminToken
  },
}

const actions = {
  login() {
    return service.get('/api/public/getPublicKey')
  },
  resetToken({ commit }) {
    return new Promise((res) => {
      commit('SET_ADMIN_TOKEN', '')
      removeAdminToken()
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
