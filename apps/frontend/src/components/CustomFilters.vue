<script setup lang="ts">
  import type { IFilter } from '@/models/base/DataTable';

  const status = ref("");
  const date = ref("");

  const emit = defineEmits(["applyFilters"]);

  const applyFilters = () => {
    const filters: IFilter[] = [
      { field: "ClientName", value: status.value, operator: "@=*" },
    ];
    emit("applyFilters", filters);
  };
</script>

<template>
  <div>
    <v-text-field v-model="status" label="Status" />
    <v-text-field v-model="date" label="Date" />

    <v-btn @click="applyFilters">Aplicar Filtros</v-btn>
  </div>
</template>
