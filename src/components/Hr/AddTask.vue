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

        <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="newTask.startDate"
              label="Start Date"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="newTask.startDate" @input="menu = false"></v-date-picker>
        </v-menu>

        <v-btn color="primary" type="submit">Add Task</v-btn>
      </v-form>

      <v-divider class="my-6"></v-divider>

      <!-- View Tasks -->
      <h3>Task List</h3>
      <v-row>
        <v-col
          v-for="task in tasks"
          :key="task.taskId"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="mb-3" elevation="2">
            <v-card-title>{{ task.taskName }}</v-card-title>
            <v-card-subtitle>Start Date: {{ formatDate(task.startDate) }}</v-card-subtitle>
            <v-card-text>{{ task.description }}</v-card-text>
            <v-chip class="ma-2" color="info">{{ task.status }}</v-chip>
          </v-card>
        </v-col>
      </v-row>

    </v-main>
  </v-container>
</template>

<script>
import axios from "axios";

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
        statusId: 1, // Pending by default
        employeeId: null
      }
    };
  },
  mounted() {
    this.fetchTasks();
    this.fetchEmployees();
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

     logSelectedEmployee(employeeId) {
    console.log("Selected Employee ID:", employeeId);
  },

    async fetchEmployees() {
      try {
        const response = await axios.get("http://localhost:8085/api/AdminDetails/listEmployees");
        this.viewemployeelist = response.data;
        console.log("employee",response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },

    async addTask() {
      try {
        await axios.post("http://localhost:8085/api/departmentadetails/addTask", this.newTask);
        this.newTask.taskName = "";
        this.newTask.description = "";
        this.newTask.startDate = "";
        this.newTask.employeeId = null;
        this.fetchTasks(); // Refresh task list
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },

    formatDate(date) {
      return date ? new Date(date).toLocaleDateString() : "N/A";
    }
  }
};
</script>

<style scoped>
.v-container {
  max-width: 900px;
}
</style>
