<template>
  <div class="comment col-12 m-0">
    <div class="ml-4">
      <small class="text-secondary">{{nameNoEmail}}</small>
      <small class="text-fade">{{commentData.body}}</small>
      <span v-if="commentData.creatorEmail==this.$store.state.user.email">
        <!-- <button class="btn btn-sm" @click="editComment">Edit</button> -->
        <button class="btn text-light text-right" @click="deleteComment">
          <svg
            width="1em"
            height="1em"
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
      </span>
    </div>
  </div>
</template>


<script>
export default {
  name: "comment",
  data() {
    return {};
  },
  props: ["commentData", "taskData"],
  computed: {
    nameNoEmail() {
      let name = this.commentData.creatorEmail.split("@");
      return name[0];
    },
  },
  methods: {
    editComment() {
      this.$store.dispatch("editComment", {
        id: this.commentData.id,
        body: this.commentData.body,
      });
    },
    deleteComment() {
      this.$store.dispatch("deleteComment", {
        comment_id: this.commentData.id,
        task: this.taskData,
      });
    },
  },
  components: {},
};
</script>


<style scoped>
.text-fade {
  color: rgba(255, 255, 255, 0.5);
}
</style>