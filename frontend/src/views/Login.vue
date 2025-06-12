<script setup>
import axios from 'axios';

function login() {
  let username = document.getElementById("form-username").value;
  axios.post("http://localhost:3000/session", {username: username})
    .then(res => {
      const data = res.data
      localStorage.setItem("jwt", data.token)
      window.location.href = "/"
    })
    .catch(error => {
      this.errorMessage = error.message;
      console.error("There was an error!", error)
      const errMsg = error.response.data.message
      if (errMsg) {
        alert(errMsg)
      }
    });
}

</script>

<template>

<h2>Login</h2>
<div>
  <label for="username">Enter your username: </label>
  <input type="text" name="username" id="form-username" required>
</div>
<div>
  <button @click="login()">Login</button>
</div>


</template>

<style scoped>
</style>
