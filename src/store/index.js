import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import edit from './modules/edit'
import permission from './modules/permission'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: { permission, user, common, edit },
  // 全局定义getters便于访问
  getters: {
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes,
    token: state => state.user.token,
    publicKey: state => state.common.publicKey,
    editId: state => state.edit.editId,
    avatarUrl: state => state.user.avatar_url,
  },
})

export default store
