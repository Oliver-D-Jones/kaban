<template>
  <div id="app" class="bg-light">
    <navbar class="fixed-top text-light" />
    <transition name="slide-fade" mode="out-in">
      <router-view style="margin-top:50px" />
    </transition>
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
  mounted() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
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
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #9099a1;
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

.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
