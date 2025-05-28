<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" elevation="4" class="position-fixed">
      <v-list-item class="d-flex justify-content-center" nav>
        <v-avatar size="50">
          <v-img src="../assets/profile-circle.svg"></v-img>
        </v-avatar>
        <p>{{ this.$route.query.name }}</p>
      </v-list-item>
      <v-list density="compact" nav class="mt-0">
        <v-list-item 
          v-for="item in navItems" 
          :key="item.route" 
          :to="item.route" 
          class="navlist fs-6"
         
          style="border-bottom: 1px solid #E0E0E0;"
          >
          {{ item.text }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar class="green-background py-1 position-fixed">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <v-container fluid class="d-flex justify-content-between align-items-center ps-0 ms-0">
        <h5 class="d-inline mb-0 text-white">{{ selectedNavItem }}</h5>
        <v-btn class="text-capitalize" @click="logout" prepend-icon="mdi-logout" color="#EF3E3E" variant="elevated">
          Logout
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Task Management -->
    <v-main class="pa-6 bg-gray-100">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      navItems: [
       
        { text: 'Task', route: '/task' },
        { text: 'Request Resouce', route: '/dash/requestres' },
        { text: 'Resource', route: '/resource' },
        { text: 'Late',route:'/late'},
        {text:'Leave',route:'/leave'},
        {text:'Department',route:'/department'}
      ],
      // tasks: [
      //   { task_id: 4, complete_tym: '', department_id: 4, description: 'Fix Login Issue', employee_id: 4, progress_tym: '', start_date: '2025-03-05T11:36:51.799509', status_id: 2 },
      //   { task_id: 1, complete_tym: '11:52:04.173', department_id: 3, description: 'Update database schema', employee_id: 1, progress_tym: '11:36:29.935', start_date: '2025-03-05T11:31:51.799509', status_id: 1 }
      // ],
    };
  },
  computed: {
    selectedRoute() {
      return this.$route.path;
    },
    selectedNavItem() {
      const selectedItem = this.navItems.find(item => this.selectedRoute.startsWith(item.route));
      return selectedItem ? selectedItem.text : '';
    },
    status() {
      return this.$store.getters.getStatus;
    }
  },
  methods: {
    isActive(route) {
      return this.$route.path.startsWith(route);
    },
    async logout() {
      
          this.$router.push('/login');
        
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    getStatus(id) {
      return { 1: 'Pending', 2: 'In Progress', 3: 'Completed' }[id] || 'Unknown';
    },
    statusClass(id) {
      return { 1: 'grey', 2: 'blue', 3: 'green' }[id] || 'grey';
    },
    

  }
};
</script>

<style scoped>
.green-background {
  background-color: #181a17;
}
.active-nav-item {
  background-color: #172915 !important;
  color: rgb(131, 89, 89) !important;
}
.navlist {
  padding: 12px 48px;
}
</style>