<template>
  <v-app id="inspire">
    <!-- Sidebar Navigation -->
    <v-navigation-drawer v-model="drawer" elevation="4" class="position-fixed">
      <v-list-item class="d-flex justify-content-center" nav>
        <v-avatar size="50">
          <!-- Profile Avatar Placeholder -->
        </v-avatar>
        <p>{{ employeeDisplay }}</p>
      </v-list-item>
      <v-list density="compact" nav class="mt-0">
        <v-list-item 
          v-for="item in navItems" 
          :key="item.route" 
          :to="item.route" 
          class="navlist fs-6"
          style="border-bottom: 1px solid #E0E0E0;">
          {{ item.text }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar class="green-background py-1 position-fixed">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <v-container fluid class="d-flex justify-content-between align-items-center ps-0 ms-0">
        <h5 class="d-inline mb-0 text-white">{{ selectedNavItem }}</h5>
        <v-btn class="text-capitalize" @click="logout" prepend-icon="mdi-logout" color="#EF3E3E" variant="elevated">
          Logout
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Main Content -->
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
        // { text: 'Tasks', route: '/tasks' },
        // { text: 'Leave Requests', route: '/lerequest' },
        // { text:'Late Requests', route:'/larequest'},
        // { text: 'Resource Request',route: '/reqresource'}

        
      ],
    };
  },
  computed: {
    employeeDisplay() {
  const employeeId = localStorage.getItem("employeeId") || "N/A"; // Retrieve ID from localStorage
  const employeeName = localStorage.getItem("employeeName") || "Employee"; // Retrieve Name
  return `${employeeName} (ID: ${employeeId})`; // Format: Austin (ID: 12)
},

    selectedRoute() {
      return this.$route.path;
    },
    selectedNavItem() {
      const selectedItem = this.navItems.find(item => this.selectedRoute.startsWith(item.route));
      return selectedItem ? selectedItem.text : '';
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout');
        this.$router.push('/login');
      } catch (error) {
        console.error("Logout failed", error);
      }
    }
  }
};
</script>

<style scoped>
.green-background {
  background-color: #181a17;
}
.navlist {
  padding: 12px 48px;
}
</style>
