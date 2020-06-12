<template>
  <div v-if="!board.id">
    ...loading
  </div>
  <div v-else class="board container-fluid">
    <div class="row justify-content-center">
      <div class="col-7 text-dark mt-3 mb-2">
        <h1 @click="boardForm = !boardForm" v-if="!boardForm">
          {{ board.title }}
        </h1>
        <form
          v-if="boardForm"
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
          <button class="btn btn-warning btn-outline-dark" type="submit">
            edit
          </button>
        </form>
      </div>
      <div class="col-7">
        <button
          @click="listForm = !listForm"
          class="btn btn-success btn-outline-dark  mb-4"
        >
          Add list Item
        </button>
      </div>
      <div class="col-12">
        <form
          v-if="listForm"
          class="form-inline justify-content-center col-12 my-2"
          @submit.prevent="addList"
        >
          <input
            class="form-control col-lg-3 mx-2"
            type="text"
            placeholder="title"
            v-model="newList.title"
            required
          />
          <button class="btn btn-success btn-outline-dark" type="submit">
            Create List
          </button>
        </form>
      </div>
    </div>
    <div class="row scrolling-wrapper-flexbox mx-2 grow">
      <list v-for="list in lists" :key="list.id" :list="list" />
    </div>
  </div>
</template>

<script>
import List from "@/components/ListComponent";
export default {
  name: "Activeboard",
  mounted() {
    this.$store.dispatch("getActiveBoard", this.$route.params.id);
    this.$store.dispatch("getAllLists", this.$route.params.id);
  },
  data() {
    return {
      newList: {
        boardId: this.$route.params.id,
      },
      listForm: false,
      boardForm: false,
    };
  },
  methods: {
    addList() {
      this.$store.dispatch("addList", { ...this.newList });
      this.newList = {
        boardId: this.$route.params.id,
      };
    },
    editBoard() {
      this.$store.dispatch("editBoard", this.board);
      this.boardForm = false;
    },
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("resetAll");
    next();
  },
  components: {
    List,
  },
};
</script>
<style>
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.grow {
  flex-grow: 1;
}
</style>
