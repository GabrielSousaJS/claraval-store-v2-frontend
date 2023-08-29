import { OrderItemDTO } from "./order-item";
import { PaymentDTO } from "./payment";
import { ClientDTO } from "./user";

export type OrderDTO = {
  id: number;
  moment: string;
  status: string;
  client: ClientDTO;
  payment: PaymentDTO;
  items: OrderItemDTO[];
};
