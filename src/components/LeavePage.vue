<template>
  <v-main>
    <div class="container">
      
      <h2 class="title">Leave Requests</h2>
      <table class="leave-table">
        <thead>
          <tr>
            <th>Leave ID</th>
            <th>Employee ID</th>
            <th>Employee</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in leaveRequests" :key="request.leave_id">
            <td>{{ request.leaveId }}</td>
            <td>{{ request.employeeId }}</td>
            <td>{{ request.employeeName }}</td>
            <td>{{ (request.startDate) }}</td>
            <td>{{ (request.endDate) }}</td>
            <td>{{ request.reason }}</td>
            <td>{{ request.status }}</td>
            <!-- <td :class="getStatusClass(request.status_id)">
              {{ getStatusText(request.status_id) }} -->
            <!-- </td> -->
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
        leaveRequests: [
        ]
      };
    },
    async mounted(){
      this.fetchLeave();
    },
      
    
    methods: {
      async fetchLeave(){
        const response = await axios.get(`http://localhost:8085/api/departmentadetails/getLeaveDto`)
        this.leaveRequests = response.data;
        this.fetched = true;
        console.log(response);

      },
      
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
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
  
  .leave-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .leave-table th,
  .leave-table td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  
  .leave-table th {
    background-color: #007bff;
    color: white;
  }
  
  .leave-table tr:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  .leave-table tr:hover {
    background-color: #e9ecef;
  }
  
  .pending {
    color: orange;
    font-weight: bold;
  }
  
  .approved {
    color: green;
    font-weight: bold;
  }
  </style>
  