<template>
  <div class="list col-4 bg-light border">
    <div class="row">
      <div class="col bg-primary">{{listData.title}}</div>
      <!-- Add task toggle button -->
      <button
        class="col-1 rounded-0 btn btn-info py-1"
        data-toggle="collapse"
        :data-target="'#list-' + listData.id"
      >+</button>
      <!-- Delete list button -->
      <button
        class="col-1 rounded-0 btn btn-danger py-1"
        v-if="user.email == listData.creatorEmail"
      >x</button>
      <!-- add task Dropdown -->
      <div :id="'list-' + listData.id" class="col-12 bg-secondary collapse">
        <input v-model="taskInput" type="text" class="mx-0" />
        <button class="btn" @click="addTask">+</button>
      </div>
      <div class="col-12">
        <div class="row">
          <div v-for="task in tasks" :key="task.id" class="col-12">a task</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
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
  },
  components: {},
  props: ["listData"],
};
</script>


<style scoped>
</style>