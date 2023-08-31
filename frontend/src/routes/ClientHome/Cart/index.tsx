import CartItem from "./CartItem";
import { useContext, useEffect, useState } from "react";
import { OrderDTO } from "../../../models/order";
import { ContextCartCount } from "../../../utils/context-cart";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import { PaymentDTO } from "../../../models/payment";
import * as orderUtil from "../../../utils/orders";
import * as orderService from "../../../services/order-service";
import * as formatters from "../../../utils/formatters";

export default function Cart() {
  const { setContextCartCount } = useContext(ContextCartCount);

  const [order, setOrder] = useState<OrderDTO>();

  const navigate = useNavigate();

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

  function getTotal(): number {
    const total = order?.items
      .map((item) => item.price * item.quantity)
      .reduce((acc, cur) => acc + cur, 0);

    return total ? total : 0;
  }

  function handlePlaceOrderClick() {
    const payment: PaymentDTO = {
      id: order?.id,
      moment: formatters.formatDateToISO(String(new Date())),
    };

    if (order?.id) {
      orderService.addPaymentRequest(order.id, payment).then(() => {
        setContextCartCount(0);
        getOrder();
        navigate("/profile/orders");
      });
    }
  }

  return (
    <main className="container pt-5 pb-5 ps-2 pe-2">
      {order === undefined || order.items.length === 0 ? (
        <>
          <h1 className="mb-3">O carrinho está vazio</h1>
          <div className="d-inline-block">
            <Link to={"/"}>
              <ButtonPrimary text={"Página inicial"} />
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="mb-3">Meu carrinho</h1>

          <div className="row">
            <div className="col-lg-9">
              {order?.items.map((item) => (
                <div className="mb-3" key={item.productId}>
                  <CartItem
                    id={order.id}
                    item={item}
                    onChange={() => {
                      getOrder();
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="col-lg-3">
              <h2 className="pb-3">Resumo</h2>

              <div className="d-flex justify-content-between align-items-center pb-3">
                <h5>Total</h5>
                <h5 className="fw-bold">
                  R$ {formatters.formatPrice(getTotal())}
                </h5>
              </div>

              <div onClick={handlePlaceOrderClick}>
                <ButtonPrimary text={"Fechar pedido"} />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
