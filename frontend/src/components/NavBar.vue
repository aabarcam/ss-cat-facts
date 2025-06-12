<template>
  <div>
     <nav>
    <RouterLink to="/" class="nav-link">SSCatFacts</RouterLink>
    <RouterLink to="/login" v-if="!authenticated" class="nav-link">Login</RouterLink>
    <RouterLink to="/register" v-if="!authenticated" class="nav-link">Register</RouterLink>
    <RouterLink to="/facts" v-if="authenticated" class="nav-link">Cat Facts</RouterLink>
    <RouterLink to="/likes" v-if="authenticated" class="nav-link">My likes</RouterLink>
    <RouterLink to="/popular" v-if="authenticated" class="nav-link">Popular facts</RouterLink>
    <button @click="logout()" v-if="authenticated" class="nav-link">Log out</button>
    </nav>
  </div>
</template>

<script setup>

let authenticated = localStorage.getItem("jwt")

function logout() {
  localStorage.removeItem("jwt")
  window.location.href = "/"
}

</script>

<style scoped src="../styles.css">
</style>