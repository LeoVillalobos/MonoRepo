<script setup lang="ts" generic="T extends Record<string, any>">
  import type { DataTableHeader } from '@/models/base/DataTable'

  type Density = null | 'default' | 'comfortable' | 'compact'

  const itemsPerPage = defineModel<number>('itemsPerPage')
  const page = defineModel<number>('page')
  // const totalItems = defineModel<string>('totalItems');

  // Usando withDefaults para proporcionar valores predeterminados
  withDefaults(
    defineProps<{
      headers: Array<DataTableHeader> // Cabeceras de la tabla
      items: T[] // Items de tipo genérico T
      loading?: boolean // Estado de carga
      search?: string // Filtro de búsqueda
      itemValue?: string
      customClass?: string
      headerColor?: string
      density?: Density
      totalItems?: number
    }>(),
    {
      loading: false, // Estado de carga, por defecto es false
      search: '', // Filtro de búsqueda, por defecto es cadena vacía
      itemValue: 'name', // Propiedad del ítem a mostrar, valor predeterminado 'name'
      customClass: 'elevation-0', // Clase CSS personalizada, valor predeterminado 'elevation-0'
      headerColor: 'red', // Color de encabezado, valor predeterminado 'red'
      density: 'compact', // Densidad de la tabla, valor predeterminado 'compact'
      totalItems: 0, // Total de ítems, valor predeterminado 0
    },
  )

  async function loadItems (options: any) {
    page.value = options.page
  }
</script>

<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :class="customClass"
    :density="density"
    :header-color="headerColor"
    :headers="headers"
    :item-value="itemValue"
    :items="items"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    @update:options="loadItems"
  >
    <!-- Personalización dinámica por clave -->
    <template v-for="header in headers" #[`item.${header.key}`]="{ item }">
      <slot :item="item" :name="header.key">
        <!-- Renderiza el valor por defecto si no hay slot -->
        {{ item[header.key] }}
      </slot>

    </template>
  </v-data-table-server>
</template>
