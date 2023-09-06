import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
export const HEADER_AUTHORIZATION = "Authorization";
const errorResponse = (response: AxiosResponse) => {
  return {
    status: response.status ?? 500,
    message: response.data.message ?? "Error",
  };
};

const createInstance = (jwt: string) => {
  const instance = axios.create({
    baseURL: process.env.BACKEND_ENDPOINT,
    timeout: 1000,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return setInterceptors(instance);
};
const setInterceptors = (instance: AxiosInstance) => {
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
    (error) => Promise.reject(errorResponse(error.response))
  );

  return instance;
};

export const requsetWithJWT = (jwt: string) =>
  jwt ? createInstance(jwt) : undefined;
