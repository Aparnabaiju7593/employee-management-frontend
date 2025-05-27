<template>
  <v-main>
  <div class="container">
    
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
</v-main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      lateRequests: [
    
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
