import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function findAllRequest(page: number, size = 12) {
  const config: AxiosRequestConfig = {
    url: "/api/users",
    params: { page, size },
    withCredentials: true,
  };

  return requestBackend(config);
}

export function findAllAdminsRequest() {
  const config: AxiosRequestConfig = {
    url: "/api/users/all-admins",
    withCredentials: true,
  };

  return requestBackend(config);
}

export function getProfileRequest() {
  const config: AxiosRequestConfig = {
    url: "/api/users/profile",
    withCredentials: true,
  };

  return requestBackend(config);
}

export function insertClientRequest(data: any) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/api/users",
    data,
  };

  return requestBackend(config);
}

export function insertAdminRequest(data: any) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/api/users/add-admin",
    data,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function updateClientRequest(id: number, data: any) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/api/users/${id}`,
    data,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function updatePasswordRequest(data: any) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: "/api/users/password",
    data,
    withCredentials: true,
  };

  return requestBackend(config);
}
