<template>
  <div class="boards container-fluid">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="addBoard">
          <input type="text" placeholder="title" v-model="newBoard.title" required />
          <input type="text" placeholder="description" v-model="newBoard.description" />
          <button class="btn btn-dark btn-sm" type="submit">Create New Board</button>
        </form>
      </div>
    </div>
    <div class="row mt-2 justify-content-center">
      <div class="col-3" v-for="board in boards" :key="board.id">
        <router-link style="text-decoration: none;" :to="{name: 'board', params: {boardId: board.id}}">
          <div class="card border shadow" @click="setActiveBoard(board.id)">
            <img src class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">Title: {{board.title}}</h5>
              <p class="card-text">Description: {{board.description}}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    setActiveBoard(id) {
      this.$store.dispatch("getActiveBoard", id);
      // router.push({name: 'board', params:{ boardId: board.id}})

      
    },
  },
};
</script>
<style>
.board_link{
background-color: black

}
</style>