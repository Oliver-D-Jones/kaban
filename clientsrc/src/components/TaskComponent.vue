<template>
  <div class="task col-12">
    <div class="row">
      <div
        data-toggle="collapse"
        :data-target="'#comment-'+taskData.id"
        class="col"
      >{{taskData.body}}</div>
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
          <div class="dropdown-divider border"></div>
          <a class="dropdown-item text-warning" href="#" @click="deleteTask">Delete Task</a>
        </div>
      </div>

      <div :id="'comment-'+taskData.id" class="collapse col-12">
        <Comments v-for="comment in comments" :key="comment.id" :commentData="comment" :taskData="taskData"></Comments>
        <input v-model="newCommentBody" type="text" class="col-10" />
        <button class="col-4" @click="addComment">+</button>
      </div>

    </div>
  </div>
</template>


<script>
import Comments from "./CommentComponent";
export default {
  name: "task",
  data() {
    return {
      newCommentBody: "",
    };
  },
  props: ["taskData"],
  computed: {
    comments() {
      return this.taskData.comments;
    },
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
        oldListId: this.taskData.list.id,
      });
    },
    deleteTask() {
      this.$store.dispatch("deleteTask",this.taskData)
    },
    addComment() {
      this.$store.dispatch("addComment", {
        taskId: this.taskData.id,
        comment: { body: this.newCommentBody },
        listId: this.taskData.list.id,
      });
      this.newCommentBody = "";
    },
  },
  components: { Comments },
};
</script>


<style scoped>
</style>