<template>
  <v-container>
    <v-main>

      <!-- Add Task Form -->
      <v-form @submit.prevent="addTask">
        <v-text-field v-model="newTask.taskName" label="Task Name" required></v-text-field>
        <v-textarea v-model="newTask.description" label="Description" required></v-textarea>

        <v-select
          v-model="newTask.employeeId"
          :items="viewemployeelist"
          item-title="name"
          item-value="employeeId"
          label="Assign to Employee"
          @update:model-value="logSelectedEmployee"
          required
        ></v-select>

        <v-btn color="primary" type="submit" class="mt-3">Add Task</v-btn>
      </v-form>

      <v-divider class="my-6"></v-divider>

      <!-- View Tasks -->
      <h3 class="text-h5 mb-4 font-weight-bold text-primary">Task List</h3>
      <v-row>
        <v-col
          v-for="task in tasks"
          :key="task.taskId"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="task-card" elevation="4">
            <v-card-title class="headline font-weight-bold text-primary">
              {{ task.taskName }}
            </v-card-title>

            <v-card-subtitle class="text--secondary d-flex align-center">
              <v-icon small class="mr-1 text-grey">mdi-calendar-start</v-icon>
              Employee: {{ task.employee }}
            </v-card-subtitle>

            <v-card-subtitle class="text--secondary d-flex align-center">
              <v-icon small class="mr-1 text-grey">mdi-calendar-start</v-icon>
              Start Date: {{ formatDate(task.startDate) }}
            </v-card-subtitle>


            <v-card-text>
              <div class="mb-3">{{ task.description }}</div>
              <v-chip class="status-chip" :color="getStatusColor(task.status)" dark>
                {{ task.status }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-main>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      tasks: [],
      viewemployeelist: [],
      menu: false,
      newTask: {
        taskName: "",
        description: "",
        startDate: "",
        statusId: 1, // Default to pending
        employeeId: null
      }
    };
  },
  mounted() {
    this.fetchTasks();
    this.fetchEmployees();
  },
  computed: {
    ...mapGetters(["getdepartmentId"])
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get("http://localhost:8085/api/departmentadetails/getTaskDto");
        this.tasks = response.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },

    async fetchEmployees() {
      let departmentId = this.getdepartmentId;

      if (!departmentId) {
        departmentId = JSON.parse(sessionStorage.getItem('departmentId'));
        console.warn('Using departmentId from sessionStorage:', departmentId);
      }

      if (!departmentId) {
        console.error("Department ID is still undefined. Cannot fetch resources.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8085/api/departmentadetails/listEmployeesbyhr?departmentId=${departmentId}`);
        this.viewemployeelist = response.data;
        console.log("employee", response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },

    async addTask() {
      try {
        await axios.post("http://localhost:8085/api/departmentadetails/addTask", this.newTask);
        this.newTask = {
          taskName: "",
          description: "",
          startDate: "",
          statusId: 1,
          employeeId: null
        };
        this.fetchTasks(); // Refresh list
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },

    logSelectedEmployee(employeeId) {
      console.log("Selected Employee ID:", employeeId);
    },

    formatDate(date) {
      return date ? new Date(date).toLocaleDateString() : "N/A";
    },

    getStatusColor(status) {
      switch (status?.toLowerCase()) {
        case "pending":
          return "orange";
        case "completed":
          return "green";
        case "in progress":
          return "blue";
        default:
          return "grey";
      }
    }
  }
};
</script>

<style scoped>
.v-container {
  max-width: 960px;
  margin: auto;
}

.task-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  padding: 10px;
}

.task-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.status-chip {
  font-weight: 500;
  text-transform: uppercase;
  font-size: 12px;
  border-radius: 8px;
}
</style>
