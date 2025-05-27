<template>
  <br><br>
  <v-container>
    <v-card class="mx-auto" max-width="500" title="Request Late Entry">
      <v-container>

        <!-- Department Dropdown -->
        <v-select 
          v-model="departmentId"
          :items="departments"
          color="primary"
          label="Select Department"
          item-title="department"
          item-value="departmentId"
          variant="underlined"
          required
        ></v-select>

        <!-- Late Date -->
        <v-text-field
          v-model="lateDate"
          color="primary"
          label="Late Date"
          type="date"
          variant="underlined"
          required
        ></v-text-field>

        <!-- Reason -->
        <v-text-field
          v-model="reason"
          color="primary"
          label="Reason"
          placeholder="Enter reason for late entry"
          variant="underlined"
          required
        ></v-text-field>

        <!-- Submitted Time (Read-only) -->
        <v-text-field
          v-model="submittedTime"
          color="primary"
          label="Submitted Time"
          readonly
          variant="underlined"
        ></v-text-field>

      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="submitLateRequest">
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
      departmentId: null,
      lateDate: "",
      reason: "",
      submittedTime: this.getCurrentTimestamp(),
      departments: []
    };
  },
  mounted() {
    this.fetchDepartments();
  },
  methods: {
    getCurrentTimestamp() {
      const now = new Date();
      return now.toISOString().slice(0, 19).replace("T", " ");
    },

    async fetchDepartments() {
      try {
        const response = await this.$store.dispatch("fetchDepartments");
        if (response && response.success && Array.isArray(response.data)) {
          this.departments = response.data;
        } else {
          alert("Failed to fetch departments");
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    },

    async submitLateRequest() {
      if (!this.departmentId || !this.lateDate || !this.reason) {
        alert("Please fill in all fields.");
        return;
      }

      const payload = {
        employeeId: "1", // Replace with dynamic employee ID if available
        departmentId: this.departmentId,
        lateDate: this.lateDate,
        reason: this.reason,
        submittedTime: this.submittedTime
      };

      try {
        const response = await this.$store.dispatch("submitLateRequest", payload);
        alert("Late request submitted successfully!");
        console.log(response);
      } catch (error) {
        console.error("Error submitting late request:", error);
        alert("Failed to submit late request.");
      }
    }
  }
};
</script>
