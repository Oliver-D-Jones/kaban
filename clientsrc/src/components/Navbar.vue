<template>
  <nav id="nav" class="navbar navbar-expand-lg border text-light mb-2 pl-3 pr-3">
    <router-link class="navbar-brand border text-light rounded shadow px-2" :to="{ name: 'home' }"
      >Kanban</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: $route.name == 'home' }">
          <router-link :to="{ name: 'home' }" class="nav-link text-light"
            ><span class="text-light">Home</span></router-link
          >
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'boards' }"
        >
          <router-link class="nav-link" :to="{ name: 'boards' }"
            ><span class="text-light">Boards</span></router-link
          >
        </li>
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-success"
          @click="login"
          v-if="!$auth.isAuthenticated"
        >
          Login
        </button>
        <button class="btn btn-light" @click="logout" v-else>Logout</button>
      </span>
    </div>
  </nav>
</template>

<script>

export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    },
    async logout() {
      await this.$auth.logout({returnTo: window.location.origin});
    }
  }
};
</script>

<style scoped>
#nav{

}
</style>
