<script setup>  
  import axios from 'axios';
  import { ref } from 'vue';

  const componentKey = ref(0);

  let facts = []
  let likes_array = []

  const auth = localStorage.getItem("jwt")
  const headers = {"Authorization": auth}
  getFacts()

  function getFacts() {
    axios.get("http://localhost:3000/popular/index", {headers: headers})
      .then(res => {
        facts = res.data.facts
        updateList()
        updateLikes()
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
  
  function like(factId) {
    axios.post("http://localhost:3000/likes/create", {fact_id: factId}, {headers})
      .then(res => {
        updateLikes()
        updateList()
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

  function unlike(factId) {
    axios.delete("http://localhost:3000/likes/destroy", {headers: headers, data: {fact_id: factId}})
      .then(res => {
        updateLikes()
        updateList()
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

  function likes(factId) {
    return likes_array.includes(factId)
  }

  function updateLikes() {
    axios.get("http://localhost:3000/likes/index", {headers})
      .then(res => {
        likes_array = res.data.likes.map(el => el.id)
        updateList()
      })
  }

  function updateList() {
    componentKey.value += 1
  }
</script>

<template>

<h1>Top 10 most popular facts</h1>

<div :key="componentKey">
<li v-for="fact in facts">
  <p style="margin-bottom: 0%;">{{ fact.fact }}</p>
  <p style="margin-bottom: 0%;">({{ fact.likes }} likes)</p>
  <button @click="like(fact.id)" v-if="!likes(fact.id)">Like</button>
  <button @click="unlike(fact.id)" v-if="likes(fact.id)">Remove like</button>
  <br>
</li>
</div>

</template>

<style scoped>
</style>
