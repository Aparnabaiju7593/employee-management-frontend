<template>
  <div class="department-page">
    <div class="header-section mb-6">
      <v-container>
        <v-main>
        <v-row align="center" justify="space-between">
          <!-- <v-col cols="6">
            <h1 class="text-h4 font-weight-bold primary--text">Department Management</h1> -->
          <!-- </v-col> -->
          <v-col cols="6" class="text-right">
            <v-btn 
              color="primary" 
              @click="openAddDialog"
              class="px-6"
            >
              <v-icon left>mdi-plus</v-icon>
              Add Department
            </v-btn>
          </v-col>
        </v-row>
        </v-main>
      </v-container>
    </div>

    <v-container>
      <v-row>
        <v-col v-for="department in departments" 
               :key="department.departmentId" 
               cols="12" sm="6" md="4">
          <v-card 
            class="department-card"
            elevation="2"
            :loading="loading"
          >
            <v-card-title class="d-flex justify-space-between align-center">
              <span class="text-h6">{{ department.department }}</span>
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="editDepartment(department)">
                    <v-list-item-icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="confirmDelete(department)">
                    <v-list-item-icon>
                      <v-icon color="error">mdi-delete</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="error--text">Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>

            <v-card-text>
              <v-list dense>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-identifier</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle>Department ID: {{ department.departmentId }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account-group</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle>Employees: {{ department.employeeCount || 0 }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Add/Edit Department Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedDepartment.department"
                  label="Department Name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" text @click="saveDepartment">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Delete Department</v-card-title>
        <v-card-text>
          Are you sure you want to delete this department?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" text @click="deleteDepartment">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
 
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      fetched: false,
      loading: false,
      dialog: false,
      deleteDialog: false,
      departments: [],
      editedIndex: -1,
      editedDepartment: {
        department: '',
        departmentId: null
      },
      defaultDepartment: {
        department: '',
        departmentId: null
      }
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Department' : 'Edit Department'
    }
  },

  async mounted() {
    this.fetchDepartments()
  },

  methods: {
    async fetchDepartments() {
      this.loading = true
      try {
        const response = await axios.get('http://localhost:8085/api/departmentadetails/listdepartment')
        this.departments = response.data
        this.fetched = true
      } catch (error) {
        console.error('Error fetching departments:', error)
      } finally {
        this.loading = false
      }
    },

    openAddDialog() {
      this.editedIndex = -1
      this.editedDepartment = Object.assign({}, this.defaultDepartment)
      this.dialog = true
    },

    editDepartment(department) {
      this.editedIndex = this.departments.indexOf(department)
      this.editedDepartment = Object.assign({}, department)
      this.dialog = true
    },

    confirmDelete(department) {
      this.editedDepartment = Object.assign({}, department)
      this.deleteDialog = true
    },

    async saveDepartment() {
      try {
        if (this.editedIndex > -1) {
          // Update existing department
          await axios.put(`http://localhost:8085/api/departmentadetails/updateDep/${this.editedDepartment.departmentId}`, {
            department: this.editedDepartment.department
          })
        } else {
          // Create new department
          await axios.post('http://localhost:8085/api/departmentadetails/addData', {
            department: this.editedDepartment.department
          })
        }
        this.closeDialog()
        this.fetchDepartments()
      } catch (error) {
        console.error('Error saving department:', error)
      }
    },

    async deleteDepartment() {
      try {
        await axios.delete(`http://localhost:8085/api/departmentadetails/deleteDep/${this.editedDepartment.departmentId}`)
        this.deleteDialog = false
        this.fetchDepartments()
      } catch (error) {
        console.error('Error deleting department:', error)
      }
    },

    closeDialog() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedDepartment = Object.assign({}, this.defaultDepartment)
        this.editedIndex = -1
      })
    }
  }
}
</script>

<style scoped>
.department-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-top: 2rem;
}

.header-section {
  background-color: white;
  padding: 2rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.department-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.department-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.v-card__title {
  border-bottom: 1px solid #e0e0e0;
}
</style>
