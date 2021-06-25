import { createStore } from 'vuex'
import auth from './auth'
import savings from './savings'
import deposit from './deposit'

export const store = createStore({
  modules: {
    auth,
    savings,
    deposit,
  },
})
