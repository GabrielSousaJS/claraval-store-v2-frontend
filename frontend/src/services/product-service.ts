import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export async function findAllRequest() {
  const config: AxiosRequestConfig = {
    url: "/api/products",
  };

  return await requestBackend(config);
}

export async function findByIdRequest(id: number) {
  const config: AxiosRequestConfig = {
    url: `/api/products/${id}`,
  };

  return await requestBackend(config);
}
