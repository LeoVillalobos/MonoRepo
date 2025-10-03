
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <v-app class="background-image">
    <RouterView />
  </v-app>
</template>

<style scoped>

.background-image {
  background: url('../../assets/images/the_interior.jpg') no-repeat center center fixed;
  background-size: cover;
}

</style>
