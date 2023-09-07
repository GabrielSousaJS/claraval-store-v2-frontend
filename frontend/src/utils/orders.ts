import { OrderDTO } from "../models/order";
import { SpringPage } from "../models/vendor/spring-page";

export function hasOpenOrder(orders: Array<OrderDTO>): OrderDTO | undefined {
  let openOrder = orders.find(
    (order) => order.status === "AGUARDANDO_PAGAMENTO"
  );

  return openOrder;
}

export function hasClosedOrders(orders: Array<OrderDTO>): OrderDTO[] {
  return orders.filter((order) => order.status !== "AGUARDANDO_PAGAMENTO");
}

export function hasClosedOrdersPage(page: SpringPage<OrderDTO>): SpringPage<OrderDTO> {
  const closeOrders = page.content.filter(
    (order) => order.status !== "AGUARDANDO_PAGAMENTO"
  );

  page.content = closeOrders;
  return page;
}
