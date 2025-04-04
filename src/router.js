import { createRouter, createWebHistory } from "vue-router";
import UserDashboard from "./components/UserDashboard.vue";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard.vue";

const routes = [
  { path: '/login', component: () => import('./components/LoginForm.vue'), name: 'login' },
  { path: '/password', component: () => import('./components/ForgotPassword.vue'), name: 'password' },
  { path: '/reg', component: () => import('./components/RegistrationForm.vue'), name: 'register' },
  { path: '/', component: () => import('./components/HomePage.vue'), name: 'home' },
  { path:'/contact' ,component: () => import('./components/ContactUs.vue'),name:'contact'},
  { path:'/about' ,component: () => import('./components/AboutUs.vue'),name:'about'},
  

  {path: "/dash",
    component: UserDashboard,
    children: [
      { path: '/home', component: () => import('./components/UserHome.vue'), name: 'user-home' },
      { path:'/task', component: () => import('./components/TaskPage.vue'), name:'task'},
      { path:'/resource', component: () => import('./components/ResourcePage.vue'), name:'resource'},
      { path:'/late' ,component: () => import('./components/LatePage.vue'),name:'late'},
      { path:'/leave' ,component: () => import('./components/LeavePage.vue'),name:'leave'},
      { path:'/department' ,component: () => import('./components/DepartmentPage.vue'),name:'department'},
      // { path:'/resourcereq' ,component: () => import('@/components/RequestResource.vue'),name:'resourcereq'},
  
    ],
  },
  {path: "/employeedash",
    component: EmployeeDashboard,
    children: [
     { path:'/tasks',component:() =>import('./components/Employee/TaskForm.vue'), name:'tasks'},
     
      { path: '/lerequest', component: () => import('@/components/Employee/LeaveRequest.vue'), name: 'lerequest' },
      { path: '/larequest', component: () => import('@/components/Employee/LateRequest.vue'), name: 'larequest' },
      { path: '/reqresource', component: () => import('@/components/Employee/ResourceRequest.vue'), name: 'reqresource' }
      

     
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
