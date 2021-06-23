import axios from "axios";
import router from '../router'

export default {
    namespaced :true,
    state :{
        user : {},
        validate : {},
        invalidUser: ""
    },
    getters :{
        getValidate : (state) => state.validate,
        getInvalidUser : (state) => state.invalidUser
    },
    mutations :{
        setUser(state,value){
            state.user = value
        },
        setValidate(state,value){
            state.validate = value
        },
        setInvalidUser(state,value){
            state.invalidUser = value
        }
    },
    actions:{
        handleLogin({commit},user){
            axios
        .get("/sanctum/csrf-cookie")
        .then((res) => {
          console.log(res);
          axios
            .post("/api/login", {
              username: user.username,
              password: user.password,
            })
            .then((res) => {
            //   console.log(res);
              if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("isLoggedIn", true);
                commit('setUser',res.data.data)
                // window.location.replace('/home');
                route.push({name:'Home'})
              } else {
                if (res.data.errors !== undefined) {
                    commit('setValidate',res.data.errors)
                    commit('setInvalidUser',res.data.message)
                } else {
                    commit('setInvalidUser',res.data.message)
                    
                }
              }
            })
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
        },
        handleLogout({}, token){
            axios
        .get("/api/logout", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          localStorage.clear();
          router.push({name: 'login'});
        })
        .catch((e) => {
          localStorage.clear();
          router.push({name: 'login'});
          // this.$router.push({ name: "unauthorized" });
          console.error(e);
        });
        }
    }
}