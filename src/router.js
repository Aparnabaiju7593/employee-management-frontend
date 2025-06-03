import { createRouter, createWebHistory } from "vue-router";
import UserDashboard from "./components/UserDashboard.vue";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard.vue";
import HrDashboard from "./components/Hr/HrDashboard.vue";

const routes = [
  { path: '/login', component: () => import('./components/LoginForm.vue'), name: 'login' },
  { path: '/password', component: () => import('./components/ForgotPassword.vue'), name: 'password' },
  { path: '/reg', component: () => import('./components/RegistrationForm.vue'), name: 'register' },
  { path: '/', component: () => import('./components/HomePage.vue'), name: 'home' },
  { path: '/contact', component: () => import('./components/ContactUs.vue'), name: 'contact' },
  { path: '/about', component: () => import('./components/AboutUs.vue'), name: 'about' },
  { path: '/tas', component: () => import('./components/Employee/TasKs.vue'), name: 'tas' },



  {
    path: "/dash",
    component: UserDashboard,
    children: [
      { path: '', redirect: 'task' },
      // { path: '/home', component: () => import('./components/UserHome.vue'), name: 'user-home' },
      { path: '/task', component: () => import('./components/TaskPage.vue'), name: 'task' },
      // { path: '/requestres', component: () => import('@/components/Admin/RequestResource.vue'), name: 'Request-resouces' },
      { path: '/resource', component: () => import('./components/ResourcePage.vue'), name: 'resource' },
      { path: '/late', component: () => import('./components/LatePage.vue'), name: 'late' },
      { path: '/leave', component: () => import('./components/LeavePage.vue'), name: 'leave' },
      { path: '/department', component: () => import('./components/DepartmentPage.vue'), name: 'department' },
      { path: '/reqResView', component: () => import('./components/Admin/ReqResourceView.vue'), name: 'Request Resource View' },
      { path: '/viewEmployee', component: () => import('./components/Admin/ViewEmployee.vue'), name: 'View Employee' },



      // { path:'/resourcereq' ,component: () => import('@/components/RequestResource.vue'),name:'resourcereq'},
      // { path: 'requestres', component: () => import('@/components/Hr/RequestResource'), name: 'Request-resouces' },
    ],
  },
  {
    path: "/employeedash",
    component: EmployeeDashboard,
    children: [
      { path: '', redirect: '/tasks' },
      { path: '/tasks', component: () => import('./components/Employee/TaskForm.vue'), name: 'tasks' },

      { path: '/lerequest', component: () => import('@/components/Employee/LeaveRequest.vue'), name: 'lerequest' },
      { path: '/larequest', component: () => import('@/components/Employee/LateRequest.vue'), name: 'larequest' },
      { path: '/reqresource', component: () => import('@/components/Employee/ResourceRequest.vue'), name: 'reqresource' },
      { path: '/addLeave', component: () => import('@/components/Employee/AddLeave.vue'), name: 'addLeave' },
      { path: '/addLate', component: () => import('@/components/Employee/AddLate.vue'), name: 'addLate' },




    ],
  },
  {
    path: "/hrdash",
    component: HrDashboard,
    children: [
      { path: 'addtask', component: () => import('./components/Hr/AddTask.vue'), name: 'addtask' },
      { path: 'hrrequestres', component: () => import('@/components/Hr/RequestResource'), name: 'Request-hrresouces' },
      { path: 'viewLate', component: () => import('./components/Hr/ViewLate.vue'), name: 'viewLate' },
      { path: 'viewLeave', component: () => import('./components/Hr/ViewLeave.vue'), name: 'viewLeave' },
      { path: 'hrviewEmployee', component: () => import('@/components/Hr/HrViewEmployee'), name: 'hrviewEmployee' },

    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
