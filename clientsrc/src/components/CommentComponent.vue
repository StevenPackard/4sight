<template>
  <li class="comment-component comment-wide bg-secondary border my-1">
    <h5 v-if="!commentForm">{{comment.title}}</h5>
    <form
      class="form-inline justify-content-center col-12 my-2"
      v-if="commentForm"
      @submit.prevent="editComment"
    >
      <input
        class="form-control col-lg-8 mx-2"
        type="text"
        placeholder="title"
        v-model="comment.title"
        required
      />
      <button class="btn btn-success" type="submit">+</button>
    </form>
    <div class="dropdown">
      <a
        class="btn btn-secondary dropdown mb-1 bg-primary"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >...</a>

      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a class="dropdown-item" @click="commentForm = !commentForm" href="#">Edit</a>
        <a class="dropdown-item" @click="deleteComment" href="#">Delete</a>
      </div>
    </div>
  </li>
</template>


<script>
export default {
  name: "comment-component",
  data() {
    return {
      commentForm: false
    };
  },
  computed: {},
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.comment);
    },
    editComment() {
      this.$store.dispatch("editComment", this.comment);
      this.commentForm = false;
    }
  },
  components: {},
  props: ["comment"]
};
</script>


<style scoped>
</style>