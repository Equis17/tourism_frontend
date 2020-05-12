import { getPublicKey } from '@/api/public'

const state = {
  publicKey: '',
}

const mutations = {
  GET_PUBLIC_KEY(state) {
    getPublicKey().then(res => {
      state.publicKey = res.data
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
