<template>
  <div class="col-4 board my-2">
    <div class="card">
      <router-link class="test" :to="{name: 'ActiveBoard', params: {id: board.id}}">
        <div class="card-body">
          <h4 class="card-title">{{board.title}}</h4>
          <p class="card-text">{{board.description}}</p>
          <p class="card-text">{{new Date(board.createdAt).toLocaleString("en-US")}}</p>
        </div>
      </router-link>
      <button class="btn btn-danger" @click="deleteBoard">Delete Board</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Board",
  methods: {
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.board.id);
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