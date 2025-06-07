<template>
  <div class="container">
    <v-row justify="center">
      <v-col cols="12" lg="6" md="8" sm="9">
        <v-card class="regpage">
          <v-card-title class="text-center">Employee Registration</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field v-model="employee.name" label="Full Name" required></v-text-field>
              <v-text-field v-model="employee.email" label="Email" type="email" :rules="[emailCheck]" required></v-text-field>
              <v-text-field v-model="employee.password" label="Password" type="password" :rules="[passwordCheck]" required></v-text-field>
              <v-text-field v-model="employee.phnno" label="Phone Number" type="tel" required></v-text-field>
              <v-text-field v-model="employee.joinDate" label="Join Date" type="date" required></v-text-field>

              <!-- Fixed Department Selection -->
              <v-select 
  v-model="employee.department"
  :items="viewdeplist"
  item-title="department"   
  item-value="departmentId"
  label="Select Department"
  required
  @update:modelValue="assignDepartment">
</v-select>
<!-- <v-select 
  v-model="employee.roleId"
  :items="viewrolelist"
  item-title="role"  
  item-value="roleId"  
  label="Select Role"
  required>
</v-select> -->




              <v-file-input label="Upload Profile Image" accept="image/*" required @change="onFileChange"></v-file-input>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="error" @click="resetForm">Reset</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submitForm">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      employee: {
        department: "",
        departmentId: null,
        name: "",
        email: "",
        password: "",
        phnno: "",
        joinDate: "",
        roleId:"",
      },
      viewdeplist: [],
      employeeImage: null,
      viewrolelist: [],
    };
  },
  methods: {
    resetForm() {
      this.$refs.form.reset();
      this.employee = {
        department: null,
        name: "",
        email: "",
        password: "",
        phnno: "",
        joinDate: "",
        roleId: "",
      };
      this.employeeImage = null;
    },
    onFileChange(event) {
      this.employeeImage = event.target.files[0];
    },
    async submitForm() {
      console.log("departmentId",this.departmentId);
      
  if (!this.employee.department || !this.employee.name || !this.employee.email || !this.employee.password || !this.employee.phnno || !this.employee.joinDate) {
    alert("Please fill in all fields!");
    return;
  }

  // Ensure department name is stored correctly
  const employeeData = {
    ...this.employee,
    departmentName: this.employee.department,
    departmentId: this.employee.departmentId,
    roleId:this.employee.roleId,  // ✅ Explicitly send as departmentName
  };

  console.log("Sending Data to API:", JSON.stringify(employeeData)); // Debugging log

  let formData = new FormData();
  formData.append(
    "employeeModel",
    new Blob([JSON.stringify(employeeData)], { type: "application/json" })
  );

  if (this.employeeImage) {
    formData.append("employeeImage", this.employeeImage);
  }

  try {
    const response = await axios.post(
      "http://localhost:8085/api/EmployeeDetails/EmployeeData",
      formData
    );
    alert("Registration Successful! " + response.data.joinDate);
    this.resetForm();
  } catch (error) {
    console.error("Error:", error);
    alert("Registration Failed!");
    console.log(formData);
  }
},
assignDepartment(departmentId) {
    const selectedDept = this.viewdeplist.find(dep => dep.departmentId === departmentId);
    if (selectedDept) {
      this.employee.department = selectedDept.department;   // Store department name
      this.employee.departmentId = selectedDept.departmentId; // Store department ID
    }
  },
    emailCheck(value) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(value) || "Invalid email format";
    },
    passwordCheck(value) {
      return value.length >= 6 || "Password must be at least 6 characters";
    },
    async depList() {
      try {
        const result = await this.$store.dispatch("allDep"); // Call Vuex action
        if (result && result.success && Array.isArray(result.data)) {
          this.viewdeplist = result.data;
          console.log("Departments:", this.viewdeplist);
        } else {
          alert("Departments not found");
        }
      } catch (error) {
        console.error("Error fetching department list:", error);
      }
    },
    async roleList() {
  try {
    const result = await this.$store.dispatch("roles"); // Fetch roles from Vuex

    if (result && result.success && Array.isArray(result.data)) {
      // ✅ Filter only "employee" and "hr"
      this.viewrolelist = result.data.filter(role => role.role !== "admin");

      console.log("Filtered Roles:", this.viewrolelist); // Debugging log
    } else {
      alert("Roles not found");
    }
  } catch (error) {
    console.error("Error fetching roles list:", error);
  }
},

  },
  mounted() {
    this.roleList();
    this.depList();
  },
};
</script>

<style scoped>
.regpage {
  margin-top: 50px;
  background-color: #f9f9f9;
  padding: 20px;
}
.container {
  background-color: #f0f2f5;
  max-width: 1800px;
}
</style>
