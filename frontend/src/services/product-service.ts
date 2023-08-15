import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export async function findAllRequest(
  page: number,
  categoryId: number,
  size = 12
) {
  const config: AxiosRequestConfig = {
    url: "/api/products",
    params: { page, size, categoryId },
  };

  return await requestBackend(config);
}

export async function findByIdRequest(id: number) {
  const config: AxiosRequestConfig = {
    url: `/api/products/${id}`,
  };

  return await requestBackend(config);
}
