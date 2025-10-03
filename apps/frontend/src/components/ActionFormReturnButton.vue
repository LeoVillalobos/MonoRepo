<script setup lang="ts">
  import type { NavigationFailure } from 'vue-router'

  withDefaults(
    defineProps<{
      icon?: boolean
      color?: string
      action: () => Promise<void | NavigationFailure | undefined>
      iconName?: string
      tooltipText?: string
      size?: string | number
    }>(),
    {
      icon: true,
      color: 'action-return-color',
      iconName: 'mdi-arrow-left',
      tooltipText: 'Regresar',
      size: 'x-large',
    },
  )

// const { icon, color, action, iconName, tooltipText } = props;
</script>

<template>
  <div class="mr-2">
    <v-tooltip location="top">
      <template #activator="{ props }">
        <v-btn
          :color="color"
          :icon="icon"
          :size="size"
          v-bind="props"
          @click="action"
        >
          <v-icon>{{ iconName }}</v-icon>
        </v-btn>
      </template>
      <span>{{ tooltipText }}</span>
    </v-tooltip>
  </div>
</template>
