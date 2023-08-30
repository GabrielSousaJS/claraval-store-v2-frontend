import "./styles.css";

import { useEffect, useState } from "react";
import { OrderItemDTO } from "../../../../models/order-item";
import { ProductDTO } from "../../../../models/product";
import addIcon from "../../../../assets/icons/addIcon.svg";
import subIcon from "../../../../assets/icons/subIcon.svg";
import deleteIcon from "../../../../assets/icons/deleteIcon.svg";
import ProductPrice from "../../../../components/ProductPrice";
import * as productService from "../../../../services/product-service";
import * as orderService from "../../../../services/order-service";

type Props = {
  id?: number;
  item: OrderItemDTO;
  onChange: Function;
};

export default function CartItem({ id, item, onChange }: Props) {
  const [product, setProduct] = useState<ProductDTO>();

  useEffect(() => {
    productService.findByIdRequest(item.productId).then((response) => {
      setProduct(response.data);
    });
  }, [item.productId]);

  const [itemQuantity, setItemQuantity] = useState<number>(item.quantity);

  useEffect(() => {
    updateItemQuantity();
  }, [itemQuantity]);

  function updateItemQuantity() {
    item.quantity = itemQuantity;
    if (id) orderService.updateOrderRequest(id, item);
    onChange();
  }

  function handleSubtractItem() {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
      onChange();
    }
  }

  function handleAddItem() {
    if (product)
      if (itemQuantity < product.quantity) {
        setItemQuantity(itemQuantity + 1);
        onChange();
      }
  }

  function getSubTotal(): number {
    return item.price * item.quantity;
  }

  function handleDelete() {
    if (id) {
      orderService.deleteItemRequest(id, item.productId).then(() => {
        onChange();
      });
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-between base-card p-2 cart-item-container">
      <div className="cart-item-img p-2">
        <img src={item.imgUrl} alt={item.name} />
      </div>

      <div className="pb-3">
        <h5>{item.name}</h5>
      </div>

      <div className="d-flex quantity-cart-container pb-3">
        <button onClick={handleSubtractItem}>
          <img src={subIcon} alt="Subtrair" />
        </button>
        <h4 className="text-center">{itemQuantity}</h4>
        <button onClick={handleAddItem}>
          <img src={addIcon} alt="Adicionar" />
        </button>
      </div>

      <div className="pb-3">
        <ProductPrice price={getSubTotal()} />
      </div>

      <div className="delete-cart pb-3" onClick={() => handleDelete()}>
        <img src={deleteIcon} alt="Remover" />
      </div>
    </div>
  );
}
