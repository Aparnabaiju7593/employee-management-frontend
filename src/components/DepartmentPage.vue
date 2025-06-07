<template>
  <div class="department-page">
    <!-- Header -->
    <div class="header-section">
      <v-container>
        <v-main>
        <v-row align="center" justify="end">
          <v-col cols="auto">
            <v-btn color="primary" class="px-6" @click="openAddDialog">
              <v-icon left>mdi-plus</v-icon>
              Add Department
            </v-btn>
          </v-col>
        </v-row>
        </v-main>
      </v-container>
    </div>

    <!-- Department Cards -->
    <v-container>
      <v-row>
        <v-col
          v-for="department in departments"
          :key="department.departmentId"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="department-card" elevation="2" :loading="loading">
            <v-card-title class="d-flex justify-space-between align-center">
              <span class="text-h6">{{ department.department }}</span>
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
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
                  <v-list-item-subtitle>Dept ID: {{ department.departmentId }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account-group</v-icon>
                  </v-list-item-icon>
                  <v-list-item-subtitle>Employees: {{ department.employeeCount || 0 }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h6">{{ formTitle }}</v-card-title>
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
          <v-btn text color="grey darken-1" @click="closeDialog">Cancel</v-btn>
          <v-btn text color="primary" @click="saveDepartment">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">Delete Department</v-card-title>
        <v-card-text>Are you sure you want to delete this department?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey darken-1" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn text color="error" @click="deleteDepartment">Delete</v-btn>
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
      departments: [],
      dialog: false,
      deleteDialog: false,
      editedIndex: -1,
      editedDepartment: {
        department: '',
        departmentId: null
      },
      defaultDepartment: {
        department: '',
        departmentId: null
      },
      loading: false,
      fetched: false,
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Department' : 'Edit Department';
    },
  },

  mounted() {
    this.fetchDepartments();
  },

  methods: {
    async fetchDepartments() {
      this.loading = true;
      try {
        const { data } = await axios.get('http://localhost:8085/api/departmentadetails/listdepartment');
        this.departments = data;
        this.fetched = true;
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        this.loading = false;
      }
    },

    openAddDialog() {
      this.editedIndex = -1;
      this.editedDepartment = { ...this.defaultDepartment };
      this.dialog = true;
    },

    editDepartment(department) {
      this.editedIndex = this.departments.findIndex(dep => dep.departmentId === department.departmentId);
      this.editedDepartment = { ...department };
      this.dialog = true;
    },

    confirmDelete(department) {
      this.editedDepartment = { ...department };
      this.deleteDialog = true;
    },

    async saveDepartment() {
      const { departmentId, department } = this.editedDepartment;
      const url = departmentId
        ? `http://localhost:8085/api/departmentadetails/updateDep/${departmentId}`
        : 'http://localhost:8085/api/departmentadetails/addData';

      const method = departmentId ? 'put' : 'post';
      const payload = { department };

      try {
        await axios[method](url, payload);
        this.closeDialog();
        this.fetchDepartments();
      } catch (error) {
        console.error('Error saving department:', error);
      }
    },

    async deleteDepartment() {
      const { departmentId } = this.editedDepartment;
      try {
        await axios.delete(`http://localhost:8085/api/departmentadetails/deleteDep/${departmentId}`);
        this.deleteDialog = false;
        this.fetchDepartments();
      } catch (error) {
        console.error('Error deleting department:', error);
      }
    },

    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedDepartment = { ...this.defaultDepartment };
        this.editedIndex = -1;
      });
    }
  }
};
</script>

<style scoped>
.department-card {
  margin-left: auto; /* pushes it to right if inside a single column */
}
</style>

