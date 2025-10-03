<script setup lang="ts">
  import type { NavigationFailure } from "vue-router";

  withDefaults(
    defineProps<{
      textButton?: string;
      icon?: boolean;
      color?: string;
      action?:() => Promise<void | undefined | NavigationFailure> | boolean;
      iconName?: string;
      tooltipText?: string;
      size?: string | number | undefined;
      rounded?: string | number | boolean | undefined;
      isLoading?: boolean;
    }>(),
    {
      icon: true,
      color: "primary",
      iconName: "mdi-plus-box",
      tooltipText: "Nuevo",
      size: undefined,
      textButton: "Nuevo",
      rounded: undefined,
      isLoading: false,
    }
  );

</script>

<template>
  <v-sheet max-width="230" class="ma-2 pa-2">
    <v-btn
      v-if="action"
      :prepend-icon="iconName"
      :color="color"
      :size="size"
      :rounded="rounded"
      :loading="isLoading"
      :disabled="isLoading"
      @click="action"
    >
      {{ textButton }}
    </v-btn>
  </v-sheet>

</template>
