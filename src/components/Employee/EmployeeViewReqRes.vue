<template>
  <v-container>
    <v-main>
      <h2 class="text-h5 font-weight-bold mb-4">My Resource Requests</h2>

      <v-table class="elevation-1">
        <thead>
          <tr>
            <th>Resource</th>
            <th>Quantity</th>
            <th>Reason</th>
            <th>Request Date</th>
             <th>Remarks</th>
            <th>Approval Date</th>
           
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resource in resourceRequests" :key="resource.reqResourceId">
            <td>{{ resource.resource }}</td>
            <td>{{ resource.quantity }}</td>
            <td>{{ resource.reason }}</td>
            <td>{{ formatDate(resource.requestDate) }}</td>
                        <td>{{ resource.remarks }}</td>

            <td>{{ formatDate(resource.approvalDate) }}</td>
            <td>
              <v-chip :color="getStatusColor(resource.status)" dark small>{{ resource.status }}</v-chip>
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-alert v-if="resourceRequests.length === 0" type="info" class="mt-4">
        No resource requests found.
      </v-alert>
    </v-main>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';

import axios from "axios";

export default {
  data() {
    return {
      resourceRequests: [],
      employeeId: null,
    };
  },
  computed:{
    ...mapGetters(["getemployeeId", "getdepartmentId"])

  },
  mounted() {
    this.loadEmployeeId();
    this.fetchResourceRequests();
  },
  methods: {
    loadEmployeeId() {
      const storedId = JSON.parse(sessionStorage.getItem("employeeId"));
      if (storedId) {
        this.employeeId = storedId;
      } else {
        console.error("Employee ID not found in sessionStorage.");
      }
    },

    async fetchResourceRequests() {
      try {
        const response = await axios.get(
          `http://localhost:8085/api/EmployeeDetails/getEmployeeviewResource?employeeId=${this.getemployeeId}`
        );
        this.resourceRequests = response.data;
      } catch (error) {
        console.error("Error fetching resource requests:", error);
      }
    },

    formatDate(date) {
      return date ? new Date(date).toLocaleDateString() : "N/A";
    },

    getStatusColor(status) {
      switch (status?.toLowerCase()) {
        case "approved":
          return "green";
        case "pending":
          return "orange";
        case "rejected":
          return "red";
        default:
          return "grey";
      }
    }
  }
};
</script>

<style scoped>
.v-table {
  width: 100%;
  border-collapse: collapse;
}

.v-table th,
.v-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.v-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}
</style>
