import { useEffect, useState } from "react";
import { OrderDTO } from "../../../../../models/order";
import { SpringPage } from "../../../../../models/vendor/spring-page";
import OrderCrudCard from "./OrderCrudCard";
import DialogInfo from "../../../../../components/DialogInfo";
import Pagination from "../../../../../components/Pagination";
import * as orderService from "../../../../../services/order-service";
import * as orderUtils from "../../../../../utils/orders";

export default function OrderListing() {
  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    message: "Status do pedido atualizado com sucesso!",
  });

  const [page, setPage] = useState<SpringPage<OrderDTO>>();

  useEffect(() => {
    getClosedOrders(0);
  }, []);

  function getClosedOrders(numberPage: number) {
    orderService.getAllOrdersRequest(numberPage).then((response) => {
      setPage(orderUtils.hasClosedOrdersPage(response.data));
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
        {page?.content.map((order) => (
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

      {page?.content.length !== 0 && (
        <Pagination
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChange={getClosedOrders}
        />
      )}
    </div>
  );
}
