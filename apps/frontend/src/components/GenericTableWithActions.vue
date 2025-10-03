<script setup lang="ts" generic="T extends Record<string, any>">

  import type { NavigationFailure } from 'vue-router'
  // import { getList } from "@/services/base/GenericTableService";
  import type { DataTableHeader, IFilter, IServerTable } from '@/models/base/DataTable'
  import type { ButtonVariant } from '@/types/buttons.ts'
  // import ActionNewButton from '@/components/ActionNewButton.vue'
  // import BreadcrumbsWithTitle from '@/components/BreadcrumbsWithTitle.vue'
  /**
   * Imports
   */
  import GenericTable from '@/components/GenericTable.vue'
  import { useDataService } from '@/composables/useDataService.ts'

  const { getList, error } = useDataService<T>()
  // import { useAbility } from '@casl/vue';

  // const { can } = useAbility();

  /**
   * Reactive Variables
   */
  const search = ref<string>('')
  const itemsPerPage = ref<number>(7)
  const page = ref<number>(1)
  const filters = ref<IFilter[]>([])
  const defaulOptions = ref<IServerTable>({ page: 1, pageSize: 7, search: '' })
  const totalItems = ref<number>(0)
  const isLoading = defineModel<boolean>('isLoading')
  const dialogFilters = ref<boolean>(false)
  const dataSource = ref<T[]>([])

  /**
   * Props
   */
  const props = withDefaults(
    defineProps<{
      title?: string
      headers: Array<DataTableHeader>
      url: string
      maxWidth?: number | string
      textButtonNew?: string
      createNew?: () => Promise<void | undefined | NavigationFailure> | boolean
      edit?: (
        id: string | undefined
      ) => Promise<void | undefined | NavigationFailure>
      delet?: (id: string | undefined) => Promise<void>
      breadcrumbsWithTitle?: boolean
      btnRounded?: string | number | boolean | undefined
      btnEditVariant?: ButtonVariant
      haveFilters?: boolean
      permissionCreate?: string
      permissionEdit?: string
      permissionDelete?: string
      permissionModule?: string
    }>(),
    {
      title: '',
      maxWidth: 1500,
      breadcrumbsWithTitle: true,
      btnRounded: undefined,
      btnEditVariant: undefined,
      haveFilters: false,
      permissionCreate: '',
      permissionEdit: '',
      permissionDelete: '',
      permissionModule: '',
    },
  )

  /**
   * Watchers
   */
  watch(itemsPerPage, () => {
    defaulOptions.value.pageSize = itemsPerPage.value
    getDataSource()
  })

  watch(page, () => {
    defaulOptions.value.page = page.value
    getDataSource()
  })

  /**
   * Emits
   */
  const emits = defineEmits(['cleanFilters'])

  /**
   * Methods
   */
  async function getDataSource () {
    try {
      isLoading.value = true
      // console.log('filters.value', filters.value);
      const response = await getList(props.url, filters.value, defaulOptions.value)
      dataSource.value = response.results
      totalItems.value = response.row_count
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  function handleFilterChange (newFilter: IFilter) {
    if (newFilter.value === null || newFilter.value === undefined) {
      filters.value = filters.value.filter(filter => filter.field !== newFilter.field)
      return
    }
    const index = filters.value.findIndex(filter => filter.field === newFilter.field)
    index === -1 ? filters.value.push(newFilter) : (filters.value[index] = newFilter)
  }

  function applyFilters () {
    dialogFilters.value = false
    getDataSource()
  }

  function reloadData () {
    search.value = ''
    filters.value = []
    dialogFilters.value = false
    getDataSource()
  }

  function handleFilterClean () {
    emits('cleanFilters')
  }

  /**
   * Lifecycle Hooks
   */
  onMounted(() => getDataSource())

  /**
   * Expose Methods
   */
  defineExpose({
    getDataSource,
    applyFilters,
    reloadData,
  })
</script>

<template>

  <v-container>
    <!-- Breadcrumbs -->
    <BreadcrumbsWithTitle
      v-if="breadcrumbsWithTitle"
      class="mb-2"
      :max-width="maxWidth"
      :title="title"
    />

    <!-- Card -->
    <v-card class="mx-auto" elevation="4" :max-width="maxWidth">
      <v-card-title>
        <slot name="cards" />

        <!-- Contenedor principal con espacio entre elementos -->
        <div class="d-flex justify-space-between align-center w-100">
          <!-- Botón de nuevo alineado a la izquierda -->
          <div>

            <!-- v-if="can(permissionCreate, permissionModule)" -->
            <ActionNewButton
              :action="createNew"
              :rounded="btnRounded"
              :text-button="textButtonNew"
            />
          </div>

          <div class="d-flex align-center">
            <v-sheet class="ma-2 pa-2" width="600">
              <slot :handle-filter-change="handleFilterChange" name="findtext" />
            </v-sheet>

            <v-sheet width="40">
              <v-icon class="mt-6" icon="mdi-reload" size="30" @click="reloadData" />
            </v-sheet>

            <v-sheet v-if="haveFilters" width="40">
              <v-badge class="mt-7" :content="filters.length" floating>
                <v-icon icon="mdi-filter-plus-outline" size="30" @click="dialogFilters = true" />
              </v-badge>
            </v-sheet>

          </div>
        </div>
      </v-card-title>

      <v-card-text class="mt-1">
        <!-- Generic Table -->
        <GenericTable
          v-model:items-per-page2="itemsPerPage"
          v-model:page="page"
          :headers="headers"
          :items="dataSource"
          :loading="isLoading"
          :search="search"
          :total-items="totalItems"
        >
          <template
            v-for="header in headers"
            :key="header.key"
            #[`${header.key}`]="{ item }"
          >
            <slot v-if="header.key === 'id'" :item="item" :name="header.key">
              <div class="d-sm-flex mt-2 mb-2">

                <!-- && can(permissionEdit, permissionModule) -->
                <ActionEditButton
                  v-if="edit"
                  :action="() => edit?.(item.id)"
                  :btn-edit-variant="btnEditVariant"
                />

                <slot :item="item" name="otheractions" />

                <!-- && can(permissionDelete, permissionModule) -->
                <ActionDeleteButton
                  v-if="delet"
                  :action="() => delet?.(item.id)"
                />
              </div>
            </slot>

            <slot v-else :item="item" :name="header.key">
              {{ item[header.key] }}
            </slot>
          </template>
        </GenericTable>
      </v-card-text>
    </v-card>

    <!-- Filters Dialog -->
    <FiltersDialog
      v-model:dialog-filters="dialogFilters"
      :filters="filters"
      @apply-filters="applyFilters"
      @clean-filters="handleFilterClean"
      @update-filters="handleFilterChange"
    >
      <template #dialogfilter>
        <slot :handle-filter-change="handleFilterChange" name="filters" />
      </template>
    </FiltersDialog>
  </v-container>
</template>
