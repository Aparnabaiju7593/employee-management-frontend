<template>
  <v-container>

    <br>
    <br>
    <br>
    <br>
    <v-row>
      
      <v-col v-for="task in tasks" :key="task.taskId" cols="12" md="6" lg="4">
        <v-card class="task-card" elevation="4">
          <v-card-title class="text-h6">{{ task.taskName }}</v-card-title>
          <v-card-subtitle>Start Date: {{ formatDate(task.startDate) }}</v-card-subtitle>
          <v-card-text>{{ task.description }}</v-card-text>
          <v-chip :color="statusColor(task.status)" class="ma-2">{{ task.status }}</v-chip>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [] // Initialize as an empty array
    };
  },
  async mounted() {
    this.fetchTaskForm();
  },
  
  methods: {
    async fetchTaskForm() {
      const employeeId = localStorage.getItem("employeeId"); // Get employeeId from localStorage

      if (!employeeId) {
        console.error("No employee ID found. Redirecting to login...");
        this.$router.push("/login"); // Redirect if employeeId is missing
        return;
      }

      try {
        const response = await axios.get("http://localhost:8085/api/EmployeeDetails/getEmployeeTask", {
          params: { employeeId } // Send employeeId as query param
        });

        this.tasks = response.data;
        console.log("Tasks fetched:", this.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
      }
    },

    formatDate(dateString) {
      if (!dateString) return "N/A"; // Handle missing date values
      return new Date(dateString).toLocaleDateString();
    },

    statusColor(status) {
      const statusColors = {
        approve: "green",
        pending: "orange",
        rejected: "red"
      };
      return statusColors[status] || "gray"; // Default color if status is unknown
    }
  }
};
</script>

<style scoped>
.task-card {
  background-color: #f9f9f9;
  padding: 16px;
}
</style>
