<template>
  <v-main>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="overflow-x-auto bg-white shadow-md rounded-lg p-4">
  
      <!-- <h2 class="text-xl font-semibold mb-4">Task Management</h2> -->
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th v-for="header in headers" :key="header.key" class="border p-2 text-left">
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.task_id" class="border hover:bg-gray-100">
            <td class="border p-2">{{ task.taskId }}</td>
            <td class="border p-2">{{ task.taskName }}</td>
            <td class="border p-2">{{ task.departmentId }}</td>
            <td class="border p-2">{{ task.department }}</td>
            <td class="border p-2">{{ task.employeeId }}</td>
            <td class="border p-2">{{ task.employee }}</td>
            <td class="border p-2">{{ task.description }}</td>
            <td class="border p-2">{{ task.startDate }}</td>
            <td class="border p-2">{{ task.progressTym || '-' }}</td>
            <td class="border p-2">{{ task.completeTym || '-' }}</td>
            <td class="border p-2">{{ task.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</v-main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      headers: [
        { key: 'taskId', label: 'Task ID' },
        { key: 'taskName', label: 'Task Name' },
        { key: 'departmentId', label: 'Department ID' },
        { key:'department',label:'Department'},
        { key: 'employee_id', label: 'Employee ID' },
        { key:'employee',label:'Employee'},
        { key: 'description', label: 'Description' },
        { key: 'start_date', label: 'Start Date' },
        { key: 'progress_tym', label: 'Progress Time' },
        { key: 'complete_tym', label: 'Completion Time' },
        { key: 'status_id', label: 'Status' },
      ],
      tasks: [

      
      ]
    };
  },
  async mounted(){
    this.fetchTask();

  },

  methods: {
    async fetchTask(){
      const response =await axios.get(`http://localhost:8085/api/departmentadetails/getTaskDto`)
      this.tasks=response.data;
      this.fetched =true;
      console.log(response);

    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
    getStatus(statusId) {
      const statuses = { 1: 'Pending', 2: 'In Progress', 3: 'Completed' };
      return statuses[statusId] || 'Unknown';
    }
  }
};
</script>

<style>
table {
  width: 100%;
}
th, td {
  text-align: left;
  padding: 8px;
}
th {
  background-color: #f4f4f4;
}
</style>