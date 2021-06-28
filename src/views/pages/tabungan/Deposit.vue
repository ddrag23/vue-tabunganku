<style scoped>
.title {
  margin-bottom: 2em;
}
</style>
<template>
  <layout>
    <div class="title">
      <h3>Deposit</h3>
    </div>
    <div class="row">
      <div class="col-12 mb-2">
        <form action="" @submit.prevent="handleSubmit">
          <card>
            <template v-slot:card-header>
              <div class="card-header bg-white card-outline-primary">
                <h5 class="card-title">Form Deposit</h5>
              </div>
            </template>
            <template v-slot:card-body>
              <div class="row">
                <div class="col-md-6 col-sm-12">
                  <label for="form-label">Nama</label>
                  <select
                    name="user_id"
                    id="user_id"
                    v-model="saved.user_id"
                    class="form-control"
                    :class="{ 'is-invalid': validate.user_id !== undefined }"
                  >
                    <option value="">-Pilih-</option>
                    <option
                      v-for="item in dataUsers"
                      :key="item.id"
                      v-bind:value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                  <div v-if="validate.user_id" class="invalid-feedback">
                    {{ validate.user_id[0] }}
                  </div>
                </div>
                <div class="col-md-6 col-sm">
                  <label for="form-label">Nominal</label>
                  <input
                    type="text"
                    v-model="saved.nominal"
                    class="form-control"
                    :class="{ 'is-invalid': validate.nominal !== undefined }"
                  />
                  <div v-if="validate.nominal" class="invalid-feedback">
                    {{ validate.nominal[0] }}
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
                <h5 class="card-title">Table Deposit</h5>
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
                    <th>Nominal</th>
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
                    <td>{{ item.user.name }}</td>
                    <td>{{ item.nominal }}</td>
                    <td>
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
import { onMounted, computed, watchEffect, reactive } from "vue";
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
      user_id: "",
      nominal: "",
    });
    const data = computed(() => store.getters["deposit/getData"]);
    const dataUsers = computed(() => store.state.deposit.users);

    const validate = computed(() => store.getters["deposit/getValidate"]);
    const searchData = (e) => getData(1, e.target.value);
    const getUser = () => store.dispatch("deposit/handleUsers");
    const getData = (page = 1, search = "") => {
      store.dispatch("deposit/handleGetData", { page, search });
    };
    const deleteData = (id) => {
      store.dispatch("deposit/handleDelete", id);
      getData();
    };
    const handleSubmit = () => {
      const formData = new FormData();
      formData.append("user_id", saved.user_id);
      formData.append("nominal", saved.nominal);
      store.dispatch("deposit/handleSave", formData);
      saved.user_id = "";
      saved.nominal = "";
      getData();
    };
    watchEffect(() => {
      getData();
    });
    onMounted(() => {
      getData();
      getUser();
    });
    return {
      data,
      getData,
      searchData,
      deleteData,
      dataUsers,
      handleSubmit,
      saved,
      validate,
    };
  },
};
</script>

