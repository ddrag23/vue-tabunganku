<template>
  <layout>
    <div class="title">
      <h3>Detail User</h3>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div class="d-flex justify-content-between">
                <h5 class="header-title">Detail User</h5>
                <router-link
                  :to="{ name: 'user' }"
                  class="btn btn-success btn-sm"
                >
                  <i class="bi bi-arrow-left-circle"></i>
                  Kembali
                </router-link>
              </div>
            </div>
            <div class="card-body">
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <th>Nama</th>
                    <td>:</td>
                    <td>{{ data.name }}</td>
                  </tr>
                  <tr>
                    <th>Username</th>
                    <td>:</td>
                    <td>{{ data.username }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>:</td>
                    <td>{{ data.email }}</td>
                  </tr>
                  <tr>
                    <th>Jenis Kelamin</th>
                    <td>:</td>
                    <td>{{ data.jenis_kelamin }}</td>
                  </tr>
                  <tr>
                    <th>No Telepon</th>
                    <td>:</td>
                    <td>{{ data.notelp }}</td>
                  </tr>
                  <tr>
                    <th>Alamat</th>
                    <td>:</td>
                    <td>{{ data.alamat }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>
<script>
import Layout from "@/views/pages/Layout.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  components: {
    Layout,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const data = computed(() => store.getters["user/getSingleData"]);
    onMounted(async () => {
      await store.dispatch("user/handleEdit", route.params.id);
    });
    return {
      data,
    };
  },
};
</script>