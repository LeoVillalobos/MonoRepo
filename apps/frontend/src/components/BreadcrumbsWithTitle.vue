<script setup lang="ts">
  import { useRoute } from "vue-router";

  const route = useRoute();

  interface BreadcrumbsWithTitleProps {
    maxWidth? : number | string;
    color? : string;
    title: string;
    haveBreadcrumbs?: boolean;
    haveTitle?: boolean;
  }

  withDefaults(
    defineProps<BreadcrumbsWithTitleProps>(),
    {
      maxWidth: 1550,
      color: "primary",
      title: "",
      haveBreadcrumbs: true,
      haveTitle: true,
    }
  );

  const breadcrumbs = computed(() => {
    const pathParts = route.path.split("/").filter(Boolean); // Filtra las partes vacías directamente
    return pathParts.slice(0, Math.min(pathParts.length, 3)); // Maneja longitudes menores a 3
  });

</script>

<template>
  <v-card
    class="mx-auto"
    :max-width="maxWidth"
    max-height="200"
    elevation="4"
    rounded="2"
    flat
  >
    <v-toolbar color="primary" height="75" density="compact">
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer />

      <v-breadcrumbs class="mt-2" :items="['App', ...breadcrumbs]" />
    </v-toolbar>
  </v-card>
</template>
