import { OrderDTO } from "../models/order";
import { OrderItemDTO } from "../models/order-item";
import { ProductDTO } from "../models/product";
import { UserMinDTO, UserDTO } from "../models/user";
import * as formatters from "./formatters";

export function createOrderItemDTO(
  product: ProductDTO,
  quantity: number
): OrderItemDTO {
  return {
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity,
    imgUrl: product.imgUrl,
  };
}

function createClientDTO(user: UserDTO): UserMinDTO {
  return {
    id: user.id,
    name: user.name,
  };
}

export function createOrderDTO(user: UserDTO): OrderDTO {
  return {
    moment: formatters.formatDateToISO(String(new Date())),
    client: createClientDTO(user),
    items: [],
    status: "AGUARDANDO_PAGAMENTO",
  };
}
