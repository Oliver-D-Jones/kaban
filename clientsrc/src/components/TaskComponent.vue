<template>
  <div class="task container-fluid">
    <div class="row mt-1 border">
      <div v-on:dragstart="dragTask(taskData.id)" draggable="true" class="col-10">
        <button
          class="btn btn-sm btn-primary mr-1"
          data-toggle="collapse"
          :data-target="'#comment-'+taskData.id"
        >+</button>
        <div :id="'comment-' + taskData.id" class="w-100 mt-1 bg-primary collapse">
          <textarea
            v-model="newCommentBody"
            type="text"
            class="mx-0 w-100"
            placeholder=" Enter Comment..."
          />
          <button class="btn btn-info btn-sm text-right mb-1" @click="addComment">Add Comment</button>
        </div>
              <div class="col-1 btn-group">
        <button
          type="button"
          class="btn btn-small btn-primary dropdown-toggle"
          data-toggle="dropdown"
        ></button>

        <div class="dropdown-menu bg-primary border rounded">
          <a href="#" class="text-center pl-1">Move Task To Other List</a>
          <div class="dropdown-divider border"></div>

          <a
            v-for="list in lists"
            :key="list.id"
            class="dropdown-item border-bottom"
            href="#"
            @click="moveTask(list.id)"
          >{{list.title}}</a>

          <div class="dropdown-divider border"></div>
          <a class="dropdown-item text-danger" href="#" @click="deleteTask">Delete Task</a>
        </div>
      </div>
        <p>{{taskData.body}}</p>
        <Comments v-for="comment in comments" :commentData="comment" :taskData="taskData" :key="comment.id" />
      </div>

      <!-- data-toggle="collapse" :data-target="'#comment-'+taskData.id" -->


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
  props: ["taskData", "index"],
  computed: {
    comments() {
      return this.taskData.comments;
    },
    lists() {
      return this.$store.state.activeLists;
    },
  },
  methods: {
    dragTask(id) {
      console.log("dragged task", id);
      let data = {taskId:id,oldListId:this.taskData.list.id};

      event.dataTransfer.setData(
        "text/plain", JSON.stringify(data)
      );
    },
    moveTask(listId) {
      console.log("task moved");
      this.$store.dispatch("moveTask", {
        taskId: this.taskData.id,
        newListId: { list: listId },
        oldListId: this.taskData.list.id,
      });
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData);
    },
    addComment() {
      if (!this.newCommentBody.trim()) {
        return "No Comment Given.";
      }
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