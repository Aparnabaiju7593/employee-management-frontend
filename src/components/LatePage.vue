<template>
  <div class="container">
    <br>
    <br>
    <br>
    <h2 class="title">Late Requests</h2>
    <table class="late-table">
      <thead>
        <tr>
          <th>Late ID</th>
          <th>Department </th>
          <th>Employee</th>
          <th>Late Date</th>
          <th>Reason</th>
          <th>Status</th>
          <th>Submitted Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in lateRequests" :key="request.late_id">
          <td>{{ request.lateId }}</td>
          <td>{{ request.department }}</td>
          <td>{{ request.employeeName }}</td>
          <td>{{request.lateDate }}</td>

          <td>{{ request.reason }}</td>
          <td>{{request.status }}</td>
          
          <td>{{request.submittedTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      lateRequests: [
        // { late_id: 1, department_id: 2, employee_id: 3, late_date: "2025-02-06", reason: "gjyfht", status_id: 1, submitted_time: "2025-02-24 15:05:40.084247" },
        // { late_id: 2, department_id: 4, employee_id: 5, late_date: "2025-02-16", reason: "rdtrtt", status_id: 1, submitted_time: "2025-02-24 15:10:25.944128" },
        // { late_id: 3, department_id: 2, employee_id: 3, late_date: "2025-02-26", reason: "rdtrtt", status_id: 1, submitted_time: "2025-02-24 15:20:21.685823" },
        // { late_id: 4, department_id: 2, employee_id: 3, late_date: "2025-02-26", reason: "rdtrtt", status_id: 1, submitted_time: "2025-03-07 11:13:12.815405" },
        // { late_id: 5, department_id: 2, employee_id: 5, late_date: "2025-02-26", reason: "rdtrtt", status_id: 1, submitted_time: "2025-03-07 11:14:05.592123" },
        // { late_id: 6, department_id: 4, employee_id: 4, late_date: "2025-03-07", reason: "rdtrtt", status_id: 1, submitted_time: "2025-03-07 11:28:53.080696" },
        // { late_id: 7, department_id: 4, employee_id: 5, late_date: "2025-03-07", reason: "rdtrtt", status_id: 1, submitted_time: "2025-03-07 11:29:46.688601" }
      ]
    };
  },
  async mounted() {
    this.fetchLate();
    
  },
  

  methods: {
    async fetchLate(){
      const response = await axios.get(`http://localhost:8085/api/departmentadetails/getAllLateDto`)
      this.lateRequests = response.data;
      this.fetched = true;
      console.log(response);
      

    },
    formatDate(dateTime) {
      return new Date(dateTime).toLocaleString();
    },
    getStatusText(statusId) {
      return statusId === 1 ? "Pending" : "Processed"; // Modify according to your statuses
    },
    getStatusClass(statusId) {
      return statusId === 1 ? "pending" : "processed";
    }
  }
  
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.late-table {
  width: 100%;
  border-collapse: collapse;
}

.late-table th,
.late-table td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.late-table th {
  background-color: #007bff;
  color: white;
}

.late-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.late-table tr:hover {
  background-color: #e9ecef;
}

.pending {
  color: orange;
  font-weight: bold;
}

.processed {
  color: green;
  font-weight: bold;
}
</style>
