<template>
  <div class="comment-component bg-warning rounded border my-1">
    <div class="row">
      <div v-if="!commentForm" class="dropdown mt-1 col-12">
        <a
          @mouseover="commentDetails = true"
          @mouseleave="commentDetails = false"
          class="btn dropdown dropdown-toggle text-dark text-wrap"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          >"{{ comment.title }}"</a
        >

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item" @click="commentForm = !commentForm" href="#"
            >Edit</a
          >
          <a class="dropdown-item" @click="showDeleteCommentAlert" href="#"
            >Delete</a
          >
        </div>
      </div>
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
        <button class="btn btn-success btn-outline-dark" type="submit">
          +
        </button>
      </form>
      <div v-if="commentDetails" class="col text-dark">
        <p class="border-top">{{ comment.creatorEmail }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment-component",
  data() {
    return {
      commentForm: false,
      commentDetails: false,
    };
  },
  computed: {
    isCreator() {
      return this.$store.state.user.email == this.comment.creatorEmail;
    },
  },
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.comment);
    },
    editComment() {
      this.$store.dispatch("editComment", this.comment);
      this.commentForm = false;
    },
    showDeleteCommentAlert() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this comment!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // swal("Comment deleted!", {
          //   icon: "success",
          // });
          this.deleteComment();
        }
      });
    },
  },
  components: {},
  props: ["comment"],
};
</script>

<style scoped></style>
