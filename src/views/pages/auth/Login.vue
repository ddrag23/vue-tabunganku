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
              <div class="mb-3 col-12">
                <label class="form-label" for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  name="username"
                  id="username"
                  v-model="data.username"
                />
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const router = useRouter();
    const data = reactive({
      username: "",
      password: "",
    });
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
              console.log(res.data.errors.username);
              // localStorage.setItem("token", res.data.token);
              // router.push("/home");
            })
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    };
    return {
      data,
      submit,
    };
  },
};
</script>
