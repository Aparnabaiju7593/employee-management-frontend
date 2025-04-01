<template>
  <v-app>
    <v-main>
    
      <!-- <LoginForm></LoginForm> -->
       <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

// import LoginForm from './components/LoginForm.vue';

export default {
  name: 'App',

  components: {
    // LoginForm,
  },

  data: () => ({
    //
  }),
}
</script>
