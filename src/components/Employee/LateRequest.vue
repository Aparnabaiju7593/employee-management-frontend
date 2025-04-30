<template>
  <v-main>
  <div class="p-6">
    <!-- <h1 class="text-2xl font-semibold mb-4">Late Requests</h1> -->
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border p-2">Employee Name</th>
          <th class="border p-2">Department</th>
          <th class="border p-2">Late Date</th>
          <th class="border p-2">Reason</th>
          <th class="border p-2">Status</th>
          <th class="border p-2">Submitted Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="late in lateRequests" :key="late.lateId" class="text-center">
          <td class="border p-2">{{ late.employeeName }}</td>
          <td class="border p-2">{{ late.department }}</td>
          <td class="border p-2">{{ late.lateDate }}</td>
          <td class="border p-2">{{ late.reason }}</td>
          <td class="border p-2">
            <span :class="statusClass(late.status)">{{ late.status }}</span>
          </td>
          <td class="border p-2">{{ late.submittedTime }}</td>
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
      employeeId: null,
      lateRequests: []
    };
  },
 
  methods: {
    async fetchLateRequests() {
      this.employeeId = this.$route.query.employeeId || localStorage.getItem("employeeId");
      if (!this.employeeId) {
        console.error("Employee ID is missing or undefined.");
        return;
      }
      try {
        const response = await axios.get("http://localhost:8085/api/EmployeeDetails/getLateview", {
          params: { employeeId: this.employeeId }
        });
        this.lateRequests = response.data;
      } catch (error) {
        console.error("Error fetching late requests:", error);
      }
    },
    statusClass(status) {
      return {
        "text-yellow-500": status === "pending",
        "text-green-500": status === "approved",
        "text-red-500": status === "rejected"
      };
    }
  },
  created() {
    this.fetchLateRequests();
  }
};
</script>

<style>
th, td {
  text-align: center;
}
</style>