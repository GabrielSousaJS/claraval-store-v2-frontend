import { createContext } from "react";

export type ContextSearchType = {
  contextSearch: string;
  setContextSearch: (contextSearch: string) => void;
};

export const ContextSearch = createContext<ContextSearchType>({
  contextSearch: "",
  setContextSearch: () => {},
});
