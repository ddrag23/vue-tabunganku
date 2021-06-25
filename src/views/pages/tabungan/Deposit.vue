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
      <div class="col-12">
        <card>
          <template v-slot:card-header>
            <div class="card-header bg-white card-outline-primary">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">Table Deposit</h5>
                <v-modal @vModal="showModal"></v-modal>
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
                  <tr v-for="(item, index) in data.data" :key="item.id">
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
import VModal from "@/components/Modal.vue";
import VuePagination from "@/components/VuePagination.vue";
import { onMounted, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { Modal } from "bootstrap";
export default {
  name: "Deposit",
  components: {
    Layout,
    VueTable,
    Card,
    VuePagination,
    VModal,
  },
  setup() {
    const store = useStore();
    const data = computed(() => store.getters["deposit/getData"]);
    const getData = (page = 1, search = "") => {
      store.dispatch("deposit/handleGetData", { page, search });
    };
    const deleteData = (id) => store.dispatch("deposit/handleDelete", id);
    const searchData = (e) => getData(1, e.target.value);
    const showModal = (element) => {
      console.log(element);
      // const myModal = new Modal("#staticBackdrop", { backdrop: "static" });
      // myModal.show();
    };
    watchEffect(() => {
      getData();
    });
    onMounted(() => {
      getData();
    });
    return { data, getData, searchData, deleteData, showModal };
  },
};
</script>

