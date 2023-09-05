import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function findAllRequest(
  page: number,
  name?: string,
  categoryId?: number,
  size = 12
) {
  const config: AxiosRequestConfig = {
    url: "/api/products",
    params: { page, name, size, categoryId },
  };

  return requestBackend(config);
}

export function findByIdRequest(id: number) {
  const config: AxiosRequestConfig = {
    url: `/api/products/${id}`,
  };

  return requestBackend(config);
}

export function insertRequest(data: any) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/api/products",
    data,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function updateRequest(data: any) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/api/products/${data.id}`,
    data,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function deleteByIdRequest(id: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `/api/products/${id}`,
    withCredentials: true,
  };

  return requestBackend(config);
}
