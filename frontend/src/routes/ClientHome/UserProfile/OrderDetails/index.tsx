import "./styles.css";

import ComeBack from "../../../../components/ComeBack";
import { useParams } from "react-router-dom";
import { OrderItemDTO } from "../../../../models/order-item";
import { useEffect, useState } from "react";
import * as orderService from "../../../../services/order-service";
import * as formatters from "../../../../utils/formatters";

export function OrderDetails() {
  const params = useParams();

  const [items, setItems] = useState<OrderItemDTO[]>([]);

  useEffect(() => {
    orderService
      .getOrderByIdRequest(Number(params.orderId))
      .then((response) => {
        setItems(response.data.items);
      });
  }, [params.orderId]);

  function getTotal(): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b, 0);
  }

  return (
    <section className="ps-3 pe-3">
      <div className="pb-3">
        <ComeBack />
      </div>

      <h5 className="pb-3">Detalhes do pedido</h5>

      <div className="border rounded p-3">
        <div className="row pb-3 border-bottom">
          <div className="col-4">
            <p>Produto</p>
          </div>
          <div className="col-4 text-center">
            <p>Quantidade</p>
          </div>
          <div className="col-4 text-center">
            <p>Total</p>
          </div>
        </div>
        {items.map((item) => (
          <div
            className="row pt-2 pb-2 mb-2 border-bottom"
            key={item.productId}
          >
            <div className="col-4">
              <p>{item.name}</p>
            </div>
            <div className="col-4 text-center">
              <p>{item.quantity}</p>
            </div>
            <div className="col-4 text-center">
              <p className="fw-bold">
                R$ {formatters.formatPrice(item.quantity * item.price)}
              </p>
            </div>
          </div>
        ))}
        <div className="row">
          <p className="col-8">Total</p>
          <p className="fw-bold col-4 text-center">
            R$ {formatters.formatPrice(getTotal())}
          </p>
        </div>
      </div>
    </section>
  );
}
