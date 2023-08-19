import { createContext } from "react";
import { AccessTokenPayloadDTO } from "../models//auth";

export type ContextTokenType = {
  contextTokenPayload: AccessTokenPayloadDTO | undefined;
  setContextTokenPayload: (
    contextTokenPayload: AccessTokenPayloadDTO | undefined
  ) => void;
};

export const ContextToken = createContext<ContextTokenType>({
  contextTokenPayload: undefined,
  setContextTokenPayload: () => null,
});
