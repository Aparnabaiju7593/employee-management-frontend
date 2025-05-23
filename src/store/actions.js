// import ForgotPassword from "@/components/ForgotPassword.vue";
// import ResourceRequest from "@/components/Employee/ResourceRequest.vue";
import axios from "axios"
export default{
    async login({commit, rootGetters},payload){
        try {
            const res = await axios.post(`${rootGetters.getUrl}/api/AdminDetails/login`, payload);
        
            console.log("Response Data:", res.data); // Log response for debugging
        
            // Fix: Store 'id' as 'employeeId' in localStorage
            if (res.data && res.data.id) {
              localStorage.setItem("employeeId", res.data.id);
              localStorage.setItem("employeeName", res.data.name);
            } else {
              console.error("ID is missing in response!");
            }
        
            commit("setRole", res.data.role);
            return res;
          } catch (error) {
            console.error("Login Error:", error);
          }
    },

        //get all late request
    async late({rootGetters}){
        const res = await axios.get(`${rootGetters.getUrl}``api/departmentadetails/getAllLateDto`);
        if(res.status >= 200 || res.status <300){
            console.log(res);
            
            return true;
            
        }
    },

    //get all resources
    async resource({rootGetters}){
        const res = await axios.get(`${rootGetters.getUrl}``api/departmentadetails/getResources`);
        if(res.status >= 200 || res.status <300){
            console.log(res);
            
            return true;
            
        }
    },
        //get all leave request
    async leave({rootGetters}){
        const res = await axios.get(`${rootGetters.getUrl}``api/departmentadetails/getLeaveDto`);
        if(res.status >= 200 || res.status <300){
            console.log(res);
            
            return true;
            
        }
    },

    //list department

    async department({rootGetters}){
        const res = await axios.get(`${rootGetters.getUrl}``api/departmentadetails/listdepartment`);
        if(res.status >= 200 || res.status <300){
            console.log(res);
            
            return true;
            
        }
    },
      //get all task
    async task({rootGetters}){
        const res = await axios.get(`${rootGetters.getUrl}``api/departmentadetails/getTaskDto`);
        if(res.status >= 200 || res.status <300){
            console.log(res);
            
            return true;
            
        }
    },
    //get employee task
    async taskForm({rootGetters}){
        const res = await axios.get(`${rootGetters.getUrl}``api/EmployeeDetails/getEmployeeTask`);
        if(res.status >= 200 || res.status <300){
            console.log(res);
            
            return true;
            
        }
    },
//list department

async allDep({ rootGetters }) {
    try {
      const baseUrl = rootGetters.getUrl; 
      if (!baseUrl) {
        throw new Error("Base URL is undefined. Check Vuex state.");
      }
  
      const res = await axios.get(`${baseUrl}/api/AdminDetails/listallDepartment`);
  
      if (res.status >= 200 && res.status < 300) {
        console.log("Departments:", res.data);
        return { success: true, data: res.data };
      } else {
        console.error("Failed to fetch departments:", res);
        return { success: false, message: "Failed to fetch departments." };
      }
    } catch (error) {
      console.error("Error fetching department list:", error);
      return { success: false, message: error.message };
    }
  }
  ,


  //view roles


  async roles({ rootGetters }) {
    try {
      const baseUrl = rootGetters.getUrl; 
      if (!baseUrl) {
        throw new Error("Base URL is undefined. Check Vuex state.");
      }
  
      const res = await axios.get(`${baseUrl}/api/AdminDetails/getAllRoles`);
  
      if (res.status >= 200 && res.status < 300) {
        console.log("Role:", res.data);
        return { success: true, data: res.data };
      } else {
        console.error("Failed to fetch roles:", res);
        return { success: false, message: "Failed to fetch roles." };
      }
    } catch (error) {
      console.error("Error fetching role list:", error);
      return { success: false, message: error.message };
    }
  }
  ,
//employee add resources
  async reqResource({rootGetters},payload){
    const baseUrl = rootGetters.getUrl; 
    const res = await axios.post(`${baseUrl}/api/EmployeeDetails/reqResource`,payload);
    if(res.status >= 200 || res.status <300){
        console.log(res);
        
        return res;
        
    }
},

//list resources

async allRes({ rootGetters }) {
  try {
    const baseUrl = rootGetters.getUrl; 
    if (!baseUrl) {
      throw new Error("Base URL is undefined. Check Vuex state.");
    }
    
    const res = await axios.get(`${baseUrl}/api/AdminDetails/getAllResources`);

    if (res.status >= 200 && res.status < 300) {
      return { success: true, data: res.data };
    } else {
      return { success: false, message: "Failed to fetch resources." };
    }
  } catch (error) {
    console.error("Error fetching resources list:", error);
    return { success: false, message: error.message };
  }
}
,

    //forgot password

    async ForgotPassword ({commit,rootGetters}){
        const res =await axios.put(`${rootGetters.getUrl}/api/AdminDetails/updatepassword`);
        if(res.status >= 200 || res.status <300){
            console.log(res);
            commit('setForgotPassword',res.data );
            return true;
        }
    },
   

    // localhost:8085/api/EmployeeDetails/reqResource

//demo
//     async fetchEmployee({commit, rootGetters}){
//         const res = await axios.get(`${rootGetters.getUrl}/api/departmentadetails/getEmployee`);
//         if(res.status >= 200 || res.status <300){
//             console.log(res);
//             commit('setEmployee',res.data);
//             return true;
            
//         }
//     }


    //employee add resources
  async updatestatus({rootGetters},payload){
    const baseUrl = rootGetters.getUrl; 
    const res = await axios.post(`${baseUrl}/api/EmployeeDetails/updateTaskstatus`,payload);
    if(res.status >= 200 || res.status <300){
        console.log(res);
        
        return res;
        
    }
},
}