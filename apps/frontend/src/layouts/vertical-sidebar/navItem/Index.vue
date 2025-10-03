<script setup lang="ts">
import Icon from './../Icon.vue';

// import Icon from "../Icon.vue";

const props = defineProps({ item: Object, level: Number });
</script>

<template>
  <!---Single Item-->
  <v-list-item :to="props.item?.to" rounded class="mb-1" color="primary" :disabled="props.item?.disabled" :target="props.item?.type === 'external' ? '_blank' : ''">
    <!---If icon-->
    <template v-slot:prepend>
      <Icon :item="props.item?.icon" :level="level" />
    </template>
    <v-list-item-title>{{ props.item?.title }}</v-list-item-title>
    <!---If Caption-->
    <v-list-item-subtitle v-if="props.item?.subCaption" class="text-caption mt-n1 hide-menu">
      {{ props.item.subCaption }}
    </v-list-item-subtitle>
    <!---If any chip or label-->
    <template v-slot:append v-if="props.item?.chip">
      <v-chip :color="props.item?.chipColor" class="sidebarchip hide-menu" :size="'small'" :variant="props.item?.chipVariant" :prepend-icon="props.item?.chipIcon">
        {{ props.item.chip }}
      </v-chip>
    </template>
  </v-list-item>
</template>
