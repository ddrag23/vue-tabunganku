import {createStore} from 'vuex'
import auth from './auth'
import savings from './savings'

export const store = createStore({
    modules:{
        auth,
        savings
    }
})