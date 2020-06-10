<template>
  <div class="board container-fluid">
    <div class="row justify-content-center">
      <div class="col-7 text-light">
        <h1 @click="boardForm = !boardForm" v-if="!boardForm">{{board.title}}</h1>
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
          <button class="btn btn-warning" type="submit">edit</button>
        </form>
      </div>
      <div class="col-7">
        <button @click="listForm= !listForm" class="btn btn-success btn-outline-primary">Add list</button>
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
          <button class="btn btn-success" type="submit">Create List</button>
        </form>
      </div>
    </div>
    <div class="row scrolling-wrapper-flexbox mx-2">
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
        boardId: this.$route.params.id
      },
      listForm: false,
      boardForm: false
    };
  },
  methods: {
    addList() {
      this.$store.dispatch("addList", { ...this.newList });
      this.newList = {
        boardId: this.$route.params.id
      };
    },
    editBoard() {
      this.$store.dispatch("editBoard", this.board);
      this.boardForm = false;
    }
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  components: {
    List
  },
  props: ["boardId"]
};
</script>
<style>
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
</style>
