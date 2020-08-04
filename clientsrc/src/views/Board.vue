<template>
  <div class="board container-fluid">
    <div class="row justify-content-center" v-if="board.title">
      <div class="col-8">
        <h1>{{board.title}}</h1>
        {{board.id}}
      </div>
      <div class="col-4">
        <button class="btn btn-outline-dark btn-sm">Add A List</button>
      </div>
      <!-- <div class="col" v-for="list in lists" :key="list.id">{{list}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "board",
  computed: {
    board() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      // if (!this.$store.activeBoard.title) {
      //   // this.$store.dispatch("getStateFromLocal");
      //   return this.$store.state.activeBoard;
      // }
       return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.dispatch("getListsById", this.board.id);
    },
  },
  props: [],
};
</script>
