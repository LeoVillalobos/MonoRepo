<script setup lang="ts">
  import type { IFilter } from "@/models/base/DataTable";

  defineProps<{
    filters: IFilter[];
  }>();

  const dialogFilters = defineModel<boolean>('dialogFilters');

  const emits = defineEmits(['update:dialogFilters', 'applyFilters', 'updateFilters', 'cleanFilters']);

  const handleFilterChange = (newFilter: IFilter) => {
    emits('updateFilters', newFilter);
  };

  const handleFilterClean = () => {
    emits('cleanFilters');
  };

  const applyFilters = () => {
    emits('applyFilters');
  };
</script>

<template>
  <v-dialog v-model="dialogFilters" max-width="500">
    <v-card rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5 text-medium-emphasis ps-2">Filtros</div>
        <v-btn icon="mdi-close" variant="text" @click="dialogFilters = false" />
      </v-card-title>

      <v-divider class="mb-4" />

      <v-card-text>
        <slot name="dialogfilter" :handle-filter-change="handleFilterChange" />
      </v-card-text>

      <v-divider class="mt-2" />

      <v-card-actions class="my-2 d-flex justify-end">
        <v-btn class="text-none" rounded="xl" text="Limpiar" @click="handleFilterClean" />
        <v-btn
          class="text-none"
          color="primary"
          rounded="xl"
          text="Filtrar"
          variant="flat"
          @click="applyFilters"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
