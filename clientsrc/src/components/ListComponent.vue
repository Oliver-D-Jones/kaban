<template>
  <div class="list bg-dark border mr-3 py-1" v-on:drop="drop" v-on:dragover="allowDrop">
    <div class="container-fluid" >
      <div class="row justify-content-between">
        <div class="col-6">
          <button
            class="btn btn-outline-warning"
            v-if="user.email == listData.creatorEmail"
            data-toggle="modal"
            :data-target="'#deleteListModal'+ this.listData.id"
          >Delete List</button>
        </div>

        <div class="col-6 text-right">
          <button
            class="btn btn-info"
            data-toggle="collapse"
            :data-target="'#list-' + listData.id"
          >Add Task</button>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12 pt-1 bg-primary">
          <h5 class="text-wrap">{{listData.title}}</h5>
        </div>
        <div :id="'list-' + listData.id" class="w-100 mt-1 bg-secondary collapse">
          <input
            v-model="taskInput"
            type="text"
            class="mx-0 w-100"
            placeholder=" Enter Task Title..."
          />
          <button class="btn btn-info btn-sm ml-2" @click="addTask">+</button>
        </div>
      </div>
    </div>

    <TaskComponent
      v-for="(task,index) in tasks"
      :key="task.id"
      :index="index"
      v-on:update="textEdited()"
      :taskData="task"
    ></TaskComponent>

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
  </div>
</template>


<script>
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
      data = JSON.parse(data)
      this.moveTask(data);
      
    },
    moveTask(data) {
      this.$store.dispatch("draggedTask", {
        taskId: data.taskId,
        newListId: { list: this.listData.id },
        oldListId: { list: data.oldListId },
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
      $("#deleteListModal" + this.listData.id).modal("hide");
      this.$store.dispatch("deleteList", this.listData.id);
    },
  },
  components: { TaskComponent },
  props: ["listData"],
};
</script>


<style scoped>
.list {
  width: 25rem;
  display: inline-block;
}
::-webkit-scrollbar {
  display: none;
}
</style>