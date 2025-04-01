<template>
    <section class="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <!-- Background Image -->
      <div class="absolute inset-0 bg-[url('https://source.unsplash.com/1600x900/?office,communication')] bg-cover bg-center opacity-20"></div>
  
      <!-- Contact Container -->
      <div class="relative bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full transition-all duration-300 p-10">
        
        <!-- Contact Info Section -->
        <div class="text-center mb-8">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white">📞 Contact Us</h2>
          <p class="text-lg text-gray-700 dark:text-gray-300">We'd love to hear from you! Reach out anytime.</p>
        </div>
  
        <!-- Contact Form -->
        <form @submit.prevent="submitForm" class="space-y-4">
          <input v-model="form.name" type="text" placeholder="Full Name" class="input-field" />
          <input v-model="form.email" type="email" placeholder="Email" class="input-field" />
          <input v-model="form.subject" type="text" placeholder="Subject" class="input-field" />
          <textarea v-model="form.message" rows="4" placeholder="Your Message" class="input-field"></textarea>
          <button type="submit" class="submit-button">{{ isLoading ? 'Sending...' : 'Send Message' }}</button>
          <p v-if="successMessage" class="text-green-600 text-center mt-4 font-medium">{{ successMessage }}</p>
          <p v-if="errorMessage" class="text-red-600 text-center mt-4 font-medium">{{ errorMessage }}</p>
        </form>
      </div>
  
      <!-- Google Map -->
      <div class="relative w-full max-w-4xl mt-10 rounded-lg overflow-hidden shadow-lg">
        <iframe class="w-full h-96 rounded-lg" 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.303862801009!2d-74.0060150845978!3d40.7127760793306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDBswqA0MycwNi40Ik4gNzTCsDAwJzI1LjEiVw!5e0!3m2!1sen!2sus!4v1623259512503!5m2!1sen!2sus" 
          allowfullscreen="" loading="lazy"></iframe>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "ContactUs",
    data() {
      return {
        form: { name: "", email: "", subject: "", message: "" },
        errors: {},
        successMessage: "",
        errorMessage: "",
        isLoading: false,
      };
    },
    methods: {
      validateForm() {
        this.errors = {};
        let valid = true;
        if (!this.form.name.trim()) this.errors.name = "Name is required", valid = false;
        if (!this.form.email.trim()) this.errors.email = "Email is required", valid = false;
        else if (!/\S+@\S+\.\S+/.test(this.form.email)) this.errors.email = "Invalid email format", valid = false;
        if (!this.form.subject.trim()) this.errors.subject = "Subject is required", valid = false;
        if (!this.form.message.trim()) this.errors.message = "Message cannot be empty", valid = false;
        return valid;
      },
      submitForm() {
        if (!this.validateForm()) return;
        this.isLoading = true;
        this.successMessage = "";
        this.errorMessage = "";
        setTimeout(() => {
          this.isLoading = false;
          this.successMessage = "Your message has been sent successfully!";
          this.form = { name: "", email: "", subject: "", message: "" };
        }, 2000);
      }
    }
  };
  </script>
  
  <style scoped>
  .input-field {
    width: 100%;
    padding: 14px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 18px;
    transition: border 0.3s;
    background-color: white;
  }
  .input-field:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
  }
  .submit-button {
    width: 100%;
    padding: 14px;
    background-color: #2563eb;
    color: white;
    font-size: 20px;
    border-radius: 10px;
    font-weight: bold;
    transition: background 0.3s;
  }
  .submit-button:hover {
    background-color: #1d4ed8;
  }
  </style>
  