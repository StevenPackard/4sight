<template>
  <div
    dropzone="zone"
    @drop.prevent="moveTaskDrag(list)"
    @dragover.prevent
    class="list-component col-md-2 col-11 border list-tall bg-light opacity my-2 mx-4 d-inline-block rounded shadow"
  >
    <div class="row justify-content-between">
      <form
        v-if="listForm"
        class="form-inline col-12 my-2"
        @submit.prevent="editList"
      >
        <input
          class="form-control col-md-8 mx-2"
          type="text"
          placeholder="title"
          v-model="list.title"
          required
        />
        <button
          class="btn btn-success btn-outline-light text-dark"
          type="submit"
        >
          edit
        </button>
      </form>
      <div
        v-if="!listForm"
        class="dropdown col-12 mr-2 mt-1 shadow border-bottom"
      >
        <a
          class="btn dropdown dropdown-toggle text-dark mb-1"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          >{{ list.title }}</a
        >

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item" @click="taskForm = !taskForm" href="#"
            >Add Task</a
          >
          <a class="dropdown-item" @click="listForm = !listForm" href="#"
            >Edit</a
          >
          <a class="dropdown-item" @click="showDeleteListAlert" href="#"
            >Delete List</a
          >
        </div>
      </div>
    </div>
    <div class="row">
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
        <button
          class="btn btn-success btn-outline-light text-dark"
          type="submit"
        >
          +
        </button>
      </form>
    </div>
    <div class="row tall-row">
      <task
        draggable="true"
        v-for="(task, index) in tasks"
        :key="task.id"
        :task="task"
        :listId="list.id"
        @dragstart="reorderTask(task, index)"
      />
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
        listId: this.list.id,
      },
      listForm: false,
    };
  },
  computed: {
    tasks() {
      // return this.$store.state.tasks.filter(t => t.listId == this.list.id);
      return this.$store.state.tasks[this.list.id];
    },
  },
  methods: {
    addTask() {
      this.$store.dispatch("addTask", { ...this.newTask });
      this.newTask = {
        listId: this.list.id,
      };
    },
    deleteList() {
      this.$store.dispatch("deleteList", this.list);
    },
    editList() {
      this.$store.dispatch("editList", this.list);
      this.listForm = false;
    },
    showDeleteListAlert() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this list!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // swal("List deleted!", {
          //   icon: "success",
          // });
          this.deleteList();
        }
      });
    },
    reorderTask(task, index) {
      console.log(task, index);

      this.$store.dispatch("setItemToMove", {
        task: task,
        oldList: this.list,
      });
    },
    moveTaskDrag(list) {
      console.log(list);
      console.log("dropping Task");
      let task = JSON.parse(event.dataTransfer.getData("data"));
      let moveData = {
        newListId: list.id,
        oldListId: event.dataTransfer.getData("list"),
        taskToMove: task,
      };
      this.$store.dispatch("moveTaskDrag", moveData);
    },
  },
  components: {
    Task,
  },
  props: ["list"],
};
</script>

<style scoped>
.list-tall {
  min-height: 50vh;
}
.tall-row {
  max-height: 100vh;
}
.inline-display {
  display: inline-block;
}
</style>
