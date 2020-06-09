<template>
  <div class="board container">
    <div class="row justify-content-center">
      <div class="col-7">
        <h1>{{board.title}}</h1>
      </div>
      <div class="col-7">
        <button @click="listForm= !listForm" class="btn btn-outline-success">Add list</button>
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
    <div class="row justify-content-center">
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
      listForm: false
    };
  },
  methods: {
    addList() {
      this.$store.dispatch("addList", { ...this.newList });
      this.newList = {
        boardId: this.$route.params.id
      };
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
