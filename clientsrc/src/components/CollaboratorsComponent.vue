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
        >{{collab}}</a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item" @click="deleteCollab" href="#">Delete</a>
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
        boardId: this.boardId
      };
      this.$store.dispatch("deleteCollab", newPayload);
    }
  },
  components: {},
  props: ["collab", "boardId"]
};
</script>


<style scoped>
</style>