<template>
    <div class="log pt-5">

      <v-card
        class="mx-auto pa-12 pb-8 maincard"
        elevation="8"
        max-width="380"
        rounded="lg"

      >
      <!-- <div class="container"></div> -->
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>
  
        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="email"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between  ">
          Password
  
          <router-link
  class="text-caption text-decoration-none text-blue"
  to="/password"
>
  Forgot login password?
</router-link>
        </div>
  
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          v-model="password"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>
  
        <!-- <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
        > -->
          <!-- <v-card-text class="text-medium-emphasis text-caption">
            Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
          </v-card-text>
        </v-card> -->
  
        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          @click="submit()"
          block
        >
          Log In

        </v-btn>
  
        <v-card-text class="text-center">
          <!-- <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          > -->
          <router-link to="/reg">
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon></router-link>
          <!-- </a> -->
        </v-card-text>
      </v-card>
    </div>
 
  </template>
  
  <script>
  export default {
    data: () => ({
      visible: false,
      email:'',
      password:''
    }),
    methods:{
      async submit() {
  const payload = {
    email: this.email,
    password: this.password
  };

  try {
    const res = await this.$store.dispatch('login', payload);
    
    if (res) {
      const { name, role } = res.data; // Ensure your backend sends a role
      let routePath = "/"; // Default route

      // Redirect based on role
      if (role ==="admin") {
        routePath = "/dash";
      } else if (role === "employee") {
        routePath = "/employeedash";
      } else {
        console.error("Unknown role:", role);
        return;
      }

      // Navigate to the correct home page with user data
      this.$router.push({ path: routePath, query: { name } });
    } else {
      console.log("Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
}

    }
  }
</script>
<style scoped>
.maincard{
  margin-top: 100px;
  background-color: rgb(241, 246, 246);
}
.log {
  background-color: rgb(100, 84, 116);
  height: 700px;
}


</style>
