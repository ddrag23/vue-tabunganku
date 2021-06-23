<style>
.wrap {
  background-color: grey;
}
</style>
<template>
  <div
    class="wrap row d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <div class="col-lg-4 col-md-6">
      <div class="card shadow-sm">
        <form action="" @submit.prevent="submit">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h3 class="text-center">Login</h3>
              </div>
              <div v-if="invalidUser" class="alert alert-danger" role="alert">
                {{ invalidUser }}
              </div>
              <div class="mb-3 col-12">
                <label class="form-label" for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  name="username"
                  id="username"
                  v-model="data.username"
                />
                <div v-if="validate.username">
                  <small class="text-danger">
                    {{ validate.username[0] }}
                  </small>
                </div>
              </div>
              <div class="mb-3 col-12">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  id="password"
                  v-model="data.password"
                />
                <div v-if="validate.password">
                  <small class="text-danger">
                    {{ validate.password[0] }}
                  </small>
                </div>
              </div>
            </div>
            <div class="d-grid mt-3">
              <button class="btn btn-primary btn-block" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const data = reactive({
      username: "",
      password: "",
    });
    const validate = computed(() => store.getters["auth/getValidate"]);
    const invalidUser = computed(() => store.getters["auth/getInvalidUser"]);
    const user = computed(() => store.state.auth.user);
    console.log(validate);
    const submit = () => {
      store.dispatch("auth/handleLogin", data);
      // router.push({ name: "Home" });
    };
    onMounted(() => {
      if (localStorage.getItem("isLoggedIn") === "true") {
        return router.push("/home");
      }
    });
    return {
      data,
      submit,
      validate,
      invalidUser,
    };
  },
};
</script>
