<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-12">
        <h1 class="text-teal">Welcome to 4Sight!</h1>
        <p class="text-orange">Take any project and break it down to see the progress you make!</p>
        <p class="text-orange">Add Collaborators so that everyone can know how the project is going!</p>
        <p class="text-orange">Try our Demo and then sign up to get started!</p>
      </div>
    </div>
    <div class="row justify-content-center mx-2">
      <div v-if="taskDescript" class="col-1 text-light">
        <p
          class="mt-5"
        >Finished with a task? move it to a List Titled: "Completed" to let everyone know!</p>
      </div>
      <div
        class="list-component col-md-4 col-lg-2 col-sm-6 col-11 border list-tall bg-info my-2 mx-4 d-inline-block rounded shadow"
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
            <button class="btn" @click="listForm = false" type="button">edit</button>
          </form>
          <div
            v-if="!listForm"
            @click="listDescript = true"
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
            >Demo List Title</a>

            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" @click="taskForm = !taskForm" href="#">Add Task</a>
              <a class="dropdown-item" @click="listForm = !listForm" href="#">Edit</a>
              <a class="dropdown-item" href="#">Delete List</a>
            </div>
          </div>
        </div>
        <div class="row">
          <form class="form-inline justify-content-center col-12 my-2" v-if="taskForm">
            <input
              class="form-control col-lg-8 mx-2"
              type="text"
              placeholder="title"
              v-model="newTask.title"
              required
            />
            <button class="btn btn-success" @click="taskForm = false, task = true" type="button">+</button>
          </form>
        </div>
        <div class="row tall-row">
          <div class="col-12 border-top border-bottom rounded shadow bg-teal">
            <div class="row">
              <div
                @click="taskDescript = true, listDescript = false"
                v-if="!taskForm1"
                class="dropdown col-12 mt-1 px-0"
              >
                <a
                  class="btn dropdown dropdown-toggle text-dark"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >demo Task</a>

                <div class="dropdown-menu bg-light" aria-labelledby="dropdownMenuLink">
                  <a
                    class="dropdown-item text-dark"
                    @click="commentForm = !commentForm"
                    href="#"
                  >Add Comment</a>
                  <a class="dropdown-item text-dark" @click="taskForm1 = !taskForm1" href="#">Edit</a>
                  <a class="dropdown-item text-dark" href="#">Delete Task</a>
                  <a
                    class="dropdown-item text-dark"
                    @click="moveTaskForm = !moveTaskForm"
                    href="#"
                  >MoveTask</a>
                </div>
              </div>
            </div>
            <form class="form-inline justify-content-center col-12 my-2" v-if="taskForm1">
              <input
                class="form-control col-lg-8 mx-2"
                type="text"
                placeholder="title"
                v-model="task.title"
                required
              />
              <button class="btn btn-success" @click="taskForm1 = false" type="submit">+</button>
            </form>
            <form class="form-inline justify-content-center col-12 my-2" v-if="commentForm">
              <input
                class="form-control col-lg-8 mx-2"
                type="text"
                placeholder="title"
                v-model="newComment.title"
                required
              />
              <button class="btn btn-success" @click="commentForm = false" type="button">+</button>
            </form>
            <div class="row justify-content-center" v-if="moveTaskForm">
              <div class="border col-8 bg-orange action my-1">demo list 2</div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="bg-warning border shadow rounded my-1">
                  <div class="row">
                    <div
                      v-if="!commentForm1"
                      @click="commentDescript = true, taskDescript = false"
                      class="dropdown mt-1 col-12"
                    >
                      <a
                        class="btn dropdown dropdown-toggle text-dark"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >Demo Comment</a>

                      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item" @click="commentForm1 = !commentForm1" href="#">Edit</a>
                        <a class="dropdown-item" href="#">Delete</a>
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
                      <button class="btn btn-success" @click="commentForm1 = false" type="button">+</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="listDescript" class="col-1 text-light">
        <p>You can add new Tasks here! you can also edit and delete them.</p>
      </div>
      <div v-if="commentDescript" class="col-1 text-light mt-8">
        <p>Add comments to flush out what really needs done in that task!</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <span class="navbar-text">
          <button class="btn btn-success" @click="login" v-if="!$auth.isAuthenticated">Sign-Up!</button>
        </span>
      </div>
    </div>
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
      listForm: false,
      taskForm: false,
      moveTaskForm: false,
      commentForm: false,
      taskForm1: false,
      commentForm1: false,
      listDescript: false,
      commentDescript: false
    };
  },
  computed: {},
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    }
  },
  components: {}
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
  background-color: #fd7e14;
}
.text-teal {
  color: #00bc8c;
}
.text-orange {
  color: #fd7e14;
}
</style>