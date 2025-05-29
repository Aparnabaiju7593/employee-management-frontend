<template>
  <v-main>
    <div class="container">
      
      <h2 class="title">Leave Requests</h2>
      <table class="leave-table">
        <thead>
          <tr>
            <th>Leave ID</th>
            
            <th>Employee</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>

            
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in leaveRequests" :key="request.leave_id">
            <td>{{ request.leaveId }}</td>
            <td>{{ request.employeeName }}</td>
            <td>{{ (request.startDate) }}</td>
            <td>{{ (request.endDate) }}</td>
            <td>{{ request.reason }}</td>
            <td>{{ request.status }}</td>
            <td class="border p-2 text-center"> <button @click="openEditDialog(request)">edit</button>
</td>
           
          </tr>
        </tbody>
      </table>
       <!-- Edit status Dialog -->
    <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
              <v-card-title>Edit Status</v-card-title>
              <v-card-text>

                <v-select 
                  label="Status" 
                  v-model="hredited.statusId"
                  :items="viewstatuslist"
                  item-title="statusName"   
          item-value="statusId">
                           </v-select>

              </v-card-text>
              <v-card-actions>
                <v-btn @click="editDialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="blue" @click="updateRequest">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
    </div>
  </v-main>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    data() {
      return {
        leaveRequests: [
        ],
         editDialog: false,hredited:{},
      isEditing: false,
      viewstatuslist:[],
      };
    },
    async mounted(){
      this.fetchLeave();
          this.viewstatus();

    },
    
      
    
    methods: {
      async fetchLeave(){
        let departmentId = this.getDepartmentId;

  if (!departmentId) {
    departmentId = JSON.parse(sessionStorage.getItem('departmentId'));
    console.warn('Using departmentId from sessionStorage:', departmentId);
  }

  if (!departmentId) {
    console.error("Department ID is still undefined. Cannot fetch resources.");
    return;
  }

        const response = await axios.get(`http://localhost:8085/api/departmentadetails/getLeaveDtobydep?departmentId=${departmentId}`)
        this.leaveRequests = response.data;
        this.fetched = true;
        console.log(response);

      },
       openEditDialog(request) {
      this.hredited = { ...request };
      this.editDialog = true;
    },
    async updateRequest() {
  try {
    const response = await axios.put(
      `http://localhost:8085/api/departmentadetails/addApprovaleave?leaveId=${this.hredited.leaveId}&statusId=${this.hredited.statusId}`
    );

    const index = this.leaveRequests.findIndex(v => v.leaveId === response.data.leaveId);
    if (index !== -1) {
      this.leaveRequests[index] = response.data;
      this.fetchLeave();
    }

    this.editDialog = false;
  } catch (error) {
    console.error("Error updating resource request:", error);
  }
},async viewstatus() {
    try{
      const result = await this.$store.dispatch("allstatus");
      if(result && result.success && Array.isArray(result.data)){
        this.viewstatuslist = result.data;
        console.log("status:",this.viewstatuslist);
      }else{
        alert("status not found");
      }
    }catch(error){
      console.error("error fetching status list:",error);
    }
    
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
  