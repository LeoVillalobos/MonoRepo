<script setup lang="ts">
  import { useRoute } from "vue-router";

  const route = useRoute();

  withDefaults(
    defineProps<{
      maxWidth? : number | string;
      color? : string;
    }>(),
    {
      maxWidth: 1550,
      color: "primary",
    }
  );

  const breadcrumbs = computed(() => {
    const pathParts = route.path.split("/").filter(Boolean); // Filtra las partes vacías directamente
    return pathParts.slice(0, Math.min(pathParts.length, 3)); // Maneja longitudes menores a 3
  });

</script>

<template>
  <v-card class="mx-auto mt-2" :max-width="maxWidth" elevation="3" :color="color">
    <v-breadcrumbs :items="['App', ...breadcrumbs]" />
  </v-card>
</template>
