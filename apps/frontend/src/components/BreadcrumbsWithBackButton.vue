<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  withDefaults(
    defineProps<{
      title: string
      maxWidth?: number | string
    }>(),
    {
      maxWidth: 1550,
    },
  )

  const breadcrumbs = computed(() => {
    const pathParts = route.path.split('/').filter(Boolean)
    return pathParts.slice(0, Math.min(pathParts.length, 3))
  })

  function goBack () {
    router.back()
  }
</script>

<template>
  <v-card
    class="mx-auto"
    elevation="4"
    flat
    max-height="200"
    :max-width="maxWidth"
    rounded="2"
  >
    <v-toolbar color="primary" density="compact" height="70">
      <v-app-bar-nav-icon icon="mdi-arrow-left" @click="goBack" />

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer />

      <v-breadcrumbs class="mt-2" :items="['App', ...breadcrumbs]" />
    </v-toolbar>
  </v-card>

</template>
