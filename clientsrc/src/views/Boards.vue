<template>
  <div class="boards container-fluid">
    <div class="row justify-content-center">
      <form
        class="form-inline justify-content-center col-12 my-2"
        @submit.prevent="addBoard"
      >
        <input
          class="form-control col-lg-3 mx-2"
          type="text"
          placeholder="title"
          v-model="newBoard.title"
          required
        />
        <input
          class="form-control col-lg-3 mx-2"
          type="text"
          placeholder="description"
          v-model="newBoard.description"
        />
        <button
          class="btn btn-success btn-outline-dark mt-md-0 mt-3"
          type="submit"
        >
          Create Board
        </button>
      </form>
    </div>
    <div class="row">
      <div v-if="profileEdit" class="col">
        <form
          class="form-inline justify-content-center col-12 my-2"
          @submit.prevent="editProfile"
        >
          <input
            class="form-control col-lg-3 mx-2"
            type="text"
            placeholder="title"
            v-model="profile.name"
            required
          />
          <button
            type="submit"
            class="btn btn-warning btn-outline light text-dark"
          >
            edit
          </button>
        </form>
      </div>
      <div
        @click="profileEdit = !profileEdit"
        v-if="!profileEdit"
        class="col text-dark action my-4"
      >
        <h3>{{ profile.name }}'s Boards</h3>
      </div>
    </div>
    <div class="row">
      <board v-for="board in boards" :key="board.id" :board="board" />
    </div>
  </div>
</template>

<script>
import Board from "@/components/BoardComponent.vue";
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: "",
      },
      profileEdit: false,
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
    profile() {
      return this.$store.state.user;
    },
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    editProfile() {
      this.$store.dispatch("editProfile", this.profile);
      this.profileEdit = false;
    },
  },
  components: {
    Board,
  },
};
</script>
<style>
.wide {
  width: 20vw !important;
}
</style>
