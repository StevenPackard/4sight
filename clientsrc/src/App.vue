<template>
  <div id="app" class="app-grow bg-image">
    <navbar />
    <router-view class="grow " />
    <footer class="bg-dark p-2 text-light">
      Made with Love by <a href="https://github.com/TroyFuhriman">Troy</a> and
      <a href="https://github.com/StevenPackard">Steven</a>
    </footer>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "App",
  async beforeCreate() {
    try {
      await onAuth();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
    } catch (err) {
      this.$router.push({ name: "home" });
    }
  },
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
// @import "./assets/_variables.scss";
@import "./assets/yeti.scss";
@import "bootstrap";
// @import "./assets/_overrides.scss";

#app {
  font-family: "Old Standard TT", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.bg-image {
  background-image: url(./assets/sky.jpg);
  height: fit-content;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<style>
.app-grow {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: auto;
  /* background-image: linear-gradient(315deg, #222 0%, #313131 74%); */
}
.grow {
  flex-grow: 1;
}
.action {
  cursor: pointer;
}
.action:hover {
  text-shadow: 0.5px 0.5px white;
}
</style>
