 
import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import user from "./modules/user";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user
  },
  plugins: [
    createPersistedState({
    //   storage: {
    //     getItem: (key) => uni.getStorageSync(key),
    //     setItem: (key, value) => uni.setStorageSync(key, value),
    //     removeItem: (key) => uni.removeStorageSync(key),d
    //   },
      storage:window.sessionStorage,
      paths: ["user"]
    }),
  ],
});
export default store;