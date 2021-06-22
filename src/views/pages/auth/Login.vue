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
                <div v-if="validate.errors.username">
                  <small class="text-danger">
                    {{ validate.errors.username[0] }}
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
                <div v-if="validate.errors.password">
                  <small class="text-danger">
                    {{ validate.errors.password[0] }}
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
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const router = useRouter();
    const data = reactive({
      username: "",
      password: "",
    });
    const validate = reactive({
      errors: "",
    });
    const invalidUser = ref("");
    const submit = () => {
      axios
        .get("/sanctum/csrf-cookie")
        .then((res) => {
          console.log(res);
          axios
            .post("/api/login", {
              username: data.username,
              password: data.password,
            })
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("isLoggedIn", true);
                router.push("/home");
              } else {
                if (res.data.errors !== undefined) {
                  invalidUser.value = res.data.message;
                  validate.errors = res.data.errors;
                } else {
                  invalidUser.value = res.data.message;
                }
              }
            })
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
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
