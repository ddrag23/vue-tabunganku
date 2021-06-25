import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

export default {
  namespaced: true,
  state: {
    data: [],
  },
  getters: {
    getData: (state) => state.data,
  },
  mutations: {
    setData(state, value) {
      state.data = value
    },
  },
  actions: {
    async handleGetData({ commit }, { page, search }) {
      try {
        const url = `/api/savings?page=${page}&search=${search}`
        const res = await axios.get(url)
        const data = res.data.data
        commit('setData', data)
      } catch (error) {
        console.error(error)
      }
    },
    async handleDelete({}, id) {
      try {
        console.log(id)
        const urlDelete = `api/savings/delete/${+id}`
        Swal.fire({
          title: 'Apakah Kamu Yakin ?',
          text: 'Setelah dihapus anda tidak dapat memulihkan data ini!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
        }).then((result) => {
          if (result.value) {
            axios
              .delete(urlDelete, {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
              })
              .then((res) => {
                console.log(res.status)
                Swal.fire({
                  title: 'Pesan!',
                  text: res.data.message,
                  icon: 'success',
                })
              })
              .catch((err) => {
                console.error(err)
              })
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
}
