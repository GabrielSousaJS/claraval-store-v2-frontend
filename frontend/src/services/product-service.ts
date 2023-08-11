import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function findAllRequest() {
  const config: AxiosRequestConfig = {
    url: "/api/products",
  };

  return requestBackend(config);
}
