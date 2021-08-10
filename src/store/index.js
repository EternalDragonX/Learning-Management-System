import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserID: window.sessionStorage.getItem("UserID"),
    FirstName: window.sessionStorage.getItem("FirstName"),
    LastName: window.sessionStorage.getItem("LastName"),
    Token: window.sessionStorage.getItem("Token")
  },
  mutations: {
    SET_UserID: (state, data) => {
      state.UserID = data;
      window.sessionStorage.setItem("UserID", data);
    },
    SET_FirstName: (state, data) => {
      state.FirstName = data;
      window.sessionStorage.setItem("FirstName", data);
    },
    SET_LastName: (state, data) => {
      state.LastName = data;
      window.sessionStorage.setItem("LastName", data);
    },
    SET_Token: (state, data) => {
      state.Token = data;
      window.sessionStorage.setItem("Token", data);
    },
  },
  actions: {
  },
  modules: {
  }
})
