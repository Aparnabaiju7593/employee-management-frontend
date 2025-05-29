<template>
  <v-main>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-4">Resource Requests</h2>

    <table class="w-full table-auto border-collapse border border-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th class="border p-2">Request ID</th>
          <th class="border p-2">Employee </th>
          <th class="border p-2">Resource </th>
          <th class="border p-2">Department ID</th>
          <th class="border p-2">Quantity</th>
          <th class="border p-2">Reason</th>
          <th class="border p-2">Request Date</th>
          <th class="border p-2">Approval Date</th>
          <th class="border p-2">Status</th>
          <th class="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="req in reqResources" :key="req.reqResourceId">
          <td class="border p-2 text-center">{{ req.reqResourceId }}</td>
          
          <td class="border p-2 text-center">{{ req.employee }}</td>
          <td class="border p-2 text-center">{{ req.resource }}</td>
           <td class="border p-2 text-center">{{ req.departmentId }}</td>
          <td class="border p-2 text-center">{{ req.quantity }}</td>
          <td class="border p-2 text-center">{{ req.reason }}</td>
          <td class="border p-2 text-center">{{ req.requestDate }}</td>
          <td class="border p-2 text-center">
            {{ req.approvalDate }}

          </td>
          <td class="border p-2 text-center">{{ req.status }}</td>
          <td class="border p-2 text-center"> <button @click="openEditDialog(req)">edit</button>
</td>
          
        </tr>
      </tbody>
    </table>

    <!-- Edit status Dialog -->
    <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
              <v-card-title>Edit Status</v-card-title>
              <v-card-text>
                <v-text-field label="EmployeeId" v-model="adminedited.employeeId" readonly></v-text-field>

                <v-select 
                  label="Status" 
                  v-model="adminedited.statusId"
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
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      reqResources: [],
      adminedited:{},
      editDialog: false,
      isEditing: false,
      viewstatuslist:[],
    };
  },
  async mounted() {
    this.fetchReqResoures();
    this.viewstatus();
  },
  computed:{
    ...mapGetters([" getdepartmentId"])
  },
  methods: {
   async fetchReqResoures() {
  let departmentId = this.getDepartmentId;

  if (!departmentId) {
    departmentId = JSON.parse(sessionStorage.getItem('departmentId'));
    console.warn('Using departmentId from sessionStorage:', departmentId);
  }

  if (!departmentId) {
    console.error("Department ID is still undefined. Cannot fetch resources.");
    return;
  }

  try {
    const response = await axios.get(`http://localhost:8085/api/departmentadetails/getResource?departmentId=${departmentId}`);
    this.reqResources = response.data;
  } catch (error) {
    console.error("Error fetching resources:", error);
  }
}

,
   openEditDialog(req) {
      this.adminedited = { ...req };
      this.editDialog = true;
    },
    async updateRequest() {
  try {
    const response = await axios.put(
      `http://localhost:8085/api/departmentadetails/addApprovals?employeeId=${this.adminedited.employeeId}&statusId=${this.adminedited.statusId}&reqResourceId=${this.adminedited.reqResourceId}`
    );

    const index = this.reqResources.findIndex(v => v.reqResourceId === response.data.reqResourceId);
    if (index !== -1) {
      this.reqResources[index] = response.data;
      this.fetchReqResoures();
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

    
    
  },
 
    
};
</script>

<style scoped>
table {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
