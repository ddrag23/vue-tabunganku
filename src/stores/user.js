import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

export default {
  namespaced: true,
  state: {
    data: [],
    validate: {},
    singleData: {},
  },
  getters: {
    getData: (state) => state.data,
    getValidate: (state) => state.validate,
    getSingleData: (state) => state.singleData,
  },
  mutations: {
    SET_DATA: (state, value) => (state.data = value),
    SET_VALIDATE: (state, value) => (state.validate = value),
    SET_SINGLEDATA: (state, value) => (state.singleData = value),
  },
  actions: {
    async handleGetData({ commit }, { page, search }) {
      try {
        const url = `/api/user?page=${page}&search=${search}`
        const res = await axios.get(url)
        const data = await res.data.data
        commit('SET_DATA', data)
      } catch (error) {
        console.error(error)
      }
    },
    async handleSave({ commit }, formData) {
      try {
        const url = '/api/user/save'
        const res = await axios.post(url, formData)
        const data = await res.data
        console.log(data)
        if (data.success) {
          Swal.fire(data.message, '', 'success')
          commit('SET_VALIDATE', {})
        } else {
          Swal.fire(data.message, '', 'warning')
          // console.log(data.data)
          commit('SET_VALIDATE', data.errors)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async handleEdit({ commit }, id) {
      const url = `api/user/${id}`
      try {
        const res = await axios.get(url)
        const data = res.data.data
        commit('SET_SINGLEDATA', data)
      } catch (error) {
        console.error(error)
      }
    },
    async handleDelete({}, id) {
      try {
        console.log(id)
        const urlDelete = `api/deposit/delete/${+id}`
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
              .delete(urlDelete)
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
