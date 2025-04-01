
<template>
  <div class="home">
    <div class="navbar">
      <h3>InFoTech</h3>
      <div class="headin">
        <v-btn flat to="/reg" class="nav-button">Register</v-btn>
        <v-btn flat @click="goToLogin" class="nav-button">Login</v-btn>
        <v-btn flat to="/contact" class="nav-button">Contact Us</v-btn>
        <v-btn flat to ="/about" class="nav-button">About Us</v-btn>
      </div>
    </div>
    <div class="image-container">
      <v-img src="../assets/officeimg.jpg" class="office-image"></v-img>
    </div>
  </div>
</template>

<script>
export default {
  payload:'',
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(12, 11, 27);
  color: white;
  height: 80px;
  padding: 0 40px;
}

.headin {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* .nav-button {
  color: white !important;
} */

.image-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.office-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>


      
   
