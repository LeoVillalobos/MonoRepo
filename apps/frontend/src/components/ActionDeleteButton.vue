<script setup lang="ts">
  import type { ButtonVariant } from '@/types/buttons';
  import { useDisplay } from "vuetify";

  const { mobile } = useDisplay();

  withDefaults(
    defineProps<{
      icon?: boolean;
      color?: string;
      action:() => Promise<void> | undefined;
      iconName?: string;
      tooltipText?: string;
      btnEditVariant?:ButtonVariant;
      size?: string | number | undefined;
    }>(),
    {
      icon: true,
      color: "red-accent-3",
      iconName: "mdi-trash-can-outline",
      tooltipText: "Eliminar",
      btnEditVariant: "tonal",
      size: 45,
    }
  );

// const { icon, color, action, iconName, tooltipText } = props;
</script>

<template>
  <div class="mr-2" :class="{ 'mt-1': mobile.valueOf() }">
    <v-tooltip location="top">
      <template #activator="{ props }">
        <v-btn
          :icon="icon"
          :color="color"
          :variant="btnEditVariant"
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
