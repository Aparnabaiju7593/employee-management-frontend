<template>
  <v-main>
    <v-row>
      <v-col v-for="task in tasks" :key="task.taskId" cols="12" md="6" lg="4">
        <v-card class="task-card" elevation="4">
          <v-card-title class="text-h6">{{ task.taskName }}</v-card-title>
          <v-card-subtitle>Start Date: {{ formatDate(task.startDate) }}</v-card-subtitle>
          <v-card-text>{{ task.description }}</v-card-text>
          <v-chip :color="statusColor(task.status)" class="ma-2">{{ task.status }}</v-chip>
          <button @click="start(task.taskId)" id="start">Start Task</button>
           <button @click="end(task.taskId)" id="end">End Task</button>
          

        </v-card>
      </v-col>
    </v-row>
  </v-main>
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
    },

    async start(taskId) {
  try {
    const statusId = 4;
    await axios.put("http://localhost:8085/api/EmployeeDetails/updateTaskstatus", null, {
      params: { taskId, statusId } // ✅ Correct: use `params` in Axios config
    });

    // Refresh task list after update
    await this.fetchTaskForm();
  } catch (error) {
    console.error("Error updating task status:", error.response?.data || error.message);
  }
},
async end(taskId) {
  try {
    const statusId = 5;
    await axios.put("http://localhost:8085/api/EmployeeDetails/updateTaskstatus", null, {
      params: { taskId, statusId } // ✅ Correct: use `params` in Axios config
    });

    // Refresh task list after update
    await this.fetchTaskForm();
  } catch (error) {
    console.error("Error updating task status:", error.response?.data || error.message);
  }
}
  }
};
</script>

<style scoped>
.task-card {
  background-color: #f9f9f9;
  padding: 16px;
}
#start{
  width: 100px;
  height: 40px;
  background-color: blue;
  color: white;
  border-radius: 20px;
  margin-right: 20px;
}
#end{
  width: 100px;
  height: 40px;
  background-color: rgb(255, 0, 0);
  color: white;
  border-radius: 20px;
}
</style>
