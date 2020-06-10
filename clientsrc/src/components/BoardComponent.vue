<template>
  <div class="col-4 board my-2">
    <div class="card bg-light">
      <router-link class="test" :to="{name: 'ActiveBoard', params: {id: board.id}}">
        <div class="card-body">
          <h4 class="card-title">{{board.title}}</h4>
          <p class="card-text">{{board.description}}</p>
          <p class="card-text">{{new Date(board.createdAt).toLocaleString("en-US")}}</p>
        </div>
      </router-link>
      <div class="row justify-content-center mb-2">
        <button class="btn btn-danger mr-2 col-5" @click="deleteBoard">Delete Board</button>
        <button @click="editForm = !editForm" class="btn btn-warning ml-2 col-5">edit</button>
      </div>
      <div class="row">
        <form
          v-if="editForm"
          class="form-inline justify-content-center col-12 my-2"
          @submit.prevent="editBoard"
        >
          <input
            class="form-control col-lg-3 mx-2"
            type="text"
            placeholder="title"
            v-model="board.title"
            required
          />
          <input
            class="form-control col-lg-3 mx-2"
            type="text"
            placeholder="description"
            v-model="board.description"
          />
          <button class="btn btn-success" type="submit">+</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Board",
  data() {
    return {
      editForm: false
    };
  },
  methods: {
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.board.id);
    },
    editBoard() {
      this.$store.dispatch("editBoard", this.board);
      this.editForm = false;
    }
  },
  props: ["board"]
};
</script>

<style>
.test {
  color: black;
}
.test:hover {
  text-decoration: none;
}
</style>