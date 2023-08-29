import { OrderDTO } from "../models/order";

export function hasOpenOrder(orders: Array<OrderDTO>) {
  let openOrder = orders.find(
    (order) => order.status === "AGUARDANDO_PAGAMENTO"
  );
  return openOrder;
}
