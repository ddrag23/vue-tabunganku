<style scoped>
.title {
  margin-bottom: 2em;
}
.card-title {
  color: black;
}
</style>
<template>
  <layout>
    <div class="title">
      <h3>User</h3>
    </div>
    <div class="row">
      <div class="col-12 mb-2">
        <form action="" id="form-user" @submit.prevent="handleSubmit">
          <card>
            <template v-slot:card-header>
              <div class="card-header bg-white card-outline-primary">
                <h5 class="header-title">Form User</h5>
              </div>
            </template>
            <template v-slot:card-body>
              <div class="row g-3">
                <input type="hidden" v-model="saved.id" />
                <div class="col-md-6 col-sm-12">
                  <label for="form-label">Nama</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="saved.name"
                    :class="{ 'is-invalid': validate.name !== undefined }"
                  />
                  <div v-if="validate.name" class="invalid-feedback">
                    {{ validate.name[0] }}
                  </div>
                </div>
                <div class="col-md-6 col-sm-12">
                  <label for="form-label">Username</label>
                  <input
                    type="text"
                    v-model="saved.username"
                    class="form-control"
                    :class="{ 'is-invalid': validate.username !== undefined }"
                  />
                  <div v-if="validate.username" class="invalid-feedback">
                    {{ validate.username[0] }}
                  </div>
                </div>
                <div class="col-md-6 col-sm-12">
                  <label for="form-label">Jenis Kelamin</label>
                  <select
                    class="form-control"
                    v-model="saved.jenis_kelamin"
                    :class="{
                      'is-invalid': validate.jenis_kelamin !== undefined,
                    }"
                  >
                    <option value="">-Pilih-</option>
                    <option value="L">Laki-Laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                  <div v-if="validate.jenis_kelamin" class="invalid-feedback">
                    {{ validate.jenis_kelamin[0] }}
                  </div>
                </div>
                <div class="col-md-6 col-sm-12">
                  <label for="form-label">Email</label>
                  <input
                    type="email"
                    v-model="saved.email"
                    class="form-control"
                    :class="{ 'is-invalid': validate.email !== undefined }"
                  />
                  <div v-if="validate.email" class="invalid-feedback">
                    {{ validate.email[0] }}
                  </div>
                </div>
                <div class="col-md-6 col-sm-12">
                  <label for="form-label">Role</label>
                  <select
                    class="form-control"
                    v-model="saved.role"
                    :class="{ 'is-invalid': validate.role !== undefined }"
                  >
                    <option value="">-Pilih-</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <div v-if="validate.role" class="invalid-feedback">
                    {{ validate.role[0] }}
                  </div>
                </div>
                <div class="col-md-6 col-sm-12">
                  <label for="form-label">No Telepon</label>
                  <input
                    type="number"
                    v-model="saved.notelp"
                    class="form-control"
                    :class="{ 'is-invalid': validate.notelp !== undefined }"
                  />
                  <div v-if="validate.notelp" class="invalid-feedback">
                    {{ validate.notelp[0] }}
                  </div>
                </div>
                <div class="col-md-6 col-sm-12" v-if="isEdit">
                  <label for="form-label">Password</label>
                  <input
                    type="password"
                    v-model="saved.password"
                    class="form-control"
                    :class="{ 'is-invalid': validate.password !== undefined }"
                  />
                  <div v-if="validate.password" class="invalid-feedback">
                    {{ validate.password[0] }}
                  </div>
                </div>
                <div class="col-md-6 col-sm-12" v-if="isEdit">
                  <label for="form-label">Password Confirmation</label>
                  <input
                    type="password"
                    v-model="saved.password_confirmation"
                    class="form-control"
                  />
                </div>
                <div class="col-12">
                  <label for="form-label">Alamat</label>
                  <textarea
                    cols="5"
                    rows="3"
                    v-model="saved.alamat"
                    class="form-control"
                    :class="{ 'is-invalid': validate.alamat !== undefined }"
                  ></textarea>
                  <div v-if="validate.alamat" class="invalid-feedback">
                    {{ validate.alamat[0] }}
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:card-footer>
              <div class="card-footer">
                <button class="btn btn-primary float-end">Simpan</button>
              </div>
            </template>
          </card>
        </form>
      </div>
      <div class="col-12">
        <card>
          <template v-slot:card-header>
            <div class="card-header bg-white card-outline-primary">
              <div class="d-flex justify-content-between">
                <h5 class="header-title">Table User</h5>
                <button class="btn btn-primary">
                  <i class="bi bi-plus-lg"></i>
                  Tambah
                </button>
              </div>
            </div>
          </template>
          <template v-slot:card-body>
            <div class="row">
              <div class="col-12 mb-3">
                <input
                  type="text"
                  name="search"
                  id="search"
                  class="form-control"
                  placeholder="Search"
                  @keyup="searchData"
                />
              </div>
            </div>
            <div class="table-responsive">
              <vue-table>
                <template v-slot:thead>
                  <tr>
                    <th>#</th>
                    <th>Nama</th>
                    <th>Username</th>
                    <th>No Telepon</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </template>
                <template v-slot:tbody>
                  <tr v-if="data.data === undefined">
                    <td colspan="4" class="text-center">Belum ada data</td>
                  </tr>
                  <tr v-else v-for="(item, index) in data.data" :key="item.id">
                    <td>
                      {{ (data.current_page - 1) * data.per_page + index + 1 }}
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.notelp }}</td>
                    <td>{{ item.role }}</td>
                    <td>
                      <a
                        href="#form-user"
                        class="btn btn-primary me-1 btn-sm"
                        @click="handleEdit(item.id)"
                      >
                        <i class="bi bi-pencil"></i>
                      </a>
                      <button
                        class="btn btn-info me-1 btn-sm"
                        @click="deleteData(item.id)"
                      >
                        <i class="bi bi-eye"></i>
                      </button>
                      <button
                        class="btn btn-danger btn-sm"
                        @click="deleteData(item.id)"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                </template>
              </vue-table>
              <vue-pagination
                :paginate="data"
                v-on:pagination="getData"
              ></vue-pagination>
            </div>
          </template>
        </card>
      </div>
    </div>
  </layout>
</template>
<script>
import Layout from "../Layout.vue";
import VueTable from "@/components/Table.vue";
import Card from "@/components/Card.vue";
import VuePagination from "@/components/VuePagination.vue";
import { onMounted, computed, watchEffect, reactive, ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "Deposit",
  components: {
    Layout,
    VueTable,
    Card,
    VuePagination,
  },
  setup() {
    const store = useStore();
    const saved = reactive({
      name: "",
      username: "",
      email: "",
      jenis_kelamin: "",
      notelp: "",
      alamat: "",
      role: "",
      password: "",
      password_confirmation: "",
      id: "",
    });
    const isEdit = ref(false);
    const data = computed(() => store.getters["user/getData"]);

    const validate = computed(() => store.getters["user/getValidate"]);
    const searchData = (e) => getData(1, e.target.value);
    const getData = (page = 1, search = "") => {
      store.dispatch("user/handleGetData", { page, search });
    };
    const deleteData = (id) => {
      store.dispatch("user/handleDelete", id);
      getData();
    };
    const handleSubmit = async () => {
      const formData = new FormData();
      Object.entries(saved)
        .filter(([key]) => key !== "password")
        .map(([key, value]) => formData.append(key, value));
      formData.append("password", saved.password);
      // formData.append("nominal", saved.nominal);
      await store.dispatch("user/handleSave", formData);
      for (const key in saved) {
        saved[key] = "";
      }
      isEdit.value = false;
      await getData();
    };
    const handleEdit = async (id) => {
      isEdit.value = true;
      await store.dispatch("user/handleEdit", id);
      const show = store.getters["user/getSingleData"];
      const notAllowed = ["password", "password_confirmation"];
      for (const key in saved) {
        if (!notAllowed.includes(key)) {
          saved[key] = show[key];
        }
      }
      // saved.name = show.name;
    };
    watchEffect(() => {
      getData();
    });
    onMounted(() => {
      getData();
    });
    return {
      data,
      getData,
      searchData,
      deleteData,
      handleSubmit,
      handleEdit,
      isEdit,
      saved,
      validate,
    };
  },
};
</script>
