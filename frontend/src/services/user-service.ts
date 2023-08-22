import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function getProfile() {
  const config: AxiosRequestConfig = {
    url: "/api/users/profile",
    withCredentials: true,
  };

  return requestBackend(config);
}
