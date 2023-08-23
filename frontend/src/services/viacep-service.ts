import axios, { AxiosRequestConfig } from "axios";

export function getCepRequest(cep: string) {
  const config: AxiosRequestConfig = {
    url: `https://viacep.com.br/ws/${cep}/json`,
  };

  return axios(config);
}
