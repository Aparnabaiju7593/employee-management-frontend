<template>
  <v-main>
    <div class="container">
      <h2 class="title">Employee Details</h2>

      <v-card
        v-for="employee in employees"
        :key="employee.employeeId"
        class="mb-4 pa-4"
      >
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
                  <v-list-item-title>
                    <strong>Name:</strong> {{ employee.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <strong>Email:</strong> {{ employee.email }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <strong>Phone:</strong> {{ employee.phnno }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <strong>Department:</strong> {{ employee.departmentName }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <strong>Designation :</strong> {{ employee.designationName }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <strong>Role :</strong> {{ employee.role }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <strong>Join Date:</strong> {{ formatDate(employee.joinDate) }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-main>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex';


export default {
  name: "AdminEmployeeView",
  data() {
    return {
      employees: [],
    };
  },
  mounted() {
    this.fetchEmployees();
  },
  computed:{
    ...mapGetters([" getdepartmentId"])
  },
  methods: {
    
    async fetchEmployees() {
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
        const response = await axios.get(`http://localhost:8085/api/departmentadetails/listEmployeesbyhr?departmentId=${departmentId}`);
        this.employees = response.data;
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
  }
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
