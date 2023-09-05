import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function findAllRequest() {
  const config: AxiosRequestConfig = {
    url: "/api/categories",
  };

  return requestBackend(config);
}

export function findByIdRequest(id: number) {
  const config: AxiosRequestConfig = {
    url: `/api/categories/${id}`,
  };

  return requestBackend(config);
}

export function insertRequest(data: any) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/api/categories",
    data,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function updateRequest(data: any) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/api/categories/${data.id}`,
    data,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function deleteByIdRequest(id: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `/api/categories/${id}`,
    withCredentials: true,
  };

  return requestBackend(config);
}
