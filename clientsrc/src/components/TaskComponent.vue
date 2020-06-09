<template>
  <div class="task-component col-12 border-top border-bottom">
    <h3>{{task.title}}</h3>
    <button class="btn btn-success" @click="commentForm = !commentForm">Add Comment</button>
    <form
      class="form-inline justify-content-center col-12 my-2"
      v-if="commentForm"
      @submit.prevent="addComment"
    >
      <input
        class="form-control col-lg-8 mx-2"
        type="text"
        placeholder="title"
        v-model="newComment.title"
        required
      />
      <button class="btn btn-success" type="submit">+</button>
    </form>
    <div class="row">
      <ol>
        <comment v-for="comment in comments" :key="comment.id" :comment="comment" />
      </ol>
    </div>
  </div>
</template>


<script>
import Comment from "@/components/CommentComponent";
export default {
  name: "task-component",
  data() {
    return {
      commentForm: false,
      newComment: {
        taskId: this.task.id,
        listId: this.task.listId
      }
    };
  },
  computed: {
    comments() {
      return this.task.comments;
    }
  },
  methods: {
    addComment() {
      this.$store.dispatch("addComment", { ...this.newComment });
      this.newComment = {
        taskId: this.task.id,
        listId: this.task.listId
      };
      this.commentForm = false;
    }
  },
  components: {
    Comment
  },
  props: ["task"]
};
</script>


<style scoped>
</style>