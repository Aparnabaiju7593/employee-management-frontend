<template>
 <v-main>

  <div class="container mt-4" style="background-color: #f4f6f9; margin-left: 50px; padding: 30px; border-radius: 8px;">
    <h2 class="text-center" style="color: #343a40; font-family: 'Arial', sans-serif; font-weight: 600;">Office Resources</h2>
    <button id="addresource" @click="addResourcedialog=true"><v-icon>mdi-plus</v-icon>Add resource</button>
    <div class="row">
      <div class="col-md-4 mb-4 " v-for="resource in resources" :key="resource.resource_id">
        <div class="card shadow-lg" style="background-color: #ffffff; border-radius: 12px; border: none; transition: transform 0.3s ease-in-out;">
          <div class="card-body" style="padding: 25px; text-align: center;">
            <h5 class="card-title" style="color: #212529; font-family: 'Arial', sans-serif; font-weight: 600;">{{ resource.resource }}</h5>
            <p class="card-text" style="color: #6c757d; font-size: 14px;">Resource ID: {{ resource.resourceId }}</p>
            <p class="card-text" style="color: #6c757d; font-size: 14px;">Quantity: {{ resource.quantity }}</p>
<button id="editquantity" @click="openEditDialog(resource)">Edit Quantity</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <v-dialog v-model="addResourcedialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="addedResource.resource"
                  label="Resource Name"
                  required 
                ></v-text-field>
                <v-text-field
                  v-model="addedResource.quantity"
                  label="Quantity"
                  required 
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="addResourcedialog=false">Cancel</v-btn>
          <v-btn color="primary" text @click="addResource">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="editResourcedialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedResource.quantity"
                  label="Quantity"
                  required
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="editResourcedialog=false">Cancel</v-btn>
          <v-btn color="primary" text @click="editResource">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


</v-main>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      fetched : false,
      resources: [
       
      ],
      addResourcedialog:false,
      editResourcedialog:false,
      addedResource:{
        resource:'',
        quantity:''
      },
      editedResource:{
        quantity:''
      }
    }; 
  },
  async mounted(){
    this.fetchResources();
  },
  methods:{
    openEditDialog(resource) {
  this.selectedResource = resource; 
  this.addedResource.quantity = resource.quantity; 
  this.editResourcedialog = true;
},
    async fetchResources(){
      const response  = await axios.get(`http://localhost:8085/api/departmentadetails/getResources`)
      this.resources = response.data;
      this.fetched = true;
    },
    async addResource() {
      const payload = {
         resource: this.addedResource.resource, 
        quantity: this.addedResource.quantity,
      };

      try {
        const response = await axios.post("http://localhost:8085/api/departmentadetails/addResources", payload);
        alert("Resource added successfully!");
        this.fetchResources();
        console.log(response);
        this.addResourcedialog=false;
      } catch (error) {
        console.error("Error adding resource", error);
        alert("Failed to add resource.");
      }
    },
    async editResource() {
           const resourceId=this.selectedResource.resourceId
        const quantity= Number(this.editedResource.quantity)
        
      try {
        const response = await axios.put("http://localhost:8085/api/AdminDetails/updateResource",null,
        { params: { resourceId, quantity } }
          
        );
        alert("Resource quantity edited successfully!");
        this.fetchResources();
        console.log(response);
        this.editResourcedialog=false;
      } catch (error) {
        console.error("Error editing resource", error);
        alert("Failed to edit resource.");
      }
    },
  }
};
</script>

<style>
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
#editquantity{
  width: 150px;
  height: 30px;
  background-color: rgb(255, 153, 0);
  border-radius:80px;
  color: white;
}
#addresource{
  width: 150px;
  height: 30px;
  background-color: rgb(0, 110, 255);
  border-radius: 8px;
  color: white;
    margin-bottom: 15px;

}
</style>
