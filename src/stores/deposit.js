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
    SET_DATA(state, value) {
      state.data = value
    },
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
  },
}
