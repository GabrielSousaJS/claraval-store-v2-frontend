import { OrderItemDTO } from "./order-item";
import { PaymentDTO } from "./payment";
import { UserMinDTO } from "./user";

export type OrderDTO = {
  id?: number;
  moment: string;
  status: string;
  client: UserMinDTO;
  payment?: PaymentDTO;
  items: OrderItemDTO[];
};
