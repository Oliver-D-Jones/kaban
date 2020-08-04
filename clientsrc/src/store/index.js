import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state,board){
      state.activeBoard = board
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    getActiveBoard({ commit, dispatch }, boardId) {
      api.get('boards/'+boardId)
        .then(res => {
          console.log(res.data);
          commit("setActiveBoard",res.data)
          dispatch("saveStateToLocal")
        })
    },

    //#endregion
    getStateFromLocal({ commit }) {
      let data = JSON.parse(window.localStorage.getItem("Kanban"));
      if (data) {
        commit("setActiveBoard", data.activeBoard)
      }
    },
    saveStateToLocal({state}) {
      let save = { activeBoard: state.activeBoard }
      window.localStorage.setItem("Kanban", JSON.stringify(save))
    },

    //#region -- LISTS --



    //#endregion
  }
})
