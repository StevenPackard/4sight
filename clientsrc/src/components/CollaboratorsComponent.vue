<template>
  <div class="collab-component bg-warning border my-1">
    <div class="row">
      <div class="dropdown mt-1 col-12">
        <a
          class="btn dropdown dropdown-toggle text-dark"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          >{{ collab }}</a
        >
        <div
          v-if="isCreator || isSameName"
          class="dropdown-menu"
          aria-labelledby="dropdownMenuLink"
        >
          <a class="dropdown-item" @click="showDeleteCollabAlert" href="#"
            >Delete</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "collab-component",
  data() {
    return {};
  },

  computed: {},
  methods: {
    deleteCollab() {
      let newPayload = {
        collab: this.collab,
        boardId: this.boardId,
      };
      this.$store.dispatch("deleteCollab", newPayload);
    },
    showDeleteCollabAlert() {
      swal({
        title: "Are you sure?",
        text:
          "Once removed, this collaborator will no longer be able to see this board!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Collaborator removed!", {
            icon: "success",
          });
          this.deleteCollab();
        }
      });
    },
  },
  components: {},
  computed: {
    isCreator() {
      return this.$store.state.user.email == this.board.creatorEmail;
    },
    isSameName() {
      return this.$store.state.user.email == this.collab;
    },
  },
  props: ["collab", "boardId", "board"],
};
</script>

<style scoped></style>
