import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Boards from '../views/Boards.vue'
import Board from '../views/Board.vue'
import { authGuard } from "@bcwdev/auth0-vue"
import store from "../store"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/boards',
      name: 'boards',
      component: Boards,
      beforeEnter: authGuard
    },
    {
      path: '/boards/:boardId',
      name: 'board',
      component: Board,
      beforeEnter: setBoard,
    },
    {
      path: "*",
      redirect: '/'
    }
  ],

})
async function setBoard(to, from, next) {
  try {
    console.log(to.params.boardId)
    await store.dispatch("getActiveBoard", to.params.boardId);
    next();
  } catch (error) {
    console.log(error)
  }
}