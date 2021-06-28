import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

export default {
  namespaced: true,
  state: {
    data: [],
    users: [],
    validate: {},
  },
  getters: {
    getData: (state) => state.data,
    getValidate: (state) => state.validate,
  },
  mutations: {
    SET_DATA(state, value) {
      state.data = value
    },
    SET_USERS: (state, value) => (state.users = value),
    SET_VALIDATE: (state, value) => (state.validate = value),
  },
  actions: {
    async handleGetData({ commit }, { page, search }) {
      try {
        const url = `/api/deposit?page=${page}&search=${search}`
        const res = await axios.get(url)

        const data = res.data.data
        commit('SET_DATA', data)
      } catch (error) {
        console.error(error)
      }
    },
    async handleUsers({ commit }) {
      try {
        const url = '/api/user/all'
        const res = await axios.get(url)
        const data = await res.data
        commit('SET_USERS', data)
      } catch (error) {
        console.log(error)
      }
    },
    async handleSave({ commit }, formData) {
      try {
        const url = '/api/deposit/save'
        const res = await axios.post(url, formData)
        const data = await res.data
        if (data.success) {
          Swal.fire(data.message, '', 'success')
          commit('SET_VALIDATE', {})
        } else {
          Swal.fire(data.message, '', 'warning')
          console.log(data.data)
          commit('SET_VALIDATE', data.data)
        }
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
