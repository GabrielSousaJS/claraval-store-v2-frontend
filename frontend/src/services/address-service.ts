import { AxiosRequestConfig } from "axios";
import { AddressDTO } from "../models/address";
import { requestBackend } from "../utils/requests";

export function updateAddressRequest(id: number, data: AddressDTO) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/api/addresses/${id}`,
    data,
    withCredentials: true,
  };

  return requestBackend(config);
}
