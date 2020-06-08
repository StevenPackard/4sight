<template>
  <div class="col board">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{board.title}}</h4>
        <p class="card-text">{{board.description}}</p>
        <p class="card-text">{{new Date(board.createdAt).toLocaleString("en-US")}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Board",
  props: ["board"]
};
</script>

<style>
</style>