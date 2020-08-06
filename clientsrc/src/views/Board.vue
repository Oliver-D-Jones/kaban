<template>
  <div
    class="board container-fluid pt-2 text-light bg-primary list-scroll"
    id="x-scroll"
    @mousewheel.prevent="scrollEvent()"
  >
    <div v-if="board.title">
      <div class="row row_top fixed-top justify-content-between align-items-center px-2 py-1">
        <div class="col-2">
          <button
            type="button"
            class="btn btn-outline-light border rounded shadow font-weight-bold"
            data-toggle="modal"
            data-target="#addListModal"
          >Add A List</button>
          <button
            type="button"
            class="btn btn-outline-light border rounded shadow font-weight-bold"
            data-toggle="modal"
            data-target="#inviteCollabModal"
          >Add a Collaborator</button>
        </div>
        <div class="col text-center text-shadow">
          <h1>{{board.title}}</h1>
        </div>
        <div class="col-2 d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-outline-danger border rounded shadow text-light font-weight-bold mx-0"
            data-toggle="modal"
            data-target="#deleteBoardModal"
          >Delete Board</button>
        </div>
      </div>

      <div class="row mt-space flex-column" v-if="lists.length>0">
        <!-- Lists drop in here -->
        <div>
          <List v-for="list in lists" :key="list.id" :listData="list" class="col-12"></List>
        </div>
      </div>
      <div v-else>
        <h1>Start By Making A List</h1>
      </div>

      <!-- ---------------------------------------NEW LIST MODAL------------------------------------------------- -->
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

      <!-- -----------------------------------DELETE MODAL--------------------------------------- -->
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
      <!-- --------------------------ADD COLLAB MODAL---------------------------------------------------- -->
      <div class="modal fade" id="inviteCollabModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">invite Collaborator</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              <input v-model="collaborator" type="text" class="form-control" />
              <small>enter the email of the Collaborator you would like to invite</small>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-info" @click="inviteCollaborator">invite</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
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
      collaborator: "",
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
  mounted() {
    document.addEventListener("scroll", this.scrollEvent);
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

    inviteCollaborator() {
      $("#inviteCollabModal").modal("hide");
      let invite = {
        collaborator: this.collaborator,
        board: this.board,
      };
      this.$store.dispatch("inviteCollab");
    },

    scrollEvent() {
      let dy = event.deltaY;
      let dx = event.deltaX;
      let direction = dy;
      Math.abs(dx) > Math.abs(dy) ? (direction = dx) : (direction = dy);
      window.document.getElementById("x-scroll").scrollBy(direction / 2, 0);
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
.test-box {
  height: 50px;
  width: 50px;
  background-color: red;
}

.board {
  /* width: 200%; */
  text-align: left;
  margin-top: 50px;
}
.row_top {
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

.mt-space {
  margin-top: 5.5em;
}

.list-scroll {
  height: 93vh;
  width: auto;
  white-space: nowrap;
  overflow-x: auto;
}

.list-scroll::-webkit-scrollbar {
  position: bottom;

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
