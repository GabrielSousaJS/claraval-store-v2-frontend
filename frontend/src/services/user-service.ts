import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

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
