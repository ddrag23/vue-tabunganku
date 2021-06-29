import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router'

export default {
  namespaced: true,
  state: {
    validate: {},
    invalidUser: '',
  },
  getters: {
    getValidate: (state) => state.validate,
    getInvalidUser: (state) => state.invalidUser,
  },
  mutations: {
    setUser(state, value) {
      state.user = value
    },
    setValidate(state, value) {
      state.validate = value
    },
    setInvalidUser(state, value) {
      state.invalidUser = value
    },
  },
  actions: {
    handleLogin({ commit }, user) {
      axios
        .get('/sanctum/csrf-cookie')
        .then((res) => {
          console.log(res)
          axios
            .post('/api/login', {
              username: user.username,
              password: user.password,
            })
            .then((res) => {
              //   console.log(res);
              if (res.data.success) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                router.push({ name: 'Home' })
              } else {
                if (res.data.errors !== undefined) {
                  commit('setValidate', res.data.errors)
                  commit('setInvalidUser', res.data.message)
                } else {
                  commit('setInvalidUser', res.data.message)
                }
              }
            })
            .catch((e) => console.error(e))
        })
        .catch((e) => console.error(e))
    },
    async handleStoreProfile({ commit }, formData) {
      try {
        const res = await axios.post('/api/profile', formData)
        const data = await res.data
        console.log(res)
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.data))
          Swal.fire(data.message, '', 'success')
        } else {
          if (data.errors !== undefined) {
            commit('setValidate', res.data.errors)
            commit('setInvalidUser', res.data.message)
          } else {
            commit('setInvalidUser', res.data.message)
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    handleLogout({}) {
      axios
        .get('/api/logout')
        .then((res) => {
          localStorage.clear()
          router.push({ name: 'login' })
        })
        .catch((e) => {
          localStorage.clear()
          router.push({ name: 'login' })
          console.error(e)
        })
    },
  },
}
