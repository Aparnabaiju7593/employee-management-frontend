<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h2 class="mb-4">Task Management</h2>

    <v-container fluid>
      <v-row>
        <v-col v-for="task in tasks" :key="task.task_id" cols="12" sm="6" md="4" lg="3">
          <v-card elevation="2" class="pa-4">
            <v-card-title class="font-weight-bold">
              {{ task.task_name || "Untitled Task" }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p><strong>Task ID:</strong> {{ task.task_id }}</p>
              <p><strong>Department ID:</strong> {{ getDepartmentName(task.department_id) }}</p>
              <p><strong>Employee ID:</strong> {{ task.employee_id }}</p>
              <p><strong>Description:</strong> {{ task.description || "No description" }}</p>
              <p><strong>Start Date:</strong> {{ formatDate(task.start_date) }}</p>
              <p><strong>Progress Time:</strong> {{ task.progress_tym ? task.progress_tym : "Not Started" }}</p>
              <p><strong>Completion Time:</strong> {{ task.complete_tym ? task.complete_tym : "Not Completed" }}</p>
              <p><strong>Status:</strong> 
                <v-chip :color="statusClass(task.status_id)" dark>
                  {{ getStatus(task.status_id) }}
                </v-chip>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { task_id: 1, task_name: 'Update database schema', department_id: 3, employee_id: 1, description: 'Update database schema', start_date: '2025-03-05T11:31:51.799509', progress_tym: '11:36:29.935', complete_tym: '11:52:04.173', status_id: 1 },
        { task_id: 4, task_name: 'Fix Login Issue', department_id: 3, description: 'Fix Login Issue', employee_id: 3, start_date: '2025-03-05T11:36:51.799509', progress_tym: null, complete_tym: null, status_id: 2 },
        { task_id: 6, task_name: 'Fix backend Issue', department_id: 2, description: 'Fix Backend Issue', employee_id: 2, start_date: '2025-03-05T11:36:51.799509', progress_tym: null, complete_tym: null, status_id: 1 },
        
      ],
      departments: {
        1: "HR",
        2: "Finance",
        3: "IT",
      },
    };
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
    getStatus(statusId) {
      const statuses = { 1: "Pending", 2: "In Progress", 3: "Completed" };
      return statuses[statusId] || "Unknown";
    },
    statusClass(statusId) {
      const statusColors = { 1: "warning", 2: "primary", 3: "success" };
      return statusColors[statusId] || "grey";
    },
    getDepartmentName(departmentId) {
      return this.departments[departmentId] || "Unknown Department";
    },
  },
};
</script>
