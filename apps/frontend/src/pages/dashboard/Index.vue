<script setup lang="ts">
import { useDisplay } from "vuetify";
import { computed } from "vue";

const { mobile } = useDisplay();

const imgMargin = computed(() => (mobile.value.valueOf() ? "" : "mr-12 ml-12"));
const cardMargin = computed(() => (mobile.value.valueOf() ? "mr-2 ml-2" : "mr-6 ml-6"));
const carouselHeight = computed(() => (mobile.value.valueOf() ? "300" : "700"));
</script>

<template>
  hola
  <v-card class="d-flex flex-wrap mx-auto" :class="cardMargin" elevation="0" rounded="xl">
    <!-- <v-img
      rounded="xl"
      class="align-center"
      aspect-ratio="16/9"
      src="@/assets/img/fundacion_bienvenido.png"
      :class="imgMargin"
    /> -->
  </v-card>

  <v-card
    class="d-flex flex-wrap mx-auto mt-16"
    :class="cardMargin"
    elevation="0"
    rounded="xl"
  >
    <v-carousel
      cycle
      class="align-center rounded-xl"
      :class="imgMargin"
      delimiter-icon="mdi-paw"
      :height="carouselHeight"
      hide-delimiter-background
      show-arrows="hover"
    >
      <!-- <v-carousel-item
        src="/images/fundacion_don_benjamin_mision.png"
        cover
      ></v-carousel-item>

      <v-carousel-item src="/images/fundacion_vision.png" cover></v-carousel-item>

      <v-carousel-item
        src="/images/fundacion_don_benjamin_valores.png"
        cover
      ></v-carousel-item> -->
    </v-carousel>
  </v-card>
</template>
