<template>
  <li class="comment-component col-12 bg-secondary border my-1">
    <h5>{{comment.title}}</h5>
    <button class="btn btn-danger" @click="deleteComment">Delete Comment</button>
  </li>
</template>


<script>
export default {
  name: "comment-component",
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.comment);
    }
  },
  components: {},
  props: ["comment"]
};
</script>


<style scoped>
</style>