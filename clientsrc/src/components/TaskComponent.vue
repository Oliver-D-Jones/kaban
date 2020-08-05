<template>
  <div class="task col-12">
    <div class="row">
      <div class="col">{{taskData.body}}</div>
      <div class="btn-group col-3">
        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">edit</button>
        <div class="dropdown-menu">
          <a
            v-for="list in lists"
            :key="list.id"
            class="dropdown-item"
            href="#"
            @click="moveTask(list.id)"
          >{{list.title}}</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Separated link</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "task",
  data() {
    return {};
  },
  props: ["taskData"],
  computed: {
    lists() {
      return this.$store.state.activeLists;
    },
  },
  methods: {
    moveTask(listId) {
      console.log("task moved");
      this.$store.dispatch("moveTask", {
        taskId: this.taskData.id,
        newListId: { list: listId },
        oldListId: this.taskData.list,
      });
    },
  },
  components: {},
};
</script>


<style scoped>
v-on: click= "$emit('update')";
</style>