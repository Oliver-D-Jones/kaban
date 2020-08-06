<template>
  <div class="board container-fluid pt-2 text-light bg-primary list-scroll">
    <div v-if="board.title">
      <div class="row row_top fixed-top">
        <div class="col-3">
          <button
            type="button"
            class="btn btn-outline-danger border rounded shadow text-light font-weight-bold"
            data-toggle="modal"
            data-target="#deleteBoardModal"
          >Delete Board</button>
        </div>
        <div class="col-6 text-center text-shadow">
          <h1>{{board.title}}</h1>
        </div>
        <div class="col-3">
          <button
            type="button"
            class="btn btn-outline-light border rounded shadow font-weight-bold"
            data-toggle="modal"
            data-target="#addListModal"
          >Add A List</button>
        </div>
      </div>

      <div v-if="lists.length>0">
        <div id="list_con" class="bg-primary" style="width:100.5%">
          <List v-for="list in lists" :key="list.id" :listData="list"></List>
        </div>
      </div>
      <div v-else>
        <h1>Start By Making A List</h1>
      </div>
      <div class="modal fade" id="addListModal">
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
      <div class="modal fade" id="deleteBoardModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">New List Title</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              <h2>Are You Sure You Want To Delete This Board?</h2>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-info" @click="deleteBoard">Confirm</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else id="loader">
      <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="spinner-grow text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="spinner-grow text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <h4 style="display:inline">LOADING</h4>
      <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="spinner-grow text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="spinner-grow text-secondary" role="status">
        <span class="sr-only">Loading...</span>
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
      $("#addListModal").modal("hide");
      this.newList.board = this.board.id;
      this.$store.dispatch("addList", this.newList);
      this.$store.dispatch("getListsById", this.board.id);
    },
    deleteBoard() {
      $("#deleteBoardModal").modal("hide");
      this.$store.dispatch("deleteBoard", this.board.id);
      this.$router.push({ name: "boards" });
    },
  },
  beforeMount() {
    let _boardId = this.$router.currentRoute.params.boardId;
    this.$store.dispatch("getActiveBoard", _boardId);
    this.$store.dispatch("getListsById", _boardId);
    this.newList = {};
  },
  props: [],
  components: { List },
};
</script>
<style>
.board {
  /* width: 200%; */
  text-align: left;
  margin-top: 50px;
}
.row_top {
  max-width: 100vw;
  margin-top: 55px;
}
#list_con {
  /* width: 200%; */
  text-align: left;
  margin-top: 52px;
  /* background-color: lightblue; */
  /* overflow-x: scroll; */
}
.list {
  /* min-height: 75vh; */
  max-height: 75vh;
  overflow-y: scroll;
}

.list-scroll {
  width: auto;
  white-space: nowrap;
  overflow-x: auto;
}

.list-scroll::-webkit-scrollbar {
  width: 2px;
}
.list-scroll::-webkit-scrollbar-track {
  background: rgb(120, 120, 5 0.5);
  border-radius: 10%;
}
.list-scroll::-webkit-scrollbar-thumb {
  width: 4px;
  height: 5px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 5px;
}
</style>
