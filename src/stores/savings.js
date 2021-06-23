import axios from "axios";
import router from '../router'

export default {
    namespaced:true,
    state : {
        data :{},
        formData : {}
    },
    getters : {
        getData : (state) => state.data
    },
    mutations :{
        setData(state,value){
            state.data = value
        }
    },
    actions :{
        async handleGetData({commit}){
            try {
                const res = await axios.get("/api/savings", {
                    headers: { Authorization: "Bearer " + localStorage.getItem('token') },
                  })
                  const data = res.data.data
                  console.log(data)
                  commit('setData',data)
            } catch (error) {
                console.error(error)
            }
        }
    }
}