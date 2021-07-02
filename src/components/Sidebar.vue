<style>
.sidebar-link {
  display: flex !important;
  align-items: center;
}
.sidebar-link .right-icon {
  display: inline-flex;
  transition: all ease 0.25s;
}
.sidebar-link[aria-expanded="true"] .right-icon {
  transform: rotate(180deg);
}
</style>
<template>
  <div
    class="offcanvas offcanvas-start bg-dark"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-body p-0">
      <nav class="navbar-dark">
        <ul class="navbar-nav">
          <li>
            <div class="text-muted small fw-bold text-uppercase px-3">Core</div>
          </li>
          <li v-if="user.role === 'admin'">
            <router-link :to="{ name: 'Dashboard' }" class="nav-link px-3">
              <span class="me-2">
                <i class="bi bi-speedometer2"></i>
              </span>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li v-else>
            <router-link :to="{ name: 'home' }" class="nav-link px-3">
              <span class="me-2">
                <i class="bi bi-house-door"></i>
              </span>
              <span>Home</span>
            </router-link>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li v-if="user.role === 'admin'">
            <a
              class="nav-link px-3 sidebar-link"
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
              :class="{ active: isActive('/tabungan') }"
            >
              <span class="me-2">
                <i class="bi bi-layout-split"></i>
              </span>
              <span>Tabungan</span>
              <span class="right-icon ms-auto">
                <i class="bi bi-chevron-down"></i>
              </span>
            </a>
            <div class="collapse" id="collapseExample">
              <div>
                <ul class="navbar-nav ps-4">
                  <li>
                    <router-link
                      :to="{ name: 'withdraw' }"
                      class="nav-link px-3"
                    >
                      <span>Withdraw</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      :to="{ name: 'Deposit' }"
                      class="nav-link px-3"
                    >
                      <span>Deposit</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      :to="{ name: 'savings' }"
                      class="nav-link px-3"
                    >
                      <span>Tabungan</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
  data: () => {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    isActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some((path) => {
        return this.$route.path.indexOf(path) === 0; // current path starts with this path string
      });
    },
    textDashboard: () => (this.user.role === "admin" ? "Dashboard" : "Home"),
  },
};
</script>
