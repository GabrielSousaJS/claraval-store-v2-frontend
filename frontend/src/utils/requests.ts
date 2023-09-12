import { BASE_URL } from "./system";

import axios, { AxiosRequestConfig } from "axios";
import * as authService from "../services/auth-service";

export function requestBackend(config: AxiosRequestConfig) {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: `Bearer ${authService.getAccessToken()}`,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
}

export async function requestAsyncBackend(config: AxiosRequestConfig) {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: `Bearer ${authService.getAccessToken()}`,
      }
    : config.headers;

  return await axios({ ...config, baseURL: BASE_URL, headers });
}
