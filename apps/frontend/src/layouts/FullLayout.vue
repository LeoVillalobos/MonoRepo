<script setup lang="ts">
import { RouterView } from "vue-router";
import { useDisplay } from "vuetify";
import { computed } from "vue";

import MainView from "./Main.vue";

const { mobile, name } = useDisplay();

const imgwidthReyma = computed(() => {
  switch (name.value) {
      case 'xs': return 70
      case 'sm': return 98
      default :
        return 105
    }
});

const imgwidth = computed(() => {
  switch (name.value) {
      case 'xs': return 110
      case 'sm': return 145
      default :
        return 180
    }
});

</script>

<template>
  <v-locale-provider>
    <v-app>
      <MainView />
      <v-main>
        <v-container fluid class="page-wrapper">
          <!-- <div class="maxWidth"> -->
          <RouterView />
          <!-- </div> -->
        </v-container>
      </v-main>

    </v-app>
  </v-locale-provider>
</template>
