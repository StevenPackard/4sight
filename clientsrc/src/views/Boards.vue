<template>
  <div class="boards container-fluid">
    <div class="row justify-content-center">
      <form class="form-inline justify-content-center col-12 my-2" @submit.prevent="addBoard">
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
        <button class="btn btn-success" type="submit">Create Board</button>
      </form>
    </div>
    <div class="row">
      <div class="col text-light">
        <h5>{{profile.name}}'s Boards</h5>
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
    // this.$store.dispatch("getCollabBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
    profile() {
      return this.$store.state.user;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    }
  },
  components: {
    Board
  }
};
</script>
<style>
.wide {
  width: 20vw !important;
}
</style>