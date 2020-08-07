<template>
  <div class="home bg-blend-primary text-primary full-screen site-font">
    <div id="screen-fade" class="full-screen"></div>
    <div class="row justify-content-center full-screen align-items-center">
      <!-- ------------------------------IS NOT LOGGED IN--------------------------------------- -->
      <div v-if="!$auth.isAuthenticated" class="col-4 text-light mb-5">
        <h1>Welcome to Kanban</h1>
        <h5 class="border-bottom pb-2">the board oriented organizing tool</h5>
        <div>
          please log in up top
          <svg
            width="1.5em"
            height="1.5em"
            viewBox="0 0 16 16"
            class="bi bi-arrow-up-right"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6.5 4a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V4.5H7a.5.5 0 0 1-.5-.5z"
            />
            <path
              fill-rule="evenodd"
              d="M12.354 3.646a.5.5 0 0 1 0 .708l-9 9a.5.5 0 0 1-.708-.708l9-9a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </div>
      </div>
      <!-- ---------------------------------IS LOGGED IN---------------------------------------------------- -->
      <div v-if="$auth.isAuthenticated" class="col-8 text-light mb-5">
        <div class="row justify-content-center">
          <div class="col-6 border rounded p-5 m-2 box-hover">go to my boards</div>
          <div class="col-6 border rounded p-5 m-2 box-hover">you have 0 invites to boards</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {};
  },

  mounted() {
    document.getElementById("screen-fade").style.backgroundColor =
      "transparent";
    document.getElementById("screen-fade").style.zIndex = "-10";
  },
  computed: {
    user() {
      this.$store.state.user;
    },
  },
  methods: {},
  components: {},
};
</script>


<style>
.site-font {
  font-family: "Varela Round", sans-serif;
}
/* #screen-fade {
  position: fixed;
  z-index: 10;
  background-color: black;
  transition-delay: 0.2s;
  transition: all 0.5s;
} */
.full-screen {
  position: fixed;
  min-width: 100vw;
  min-height: 100vh;
}

.box-hover {
  transition: all 0.3s;
}

.box-hover:hover {
  transform: translateY(-3px);
  background-color: rgba(255, 255, 255, 0);
  box-shadow: 0px 3px rgb(255, 255, 255);
}

.bg-blend-primary {
  background-image: linear-gradient(
    to top right,
    rgb(158, 50, 201),
    rgb(215, 50, 221)
  );
}
.bg-blend-secondary {
  background-image: linear-gradient(
    to top right,
    rgb(72, 204, 132),
    rgb(110, 211, 101)
  );
}
.bg-blend-danger {
  background-image: linear-gradient(
    to top right,
    rgb(255, 30, 68),
    rgb(255, 91, 41)
  );
}
</style>