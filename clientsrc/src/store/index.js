import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'
import { STATES } from "mongoose"

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
    activeBoard: {},
    activeLists: [],
    tasksByList: {

    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, board) {
      state.activeBoard = {}
      state.activeBoard = board
    },
    setActiveLists(state, lists) {
      state.activeLists = lists
    },

    setTasksByList(state, payload) {
      Vue.set(state.tasksByList, payload.listId, payload.tasks)
      // state.tasksByList[payload.listId] = payload.tasks
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
    async getKnownProfiles({ commit },email) {
      
      try {
        let res = await api.get("/profile/" + email,email);
        return res;
      } catch (err) {
        console.error("ER",err)
      }
    },
   async  inviteCollab({ commit, dispatch }, inviteData) {
    try {
      let res = await api.put("profile/" + inviteData.collaborator, inviteData.board);

    } catch (error) {
      console.log(error);
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
    getActiveBoard(context, boardId) {
      api.get('boards/' + boardId)
        .then(res => {
          console.log("in actvieBoard()", res.data);
          context.commit("setActiveBoard", res.data)
          context.dispatch("saveStateToLocal")
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(serverBoard => {
          // dispatch('getBoards')
        })
    },


    //------------------LISTS -------------------------------------
    getListsById(context, boardId) {
      api.get('boards/' + boardId + "/lists").then(res => {
        console.log(res.data);
        context.commit("setActiveLists", res.data)
      })
    },
    addList(context, listData) {
      api.post('lists', listData).then(res => {
        console.log(res.data);
        context.commit("setActiveLists", res.data)
      })
    },
    deleteList(context, listId) {
      api.delete('lists/' + listId).then(res => {
        context.dispatch("getListsById", context.state.activeBoard.id)
      })
    },




    //-------------- End of Lists -----------------------------

    //#endregion


    //#region -- LISTS --
    //  #region -------------- TASKS ---------------------
    addTask({ commit, dispatch }, taskData) {
      api.post('tasks/', taskData).then(res => {
        console.log(res)
        dispatch("getTasksByListId", taskData.list)
      })
    },
    getTasksByListId({ commit }, listId) {
      api.get("lists/" + listId + "/tasks/").then(res => {
        // console.log(res.data);
        commit("setTasksByList", { listId: listId, tasks: res.data })
      })

    },
    deleteTask({ commit, dispatch }, task) {
      api.delete('tasks/' + task.id).then(res => {
        dispatch("getTasksByListId", task.list.id)
      })
    },
    draggedTask({ commit, dispatch, state }, taskData) {
      api.put("tasks/" + taskData.taskId, taskData.newListId).then(res => {
        // console.log(res)
        // let oldListIndex = state.activeLists.findIndex(l=>l.id == taskData.newListId)
        // let oldtaskListIndex = state.activeLists[oldListIndex]
        // console.log(oldtaskListIndex)
        dispatch("getTasksByListId", taskData.oldListId)
        dispatch("getTasksByListId", taskData.newListId.list)
      })
    },

    moveTask({ commit, dispatch }, taskData) {
      api.put("tasks/" + taskData.taskId, taskData.newListId.list).then(res => {
        dispatch("getTasksByListId", taskData.oldListId)
        dispatch("getTasksByListId", taskData.newListId.list)
      })
    },

    ////#region----------------- COMMENTS REGION---------------
    addComment({ commit, dispatch }, commentData) {
      api.post("tasks/" + commentData.taskId + "/comments", commentData.comment).then(res => {
        console.log(res)
        dispatch("getTasksByListId", commentData.listId)
      })
    },
    deleteComment({ commit, dispatch }, obj) {
      // debugger
      api.delete("tasks/" + obj.task.id + "/comments/" + obj.comment_id).then(res => {
        console.log(res)
        dispatch("getTasksByListId", obj.task.list.id)
      })
    },
    // api.put('lists/' + taskData.listId + "/tasks")


    //#endregion
    getStateFromLocal({ commit }) {
      let data = JSON.parse(window.localStorage.getItem("Kanban"));
      if (data) {
        commit("setActiveBoard", data.activeBoard)
      }
    },
    saveStateToLocal({ state }) {
      let save = { activeBoard: state.activeBoard }
      window.localStorage.setItem("Kanban", JSON.stringify(save))
    },
  }
})




