<template>
  <div class="col-4 board my-2">
    <div class="card bg-light">
      <router-link class="test" :to="{name: 'ActiveBoard', params: {id: board.id}}">
        <div class="card-body">
          <h4 class="card-title">{{board.title}}</h4>
          <p class="card-text">{{board.description}}</p>
          <p class="card-text">{{new Date(board.createdAt).toLocaleString("en-US")}}</p>
          <p>{{board.creatorEmail}}</p>
        </div>
      </router-link>
      <div class="row justify-content-center mb-2">
        <div class="dropdown mt-1 col-12">
          <a
            class="btn dropdown dropdown-toggle text-dark bg-white"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >options</a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" @click="deleteBoard" href="#">Delete</a>
            <a class="dropdown-item" @click="editForm = !editForm" href="#">Edit</a>
            <a class="dropdown-item" @click="collabForm = !collabForm" href="#">Add collaborator</a>
            <a class="dropdown-item" @click="showCollab = !showCollab" href="#">Show collaborators</a>
          </div>
        </div>
        <!-- <button class="btn btn-danger col-3" @click="deleteBoard">Delete Board</button>
        <button @click="editForm = !editForm" class="btn btn-warning col-3 ml-3 mr-3">edit</button>
        <button @click="collabForm = !collabForm" class="btn btn-info col-3">Add Collaborators</button>
        <button @click="showCollab = !showCollab" class="btn btn-danger">show collab</button>-->
      </div>
      <div class="row">
        <form
          v-if="editForm"
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
          <input
            class="form-control col-lg-3 mx-2"
            type="text"
            placeholder="description"
            v-model="board.description"
          />
          <button class="btn btn-success" type="submit">+</button>
        </form>
        <form
          v-if="collabForm"
          class="form-inline justify-content-center col-12 my-2"
          @submit.prevent="addCollab"
        >
          <input
            class="form-control col-lg-9 mx-2"
            type="email"
            placeholder="Collaborator email..."
            v-model="newCollab.email"
            required
          />
          <button class="btn btn-success" type="submit">+</button>
        </form>
      </div>
      <div class="row">
        <div v-if="showCollab" class="col">
          <collab
            v-for="collab in collabs"
            :key="collab.email"
            :collab="collab"
            :boardId="board.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import collab from "@/components/CollaboratorsComponent";
export default {
  name: "Board",
  mounted() {},
  data() {
    return {
      editForm: false,
      collabForm: false,
      newCollab: {
        id: this.board.id
      },
      showCollab: false
    };
  },
  methods: {
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.board.id);
    },
    editBoard() {
      this.$store.dispatch("editBoard", this.board);
      this.editForm = false;
    },
    addCollab() {
      if (this.collabs != this.newCollab.email) {
        this.$store.dispatch("addCollab", { ...this.newCollab });
        this.newCollab = {
          id: this.board.id
        };
        this.collabForm = false;
      } else {
        this.collabForm = false;
        this.newCollab = {
          id: this.board.id
        };
      }
    }
  },
  components: {
    collab
  },
  computed: {
    collabs() {
      return this.board.collaborators;
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