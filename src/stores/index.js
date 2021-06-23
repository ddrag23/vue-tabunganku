import {createStore} from 'vuex'
import auth from './auth'

export const store = createStore({
    modules:{
        auth
    }
})