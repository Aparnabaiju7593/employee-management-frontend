<template>
    <div>
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border px-4 py-2">Request ID</th>
            <th class="border px-4 py-2">Approval Date</th>
            <th class="border px-4 py-2">Employee ID</th>
            <th class="border px-4 py-2">Quantity</th>
            <th class="border px-4 py-2">Reason</th>
            <th class="border px-4 py-2">Request Date</th>
            <th class="border px-4 py-2">Resource ID</th>
            <th class="border px-4 py-2">Status</th>
            <th class="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(request, index) in requests" :key="request.req_resource_id">
            <td class="border px-4 py-2">{{ request.req_resource_id }}</td>
            <td class="border px-4 py-2">{{ request.approval_date }}</td>
            <td class="border px-4 py-2">{{ request.employee_id }}</td>
            <td class="border px-4 py-2">{{ request.quantity }}</td>
            <td class="border px-4 py-2">{{ request.reason }}</td>
            <td class="border px-4 py-2">{{ request.request_date }}</td>
            <td class="border px-4 py-2">{{ request.resource_id }}</td>
            <td class="border px-4 py-2">
              <select v-model="request.status_id" class="border p-1">
                <option v-for="status in statuses" :key="status.id" :value="status.id">
                  {{ status.label }}
                </option>
              </select>
            </td>
            <td class="border px-4 py-2">
              <button @click="updateStatus(request, index)" class="bg-blue-500 text-white px-2 py-1 rounded">
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        requests: [
          { req_resource_id: 14, approval_date: "2025-03-05 11:03:46", employee_id: 3, quantity: 5, reason: "yftrsw43io", request_date: "2025-02-13", resource_id: 2, status_id: 1 },
          { req_resource_id: 13, approval_date: "2025-03-06 13:39:48", employee_id: 4, quantity: 2, reason: "ghvrdxrei", request_date: "2025-02-23", resource_id: 3, status_id: 3 },
          { req_resource_id: 15, approval_date: "2025-03-06 13:41:02", employee_id: 1, quantity: 3, reason: "yftrsw43io", request_date: "2025-01-13", resource_id: 7, status_id: 3 },
          { req_resource_id: 16, approval_date: "2025-03-07 11:38:58", employee_id: 2, quantity: 3, reason: "yftrsw43io", request_date: "2025-01-11", resource_id: 2, status_id: 3 },
          { req_resource_id: 18, approval_date: "2025-04-01 15:07:31", employee_id: 8, quantity: 5, reason: "ertyuiogo", request_date: "2025-06-13", resource_id: 6, status_id: 2 },
        ],
        statuses: [
          { id: 1, label: "Pending" },
          { id: 2, label: "Approved" },
          { id: 3, label: "Rejected" },
        ]
      };
    },
    methods: {
      updateStatus(request, index) {
        console.log("Updated status:", request);
        alert(`Status updated for request ID ${request.req_resource_id} to ${this.statuses.find(s => s.id === request.status_id).label}`);
        // TODO: Add API call to update the status in the backend.
      }
    }
  };
  </script>
  
  <style>
  table {
    width: 100%;
  }
  </style>
  