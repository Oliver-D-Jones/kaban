<template>
  <div class="task col-12 mt-1 pt-3 border-top">
    <div v-on:dragstart="dragTask()" draggable="true" class="row">
      <h5 class="col-10 mb-0 site-font">
        <svg
          width="1.5em"
          height="1.5em"
          viewBox="0 0 16 16"
          class="bi bi-grip-horizontal"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
          />
        </svg>
        {{taskData.body}}
      </h5>

      <div class="btn-group drop-left">
        <button
          type="button"
          v-tooltip:left="'Move the task to Another List or delete'"
          class="btn box-hover btn-primary dropdown-toggle"
          data-toggle="dropdown"
        ></button>

        <div class="dropdown-menu bg-primary rounded">
          <a
            v-for="list in lists"
            :key="list.id"
            class="dropdown-item"
            href="#"
            @click="moveTask(list.id)"
          >{{list.title}}</a>

          <div class="dropdown-divider border"></div>
          <a class="dropdown-item text-danger" href="#" @click="deleteTask">Delete Task</a>
        </div>
        <button
          class="btn btn-sm text-light box-hover bg-primary px-2"
          v-tooltip:right="'Leave a comment'"
          data-toggle="collapse"
          :data-target="'#comment-'+taskData.id"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-chat-left-dots"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path
              d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
            />
          </svg>
        </button>
      </div>
      <div :id="'comment-' + taskData.id" class="collapse mt-1 w-75">
        <textarea
          v-model="newCommentBody"
          type="text"
          class="w-100 bg-transparent"
          placeholder=" Enter Comment..."
        />
        <button
          class="btn bg-blend-secondary box-hover text-light align-top mt-1 w-25"
          @click="addComment"
        >
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
      <div class="row">
        <Comments
          v-for="comment in comments"
          :commentData="comment"
          :taskData="taskData"
          :key="comment.id"
        />
      </div>

      <!-- data-toggle="collapse" :data-target="'#comment-'+taskData.id" -->
    </div>
  </div>
</template>


<script>
// import noteSvc from "../../../services";
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
    dragTask() {
      console.log("dragged task");
      let data = { taskId: this.taskData.id, oldListId: this.taskData.list.id };

      event.dataTransfer.setData("text/plain", JSON.stringify(data));
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


<style scoped>
</style>