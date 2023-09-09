import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
export const HEADER_AUTHORIZATION = "Authorization";
const errorResponse = (status: number, errorMsg: string) => {
  return {
    status: status ?? 500,
    message: errorMsg ?? "ERROR",
  };
};

const createInstance = (jwt: string) => {
  const instance = axios.create({
    baseURL: process.env.BACKEND_ENDPOINT,
    timeout: 3000,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return setInterceptors(jwt, instance);
};
const setInterceptors = (jwt: string, instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error: AxiosError) => {
      error.response;
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      Promise.reject(errorResponse(error.status, error.message));
    }
  );

  return instance;
};

export const requsetWithJWT = (jwt: string) =>
  jwt ? createInstance(jwt) : undefined;
