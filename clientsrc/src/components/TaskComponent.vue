<template>
  <div class="task-component col-12 border-top border-bottom">
    <h3 v-if="!taskForm">{{task.title}}</h3>
    <form
      class="form-inline justify-content-center col-12 my-2"
      v-if="taskForm"
      @submit.prevent="editTask"
    >
      <input
        class="form-control col-lg-8 mx-2"
        type="text"
        placeholder="title"
        v-model="task.title"
        required
      />
      <button class="btn btn-success" type="submit">+</button>
    </form>
    <div class="dropdown">
      <a
        class="btn btn-secondary dropdown"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >options</a>

      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a class="dropdown-item" @click="commentForm = !commentForm" href="#">Add Comment</a>
        <a class="dropdown-item" @click="taskForm = !taskForm" href="#">Edit</a>
        <a class="dropdown-item" @click="deleteTask" href="#">Delete Task</a>
      </div>
    </div>
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
      <ol class="col-10 offset-1">
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
      },
      taskForm: false
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
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.task);
    },
    editTask() {
      this.$store.dispatch("editTask", this.task);
      this.taskForm = false;
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