import { createStore } from 'vuex'

export default createStore({
  state: {
   username:JSON.parse(window.localStorage.getItem('user')).username,
   user_id:JSON.parse(window.localStorage.getItem('user')).user_id,
    token:false,
    productDetail:JSON.parse(window.localStorage.getItem('productDetail')),
    phone:JSON.parse(window.localStorage.getItem('phone')),
    token_pass:false

  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
