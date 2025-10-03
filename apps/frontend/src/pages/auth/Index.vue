<script setup lang="ts">
import { reactive } from "vue";
import Cookies from "js-cookie";
import { useAuthStore } from "@/stores/auth";
import { useRouter, type RouteRecordName } from "vue-router";
import { loginUser } from "@/services/auth/index";
import type { ILogin } from "@/models/auth";
import { COOKIE_NAME_SESSION } from '@/helpers/constants';
import { handleFinishError } from "@/helpers/toastAlert";

const router = useRouter();
const authStore = useAuthStore();

const showPassword = ref(false)

const user = reactive({
  username: "",
  password: "",
});

const login = async () => {
  try {
    await authStore.login(user.username, user.password);

  } catch (err) {
    console.error('Error en autenticación:', err);
    // alert('Credenciales incorrectas');
    handleFinishError('Credenciales incorrectas');
  }
};


</script>

<template>
  <div class="d-flex align-center justify-center flex-column" style="margin-top: 100px">
    <v-card
      class="flex-wrap mx-auto mt-3"
      elevation="10"
      rounded="lg"
      flat
      :width="1200"
      :height="750"
    >
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="6">
            <v-carousel
              class="mt-16 mr-6"
              cycle
              :continuous="false"
              :show-arrows="false"
              :width="600"
              :height="600"
              hide-delimiter-background
            >
              <v-carousel-item src="@/assets/images/brain.jpg" cover></v-carousel-item>

              <v-carousel-item src="@/assets/images/books.jpg" cover></v-carousel-item>

              <v-carousel-item src="@/assets/images/head.png" cover></v-carousel-item>

              <v-carousel-item src="@/assets/images/couch.png" cover></v-carousel-item>
            </v-carousel>
          </v-col>

          <v-col cols="6">
            <v-card elevation="0" flat class="mt-16 pl-12 pr-12">
              <v-card-title> Bienvenido </v-card-title>

              <div class="d-sm-flex align-center justify-center mb-4 mt-4 pt-sm-2">
                <!-- <v-btn density="default" class="mr-6">
                  Sign in with Google

                  <template v-slot:prepend>
                    <v-icon
                      color="green-darken-2"
                      icon="mdi-google"
                      size="large"
                    ></v-icon>
                  </template>
                </v-btn>

                <v-btn density="default">
                  Sign in with FB

                  <template v-slot:prepend>
                    <v-icon color="blue" icon="mdi-facebook" size="large"></v-icon>
                  </template>
                </v-btn> -->
              </div>

              <div class="d-sm-flex align-center justify-center mt-12">
                <!-- or sign in with -->
              </div>

              <v-divider></v-divider>

              <form class="mt-8">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="user.username"
                        clearable
                        class="pa-1 ma-1"
                        label="Usuario"
                        variant="underlined"
                        color="reyma-blue-marine"
                        baseColor="reyma-blue-marine"ñ
                        :counter="350"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="user.password"
                        clearable
                        class="pa-1 ma-1"
                        label="Contraseña"
                        variant="underlined"
                        :type="showPassword ? 'text' : 'password'"
                        :counter="350"
                        @keyup.enter="login"
                        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append="showPassword = !showPassword"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </form>

              <template v-slot:actions>
                <v-btn
                  class="flex-grow-1 mt-2"
                  height="48"
                  variant="tonal"
                  @click="login"
                >
                  Sigin in
                </v-btn>
              </template>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
