import { defineStore } from 'pinia';
import { COOKIE_NAME_REFRESH, COOKIE_NAME_SESSION } from '@/helpers/constants';
import api from '@/plugins/axios';
import router from '@/router';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: { username?: string } | null;
}

interface ILoginRequest {
  email: string;
  password: string;
}


export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: sessionStorage.getItem(COOKIE_NAME_SESSION) || null,
    refreshToken: sessionStorage.getItem(COOKIE_NAME_REFRESH) || null,
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setTokens(accessToken: string, refreshToken?: string) {
      this.token = accessToken;
      sessionStorage.setItem(COOKIE_NAME_SESSION, accessToken);

      if (refreshToken) {
        this.refreshToken = refreshToken;
        sessionStorage.setItem(COOKIE_NAME_REFRESH, refreshToken);
      }
    },

    setUser(user: any) {
      this.user = user;
    },

    logout() {
      sessionStorage.removeItem(COOKIE_NAME_SESSION);
      sessionStorage.removeItem(COOKIE_NAME_REFRESH);
      this.token = null;
      this.refreshToken = null;
      this.user = null;
      router.push({ path: "/auth" });
    },

    async login(email: string, password: string) {
      try {
        const { data } = await api.post("/auth/login", { email, password } as ILoginRequest);
        this.setTokens(data.accessToken, data.refreshToken);
        this.setUser(data.user);
        router.push({ path: "/main" });
      } catch (err) {
        throw err;
      }
    },

     async refreshTokenm() {
      try {
        if (!this.refreshToken) throw new Error('No refresh token');

        const { data } = await api.post('/auth/refresh-token', {
          refreshToken: this.refreshToken,
        });

        this.setTokens(data.accessToken, data.refreshToken);
      } catch (err) {
        this.logout();
        throw err;
      }
    },
  },
});
