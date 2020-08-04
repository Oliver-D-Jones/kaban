<template>
  <div class="board container-fluid">
    <div class="row justify-content-center" v-if="board.title">
      <div class="col-8">
        <h1>{{board.title}}</h1>
      </div>
      <div class="col-4">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#modal"
        >Add A List</button>
      </div>
    </div>
    <div v-if="lists.length>0" class="row">
      <List v-for="list in lists" :key="list.id" :listData="list"></List>
    </div>
    <div v-else>
      <h1>Start By Making A List</h1>
    </div>

    <div class="modal fade" id="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">New List Title</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <input v-model="newList.title" type="text" name id />
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-info" @click="addList">Create</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "../components/ListComponent";
export default {
  name: "board",
  data: {
    return: {
      newList: null,
    },
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.activeLists;
    },
  },
  methods: {
    addList() {
      this.newList.board = this.board.id;
      this.$store.dispatch("addList", this.newList);
      this.$store.dispatch("getListsById", this.board.id);

      $("#modal").modal("hide");
      console.log(this.newList);
    },
  },
  beforeCreate() {
    let _boardId = this.$router.currentRoute.params.boardId;
    this.$store.dispatch("getActiveBoard", _boardId);
    this.$store.dispatch("getListsById", _boardId);
    this.newList = {};
  },
  props: [],
  components: { List },
};
</script>
