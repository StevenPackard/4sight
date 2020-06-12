<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-12 text-dark mt-4">
        <h1 id="v-step-0">Welcome to 4Sight!</h1>
        <p class="mt-3">
          Take any project and break it down to see the progress you make!
        </p>
        <p class="">
          Add Collaborators so that everyone can know how the project is going!
        </p>
      </div>
    </div>
    <div class="row justify-content-center mt-2 mx-2">
      <div
        class="list-component col-md-4 col-lg-2 col-sm-6 col-11 border opacity list-tall bg-light my-2 mx-4 d-inline-block rounded shadow"
      >
        <div class="row justify-content-between">
          <form v-if="listForm" class="form-inline col-12 my-2">
            <input
              class="form-control col-md-8 mx-2"
              type="text"
              placeholder="title"
              v-model="list.title"
              required
            />
            <button
              class="btn btn-success btn-outline-dark"
              @click="listForm = !listForm"
              type="button"
            >
              edit
            </button>
          </form>
          <div
            v-if="!listForm"
            @click="listDescript = !listDescript"
            id="v-step-1"
            class="dropdown col-12 mr-2 mt-1 border-bottom shadow"
          >
            <a
              class="btn dropdown dropdown-toggle text-dark mb-1"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              >Demo List Title</a
            >

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" @click="taskForm = !taskForm" href="#"
                >Add Task</a
              >
              <a class="dropdown-item" @click="listForm = !listForm" href="#"
                >Edit</a
              >
              <a class="dropdown-item" href="#">Delete List</a>
            </div>
          </div>
        </div>
        <div class="row">
          <form
            class="form-inline justify-content-center col-12 my-2"
            v-if="taskForm"
          >
            <input
              class="form-control col-lg-8 mx-2"
              type="text"
              placeholder="title"
              v-model="newTask.title"
              required
            />
            <button
              class="btn btn-success btn-outline-dark "
              @click="taskForm = !taskForm"
              type="button"
            >
              +
            </button>
          </form>
        </div>
        <div class="row tall-row justify-content-center">
          <div class="col-11 border-top border-bottom rounded shadow bg-info">
            <div class="row">
              <div
                @click="taskDescript = !taskDescript"
                v-if="!taskForm1"
                id="v-step-2"
                class="dropdown col-12 mt-1 px-0 v-step-3"
              >
                <a
                  class="btn dropdown dropdown-toggle text-dark"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  >Demo Task</a
                >

                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a
                    class="dropdown-item"
                    @click="commentForm = !commentForm"
                    href="#"
                    >Add Comment</a
                  >
                  <a
                    class="dropdown-item "
                    @click="taskForm1 = !taskForm1"
                    href="#"
                    >Edit</a
                  >
                  <a class="dropdown-item " href="#">Delete Task</a>
                  <a
                    class="dropdown-item "
                    @click="moveTaskForm = !moveTaskForm"
                    href="#"
                    >MoveTask</a
                  >
                </div>
              </div>
            </div>
            <form
              class="form-inline justify-content-center col-12 my-2"
              v-if="taskForm1"
            >
              <input
                class="form-control col-lg-8 mx-2"
                type="text"
                placeholder="title"
                v-model="task.title"
                required
              />
              <button
                class="btn btn-warning btn-outline-dark"
                @click="taskForm1 = !taskForm1"
                type="submit"
              >
                +
              </button>
            </form>
            <form
              class="form-inline justify-content-center col-12 my-2"
              v-if="commentForm"
            >
              <input
                class="form-control col-lg-8 mx-2"
                type="text"
                placeholder="title"
                v-model="newComment.title"
                required
              />
              <button
                class="btn btn-warning btn-outline-dark"
                @click="commentForm = !commentForm"
                type="button"
              >
                +
              </button>
            </form>
            <div class="row justify-content-center" v-if="moveTaskForm">
              <div class="border col-8 bg-secondary my-1">demo list 2</div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="bg-warning border shadow rounded my-1">
                  <div
                    @mouseover="commentCreator = true"
                    @mouseleave="commentCreator = false"
                    class="row"
                  >
                    <div
                      v-if="!commentForm1"
                      @click="commentDescript = !commentDescript"
                      class="dropdown mt-1 col-12"
                      id="v-step-3"
                    >
                      <a
                        class="btn dropdown dropdown-toggle text-dark"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        >Demo Comment</a
                      >

                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <a
                          class="dropdown-item"
                          @click="commentForm1 = !commentForm1"
                          href="#"
                          >Edit</a
                        >
                        <a class="dropdown-item" href="#">Delete</a>
                      </div>
                      <div v-if="commentCreator">
                        <p>demo@demo.com</p>
                      </div>
                    </div>
                    <form
                      class="form-inline justify-content-center col-12 my-2"
                      v-if="commentForm1"
                    >
                      <input
                        class="form-control col-lg-8 mx-2"
                        type="text"
                        placeholder="title"
                        v-model="comment.title"
                        required
                      />
                      <button
                        class="btn btn-success btn-outline-dark "
                        @click="commentForm1 = !commentForm1"
                        type="button"
                      >
                        +
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <span id="v-step-4" class="navbar-text">
          <button
            class="btn btn-success btn-outline-dark"
            @click="login"
            v-if="!$auth.isAuthenticated"
          >
            Sign-Up!
          </button>
        </span>
      </div>
    </div>
    <v-tour v-if="!$auth.isAuthenticated" name="myTour" :steps="steps"></v-tour>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      list: {},
      newTask: {},
      task: {},
      newComment: {},
      comment: {},
      commentCreator: false,
      listForm: false,
      taskForm: false,
      moveTaskForm: false,
      commentForm: false,
      taskForm1: false,
      commentForm1: false,
      listDescript: false,
      commentDescript: false,
      taskDescript: false,
      steps: [
        {
          target: "#v-step-0", // We're using document.querySelector() under the hood
          header: {
            title: "Welcome to 4Sight!",
          },
          content: `Take the tour to see what you can do! `,
          params: {},
        },
        {
          target: "#v-step-1",
          content:
            "Add lists for each step of your project.  ex. 'In Progress' ",
          params: {
            placement: "left",
          },
        },
        {
          target: "#v-step-2",
          content: "Add tasks to break down what needs to happen at each step",
          params: {
            placement: "right", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
        {
          target: ".v-step-3",
          content:
            "Click on the task to see options, like moving to a new list",
          params: {
            placement: "right", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
        {
          target: "#v-step-3",
          content:
            "Add comments to flesh out what really needs done in that task!",
          params: {
            placement: "left", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
        {
          target: "#v-step-4",
          content: "Sign up to get started today!",
          params: {
            placement: "right", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          },
        },
      ],
    };
  },
  mounted() {
    this.$tours["myTour"].start();
  },
  computed: {},
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      this.$router.push({ name: "boards" });
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    },
  },
  components: {},
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
.mt-8 {
  margin-top: 5em;
}
.bg-teal {
  background-color: #00bc8c;
}
.bg-orange {
  background-color: #b8c0a5;
}
.text-teal {
  color: #00bc8c;
}
</style>
