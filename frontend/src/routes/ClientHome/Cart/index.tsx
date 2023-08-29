import { useContext, useEffect, useState } from "react";
import { OrderDTO } from "../../../models/order";
import { ContextCartCount } from "../../../utils/context-cart";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import CartItem from "./CartItem";
import * as orderUtil from "../../../utils/orders";
import * as orderService from "../../../services/order-service";

export default function Cart() {
  const { setContextCartCount } = useContext(ContextCartCount);

  const [order, setOrder] = useState<OrderDTO>();

  useEffect(() => {
    getOrder();
  }, []);

  async function getOrder() {
    const response = await orderService.getOrdersByClientRequest();
    let orders: Array<OrderDTO> = response.data;
    const sortedOrder = orderUtil.hasOpenOrder(orders);
    if (sortedOrder) {
      sortedOrder.items.sort(
        (itemA, itemB) => itemA.productId - itemB.productId
      );
    }

    if (sortedOrder) {
      setOrder(sortedOrder);
      setContextCartCount(sortedOrder.items.length);
    }
  }

  return (
    <main className="container pt-5 ps-2 pe-2">
      <h1 className="mb-3">Meu carrinho</h1>

      <div className="row">
        {order?.items.map((item) => (
          <div className="col-lg-8 mb-3" key={item.productId}>
            <CartItem
              id={order.id}
              item={item}
              onChange={() => {
                getOrder();
              }}
            />
          </div>
        ))}

        <div className="col-lg-4">
          <h3>Resumo do pedido</h3>

          <div>
            <div>
              <h4>Total</h4>
              <p>R$ {}</p>
            </div>
          </div>

          <div>
            <ButtonPrimary text={"Fechar pedido"} />
          </div>
        </div>
      </div>
    </main>
  );
}
