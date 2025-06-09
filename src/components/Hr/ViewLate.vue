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
          <th>Submitted Time</th>
          <th>Status</th>
          <th>Actions</th>

          <!-- <th>Submitted Time</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in lateRequests" :key="request.late_id">
          <td>{{ request.lateId }}</td>
          <td>{{ request.department }}</td>
          <td>{{ request.employeeName }}</td>
          <td>{{request.lateDate }}</td>

          <td>{{ request.reason }}</td>
          
          <td>{{request.submittedTime }}</td>
          <td>{{request.status }}</td>
           <td class="border p-2 text-center"> <button @click="openEditDialog(request)">edit</button>
           </td>
          <!-- <td>{{request.submittedTime }}</td> -->
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
      lateRequests: [
    
      ],
      editDialog:false,
      hredited:{},
      isEditing:false,
      viewstatuslist:[],
    };
  },
  async mounted() {
    this.fetchLate();
        this.viewstatus();

    
  },
  

  methods: {
    async fetchLate(){
      //   //
       let departmentId = this.getDepartmentId;

        if (!departmentId) {
          departmentId = JSON.parse(sessionStorage.getItem('departmentId'));
          console.warn('Using departmentId from sessionStorage:', departmentId);
        }

        if (!departmentId) {
                  console.error("Department ID is still undefined. Cannot fetch resources.");
                  return;
        }

          const response = await axios.get(`http://localhost:8085/api/departmentadetails/getAllLateDtobydep?departmentId=${departmentId}`)
          this.lateRequests = response.data;
          this.fetched = true;
          console.log(response);
          

    },
    
    //
    formatDate(dateTime) {
      return new Date(dateTime).toLocaleString();
    },
    getStatusText(statusId) {
      return statusId === 1 ? "Pending" : "Processed"; // Modify according to your statuses
    },
    getStatusClass(statusId) {
      return statusId === 1 ? "pending" : "processed";
    },
     openEditDialog(request) {
      this.hredited = { ...request };
      this.editDialog = true;
    },
    async updateRequest() {
  try {
    const response = await axios.put(
      `http://localhost:8085/api/departmentadetails/addApprovalate?lateId=${this.hredited.lateId}&statusId=${this.hredited.statusId}`
    );

    const index = this.lateRequests.findIndex(v => v.lateId === response.data.lateId);
    if (index !== -1) {
      this.lateRequests[index] = response.data;
      this.fetchLate();
    }

    this.editDialog = false;
  } catch (error) {
    console.error("Error updating resource request:", error);
  }
  
},async viewstatus() {
    try{
      const result = await this.$store.dispatch("allstatus");
      if(result && result.success && Array.isArray(result.data)){
         this.viewstatuslist = result.data.filter(status => 
        status.statusId === 2 || status.statusId === 3
      );
       
        console.log("status:",this.viewstatuslist);
      }else{
        alert("status not found");
      }
    }catch(error){
      console.error("error fetching status list:",error);
    }
    
  },
  },
  
  
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(82, 3, 241, 0.955);
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
.late-table button {
  padding: 8px 16px;
  background-color:  #007bff; /* Soft purple for visibility */
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.late-table button:hover {
  background-color:#b81397;
  transform: scale(1.05);
}

.late-table button:active {
  background-color:#631e7e;
  transform: scale(0.95);
}

</style>
