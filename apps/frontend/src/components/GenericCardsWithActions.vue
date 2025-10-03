<script setup lang="ts" generic="T extends Record<string, any>">
  import type { DataTableHeader, IFilter, IServerTable } from "@/models/base/DataTable";
  import type { NavigationFailure } from "vue-router";
  import type { ButtonVariant } from "@/types/buttons";
  import { useDataService } from "@/composables/useDataService";

  const { getList, error } = useDataService<T>();

  /**
   * Reactive Variables
   */
  const defaulOptions = ref<IServerTable>({ page: 1, pageSize: 12, search: "" });
  const search = ref<string>("");
  const isLoading = defineModel<boolean>("isLoading");
  const filters = ref<IFilter[]>([]);
  const totalItems = ref<number>(0);
  const page = ref<number>(1);
  const pageCount = ref<number>(1);
  const dialogFilters = ref<boolean>(false);
  const dataSource = ref<T[]>([]);
  const itemsPerPage = ref<number>(7);

  /**
   * Props
   */
  const props = withDefaults(
    defineProps<{
      title?: string;
      headers: Array<DataTableHeader>;
      url: string;
      maxWidth?: number | string;
      textButtonNew?: string;
      createNew?:() => Promise<void | undefined | NavigationFailure> | boolean;
      edit?: (
        id: string | undefined
      ) => Promise<void | undefined | NavigationFailure>;
      delet?: (id: string | undefined) => Promise<void>;
      breadcrumbsWithTitle?: boolean;
      btnRounded?: string | number | boolean | undefined;
      btnEditVariant?: ButtonVariant;
      haveFilters?: boolean;
      permissionCreate?: string;
      permissionEdit?: string;
      permissionDelete?: string;
      permissionModule?: string;
    }>(),
    {
      title: "",
      maxWidth: 1500,
      breadcrumbsWithTitle: true,
      btnRounded: undefined,
      btnEditVariant: undefined,
      haveFilters: false,
      permissionCreate: "",
      permissionEdit: "",
      permissionDelete: "",
      permissionModule: "",
    }
  );

  /**
   * Watchers
   */

  watch(itemsPerPage, () => {
    defaulOptions.value.pageSize = itemsPerPage.value;
    getDataSource();
  });

  watch(page, () => {
    defaulOptions.value.page = page.value;
    getDataSource();
  });

  /**
   * Emits
   */
  const emits = defineEmits(['cleanFilters']);

  /**
   * Methods
   */
  const getDataSource = async () => {
    try {
      isLoading.value = true;
      // console.log('filters.value', filters.value);
      const response = await getList(props.url, filters.value, defaulOptions.value);
      console.log("response", response);
      dataSource.value = response.results;
      totalItems.value = response.row_count;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const handleFilterChange = (newFilter: IFilter) => {
    if (newFilter.value === null || newFilter.value === undefined) {
      filters.value = filters.value.filter(filter => filter.field !== newFilter.field);
      return;
    }
    const index = filters.value.findIndex(filter => filter.field === newFilter.field);
    index === -1 ? filters.value.push(newFilter) : (filters.value[index] = newFilter);
  };

  const applyFilters = () => {
    dialogFilters.value = false;
    getDataSource();
  };

  const reloadData = () => {
    search.value = "";
    filters.value = [];
    dialogFilters.value = false;
    getDataSource();
  };

  const handleFilterClean = () => {
    emits('cleanFilters');
  };

  /**
   * Lifecycle Hooks
   */
  onMounted(() => getDataSource());

  /**
   * Expose Methods
   */
  defineExpose({
    getDataSource,
    applyFilters,
    reloadData,
  });
</script>

<template>
  <v-container>
    <!-- Breadcrumbs -->
    <BreadcrumbsWithTitle
      class="mb-2"
      :title="title"
      :max-width="maxWidth"
    />

    <v-card
      class="mx-auto"
      :max-width="maxWidth"
    >
      <v-card-title>

        <!-- Contenedor principal con espacio entre elementos -->
        <div class="d-flex justify-space-between align-center w-100">
          <!-- Botón de nuevo alineado a la izquierda -->
          <div>

          <!-- v-if="can(permissionCreate, permissionModule)" -->
          <!-- <ActionNewButton
            text-button="Nueva contraseña"
            :action="createNew"
            :rounded="2"
            :is-loading="isLoading"
          /> -->
          </div>

          <div class="d-flex align-center">
            <v-sheet width="600" class="ma-2 pa-2">
              <slot name="findtext" :handle-filter-change="handleFilterChange" />
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

      <v-progress-linear :active="isLoading" :indeterminate="isLoading" color="primary" />

      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="card in dataSource"
            :key="card.id"
            cols="3"
          >
            <slot name="info" :card="card" />

          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-pagination v-model="page" :length="pageCount" total-visible="10" />

    <!-- Filters Dialog -->
    <FiltersDialog
      v-model:dialog-filters="dialogFilters"
      :filters="filters"
      @update-filters="handleFilterChange"
      @apply-filters="applyFilters"
      @clean-filters="handleFilterClean"
    >
      <template #dialogfilter>
        <slot name="filters" :handle-filter-change="handleFilterChange" />
      </template>
    </FiltersDialog>

  </v-container>
</template>
