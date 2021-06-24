import axios from 'axios'
import router from '../router'

export default {
  namespaced: true,
  state: {
    data: [],
    formData: {},
    search: '',
  },
  getters: {
    getData: (state) => state.data,
    getSearch: (state) => state.search,
  },
  mutations: {
    setData(state, value) {
      state.data = value
    },
    setSearch(state, value) {
      state.search = value
    },
  },
  actions: {
    async handleGetData({ getters, commit }, page) {
      try {
        const url = `/api/savings?page=${page}&search=${getters.getSearch}`
        console.log(url)
        const res = await axios.get(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        const data = res.data.data
        commit('setData', data)
      } catch (error) {
        console.error(error)
      }
    },
    coba({ commit }, param) {
      //   console.log(param)
      commit('setSearch', param)
    },
    async handleSearchData({ commit }, search) {
      try {
        const url = `/api/savings?search=${search}`
        console.log(url)
        const res = await axios.get(url, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        const data = res.data.data
        // console.log(data)
        commit('setData', data)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
