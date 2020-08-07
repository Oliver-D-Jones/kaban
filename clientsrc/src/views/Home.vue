<template>
  <div class="home bg-blend-primary-marble text-primary full-screen site-font">
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
          <div class="col-12 my-1">You're already logged in, what would you like to do?</div>
          <div class="col-6 border rounded p-5 m-2 box-hover" @click="movePage">go to my boards</div>
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
  methods: {
    movePage() {
      this.$router.push({ name: "boards" });
    },
  },
  components: {},
};
</script>


<style>
.modal-backdrop {
  z-index: -1;
}

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

.x-hover {
  transition: all 0.2s ease;
}
.x-hover:hover {
  transform: scale(1.5, 1.5);
}

.box-hover {
  transition: all 0.32s;
}

.bg-blend-primary-marble {
  background-image: linear-gradient(
      to top right,
      rgba(158, 50, 201, 0.98),
      rgba(230, 56, 215, 0.95)
    ),
    url(https://previews.123rf.com/images/adistock/adistock1803/adistock180300001/96959868-old-marbled-paper-texture-black-and-white.jpg);
  background-size: cover;
}

.bg-blend-secondary-marble {
  background-image: linear-gradient(
      to top right,
      rgba(57, 173, 109, 0.98),
      rgba(161, 218, 108, 0.95)
    ),
    url(https://previews.123rf.com/images/adistock/adistock1803/adistock180300001/96959868-old-marbled-paper-texture-black-and-white.jpg);
  background-size: cover;
}

.bg-blend-dark-marble {
  background-image: linear-gradient(
      to bottom left,
      rgb(22, 5, 44, 0.98),
      rgb(12, 59, 18, 0.98)
    ),
    url(https://previews.123rf.com/images/adistock/adistock1803/adistock180300001/96959868-old-marbled-paper-texture-black-and-white.jpg);
  background-size: cover;
}

.box-hover:hover {
  transform: translateY(-3px);
  backdrop-filter: hue-rotate(10deg);
  box-shadow: 0px 3px rgb(255, 255, 255);
}

.bg-blend-primary {
  background-blend-mode: darken;
  background-image: linear-gradient(
    to top right,
    rgb(158, 50, 201),
    rgb(230, 56, 215)
  );
}
.bg-blend-secondary {
  background-image: linear-gradient(
    to top right,
    rgb(57, 173, 109),
    rgb(161, 218, 108)
  );
}
.bg-blend-danger {
  background-image: linear-gradient(
    to top right,
    rgb(255, 30, 68),
    rgb(255, 91, 41)
  );
}
.bg-blend-dark {
  background-image: linear-gradient(
    to bottom left,
    rgb(22, 5, 44),
    rgb(12, 59, 18)
  );
}

.bg-rotate {
  backdrop-filter: hue-rotate(15deg);
}
</style>