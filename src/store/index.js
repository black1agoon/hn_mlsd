import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginData: {}
  },
  mutations: {
    SET_LOGIN_DATA(state, data) {
      state.loginData = data
    },
    CLEAR_LOGIN_DATA(state) {
      state.loginData = {}
    }
  },
  actions: {
    login({commit}, usermsg) {
      return api.login(usermsg).then((res) => {
        if (!res.data.success) {
          return Promise.reject(res.data.message)
        }
        commit('SET_LOGIN_DATA', res.data.data)
        window.localStorage.setItem('loginData', JSON.stringify(res.data.data))
      }).catch(err => {
        return Promise.reject(err)
      })
    },
    logout() {
      return api.logout()
    }
  },
  modules: {
  }
})
