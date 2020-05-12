const state = {
  editId: sessionStorage.getItem('editId') || '',
}

const mutations = {
  SET_EDIT_ID(state, id) {
    sessionStorage.setItem('editId', id)
    state.editId = id
  },
  RESET_EDIT_ID(state) {
    state.editId = ''
    sessionStorage.removeItem('editId')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
