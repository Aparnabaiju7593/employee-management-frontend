<template>
  <v-main>
    <div class="p-6">
      <h2 class="text-2xl font-semibold mb-4">All Resource Requests</h2>

      <table class="w-full table-auto border-collapse border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="border p-2">Request ID</th>
            <th class="border p-2">Employee </th>
            <th class="border p-2">Resource</th>
            <th class="border p-2">Department</th>
            <th class="border p-2">Quantity</th>
            <th class="border p-2">Reason</th>
            <th class="border p-2">Request Date</th>
            <th class="border p-2">Approval Date</th>
            <th class="border p-2">Status </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="req in allRequests" :key="req.reqResourceId">
            <td class="border p-2 text-center">{{ req.reqResourceId }}</td>
            <td class="border p-2 text-center">{{ req.employee }}</td>
            <td class="border p-2 text-center">{{ req.resource}}</td>
            <td class="border p-2 text-center">{{ req.department || '—' }}</td>
            <td class="border p-2 text-center">{{ req.quantity || '—' }}</td>
            <td class="border p-2 text-center">{{ req.reason }}</td>
            <td class="border p-2 text-center">{{ formatDate(req.requestDate) }}</td>
            <td class="border p-2 text-center">{{ formatDate(req.approvalDate) || 'Pending' }}</td>
            <td class="border p-2 text-center">{{ req.status }}</td>
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
      allRequests: []
    };
  },
  async mounted() {
    this.fetchAllRequests();
  },
  methods: {
    async fetchAllRequests() {
      try {
        const response = await axios.get("http://localhost:8085/api/AdminDetails/admingetResource");
        this.allRequests = response.data;
      } catch (error) {
        console.error("Failed to fetch resource requests:", error);
      }
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString() : null;
    }
  }
};
</script>

<style scoped>
table {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
