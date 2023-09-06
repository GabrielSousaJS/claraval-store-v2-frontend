import "./styles.css";

import { useEffect, useState } from "react";
import { OrderDTO } from "../../../../../../models/order";
import { OrderItemDTO } from "../../../../../../models/order-item";
import { selectStyles } from "../../../../../../utils/select-styles";
import { ButtonPrimary } from "../../../../../../components/ButtonPrimary";
import FormSelect from "../../../../../../components/FormSelect";
import * as formatters from "../../../../../../utils/formatters";
import * as forms from "../../../../../../utils/forms";
import * as orderService from "../../../../../../services/order-service";

type Props = {
  order: OrderDTO;
  onOpenModal: Function;
};

export default function OrderCrudCard({ order, onOpenModal }: Props) {
  const [formData, setFormData] = useState<any>({
    orderStatus: {
      value: "",
      id: "status",
      name: "status",
    },
  });

  const options = [
    { value: "ENVIADO", label: "ENVIADO" },
    { value: "ENTREGUE", label: "ENTREGUE" },
  ];

  useEffect(() => {
    setStatusInSelect();
  }, []);

  function setStatusInSelect() {
    let value = order.status;
    let label = order.status;
    const newFormData = {
      ...formData,
      orderStatus: { ...formData.orderStatus, value: { value, label } },
    };
    setFormData(newFormData);
  }

  function getTotal(orderItems: OrderItemDTO[]): number {
    return orderItems
      .map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b, 0);
  }

  function handleTurnDirty(name: string) {
    setFormData(forms.dirtyAndValidate(formData, name));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const requestBody = forms.toValues(formData.orderStatus).value;

    if (order.id) {
      orderService.updateOrderStatusRequest(order.id, requestBody).then(() => {
        onOpenModal();
      });
    }
  }

  return (
    <div className="row text-center base-card p-3">
      <div className="col-lg-1 mb-2 pb-2 order-admin-border">
        <p className="fw-bold pb-2">Pedido</p>#<span>{order.id}</span>
      </div>
      <div className="col-lg-2 mb-2 pb-2 order-admin-border">
        <p className="fw-bold pb-2">Cliente</p>
        <span>{order.client.name}</span>
      </div>
      <div className="col-lg-2 mb-2 pb-2 order-admin-border">
        <p className="fw-bold pb-2">Data</p>
        <span>{formatters.formatDateToPTBR(order.moment)}</span>
      </div>
      <div className="col-lg-2 mb-2 pb-2 order-admin-border">
        <p className="fw-bold pb-2">Total</p>
        <span>{formatters.formatPrice(getTotal(order.items))}</span>
      </div>
      <form className="col-lg-5" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-2 pb-2 order-status-admin-border">
            <p className="fw-bold pb-2">Status</p>
            <FormSelect
              {...formData.orderStatus}
              styles={selectStyles}
              className="form-control base-input form-select-container"
              options={options}
              onChange={(obj: any) => {
                const newFormData = forms.updateAndValidate(
                  formData,
                  "orderStatus",
                  obj
                );
                setFormData(newFormData);
              }}
              onTurnDirty={handleTurnDirty}
            />
          </div>
          <div className="col-md-6">
            <p className="fw-bold pb-2">Ação</p>
            <ButtonPrimary text={"Salvar"} />
          </div>
        </div>
      </form>
    </div>
  );
}
