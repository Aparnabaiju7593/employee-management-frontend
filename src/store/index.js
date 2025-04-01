import { createStore } from "vuex";
import rootActions from './actions.js';
import rootGetters from './getters.js';
import rootMutations from './mutations.js'
// import ForgotPassword from "@/components/ForgotPassword.vue";
const store=createStore({

    state(){
        return{
            base_url:'http://localhost:8085',
            role:sessionStorage.getItem('role') ||'',
            forgotpassword:JSON.parse(sessionStorage.getItem('forgotpassword')) || [],
            employee:JSON.parse(sessionStorage.getItem('employee')) || [],

        };
    },
    mutations:rootMutations,
    actions:rootActions,
    getters:rootGetters

})
export default store;

