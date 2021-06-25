<style scoped>
.title {
  margin-bottom: 2em;
}
</style>
<template>
  <layout>
    <div class="title">
      <h3>Tabungan</h3>
    </div>
    <div class="row">
      <div class="col-12">
        <card>
          <template v-slot:card-header>
            <div class="card-header bg-white card-outline-primary">
              <h5 class="card-title">Tabel Tabungan</h5>
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
                    <th>Saldo</th>
                    <th>Action</th>
                  </tr>
                </template>
                <template v-slot:tbody>
                  <tr v-for="(item, index) in data.data" :key="item.id">
                    <td>
                      {{ (data.current_page - 1) * data.per_page + index + 1 }}
                    </td>
                    <td>{{ item.user.name }}</td>
                    <td>{{ item.saldo }}</td>
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
import VuePagination from "@//components/VuePagination.vue";
import { onMounted, computed, watchEffect } from "vue";
import { useStore } from "vuex";
export default {
  name: "Savings",
  components: {
    Layout,
    VueTable,
    Card,
    VuePagination,
  },
  setup() {
    const store = useStore();
    const data = computed(() => store.getters["savings/getData"]);
    const getData = (page = 1, search = "") => {
      store.dispatch("savings/handleGetData", { page, search });
    };
    const deleteData = (id) => store.dispatch("savings/handleDelete", id);
    const searchData = (e) => getData(1, e.target.value);
    watchEffect(() => {
      getData();
    });
    onMounted(() => {
      getData();
    });
    return { data, getData, searchData, deleteData };
  },
};
</script>
