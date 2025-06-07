export default{
    setRole(state, payload){
        state.role =payload;
        sessionStorage.setItem('role',payload);
    },
    setForgotPassword(state,payload){
        state.setForgotPassword=payload;
        sessionStorage.setItem('forgotpassword',JSON.stringify(payload));

    },
    setemployeeId(state, payload) {
  state.employeeId = payload;
  sessionStorage.setItem('employeeId', JSON.stringify(payload));
},
     setdepartmentId(state, payload){
        state.departmentId =payload;
        sessionStorage.setItem('departmentId',JSON.stringify(payload));
    },
    setname(state, payload){
        state.name =payload;
        sessionStorage.setItem('name',JSON.stringify(payload));
    },
}