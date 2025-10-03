

/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
// import Module from '@/pages/Module.vue';
import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext, type RouteRecordName } from 'vue-router';

const routes = [
  {
    path: "/main",
    meta: { requiresAuth: true },
    component: () => import("@/layouts/FullLayout.vue"),
    children: [
      {
        path: "", // 👈 sin "/" para que sea relativo
        name: "Home",
        component: () => import("@/pages/dashboard/Index.vue"),
      },
      {
        path: "/calendar",
        name: "calendar",
        component: () => import("@/pages/calendar/Index.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("@/layouts/about/AboutLayout.vue"),
    children: [
      {
        path: "", // 👈 igual, relativo
        name: "login",
        component: () => import("@/pages/auth/Index.vue"),
      },
    ],
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Middleware global
// router.beforeEach(async (to, from, next) => {
//   const auth = useAuthStore();

//   // intenta refrescar tokens si no estás autenticado
//   if (!auth.isAuthenticated) {
//     try {
//       await auth.refresh();
//     } catch {
//       // refresh falló → logout
//       await auth.logout();
//     }
//   }

//   if (to.meta.requiresAuth && !auth.isAuthenticated) {
//     return next({ name: 'login' });
//   }

//   if (to.name === 'login' && auth.isAuthenticated) {
//     return next({ name: 'home' });
//   }

//   next();
// });


router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();

    console.log('to', to.name);
     // Ruta protegida sin token → enviar a login
    if (to.meta.requiresAuth && !authStore.token) {
      console.log('redireccionando a auth');
      return next({ path: '/auth' });
    }

    // Usuario logueado → no puede ir a login
    if (to.name === 'login' && authStore.token) {
      console.log('redireccionando a main');
      return next({ path: '/main' });
    }

    next();
  }
);


export default router
