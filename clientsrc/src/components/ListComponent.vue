<template>
  <div
    class="list border rounded bg-rotate align-top mr-3 py-1 overflow-show"
    v-on:drop="drop"
    v-on:dragover="allowDrop"
  >
    <div class="modal fade" :id="'deleteListModal'+ this.listData.id">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Confirm</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <h2>Are You Sure You Want To Delete This List?</h2>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-info" @click="deleteList">Confirm</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div class>
      <div class="row justify-content-between">
        <div class="m-0">
          <button
            class="btn text-light ml-3 mb-2 box-hover"
            v-tooltip:top="'Add a New Task'"
            data-toggle="collapse"
            :data-target="'#list-' + listData.id"
          >
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
              class="bi bi-file-plus"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"
              />
              <path
                fill-rule="evenodd"
                d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
              />
            </svg>
          </button>
        </div>
        <div class>
          <button
            class="btn text-light mr-3 box-hover"
            v-tooltip:top="'Delete this List'"
            v-if="user.email == listData.creatorEmail"
            @click="deleteList"
          >
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
              class="bi bi-x"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12 pt-1 site-font">
          <h4 class="text-center text-capitalize pb-2">{{listData.title}}</h4>
        </div>
        <div :id="'list-' + listData.id" class="w-75 ml-4 mt-1 collapse">
          <input
            v-model="taskInput"
            type="text"
            class="mx-0 rounded w-100"
            placeholder=" Enter Task Title..."
          />
          <button class="btn bg-blend-secondary box-hover btn-sm ml-2" @click="addTask">
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
              class="bi bi-check2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <transition-group name="task-fade">
      <TaskComponent
        v-for="(task,index) in tasks"
        :key="task.id"
        :index="index"
        v-on:update="textEdited()"
        :taskData="task"
      ></TaskComponent>
    </transition-group>
  </div>
</template>


<script>
// import NotificationService from "../../../services/NotificationService";
import TaskComponent from "./TaskComponent";
export default {
  name: "list",
  data() {
    return {
      taskInput: "",
    };
  },
  mounted() {
    this.getTasksById();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    tasks() {
      return this.$store.state.tasksByList[this.listData.id];
    },
  },
  methods: {
    allowDrop() {
      event.preventDefault();
    },
    drop() {
      event.preventDefault();
      let data = event.dataTransfer.getData("text/plain");
      data = JSON.parse(data);
      this.moveTask(data);
    },
    moveTask(data) {
      // debugger;
      this.$store.dispatch("draggedTask", {
        taskId: data.taskId,
        newListId: { list: this.listData.id },
        oldListId: data.oldListId,
      });
    },
    addTask() {
      let taskData = { body: this.taskInput, list: this.listData.id };
      this.$store.dispatch("addTask", taskData);
      this.taskInput = "";
      $("#list-" + this.listData.id).collapse("toggle");
    },
    getTasksById() {
      this.$store.dispatch("getTasksByListId", this.listData.id);
    },
    textEdited() {
      console.log("emit heard");
      this.getTasksById();
    },
    deleteList() {
      // $("#deleteListModal" + this.listData.id).modal("hide");
      this.$store.dispatch("deleteList", this.listData.id);
    },
  },
  components: { TaskComponent },
  props: ["listData"],
  directives: {
    tooltip: function (element, binding) {
      $(element).tooltip({
        title: binding.value,
        placement: binding.arg,
        trigger: "hover",
      });
    },
  },
};
</script>


<style scoped>
.overflow-show {
  overflow-y: visible;
}
.list {
  transition: height 0.3s ease;
}

.bg-rotate {
  background-color: rgba(255, 255, 255, 0.05);
}

.modal {
  position: relative;
  z-index: 10;
}
.list {
  width: 25rem;
  display: inline-block;
}
::-webkit-scrollbar {
  display: none;
}

.task-fade-enter-active {
  transition: all 0.3s ease;
}
.task-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.task-fade-enter,
.task-fade-leave-to {
  transform: translatey(-10px);
  opacity: 0;
}
</style>