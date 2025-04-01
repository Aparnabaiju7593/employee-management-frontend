<template>
  <div class="container mt-4" style="background-color: #f4f6f9; padding: 30px; border-radius: 8px;">
    <h2 class="text-center" style="color: #343a40; font-family: 'Arial', sans-serif; font-weight: 600;">Office Resources</h2>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="resource in resources" :key="resource.resource_id">
        <div class="card shadow-lg" style="background-color: #ffffff; border-radius: 12px; border: none; transition: transform 0.3s ease-in-out;">
          <div class="card-body" style="padding: 25px; text-align: center;">
            <h5 class="card-title" style="color: #212529; font-family: 'Arial', sans-serif; font-weight: 600;">{{ resource.resource }}</h5>
            <p class="card-text" style="color: #6c757d; font-size: 14px;">Resource ID: {{ resource.resourceId }}</p>
            <p class="card-text" style="color: #6c757d; font-size: 14px;">Quantity: {{ resource.quantity }}</p>
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
      resources: [
        // { resource_id: 1, quantity: 48, resource: 'pappers' },
        // { resource_id: 4, quantity: 138, resource: 'pappers' },
        // { resource_id: 5, quantity: 38, resource: 'printer' },
        // { resource_id: 6, quantity: 68, resource: 'desk' },
        // { resource_id: 3, quantity: 30, resource: 'software' },
        // { resource_id: 7, quantity: 15, resource: 'chair' },
        // { resource_id: 2, quantity: 37, resource: 'laptop' }
      ]
    }; 
  },
  async mounted(){
    this.fetchResources();
  },
  methods:{
    async fetchResources(){
      const response  = await axios.get(`http://localhost:8085/api/departmentadetails/getResources`)
      this.resources = response.data;
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
