import "./styles.css";

import { useEffect, useState } from "react";
import { OrderDTO } from "../../../../models/order";
import { OrderItemDTO } from "../../../../models/order-item";
import { Link } from "react-router-dom";
import * as orderService from "../../../../services/order-service";
import * as orderUtils from "../../../../utils/orders";
import * as formatters from "../../../../utils/formatters";

export default function UserOrder() {
  const [orders, setOrders] = useState<OrderDTO[]>([]);

  useEffect(() => {
    orderService.getOrdersByClientRequest().then((response) => {
      const ordersClosed = orderUtils.hasCloseOrder(response.data);
      setOrders(ordersClosed);
    });
  }, []);

  function getTotal(orderItems: OrderItemDTO[]): number {
    return orderItems
      .map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b, 0);
  }

  return (
    <section className="p-2">
      {orders.map((order) => (
        <div
          className="row text-center border rounded p-3 ms-2 me-2 mb-4"
          key={order.id}
        >
          <div className="col-md-2 mb-2 pb-2 order-info-border">
            <p className="fw-bold pb-2">Pedido</p>#<span>{order.id}</span>
          </div>
          <div className="col-md-2 mb-2 pb-2 order-info-border">
            <p className="fw-bold pb-2">Data</p>
            <span>{formatters.formatDateToPTBR(order.moment)}</span>
          </div>
          <div className="col-md-2 mb-2 pb-2 order-info-border">
            <p className="fw-bold pb-2">Status</p>
            <span>{order.status}</span>
          </div>
          <div className="col-md-2 mb-2 pb-2 order-info-border">
            <p className="fw-bold pb-2">Total</p>
            <span>R$ {formatters.formatPrice(getTotal(order.items))}</span>
          </div>
          <div className="col-md-4 link-order-details">
            <p className="fw-bold pb-2">Detalhes</p>
            <Link
              to={`${order.id}`}
              className="bg-secondary p-1 rounded"
            >
              Visualizar
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
