import { useEffect, useState } from "react";
import { OrderDTO } from "../../../../../models/order";
import OrderCrudCard from "./OrderCrudCard";
import DialogInfo from "../../../../../components/DialogInfo";
import * as orderService from "../../../../../services/order-service";
import * as orderUtils from "../../../../../utils/orders";

export default function OrderListing() {
  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    message: "Status do pedido atualizado com sucesso!",
  });

  const [orders, setOrders] = useState<OrderDTO[]>([]);

  useEffect(() => {
    getClosedOrders();
  }, []);

  async function getClosedOrders() {
    await orderService.getAllOrdersRequest().then((response) => {
      setOrders(orderUtils.hasCloseOrder(response.data.content));
    });
  }

  function handleOpenModal() {
    setDialogInfoData({
      ...dialogInfoData,
      visible: true,
    });
  }

  function handleDialogInfoClose() {
    setDialogInfoData({
      ...dialogInfoData,
      visible: false,
    });
  }

  return (
    <div className="ps-2 pe-2">
      <h1 className="text-dark pb-4">Listagem de pedidos</h1>

      <div className="row ps-2 pe-2">
        {orders.map((order) => (
          <div className="pb-4" key={order.id}>
            <OrderCrudCard order={order} onOpenModal={handleOpenModal} />
          </div>
        ))}
      </div>
      {dialogInfoData.visible && (
        <DialogInfo
          message={dialogInfoData.message}
          onDialogClose={handleDialogInfoClose}
        />
      )}
    </div>
  );
}
