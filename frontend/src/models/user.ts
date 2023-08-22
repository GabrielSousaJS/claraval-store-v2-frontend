import { AddressDTO } from "./address";

export type UserDTO = {
  id: number;
  name: string;
  birthDate: string;
  email: string;
  address: AddressDTO;
};
