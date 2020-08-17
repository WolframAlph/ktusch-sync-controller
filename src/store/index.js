import Vue from 'vue'
import Vuex from 'vuex'
import httpService from "../service/httpService";
import {syncClient} from '../service/httpService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    warning: ''
  },

  mutations: {
    SET_USER(state, data) {
      localStorage.setItem('user', JSON.stringify(data))
      syncClient.defaults.headers.common['Authorization'] = data.token
      state.warning = ''
    },

    SET_WARNING(state, message) {
      state.warning = message
    }
  },

  actions: {
    async authenticate({commit}, credentials) {
      const response = await httpService.authenticate(credentials.loginEmail, credentials.loginPassword)
      await commit('SET_USER', response.data)
    }
  },
  modules: {

  }
})
