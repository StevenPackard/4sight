<template>
  <div class="boards container-fluid">
    <div class="row justify-content-center">
      <form class="form-inline justify-content-center col-9" @submit.prevent="addBoard">
        <input
          class="form-control wide"
          type="text"
          placeholder="title"
          v-model="newBoard.title"
          required
        />
        <input
          class="form-control wide"
          type="text"
          placeholder="description"
          v-model="newBoard.description"
        />
        <button class="btn btn-success" type="submit">Create Board</button>
      </form>
    </div>WELCOME TO THE BOARDS!!!
    <board v-for="board in boards" :key="board.id" :board="board" />
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
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
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