<template>
  <div class="container mt-4" style="background-color: #f4f6f9; padding: 30px; border-radius: 8px;">
    <br>
    
    <h2 class="text-center" style="color: #343a40; font-family: 'Arial', sans-serif; font-weight: 600;">Departments</h2>
    <br>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="department in departments" :key="department.departmentId">
        <div class="card shadow-lg" style="background-color: #ffffff; border-radius: 12px; border: none; transition: transform 0.3s ease-in-out;">
          <div class="card-body" style="padding: 25px; text-align: center;">
            <h5 class="card-title" style="color: #212529; font-family: 'Arial', sans-serif; font-weight: 600;">{{ department.department }}</h5>
            <p class="card-text" style="color: #6c757d; font-size: 14px;">Department ID: {{ department.departmentId }}</p>
           <!-- <p class="card-text" style="color: #6c757d; font-size: 14px;">Quantity: {{ resource.quantity }}</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      fetched : false,
      departments: [
      ]
    }; 
  },
  async mounted(){
    this.fetchDepartments();
  },
  methods:{
    async fetchDepartments(){
      const response  = await axios.get(`http://localhost:8085/api/departmentadetails/listdepartment`)
      this.departments = response.data;
      this.fetched = true;
    }
  }
};
</script>

<style>
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
