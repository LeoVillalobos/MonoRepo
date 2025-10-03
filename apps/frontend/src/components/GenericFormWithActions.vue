<script setup lang="ts">

  import type { NavigationFailure } from "vue-router";
          // import Title from "@/components/GenericTitle.vue"; // Not used
  // import ActionClearButton from "./ActionClearButton.vue"
  // import ActionReturnButton from "./ActionFormReturnButton.vue"
  // import ActionFormButtonState from "./ActionFormButtonState.vue"
  // import BreadcrumbsWithBackButton from "./BreadcrumbsWithBackButton.vue";

  withDefaults(
    defineProps<{
      title: string;
      isLoading: boolean;
      maxWidth? : number | string;
      nameState: string;
      addNew:() => Promise<false | undefined | void>;
      update: () => Promise<false | undefined | void>;
      returnList: () => Promise<void | NavigationFailure | undefined>;
      clear: () => Promise<void | undefined>;
    }>(),
    {
      isLoading: false,
      itemsPerPage: 10,
      maxWidth: 1550,
    }
  );

</script>

<template>

  <v-container>

    <BreadcrumbsWithBackButton :max-width="maxWidth" :title="title" />

    <v-card class="mx-auto mt-2" :max-width="maxWidth" elevation="4" flat>

      <form class="mt-5">
        <v-container fluid>
          <v-row no-gutters>

            <slot name="form" />

            <v-col cols="12 mt-5">
              <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                <v-spacer />

                <ActionReturnButton :action="() => returnList()" />

                <ActionClearButton :action="() => clear()" />

                <ActionFormButtonState
                  :name-state="nameState"
                  :action-new="() => addNew()"
                  :action-update="() => update()"
                />

              </div>
            </v-col>
          </v-row>
        </v-container>
      </form>
    </v-card>
  </v-container>
</template>
