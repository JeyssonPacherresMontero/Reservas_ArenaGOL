import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { useUserStore } from "@/stores/userStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  async (config) => {
    let token = useUserStore.getState().user?.accessToken;

    if (!token && typeof window !== "undefined") {
      token = localStorage.getItem("access_token") || undefined;
    }

    if (!token && typeof window !== "undefined") {
      const session = await getSession();
      token = session?.accessToken;
      if (token) {
        localStorage.setItem("access_token", token);
      }
      if ((session as any)?.refreshToken) {
        localStorage.setItem("refresh_token", (session as any).refreshToken);
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          let storedRefreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;
          if (!storedRefreshToken && typeof window !== "undefined") {
            const session = await getSession();
            storedRefreshToken = (session as any)?.refreshToken || null;
            if (storedRefreshToken) {
              localStorage.setItem("refresh_token", storedRefreshToken);
            }
          }

          if (!storedRefreshToken) {
            processQueue(error, null);
            return Promise.reject(error);
          }

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
            {
              refresh_token: storedRefreshToken,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const newAccessToken = res.data.access_token;

          if (typeof window !== "undefined") {
            localStorage.setItem("access_token", newAccessToken);
            if (res.data.refresh_token) {
              localStorage.setItem("refresh_token", res.data.refresh_token);
            }
          }

          // Actualiza el accessToken en memoria del store
          const currentUser = useUserStore.getState().user;
          if (currentUser) {
            useUserStore.getState().setUser({
              ...currentUser,
              accessToken: newAccessToken,
            });
          }

          const session = await getSession();
          if (session) session.accessToken = newAccessToken;

          processQueue(null, newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject: (err: any) => reject(err),
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;

// import axios from "axios"
// import { getSession } from "next-auth/react"

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// api.interceptors.request.use(async (config) => {
//   const session = await getSession()
//   if (session?.accessToken) {
//     config.headers.Authorization = `Bearer ${session.accessToken}`
//   }

//   return config
// }, (error) => {
//   return Promise.reject(error)
// })

// export default api