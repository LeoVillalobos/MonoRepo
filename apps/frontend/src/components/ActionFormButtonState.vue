<script setup lang="ts">
  import { State } from '@/models/base/IState';
  // import { NavigationFailure } from 'vue-router';

  const props = withDefaults(
    defineProps<{
      icon?: boolean;
      color?: string;
      actionNew:() => Promise<false | undefined | void>;
      actionUpdate: () => Promise<false | undefined | void>;
      iconName?: string;
      tooltipText?: string;
      size?: string | number | undefined;
      nameState: string;
    }>(),
    {
      icon: true,
      color: "action-return-color",
      iconName: "mdi-arrow-left",
      tooltipText: "Regresar",
      size: "x-large",
      nameState: "auto",
    }
  );

  const iconText = ref<string>(props.nameState === State.CREATE ? "mdi-plus" : "mdi-update");
  const nameText = ref<string>(props.nameState === State.CREATE ? "Guardar" : "Actualizar");

// const { icon, color, action, iconName, tooltipText } = props;
</script>

<template>
  <div class="mr-2">
    <v-tooltip location="top">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          :icon="icon"
          :color="color"
          :size="size"
          @click="nameState == State.CREATE ? actionNew() : actionUpdate()"
        >
          <v-icon>{{ iconText }}</v-icon>
        </v-btn>
      </template>
      <span>{{ nameText }}</span>
    </v-tooltip>
  </div>
</template>
