<template>
  <div
    class="board container-fluid pt-2 text-light bg-blend-dark-marble full-screen"
    @mousewheel.prevent="scrollEvent()"
  >
    <div v-if="board.title">
      <div class="row justify-content-between align-items-center px-2 py-1">
        <div class="col-2">
          <button
            v-tooltip:bottom="'Add a New List'"
            type="button"
            class="btn border rounded box-hover font-weight-bold text-light"
            data-toggle="modal"
            data-target="#addListModal"
          >
            <!-- add list icons -->
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
              class="bi bi-plus"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
              />
              <path
                fill-rule="evenodd"
                d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
              />
            </svg>
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
              class="bi bi-file-earmark-text"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 1h5v1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6h1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z"
              />
              <path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 0 1 9 4.5z" />
              <path
                fill-rule="evenodd"
                d="M5 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
          <button
            v-tooltip:bottom="'Add a Collaborator'"
            type="button"
            class="btn border rounded box-hover text-light font-weight-bold"
            data-toggle="modal"
            data-target="#inviteCollabModal"
          >
            <!-- Add collab icons -->
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
              class="bi bi-plus"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
              />
              <path
                fill-rule="evenodd"
                d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
              />
            </svg>
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
              class="bi bi-person"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
              />
            </svg>
          </button>
        </div>
        <div class="col text-center site-font">
          <h1>{{board.title}}</h1>
        </div>
        <div class="col-2 d-flex justify-content-end">
          <button
            v-tooltip:bottom="'Delete this Board'"
            type="button"
            class="btn btn-outline-danger border rounded box-hover text-light font-weight-bold mx-0"
            data-toggle="modal"
            data-target="#deleteBoardModal"
          >
            <!-- TRASH ICON -->
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
              class="bi bi-trash"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div id="x-scroll" class="row mt-2 list-scroll" v-if="lists.length>0">
        <!-- Lists drop in here -->
        <transition-group name="load-fade">
          <List v-for="list in lists" :key="list.id" :listData="list" class="mx-3"></List>
        </transition-group>
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
              <input
                v-model="collaborator"
                type="text"
                class="form-control"
                placeholder="johndoe@gmail.com"
              />
              <small>enter the email of the Collaborator you would like to invite</small>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-info" @click="inviteCollaborator">Invite</button>
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
      let knownUsers = this.$store.dispatch(
        "getKnownProfiles",
        this.collaborator.trim()
      );
      $("#inviteCollabModal").modal("hide");
      console.log(knownUsers);
      // let invite = {
      //   collaborator: this.collaborator,
      //   board: this.board,
      // };
      // this.$store.dispatch("inviteCollab",invite);
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
  directives: {
    tooltip: function (el, binding) {
      $(el).tooltip({
        title: binding.value,
        placement: binding.arg,
        trigger: "hover",
      });
    },
  },
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
  height: 83vh;
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
  background-color: rgba(255, 255, 255, 0.5);
  width: 4px;
  height: 5px;

  border-radius: 5px;
}

.load-fade-enter-active {
  transition: all 0.5s ease;
}
.load-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.load-fade-enter,
.load-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
