<template>
    <div class="about-us">
      <div class="container">
        <h1 class="title">About Us</h1>
        <p class="description">
          Welcome to the Employee Management System, a powerful solution designed to streamline workforce management. Our platform enables seamless communication between Admin, HR, and Employees, ensuring optimized workflow and resource allocation.
        </p>
  
        <div class="mission">
          <h2>Our Mission</h2>
          <p>
            Our goal is to provide an intuitive and effective platform for managing tasks, leave requests, and resources efficiently. We strive to enhance productivity by simplifying employee management processes.
          </p>
        </div>
  
        <div class="features">
          <h2>Key Features</h2>
          <ul>
            <li><strong>Admin Module:</strong> Manages HR and employees, oversees departments, and maintains employee records.</li>
            <li><strong>HR Module:</strong> Assigns tasks, manages resource requests, and handles leave approvals.</li>
            <li><strong>Employee Module:</strong> Requests resources, submits leave requests, and receives assigned tasks.</li>
            <li><strong>Search & Reporting:</strong> Admin and HR can search and retrieve employee details effortlessly.</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AboutUs",
  };
  </script>
  
  <style scoped>
  .about-us {
    text-align: center;
    padding: 40px;
    background-color: #f8f9fa;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  .description {
    font-size: 1.1rem;
    color: #555;
  }
  
  .mission,
  .features {
    margin-top: 20px;
  }
  
  h2 {
    color: #007bff;
  }
  
  ul {
    text-align: left;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 8px;
  }
  </style>
  