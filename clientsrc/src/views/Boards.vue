<template>
  <div class="boards bg-blend-secondary-marble full-screen container-fluid">
    <div class="row bg-transparent">
      <div class="col-12">
        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
          <div class="btn-group show site-font" role="group">
            <button
              id="btnGroupDrop1"
              type="button"
              class="btn btn-lg mt-5 bg-primary text-light dropdown-toggle box-hover"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            >Create New Board</button>
            <div
              class="dropdown-menu bg-primary border px-3"
              aria-labelledby="btnGroupDrop1"
              x-placement="bottom-start"
              style="position: absolute; transform: translate3d(0px, 45px, 0px); top: 0px; left: 0px; will-change: transform;"
            >
              <form @submit.prevent="addBoard" class="w-100">
                <input
                  type="text"
                  class="w-100 p-2 border-0 bg-primary text-white"
                  placeholder="Enter Title For Board"
                  v-model="newBoard.title"
                  required
                />
                <textarea
                  type="text"
                  class="bg-primary border rounded text-light form-text"
                  rows="10"
                  cols="40"
                  placeholder="Enter Description..."
                  v-model="newBoard.description"
                />
                <p class="bg-dark">
                  <button
                    class="btn text-light box-hover bg-blend-primary btn-block m-1"
                    type="submit"
                  >Create</button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ------------------------------------BOARD BLOCKS GO HERE-------------------------------------------- -->
    <div class="row mt-5 full-screen bg-transparent justify-content-center">
      <div class="col-3" v-for="board in boards" :key="board.id">
        <router-link
          style="text-decoration: none;"
          :to="{name: 'board', params: {boardId: board.id}}"
        >
          <div class="card border p-3 bg-transparent box-hover text-light">
            <img class="card-img-top" />
            <div class="card-body">
              <h4 class="card-title">{{board.title}}</h4>
              <p class="card-text">{{board.description}}</p>
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