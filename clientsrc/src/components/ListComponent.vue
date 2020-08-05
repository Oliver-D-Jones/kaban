<template>
  <div class="list col-4 bg-light border">
    <h4>{{listData.title}}</h4>
    <button
      class="btn btn-info py-1"
      data-toggle="collapse"
      :data-target="'#list-' + listData.id"
    >Add Task</button>
    <button
      class="btn btn-danger py-1"
      v-if="user.email == listData.creatorEmail"
      data-toggle="modal"
      :data-target="'#deleteListModal'+ this.listData.id"
    >Delete List</button>
    <div :id="'list-' + listData.id" class="col-12 bg-secondary collapse">
      <input v-model="taskInput" type="text" class="mx-0" />
      <button class="btn" @click="addTask">+</button>
    </div>
    <TaskComponent v-for="task in tasks" :key="task.id" v-on:update="textEdited()" :taskData="task"></TaskComponent>
    <div class="modal fade" :id="'deleteListModal'+ this.listData.id" >
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
    $("#deleteListModal"+this.listData.id).modal("hide")
      this.$store.dispatch("deleteList", this.listData.id);
    },
  },
  components: { TaskComponent },
  props: ["listData"],
};
</script>


<style scoped>
</style>