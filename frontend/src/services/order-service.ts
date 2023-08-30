import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { OrderItemDTO } from "../models/order-item";
import { PaymentDTO } from "../models/payment";

export function getOrdersByClientRequest() {
  const config: AxiosRequestConfig = {
    url: "/api/orders/client-orders",
    withCredentials: true,
  };

  return requestBackend(config);
}

export function updateOrderRequest(orderId: number, data: OrderItemDTO) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/api/orders/add-item/${orderId}`,
    data,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function addPaymentRequest(orderId: number, payment: PaymentDTO) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/api/orders/payment/${orderId}`,
    data: payment,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function deleteItemRequest(orderId: number, productId: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `/api/orders/${orderId}/${productId}`,
    withCredentials: true,
  };

  return requestBackend(config);
}
