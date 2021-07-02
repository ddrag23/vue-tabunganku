<style>
table tr th,
table tr td {
  padding: 10px;
}
</style>
<template>
  <layout>
    <div class="row">
      <div class="col-md-4 col-sm-12">
        <card>
          <template v-slot:card-body>
            <div class="d-flex justify-content-center">
              <img :src="photo" class="img-fluid" alt="" style="width: 80px" />
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <b>Nama</b>
                <span class="float-end">{{ data.name }}</span>
              </li>
              <li class="list-group-item">
                <b>Username</b>
                <span class="float-end">{{ data.username }}</span>
              </li>
              <li class="list-group-item">
                <b>Email</b>
                <span class="float-end">{{ data.email }}</span>
              </li>
            </ul>
          </template>
        </card>
      </div>
      <div class="col-md-8 col-sm-12">
        <form
          action=""
          enctype="multipart/form-data"
          @submit.prevent="handleSave"
        >
          <card>
            <template v-slot:card-body>
              <div class="row">
                <div class="col-12 mb-2">
                  <label for="photo" class="form-label">Foto</label>
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    class="form-control"
                    ref="file"
                  />
                </div>
                <div class="col-12 mb-2">
                  <label for="name" class="form-label">Nama</label>
                  <input
                    type="text"
                    name="nama"
                    id="nama"
                    class="form-control"
                    v-model="saved.name"
                  />
                </div>
                <div class="col-12 mb-2">
                  <label for="name" class="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="form-control"
                    v-model="saved.email"
                  />
                </div>
              </div>
            </template>
            <template v-slot:card-footer>
              <div class="card-footer">
                <button type="submit" class="btn btn-primary float-end">
                  Simpan Profile
                </button>
              </div>
            </template>
          </card>
        </form>
      </div>
    </div>
  </layout>
</template>
<script>
import Layout from "@/views/pages/Layout.vue";
import Card from "@/components/Card.vue";
import { useStore } from "vuex";
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
export default {
  name: "profile",
  components: {
    Layout,
    Card,
  },
  setup() {
    const saved = reactive({
      name: "",
      email: "",
    });
    const file = ref("");
    const photo = ref("");
    const store = useStore();
    const data = JSON.parse(localStorage.getItem("user"));
    saved.name = data.name;
    saved.email = data.email;
    const getPhoto = async () => {
      const res = await axios.get(`/api/profile/photo/${data.id}`, {
        headers: {
          "Content-Type": "image/*",
        },
      });
      const json = await res.data;
      photo.value = json;
    };
    const handleSave = () => {
      console.log("ok");
      const formData = new FormData();
      formData.append("name", saved.name);
      formData.append("email", saved.email);
      formData.append("photo", file.value.files[0]);
      store.dispatch("auth/handleStoreProfile", formData);
      getPhoto();
    };

    onMounted(() => {
      getPhoto();
    });
    return {
      data,
      file,
      saved,
      handleSave,
      photo,
    };
  },
};
</script>