<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth"; // Ruta adecuada a tu archivo de tienda de autenticación
import { ref, shallowRef, watch, computed, onMounted } from "vue";
import sidebarItems from "./vertical-sidebar/sidebarItem";
import NavGroup from "@/layouts/vertical-sidebar/navGroup/Index.vue";
import NavItem from "@/layouts/vertical-sidebar/navItem/Index.vue";

const router = useRouter();
const route = useRoute();

const sidebarMenu = shallowRef(sidebarItems);
const drawer = ref<boolean>(false);
const sDrawer = ref<boolean>(true);

const breadcrumbs = ref<string[]>([]);

watch(
  computed(() => route.path),
  () => {
    breadcrumbs.value = getBreadcrumbs();
  }
);

const getBreadcrumbs = () => {
  const pathParts = route.path.split("/");
  pathParts.shift(); // we don't want the first item as it's empty

  return pathParts.length >= 3 ? pathParts.slice(0, 2) : pathParts;
};

const logout = async () => {
  try {
    // Realiza la llamada a la API u otra lógica necesaria para cerrar sesión
    // Por ejemplo, puedes enviar una solicitud al servidor para invalidar el token de sesión

    // Elimina el token de la tienda Pinia y la cookie
    useAuthStore().logout();

    // Redirige al usuario a la página de inicio de sesión u otra página deseada
    // router.push({ name: "login" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    // Manejo de errores: podrías mostrar un mensaje de error al usuario
  }
};
const redirect = (routeName: string) => router.push( routeName );
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    location="end"
    temporary
    elevation="0"
    app
    class="leftSidebar"
  >
    <div class="pa-5">
      <!-- <Logo /> -->
    </div>

    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div>
      <perfect-scrollbar class="scrollnavbar">
        <v-list class="pa-6">
          <!---Menu Loop -->
          <!-- <template v-for="(item, i) in thems"> -->
          <!---Item Sub Header -->
          <!-- <NavGroup :item="item" v-if="item.header" :key="item.title" /> -->

          <!---Single Item-->
          <!-- <NavItem :item="item" v-else class="leftPadding" @click="toggleTheme(item.value)" /> -->
          <!---Single Item-->

          <!-- <v-radio :label="item.value" v-else :value="item.value" @click="toggleTheme(item.value)" :color="item.value"></v-radio> -->
          <!---End Single Item-->
          <!-- </template> -->
        </v-list>
        <!-- <div class="pa-4">
              <ExtraBox />
          </div> -->
      </perfect-scrollbar>
    </div>
  </v-navigation-drawer>

  <!------Sidebar-------->
  <v-navigation-drawer left elevation="0" app class="leftSidebar" v-model="sDrawer">
    <!---Logo part -->
    <div class="pa-5">
      <!-- <Logo /> -->
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div>
      <perfect-scrollbar class="scrollnavbar">
        <v-list class="pa-6">
          <!---Menu Loop -->
          <template v-for="item in sidebarMenu" :key="item.title">
            <!---Item Sub Header -->
            <NavGroup :item="item" v-if="item.header" />

            <!---Single Item-->
            <NavItem :item="item" v-else class="leftPadding" />
            <!---End Single Item-->
          </template>
        </v-list>
        <!-- <div class="pa-4">
              <ExtraBox />
          </div> -->
      </perfect-scrollbar>
    </div>
  </v-navigation-drawer>

  <!------Header-------->
  <v-app-bar elevation="0" height="60">
    <div class="d-flex align-center justify-space-between w-100">
      <div>
        <v-btn
          class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted"
          @click="sDrawer = !sDrawer"
          icon
          variant="flat"
          size="small"
        >
          <!-- <Menu2Icon size="20" /> -->
        </v-btn>
        <!-- Notification -->
        <!-- <NotificationDD /> -->
        <!-- <v-btn icon="$vuetify" variant="outlined" position="sticky" @click.stop="drawer = !drawer"> </v-btn> -->
        <v-btn
          icon
          variant="text"
          class="custom-hover-primary ml-0 ml-md-2 text-muted"
          @click.stop="drawer = !drawer"
        >
          <v-badge dot color="primary" offset-x="-6" offset-y="-4">
            <!-- <BrushIcon size="22" /> -->
          </v-badge>
        </v-btn>
        <v-btn
          icon
          variant="text"
          class="custom-hover-primary ml-0 ml-md-2 text-muted"
          @click="logout"
        >
          <v-badge dot color="primary" offset-x="-6" offset-y="-4">
            <!-- <BrushIcon size="22" /> -->
          </v-badge>
        </v-btn>
      </div>
      <div>
        <!-- Upgrade button -->
        <!-- <v-btn class="mr-2 bg-primary" href="https://adminmart.com/templates/vuejs/?product_sortby=free" target="_blank">Download Free</v-btn> -->
        <!-- User Profile -->
        <!-- <ProfileDD /> -->
      </div>
    </div>
  </v-app-bar>

  <v-app-bar elevation="1" height="40"
    ><v-breadcrumbs :items="['App', ...breadcrumbs]"></v-breadcrumbs
  ></v-app-bar>
</template>
