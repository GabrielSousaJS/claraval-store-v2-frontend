import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { OrderItemDTO } from "../models/order-item";
import { PaymentDTO } from "../models/payment";
import { OrderDTO } from "../models/order";

export function getAllOrdersRequest() {
  const config: AxiosRequestConfig = {
    url: "/api/orders/all-orders",
    withCredentials: true,
  };

  return requestBackend(config);
}

export function getOrdersByClientRequest() {
  const config: AxiosRequestConfig = {
    url: "/api/orders/client-orders",
    withCredentials: true,
  };

  return requestBackend(config);
}

export function getOrderByIdRequest(orderId: number) {
  const config: AxiosRequestConfig = {
    url: `/api/orders/${orderId}`,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function insertOrderRequest(data: OrderDTO) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/api/orders",
    data,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function addItemToOrderRequest(orderId: number, data: OrderItemDTO) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/api/orders/add-item/${orderId}`,
    data,
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

export function updateOrderStatusRequest(orderId: number, status: string) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/api/orders/${orderId}/status?orderStatus=${status}`,
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
