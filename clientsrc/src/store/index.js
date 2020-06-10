import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true,
});

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    lists: [],
    activeBoard: {},
    tasks: {},
    allTasks: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
    setActiveBoard(state, board) {
      state.activeBoard = board;
    },
    setAllLists(state, lists) {
      state.lists = lists;
    },
    setTasks(state, payload) {
      // state.tasks = tasks;
      Vue.set(state.tasks, payload.listId, payload.tasks);
    },
    setAllTasks(state, tasks) {
      state.allTasks = tasks;
    },
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile");
        commit("setUser", res.data);
      } catch (err) {
        console.error(err);
      }
    },
    //#endregion

    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get("boards").then((res) => {
        commit("setBoards", res.data);
      });
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post("boards", boardData).then((serverBoard) => {
        dispatch("getBoards");
      });
    },
    async deleteBoard({ commit, dispatch }, id) {
      try {
        await api.delete("boards/" + id);
        dispatch("getBoards");
      } catch (error) {
        console.error(error);
      }
    },
    async getActiveBoard({ commit, dispatch }, id) {
      try {
        let res = await api.get("boards/" + id);
        commit("setActiveBoard", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async editBoard({ commit, dispatch }, board) {
      try {
        let res = await api.put("boards/" + board.id, board);
        dispatch("getBoards");
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region -- LISTS --
    async getAllLists({ commit, dispatch }, id) {
      try {
        let res = await api.get("boards/" + id + "/lists");
        commit("setAllLists", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async addList({ commit, dispatch }, listDeetz) {
      try {
        await api.post("lists", listDeetz);
        dispatch("getAllLists", listDeetz.boardId);
      } catch (error) {
        console.error(error);
      }
    },
    async editList({ commit, dispatch }, list) {
      try {
        await api.put("lists/" + list.id, list);
        dispatch("getAllLists", list.boardId);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteList({ commit, dispatch }, list) {
      try {
        await api.delete("lists/" + list.id);
        dispatch("getAllLists", list.boardId);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion
    //#region  -- TASKS --
    async getAllTasks({ commit, dispatch }) {
      try {
        let res = await api.get("tasks");
        commit("setAllTasks", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getTasksByListId({ commit, dispatch }, id) {
      try {
        let res = await api.get("lists/" + id + "/tasks");
        commit("setTasks", { tasks: res.data, listId: id });
      } catch (error) {
        console.error(error);
      }
    },
    async addTask({ commit, dispatch }, taskDeetz) {
      try {
        await api.post("tasks", taskDeetz);
        dispatch("getTasksByListId", taskDeetz.listId);
      } catch (error) {
        console.error(error);
      }
    },
    async editTask({ commit, dispatch }, task) {
      try {
        await api.put("tasks/" + task.id, task);
        dispatch("getTasksByListId", task.listId);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask({ commit, dispatch }, task) {
      try {
        await api.delete("tasks/" + task.id);
        dispatch("getTasksByListId", task.listId);
      } catch (error) {
        console.error(error);
      }
    },
    async moveTask({ commit, dispatch }, data) {
      try {
        await api.put("tasks/" + data.id, data);
        dispatch("getTasksByListId", data.listId);
        await dispatch("getTasksByListId", data.oldListId);
      } catch (error) {
        console.error(error);
      }
    },
    async addComment({ commit, dispatch }, commentDeetz) {
      try {
        await api.post(
          "tasks/" + commentDeetz.taskId + "/comments",
          commentDeetz
        );
        dispatch("getTasksByListId", commentDeetz.listId);
      } catch (error) {
        console.error(error);
      }
    },
    async editComment({ commit, dispatch }, comment) {
      try {
        await api.put(
          "tasks/" + comment.taskId + "/comments/" + comment.id,
          comment
        );
        dispatch("getTasksByListId", comment.listId);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment({ commit, dispatch }, comment) {
      try {
        await api.delete("tasks/" + comment.taskId + "/comments/" + comment.id);
        dispatch("getTasksByListId", comment.listId);
      } catch (error) {
        console.error(error);
      }
    },

    //#endregion
  },
});
