import QueryString from "qs";
import {
  AccessTokenPayloadDTO,
  CredentialsDTO,
  RoleEnum,
} from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import jwtDecode from "jwt-decode";
import * as accessTokenRepository from "../localStorage/access-token-repository";

export function loginRequest(loginData: CredentialsDTO) {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
  };

  const data = QueryString.stringify({ ...loginData, grant_type: "password" });

  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/oauth2/token",
    data,
    headers,
  };

  return requestBackend(config);
}

export function saveAccessToken(token: string) {
  accessTokenRepository.saveAuthData(token);
}

export function getAccessToken() {
  return accessTokenRepository.getAuthData();
}

export function logout() {
  accessTokenRepository.removeAuthData();
}

export function getAccessTokenPayload(): AccessTokenPayloadDTO | undefined {
  try {
    const token = accessTokenRepository.getAuthData();
    return token == null
      ? undefined
      : (jwtDecode(token) as AccessTokenPayloadDTO);
  } catch (error) {
    return undefined;
  }
}

export function isAuthenticated(): boolean {
  let tokenPayload = getAccessTokenPayload();
  return tokenPayload && tokenPayload.exp * 1000 > Date.now() ? true : false;
}

export function hasAnyRole(roles: RoleEnum[]): boolean {
  if (roles.length === 0) {
    return true;
  }

  const tokenPayload = getAccessTokenPayload();

  if (tokenPayload !== undefined) {
    for (let i = 0; i < roles.length; i++) {
      if (tokenPayload.authorities.includes(roles[i])) {
        return true;
      }
    }
  }

  return false;
}
