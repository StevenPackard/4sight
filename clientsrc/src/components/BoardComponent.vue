<template>
  <div class="col-4 board my-2">
    <div class="card bg-light">
      <router-link
        class="test"
        :to="{ name: 'ActiveBoard', params: { id: board.id } }"
      >
        <div class="card-body">
          <h4 class="card-title">{{ board.title }}</h4>
          <p class="card-text">{{ board.description }}</p>
          <p class="card-text">
            {{ new Date(board.createdAt).toLocaleString("en-US") }}
          </p>
          <p>{{ board.creatorEmail }}</p>
        </div>
      </router-link>
      <div class="row justify-content-center mb-2">
        <div class="dropdown mt-1 col-12">
          <a
            class="btn dropdown text-dark bg-white"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >...</a
          >
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a
              v-if="isCreator"
              class="dropdown-item"
              @click="showDeletBoardAlert"
              href="#"
              >Delete</a
            >
            <a
              v-if="isCreator"
              class="dropdown-item"
              @click="editForm = !editForm"
              href="#"
              >Edit</a
            >
            <a
              v-if="isCreator"
              class="dropdown-item"
              @click="collabForm = !collabForm"
              href="#"
              >Add collaborator</a
            >
            <a class="dropdown-item" @click="showCollab = !showCollab" href="#"
              >Show collaborators</a
            >
          </div>
        </div>
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
          @submit.prevent="showAddCollabAlert"
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
            :board="board"
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
        id: this.board.id,
      },
      showCollab: false,
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
      this.$store.dispatch("addCollab", { ...this.newCollab });
      this.newCollab = {
        id: this.board.id,
      };
    },
    showDeletBoardAlert() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this board!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Your board has been deleted!", {
            icon: "success",
          });
          this.deleteBoard();
        } else {
          swal("Your board is safe!");
        }
      });
    },
    showAddCollabAlert() {
      swal({
        title: "Are you sure?",
        text: "Are you sure you want to add this collaborator?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          if (this.collabs.includes(this.newCollab.email)) {
            this.collabForm = false;
            this.newCollab = {
              id: this.board.id,
            };
            swal({
              title: "You cannot add that collaborator.",
              text: "This collaborator already exists on the project.",
              icon: "warning",
            });
          } else {
            swal("Collaborator added!", {
              icon: "success",
            });
            this.addCollab();
            this.collabForm = false;
          }
        } else {
          this.collabForm = false;
          this.newCollab = {
            id: this.board.id,
          };
        }
      });
    },
  },
  components: {
    collab,
  },
  computed: {
    collabs() {
      return this.board.collaborators;
    },
    isCreator() {
      return this.$store.state.user.email == this.board.creatorEmail;
    },
  },
  props: ["board"],
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
