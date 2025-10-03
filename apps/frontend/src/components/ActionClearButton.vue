<script setup lang="ts">

  withDefaults(
    defineProps<{
      icon?: boolean;
      color?: string;
      action:() => Promise<void>;
      iconName?: string;
      tooltipText?: string;
      size?: string | number;
    }>(),
    {
      icon: true,
      color: "action-clear-color",
      iconName: "mdi-eraser",
      tooltipText: "Limpiar",
      size: "x-large",
    }
  );

// const { icon, color, action, iconName, tooltipText } = props;
</script>

<template>
  <div class="mr-2">
    <v-tooltip location="top">
      <template #activator="{ props }">
        <v-btn
          :icon="icon"
          :color="color"
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
