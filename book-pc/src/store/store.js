import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from "vuex-persistedstate"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      avatar: '',
      desc: '',
      email: '',
      nickname: '',
      username: '',
      password: ''
    }
  },
  mutations: {
    UPDATE_INFO (state,info) {
      state.userInfo = info
    },
    EDIT_PASSWORD (state,password) {
      state.userInfo.password = password
    }
  },
  plugins: [
    persistedstate({
      storage: {
        getItem: key => sessionStorage.getItem(key),
        setItem: (key, value) =>
          sessionStorage.setItem(key, value),
        removeItem: key => sessionStorage.removeItem(key)
      }
    })
  ]
})

export default store
