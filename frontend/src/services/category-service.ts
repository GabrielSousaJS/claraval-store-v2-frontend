import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export async function findAllRequest() {
  const config: AxiosRequestConfig = {
    url: "/api/categories",
  };

  return await requestBackend(config);
}
