<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <button
        class="navbar-toggler me-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand me-auto" :to="{ name: 'Home' }">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person"></i>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a
                  class="dropdown-item"
                  @click="logout"
                  href="javascript:void(0)"
                  >logout</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <sidebar></sidebar>
</template>
<script>
import Sidebar from "./Sidebar.vue";
import axios from "axios";
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
    };
  },
  name: "Navbar",
  components: {
    Sidebar,
  },
  methods: {
    logout() {
      console.log(this.token);
      axios
        .get("/api/logout", {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          localStorage.setItem("token", null);
          this.$router.push("/");
        })
        .catch((e) => console.error(e));
    },
  },
};
</script>
