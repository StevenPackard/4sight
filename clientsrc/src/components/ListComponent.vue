<template>
  <div class="list-component col-3 border list-tall m-2">
    <h5>{{list.title}}</h5>
    <button class="btn btn-outline-warning" @click="taskForm = !taskForm">Add Task</button>
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
      }
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
      return this.$store.dispatch("addTask", { ...this.newTask });
      this.newTask = {
        listId: this.list.id
      };
      this.taskForm = false;
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
  background-color: rgb(125, 125, 207);
}
</style>