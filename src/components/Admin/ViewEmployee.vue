<template>
  <v-main>
    <div class="container">
      <h2 class="title">Employee Details</h2>

      <v-card v-for="employee in employees" :key="employee.employeeId" class="mb-4 pa-4">
        <v-row>
          <!-- Employee Image -->
          <v-col cols="12" md="3" class="text-center">
            <v-img
              :src="'data:image/png;base64,' + employee.employeeImage"
              alt="Employee Image"
              aspect-ratio="1"
              class="rounded"
              max-width="150"
            ></v-img>
          </v-col>

          <!-- Employee Details -->
          <v-col cols="12" md="9">
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title><strong>Name:</strong> {{ employee.name }}</v-list-item-title>
                  <v-list-item-subtitle><strong>Email:</strong> {{ employee.email }}</v-list-item-subtitle>
                  <v-list-item-subtitle><strong>Phone:</strong> {{ employee.phnno }}</v-list-item-subtitle>
                  <v-list-item-subtitle><strong>Department:</strong> {{ employee.departmentName }}</v-list-item-subtitle>
                  <v-list-item-subtitle><strong>Designation ID:</strong> {{ employee.designationId }}</v-list-item-subtitle>
                  <v-list-item-subtitle><strong>Role ID:</strong> {{ employee.roleId }}</v-list-item-subtitle>
                  <v-list-item-subtitle><strong>Join Date:</strong> {{ formatDate(employee.joinDate) }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <div class="text-right mt-2">
              <v-btn color="primary" @click="openDialog(employee)">Set Designation</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>

      <!-- Designation Dialog -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>Set Designation</v-card-title>
          <v-card-text>
            <v-select 
              v-model="selectedDesignationId"
              :items="viewdesignationlist"
              color="primary"
              label="Designation Name"
              variant="underlined"
              item-title="designationName"   
              item-value="designationId"
              required
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="dialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue" @click="updateDesignation">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-main>
</template>
<script>
import axios from "axios";

export default {
  name: "AdminEmployeeView",
  data() {
    return {
      employees: [],
      viewdesignationlist: [],
      dialog: false,
      selectedEmployeeId: null,
      selectedDesignationId: null,
    };
  },
  mounted() {
    this.fetchEmployees();
    this.designationList();
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await axios.get("http://localhost:8085/api/AdminDetails/listEmployees");
        this.employees = response.data;
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    },
    async designationList() {
      try {
        const result = await this.$store.dispatch("alldesignation");
        if (result && result.success && Array.isArray(result.data)) {
          this.viewdesignationlist = result.data;
        } else {
          alert("Designations not found");
        }
      } catch (error) {
        console.error("Error fetching designation list:", error);
      }
    },
    openDialog(employee) {
      this.selectedEmployeeId = employee.employeeId;
      this.selectedDesignationId = employee.designationId;
      this.dialog = true;
    },
    async updateDesignation() {
      try {
        const response = await axios.put(
          `http://localhost:8085/api/AdminDetails/updateDesignation`,
          null,
          {
            params: {
              employeeId: this.selectedEmployeeId,
              designationId: this.selectedDesignationId,
            },
          }
        );

        if (response.status === 200) {
          alert("Designation updated successfully!");
          this.dialog = false;
          this.fetchEmployees(); // Refresh data
        } else {
          alert("Failed to update designation");
        }
      } catch (error) {
        console.error("Failed to update designation:", error);
        alert("Error updating designation");
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}
.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 26px;
  font-weight: bold;
}
.rounded {
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>