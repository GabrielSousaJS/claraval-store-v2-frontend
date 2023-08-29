import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function getOrdersByClientRequest() {
  const config: AxiosRequestConfig = {
    url: "/api/orders/client-orders",
    withCredentials: true,
  };

  return requestBackend(config);
}
