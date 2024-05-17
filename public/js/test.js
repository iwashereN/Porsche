const axios = require('axios');

// Define the signup data
const signupData = {
  email: 'example@example.com',
  password: 'password123',
  name: 'John Doe'
};

// Make a POST request to the signup endpoint
axios.post('http://localhost:2000/api/auth/signup', signupData)
  .then(response => {
    console.log('Signup successful');
    // Handle response if needed
  })
  .catch(error => {
    console.log('Error signing up:');
    // Handle error response if needed
  });
