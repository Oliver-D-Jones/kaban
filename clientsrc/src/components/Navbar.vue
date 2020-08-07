<template>
  <nav id="nav" class="navbar navbar-expand-lg bg-primary text-light mb-2 p-4 pb-2 site-font">
    <router-link
      class="navbar-brand border text-primary rounded bg-white shadow mr-1 px-2 py-0"
      :to="{ name: 'home' }"
    >かんは"ん</router-link>
    <h4 class="d-flex mt-2 ml-1">( kanban )</h4>
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
        <li class="nav-item ml-3" :class="{ active: $route.name == 'home' }">
          <router-link :to="{ name: 'home' }" class="nav-link text-light">
            <span class="text-light">Home</span>
          </router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'boards' }"
        >
          <router-link class="nav-link" :to="{ name: 'boards' }">
            <span class="text-light">Boards</span>
          </router-link>
        </li>
      </ul>
      <span class="navbar-text">
        <button
          class="btn text-light box-hover bg-blend-secondary"
          @click="login"
          v-if="!$auth.isAuthenticated"
        >Login</button>
        <button class="btn btn-outline-light" @click="logout" v-else>Logout</button>
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
      await this.$auth.logout({ returnTo: window.location.origin });
    },
  },
};
</script>

<style scoped>
#nav {
}
</style>
