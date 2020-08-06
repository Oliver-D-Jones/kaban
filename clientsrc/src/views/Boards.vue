<template>
  <div class="boards container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
          <button type="button" class="btn btn-primary">Create New Board</button>
          <div class="btn-group show" role="group">
            <button
              id="btnGroupDrop1"
              type="button"
              class="btn btn-primary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            ></button>
            <div
              class="dropdown-menu"
              aria-labelledby="btnGroupDrop1"
              x-placement="bottom-start"
              style="position: absolute; transform: translate3d(0px, 45px, 0px); top: 0px; left: 0px; will-change: transform;"
            >
              <form @submit.prevent="addBoard">
                <input type="text" placeholder="title" v-model="newBoard.title" required />
                <input type="text" placeholder="description" v-model="newBoard.description" />
                <button class="btn btn-dark btn-sm" type="submit">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-2 justify-content-center">
      <div class="col-3" v-for="board in boards" :key="board.id">
        <router-link
          style="text-decoration: none;"
          :to="{name: 'board', params: {boardId: board.id}}"
        >
          <div class="card border shadow">
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
  },
};
</script>
<style>
.board_link {
  background-color: black;
}
</style>