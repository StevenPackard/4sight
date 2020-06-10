<template>
  <div class="list-component col-3 border list-tall bg-info m-2">
    <h5 v-if="!listForm">{{list.title}}</h5>
    <form
      v-if="listForm"
      class="form-inline justify-content-center col-12 my-2"
      @submit.prevent="editList"
    >
      <input
        class="form-control col-lg-3 mx-2"
        type="text"
        placeholder="title"
        v-model="list.title"
        required
      />
      <button class="btn btn-warning" type="submit">edit</button>
    </form>
    <div class="dropdown">
      <a
        class="btn btn-secondary dropdown mb-1"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >...</a>

      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a class="dropdown-item" @click="taskForm = !taskForm" href="#">Add Task</a>
        <a class="dropdown-item" @click="listForm = !listForm" href="#">Edit</a>
        <a class="dropdown-item" @click="deleteList" href="#">Delete List</a>
      </div>
    </div>
    <form
      class="form-inline justify-content-center col-12 my-2"
      v-if="taskForm"
      @submit.prevent="addTask"
    >
      <input
        class="form-control col-lg-8 mx-2"
        type="text"
        placeholder="title"
        v-model="newTask.title"
        required
      />
      <button class="btn btn-success" type="submit">+</button>
    </form>
    <div class="row">
      <task v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>


<script>
import Task from "@/components/TaskComponent";
export default {
  name: "list-component",
  mounted() {
    this.$store.dispatch("getTasksByListId", this.list.id);
  },
  data() {
    return {
      taskForm: false,
      newTask: {
        listId: this.list.id
      },
      listForm: false
    };
  },
  computed: {
    tasks() {
      // return this.$store.state.tasks.filter(t => t.listId == this.list.id);
      return this.$store.state.tasks[this.list.id];
    }
  },
  methods: {
    addTask() {
      this.$store.dispatch("addTask", { ...this.newTask });
      this.newTask = {
        listId: this.list.id
      };
      this.taskForm = false;
    },
    deleteList() {
      this.$store.dispatch("deleteList", this.list);
    },
    editList() {
      this.$store.dispatch("editList", this.list);
      this.listForm = false;
    }
  },
  components: {
    Task
  },
  props: ["list"]
};
</script>


<style scoped>
.list-tall {
  min-height: 40vh;
}
</style>