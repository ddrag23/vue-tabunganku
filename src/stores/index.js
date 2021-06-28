import { createStore } from 'vuex'
import auth from './auth'
import savings from './savings'
import deposit from './deposit'
import withdraw from './withdraw'

export const store = createStore({
  modules: {
    auth,
    savings,
    deposit,
    withdraw,
  },
})
