<template>
  <div class="task-view">
    <h1 class="title">Task Overview</h1>

    <div class="task-columns">
      <!-- Pending Tasks -->
      <div class="task-column">
        <h2 class="column-title pending">🕒 Pending</h2>
        <div v-for="task in pendingTasks" :key="task.taskId" class="task-card">
          <h3 class="task-title">{{ task.taskName }}</h3>
          <p class="task-desc">{{ task.description }}</p>
          <div class="task-info">Start Time: {{ formatDate(task.startDate) }}</div>
          <button @click="start(task.taskId)" class="btn start">Start</button>
        </div>
      </div>

      <!-- In Progress Tasks -->
      <div class="task-column">
        <h2 class="column-title in-progress">🔧 In Progress</h2>
        <div v-for="task in progressingTasks" :key="task.taskId" class="task-card">
          <h3 class="task-title">{{ task.taskName }}</h3>
          <p class="task-desc">{{ task.description }}</p>
          <div class="task-info">Due: {{ formatDate(task.startDate) }}</div>
          <button @click="end(task.taskId)" class="btn end">Mark Complete</button>
        </div>
      </div>

      <!-- Completed Tasks -->
      <div class="task-column">
        <h2 class="column-title completed">✅ Completed</h2>
        <div v-for="task in completedTasks" :key="task.taskId" class="task-card">
          <h3 class="task-title">{{ task.taskName }}</h3>
          <p class="task-desc">{{ task.description }}</p>
          <div class="task-info">Due: {{ formatDate(task.startDate) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

 

<script>
import axios from "axios";
 import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      tasks: [],
    };
  },
  computed: {
    pendingTasks() {
      return this.tasks.filter((task) => task.status === "pending");
    },
    progressingTasks() {
      return this.tasks.filter((task) => task.status === "progress");
    },
    completedTasks() {
      return this.tasks.filter((task) => task.status === "Completed");
    },
    ...mapGetters(['getemployeeId'])

  },
  mounted() {
    this.fetchTaskForm();
  },
  methods: {
    
    async fetchTaskForm() {
  try {
    const employeeId =this.getemployeeId;
    console.log(employeeId);
    
     const response = await axios.get(
      'http://localhost:8085/api/EmployeeDetails/getEmployeeTask',
      { params: { employeeId } }
    );

    this.tasks = response.data;
  } catch (error) {
    console.error(
      "Error fetching tasks:",
      error.response?.data || error.message
    );
  }
},
    formatDate(dateString) {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString();
    },
    async start(taskId) {
      try {
        const statusId = 4; // In Progress
        await axios.put(
          "http://localhost:8085/api/EmployeeDetails/updateTaskstatus",
          null,
          { params: { taskId, statusId } }
        );
        await this.fetchTaskForm();
      } catch (error) {
        console.error("Error starting task:", error.response?.data || error.message);
      }
    },
    async end(taskId) {
      try {
        const statusId = 5; // Completed
        await axios.put(
          "http://localhost:8085/api/EmployeeDetails/updateTaskstatus",
          null,
          { params: { taskId, statusId } }
        );
        await this.fetchTaskForm();
      } catch (error) {
        console.error("Error completing task:", error.response?.data || error.message);
      }
    },
  },
};
</script>

<style scoped>
.task-view {
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  margin-top: 20px;
}

.task-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.task-column {
  flex: 1;
  min-width: 300px;
  max-width: 350px;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.column-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.column-title.pending {
  color: #d97706;
}
.column-title.in-progress {
  color: #2563eb;
}
.column-title.completed {
  color: #16a34a;
}

.task-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.3s ease;
}
.task-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.task-title {
  font-weight: bold;
  color: #111827;
}

.task-desc {
  color: #4b5563;
  font-size: 0.9rem;
  margin: 0.3rem 0;
}

.task-info {
  font-size: 0.8rem;
  color: #6b7280;
}

.btn {
  margin-top: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn.start {
  background-color: #2563eb;
  color: white;
}

.btn.end {
  background-color: #16a34a;
  color: white;
}
</style>
