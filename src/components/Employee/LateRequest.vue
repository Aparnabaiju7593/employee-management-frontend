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
<td class="border p-2">{{ formatDateAndTime(late.submittedTime) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</v-main>
</template>


<script>
import axios from 'axios';
  import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      employeeId: null,
      lateRequests: []
    };
  },
 computed:{
    ...mapGetters(["getemployeeId", "getdepartmentId"])

  },

  methods: {
 
  formatDateAndTime(datetimeString) {
    if (!datetimeString) return "";

    // Split at 'T' and keep the date and time parts
    const [datePart, timePart] = datetimeString.split("T");
    const [year, month, day] = datePart.split("-");
    const [hour, minute] = timePart.split(":");

    return `${day}/${month}/${year} ${hour}:${minute}`;
  }
,
    async fetchLateRequests() {
      try {

        const response = await axios.get("http://localhost:8085/api/EmployeeDetails/getLateview", {
          params: { employeeId: this.getemployeeId }
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