<template>
  <br>
  <br>
 
  <v-container>
    <v-card class="mx-auto" max-width="400" title="Request Resource">
      <v-container>
        
        <v-select 
          v-model="resource"
          :items="viewresolist"
          color="primary"
          label="Resource Name"
          variant="underlined"
          item-title="resource"   
          item-value="resourceId"
          required
          @update:modelValue="assignResource">
        </v-select>

      

        <v-text-field
          v-model="quantity"
          color="primary"
          label="Quantity"
          variant="underlined"
          type="number"
          required
        ></v-text-field>

        <v-text-field
          v-model="reason"
          color="primary"
          label="Reason"
          placeholder="Enter your reason"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="date"
          color="primary"
          label="Request Date"
          variant="underlined"
          type="date"
          required
        ></v-text-field>

        <v-text-field
          v-model="status"
          color="primary"
          label="Status"
          variant="underlined"
          type="status"
          required
        ></v-text-field>

       
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="submitRequest">
          Submit
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>

</template>

<script>
export default {
  data() {
    return {
      // employeeName: "",
      resource: "",
      quantity: null,
      reason: "",
      date: "",
      status: "Pending",
      viewresolist:[],
    };
  },
  mounted() {
    this.resoList();
  },
  methods: {
    async submitRequest() {
    
      if ( !this.resource || !this.quantity || !this.date) {
        alert("Please fill in all required fields.");
        return;
      }
      const payload= {
        resourceId: this.resourceId,
        employeeId: "1",
        quantity: this.quantity,
        reason: this.reason,
        requestDate: this.date,
        status: this.status,
      };
      try{
      const response = await this.$store.dispatch("reqResource",payload);
      alert("request added",response.data)
    }catch(error){
      console.error("error fetching resource list:",error);
      
    }
    },
    assignResource(resourceId){
    const selectedReso = this.viewresolist.find(res => res.resourceId === resourceId);
    if(selectedReso) {
      this.resource= selectedReso.resource;
      this.resourceId = selectedReso.resourceId;
    }
  },
  async resoList() {
    try{
      const result = await this.$store.dispatch("allRes");
      if(result && result.success && Array.isArray(result.data)){
        this.viewresolist = result.data;
        console.log("Resources:",this.viewresolist);
      }else{
        alert("resources not found");
      }
    }catch(error){
      console.error("error fetching resource list:",error);
    }
    
  },

  async statusList() {
    try{
      const result = await this.$store.dispatch("allstatus");
      if(result && result.success && Array.isArray(result.data)){
        this.viewstatuslist = result.data;
        console.log("Status:",this.viewstatuslist);
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
