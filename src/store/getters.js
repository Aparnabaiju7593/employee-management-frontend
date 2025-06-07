export default{
    getUrl : (state)=>state.base_url,
    getRole :(state)=> state.role,
    getForgotpassword :(state)=>state.forgotpassword,
    getemployeeId: (state) => state.employeeId, // <- if state.employee is a string, this won't work right
    getdepartmentId :(state)=> state.departmentId,
    getname :(state)=> state.name,

}