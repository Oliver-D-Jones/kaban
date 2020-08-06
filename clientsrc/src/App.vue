<template>
  <div id="app" class="bg-primary">
    <navbar class="fixed-top text-light" />
    <router-view style="margin-top:50px" />
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
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // background-color: black;
  // min-height: 100vh;
}

#nav {
  padding: 0.25rem;
  background: rgb(134, 132, 132);
  font-weight: bold;
  color: rgb(26, 67, 109);
  height: 50px;
}

#nav a:hover {
  border-bottom: lightsteelblue 1px solid;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
