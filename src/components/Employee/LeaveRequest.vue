<template>
  <v-main>
  <div class="p-6">
    <!-- <h1 class="text-2xl font-semibold mb-4">Leave Requests</h1> -->
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border p-2">Employee Name</th>
          <th class="border p-2">Start Date</th>
          <th class="border p-2">End Date</th>
          <th class="border p-2">Reason</th>
          <th class="border p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="leave in leaveRequests" :key="leave.id" class="text-center">
          <td class="border p-2">{{ leave.employeeName }}</td>
          <td class="border p-2">{{ leave.startDate }}</td>
          <td class="border p-2">{{ leave.endDate }}</td>
          <td class="border p-2">{{ leave.reason }}</td>
          <td class="border p-2">
            <span :class="statusClass(leave.status)">{{ leave.status }}</span>
          </td>
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
      leaveRequests: []
    };
  },
  methods: {
    async fetchLeaveRequests() {
      // ✅ Ensure employeeId is correctly retrieved
      this.employeeId = this.$route.query.employeeId || localStorage.getItem("employeeId");

      if (!this.employeeId) {
        console.error("Employee ID is missing or undefined.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8085/api/EmployeeDetails/getLeaveView", {
          params: { employeeId: this.employeeId } // Correct way to pass query parameters
        });
        this.leaveRequests = response.data;
      } catch (error) {
        console.error("Error fetching leave requests:", error);
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
    this.fetchLeaveRequests();
  }
};
</script>


<style>
th, td {
  text-align: center;
}
</style>