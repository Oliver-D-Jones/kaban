<template>
  <div class="comment">
    <p style="display:inline" class="mr-5">
    {{commentData.body}}
    </p>
    <span v-if="commentData.creatorEmail==this.$store.state.user.email">
      <!-- <button class="btn btn-sm" @click="editComment">Edit</button> -->
      <button class="btn btn-sm btn-info" @click="deleteComment">X</button>
    </span>
  </div>
</template>


<script>
export default {
  name: "comment",
  data() {
    return {};
  },
  props: ["commentData", "taskData"],
  computed: {},
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
</style>