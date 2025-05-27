export default{
    setRole(state, payload){
        state.role =payload;
        sessionStorage.setItem('role',payload);
    },
    setForgotPassword(state,payload){
        state.setForgotPassword=payload;
        sessionStorage.setItem('forgotpassword',JSON.stringify(payload));

    },
    setEmployee(state, payload){
        state.employee =payload;
        sessionStorage.setItem('employee',JSON.stringify(payload));
    },
     setDepartmentId(state, payload){
        state.departmentId =payload;
        sessionStorage.setItem('departmentId',JSON.stringify(payload));
    },
}