<template>
  <br><br>
  <v-container>
    <v-card class="mx-auto" max-width="500" title="Request Leave">
      <v-container>

        <!-- Department Dropdown -->
        <!-- <v-select 
          v-model="departmentId"
          :items="departments"
          color="primary"
          label="Select Department"
          item-title="department"
          item-value="departmentId"
          variant="underlined"
          required
        ></v-select> -->

        <!-- Reason -->
        <v-text-field
          v-model="reason"
          color="primary"
          label="Reason"
          placeholder="Enter your reason for leave"
          variant="underlined"
        ></v-text-field>

        <!-- Start Date -->
        <v-text-field
          v-model="startDate"
          color="primary"
          label="Start Date"
          type="date"
           :min="minDate"
          variant="underlined"
          required
        ></v-text-field>

        <!-- End Date -->
        <v-text-field
          v-model="endDate"
          color="primary"
          label="End Date"
          type="date"
           :min="minDate"
          variant="underlined"
          required
        ></v-text-field>

      </v-container>

      <!-- <v-divider></v-divider> -->

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="submitLeaveRequest">
          Submit
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>


<script>
  import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      reason: "",
      startDate: "",
      endDate: "",
      departments: [],
       minDate: new Date().toISOString().split("T")[0]
    };
  },
  computed:{
    ...mapGetters(["getemployeeId", "getdepartmentId"])

  },
  mounted() {
    // this.fetchDepartments();
  },
  methods: {
    // async fetchDepartments() {
    //   try {
    //     const response = await this.$store.dispatch("fetchDepartments");
    //     if (response && response.success && Array.isArray(response.data)) {
    //       this.departments = response.data;
    //       console.log(this.departments);
          
    //     } else {
    //       alert("Failed to fetch departments");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching departments:", error);
    //   }
    // },

    async submitLeaveRequest() {
      if (!this.reason || !this.startDate || !this.endDate) {
        alert("Please fill in all fields.");
        return;
      }

      const payload = {
        employeeId: this.getemployeeId, 
        departmentId: this.getdepartmentId,
        reason: this.reason,
        startDate: this.startDate,
        endDate: this.endDate
      };

      try {
        const response = await this.$store.dispatch("submitLeaveRequest", payload);
        alert("Leave request submitted successfully!");
         this.reason = "";
         this.startDate= "";
         this.endDate = "";

        console.log(response)
      } catch (error) {
        console.error("Error submitting leave request:", error);
        alert("Failed to submit leave request.");
      }
    }
  }
};
</script>
