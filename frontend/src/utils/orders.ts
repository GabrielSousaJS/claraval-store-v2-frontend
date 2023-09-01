import { OrderDTO } from "../models/order";

export function hasOpenOrder(orders: Array<OrderDTO>): OrderDTO | undefined {
  let openOrder = orders.find(
    (order) => order.status === "AGUARDANDO_PAGAMENTO"
  );

  return openOrder;
}

export function hasCloseOrder(orders: Array<OrderDTO>): OrderDTO[] {
  return orders.filter((order) => order.status !== "AGUARDANDO_PAGAMENTO");
}
